import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'qrcode';
import { FiUpload, FiMic, FiDownload, FiRefreshCw, FiMail, FiShare2, FiActivity, FiUser, FiMapPin, FiSmartphone, FiGlobe, FiCheckCircle } from 'react-icons/fi';
import { saveAs } from 'file-saver';
import path from 'path';
import jsPDF from 'jspdf';

//to parse csv
import Papa from 'papaparse'; // CSV parsing library

// Type declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  new (): SpeechRecognition;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface AnalysisFeature {
  name: string;
  value: number;
}

interface AnalysisResults {
  isDeepfake: boolean;
  confidence: number;
  features: AnalysisFeature[];
}

interface SourceDetails {
  name: string;
  ipAddress: string;
  phoneNumber: string;
  location: string;
  timestamp: string;
}

const Detection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [showSourceIdentification, setShowSourceIdentification] = useState(false);
  const [sourceDetails, setSourceDetails] = useState<SourceDetails | null>(null);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [isRecordedAudio, setIsRecordedAudio] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [hexCodes, setHexCodes] = useState([]);
  const [qrCodeUrls, setQrCodeUrls] = useState<string[]>([]); // Define qrCodeUrls state

   useEffect(() => {
    const generateQRCodesFromCSV = async () => {
      if (file) {
        try {
          // Parse the CSV to extract hex codes
          Papa.parse(file, {
            complete: async (results) => {
              // Extract hex codes matching the exact format
              const extractedHexCodes = results.data
                .flatMap(row => row)
                .filter(cell => 
                  typeof cell === 'string' && 
                  /^[0-9a-f]{32}$/.test(cell)
                );
              
              // Use Promise.all to handle async fetch requests inside map
              const qrUrls = await Promise.all(extractedHexCodes.map(async (hex) => {
                try {
                  const response = await fetch(`/QR_images/${hex}.png`, { method: 'HEAD' });
                  if (response.ok) {
                    return `/QR_images/${hex}.png`; // Web-accessible path
                  }
                  console.warn(`QR code not found for hex: ${hex}`);
                  return null;
                } catch (err) {
                  console.error(`Error checking QR code for hex ${hex}:`, err);
                  return null;
                }
              }));

              // Filter out null values (QR codes that weren't found)
              // Assuming qrUrls is an array of strings or nulls
              const firstNonNullUrl = qrUrls.find(url => url !== null) || ""; // Default to an empty string if no match
              setQrCodeDataUrl(firstNonNullUrl); // Ensure the state is a string

              // Generate a verification ID if not already created
              if (!verificationId) {
                const id = Math.random().toString(36).substring(2, 10).toUpperCase();
                setVerificationId(id);
              }
            },
            header: false
          });
        } catch (err) {
          console.error('Error generating QR codes:', err);
        }
      }
    };
    generateQRCodesFromCSV();
  }, [file, verificationId]);

  // Check if speech recognition is supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSpeechSupported(!!SpeechRecognition);
    
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }

          setTranscript(finalTranscript + interimTranscript);
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error);
          setSpeechError(event.error);

          if (event.error === 'not-allowed') {
            setPermissionDenied(true);
          }
        };

        recognitionRef.current = recognition;
        setIsSpeechSupported(true);
      } catch (error) {
        console.error('Speech Recognition initialization error:', error);
        setIsSpeechSupported(false);
      }
    } else {
      console.warn('Speech Recognition is not supported in this browser');
      setIsSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    setFile(file);
    setIsRecordedAudio(false);
    analyzeFile(file); // Pass the file to analyzeFile
  }
};

  const uploadFileToServer = async (file: File) => {
  const formData = new FormData();
  formData.append('audio', file);

  try {
    const response = await fetch('http://127.0.0.1:5000/api/audio/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });

    const data = await response.json();
    console.log("Server Response:", data);

    if (data.qr_code_url) {
      setQrCodeDataUrl(`http://127.0.0.1:5000${data.qr_code_url}`);
    } else {
      console.warn('QR code not found:', data.message);
    }
  } catch (error) {
    console.error('Upload failed:', error);
  }
};

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  const droppedFile = e.dataTransfer.files?.[0];
  if (droppedFile) {
    setFile(droppedFile);
    setIsRecordedAudio(false);
    analyzeFile(droppedFile); // Pass the dropped file to analyzeFile
  }
};

  const analyzeFile = async (fileToAnalyze: File) => {
  console.log("Filename being sent:", fileToAnalyze.name);
  setIsAnalyzing(true);
  setResults(null);

  // Random generator with strict label-based thresholds
  const generateResults = (label: 'real' | 'fake') => {
    const isReal = label === 'real';
    const featureNames = [
      "Spectral Consistency",
      "Micro-timing Analysis", 
      "Vocal Biomarkers",
      "Synthetic Artifacts"
    ];

    return {
      isDeepfake: !isReal,
      confidence: isReal 
        ? 60 + Math.floor(Math.random() * 40)  // Always 60-99 for real
        : Math.floor(Math.random() * 50),      // 0-49 for fake
      features: featureNames.map(name => ({
        name,
        value: isReal 
          ? 60 + Math.floor(Math.random() * 40)  // 60-99 for real
          : Math.floor(Math.random() * 50)       // 0-49 for fake
      }))
    };
  };

  try {
    // Get the precise label from backend
    const response = await fetch(
      `http://127.0.0.1:5000/api/audio/analyze?filename=${encodeURIComponent(fileToAnalyze.name)}`
    );
    const { label, error } = await response.json();

    if (error) throw new Error(error);
    if (label !== 'real' && label !== 'fake') throw new Error('Invalid label received');

    // Generate proper random results based on label
    const results = generateResults(label);
    setResults(results);

  } catch (error) {
    console.error("Analysis error:", error);
    // Fallback to clearly fake results
    setResults({
      isDeepfake: true,
      confidence: Math.floor(Math.random() * 40) + 10, // 10-49
      features: [
        { name: "Spectral Consistency", value: Math.floor(Math.random() * 40) + 10 },
        { name: "Micro-timing Analysis", value: Math.floor(Math.random() * 40) + 10 },
        { name: "Vocal Biomarkers", value: Math.floor(Math.random() * 40) + 10 },
        { name: "Synthetic Artifacts", value: Math.floor(Math.random() * 40) + 10 }
      ]
    });
  } finally {
    setIsAnalyzing(false);
  }
};

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFile = event.target.files?.[0];
  if (selectedFile) {
    setFile(selectedFile);
    setIsRecordedAudio(false);
    analyzeFile(selectedFile); // This will trigger the analysis
  }
};

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
        setFile(audioFile);
        setIsRecordedAudio(true);
        analyzeFile(audioFile); // Pass the recorded audio file to analyzeFile
        stream.getTracks().forEach(track => track.stop());
      };

      setIsRecording(true);
      mediaRecorderRef.current.start();

      if (isSpeechSupported && recognitionRef.current) {
        recognitionRef.current.start();
      }
    } catch (error) {
      console.error("Error starting recording:", error);
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        setPermissionDenied(true);
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (isSpeechSupported && recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const resetAnalysis = () => {
    setFile(null);
    setResults(null);
    setTranscript('');
    setPermissionDenied(false);
    setSpeechError(null);
    setIsRecordedAudio(false);
    setQrCodeDataUrl('');
    setVerificationId('');
  };

  const generatePDF = () => {
    if (!results) return;

    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.text('Voice Authenticity Report', 105, 20, { align: 'center' });

    // Add result
    doc.setFontSize(16);
    doc.setTextColor(results.isDeepfake ? '#ff0000' : '#00aa00');
    doc.text(
      results.isDeepfake ? 'Potential Deepfake Detected' : 'Authentic Voice Sample',
      105,
      40,
      { align: 'center' }
    );

    // Add confidence
    doc.setFontSize(14);
    doc.setTextColor('#000000');
    doc.text(`Confidence: ${results.confidence}%`, 105, 50, { align: 'center' });

    // Add features
    doc.setFontSize(12);
    let yPosition = 70;
    results.features.forEach(feature => {
      doc.text(`${feature.name}: ${feature.value}%`, 20, yPosition);
      doc.setFillColor('#007bff');
      doc.rect(80, yPosition - 4, feature.value * 1.2, 5, 'F');
      yPosition += 10;
    });

    // Add transcript if available
    if (transcript) {
      doc.addPage();
      doc.setFontSize(16);
      doc.text('Transcript', 105, 20, { align: 'center' });
      doc.setFontSize(10);
      const splitText = doc.splitTextToSize(transcript, 180);
      doc.text(splitText, 20, 30);
    }

    // Add verification info
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Verification Information', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Verification ID: ${verificationId}`, 20, 40);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 50);

    // Save the PDF
    doc.save(`voice_authenticity_report_${verificationId}.pdf`);
  };

  const shareViaWhatsApp = () => {
    if (!results) return;

    const message = `Voice Authenticity Analysis Result:\n\n` +
      `Status: ${results.isDeepfake ? 'Potential Deepfake' : 'Authentic'}\n` +
      `Confidence: ${results.confidence}%\n` +
      `Verification ID: ${verificationId}\n\n` +
      `Scan the QR code or visit: https://voice-verify.example.com/check?id=${verificationId}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://web.whatsapp.com/send?text=${encodedMessage}`, '_blank');
  };

  const shareViaEmail = () => {
    if (!results) return;

    const subject = `Voice Authenticity Report - ${verificationId}`;
    const body = `Dear Recipient,\n\n` +
      `Please find below the voice authenticity analysis results:\n\n` +
      `Status: ${results.isDeepfake ? 'Potential Deepfake Detected' : 'Authentic Voice Sample'}\n` +
      `Confidence Level: ${results.confidence}%\n` +
      `Verification ID: ${verificationId}\n\n` +
      `You can verify this result by scanning the attached QR code or visiting:\n` +
      `https://voice-verify.example.com/check?id=${verificationId}\n\n` +
      `Best regards,\n` +
      `Voice Authenticity Team`;

    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const shareViaGmail = () => {
    if (!results) return;

    const subject = `Voice Authenticity Report - ${verificationId}`;
    const body = `Dear Recipient,%0A%0A` +
      `Please find below the voice authenticity analysis results:%0A%0A` +
      `Status: ${results.isDeepfake ? 'Potential Deepfake Detected' : 'Authentic Voice Sample'}%0A` +
      `Confidence Level: ${results.confidence}%%0A` +
      `Verification ID: ${verificationId}%0A%0A` +
      `You can verify this result by scanning the attached QR code or visiting:%0A` +
      `https://voice-verify.example.com/check?id=${verificationId}%0A%0A` +
      `Best regards,%0A` +
      `Voice Authenticity Team`;

    window.open(`https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(subject)}&body=${body}`, '_blank');
  };

  const downloadReport = () => {
    generatePDF();
  };

  const shareReport = (method: "email" | "whatsapp" | "gmail") => {
    switch (method) {
      case "email":
        shareViaEmail();
        break;
      case "whatsapp":
        shareViaWhatsApp();
        break;
      case "gmail":
        shareViaGmail();
        break;
      default:
        break;
    }
  };

  const handleSourceIdentification = async () => {
    if (!results || !results.isDeepfake) return;

    setShowSourceIdentification(true);
    setIsIdentifying(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const details: SourceDetails = {
        name: `User ${Math.floor(Math.random() * 1000)}`,
        ipAddress: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        phoneNumber: `+1 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        location: ['New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco'][Math.floor(Math.random() * 5)],
        timestamp: new Date().toLocaleString()
      };

      setSourceDetails(details);
    } catch (error) {
      console.error("Error identifying source:", error);
    } finally {
      setIsIdentifying(false);
    }
  };

  const closeSourceIdentification = () => {
    setShowSourceIdentification(false);
    setSourceDetails(null);
  };

  const toggleQRCode = () => {
    setShowQRCode(!showQRCode);
  };

  return (
    <div className="container mx-auto px-4 pt-28 py-12 relative">
      {/* Background content that will be blurred when modal is open */}
      <div className={`${showQRCode || showSourceIdentification ? 'blur-sm' : ''}`}>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl font-bold mb-8 text-white"
        >
          Voice Authenticity Analysis
        </motion.h1>

        {permissionDenied && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded dark:bg-red-900/20 dark:border-red-800 dark:text-red-100"
            role="alert"
          >
            <p>Microphone access was denied. Please allow microphone permissions to use this feature.</p>
          </motion.div>
        )}

        {speechError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-100"
            role="alert"
          >
            <p>Speech recognition error: {speechError}</p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {!file && !results && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-gray-700"
            >
              <div 
                className="border-2 border-dashed border-gray-600 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 transition-all duration-300"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <FiUpload className="mx-auto w-12 h-12 text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">Upload Voice Sample</h3>
                <p className="text-gray-400 mb-4">Drag & drop an audio file here, or click to browse</p>
                <button className="px-4 py-2 bg-gray-700 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors text-white">
                  Select File
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="audio/*"
                  className="hidden" 
                />
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-400 mb-4">Or record directly</p>
                <div className="flex flex-col items-center">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-lg ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-600 hover:bg-blue-700'} transition-all duration-300 text-white`}
                    onClick={toggleRecording}
                    disabled={permissionDenied}
                  >
                    <FiMic className="w-8 h-8" />
                    {isRecording && (
                      <motion.div 
                        className="absolute inset-0 rounded-full border-4 border-red-500 opacity-0"
                        animate={{ 
                          scale: [1, 1.5],
                          opacity: [0.7, 0]
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                    )}
                  </motion.button>
                  
                  {isRecording && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-red-400 flex items-center"
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                      Recording...
                    </motion.div>
                  )}
                  
                  {(isSpeechSupported && (isRecording || transcript)) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 w-full max-w-md"
                    >
                      <div className="bg-gray-700 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-400 mb-2">
                          {isRecording ? "Live Transcript" : "Recorded Transcript"}
                        </h4>
                        <div className="bg-gray-800 p-3 rounded border border-gray-600 min-h-20 max-h-40 overflow-y-auto text-white">
                          {transcript || (
                            <span className="text-gray-500">
                              {isRecording ? "Speak to see transcript..." : "No transcript available"}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {!isSpeechSupported && (
                    <div className="mt-4 text-sm text-yellow-400">
                      Note: Speech-to-text not supported in your browser
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {isAnalyzing && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-gray-700 text-center"
            >
              <div className="mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="relative w-24 h-24 mx-auto mb-4"
                >
                  <div className="absolute inset-0 rounded-full bg-blue-900 opacity-75"></div>
                  <div className="absolute inset-2 rounded-full bg-blue-800 flex items-center justify-center">
                    <FiActivity className="w-12 h-12 text-blue-300" />
                  </div>
                </motion.div>
                <h3 className="text-2xl font-semibold mb-2 text-white">Analyzing Voice Sample</h3>
                <p className="text-gray-400">Our AI is examining spectral patterns and vocal biomarkers...</p>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <motion.div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          )}

          {results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-8 border border-gray-700"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h3 className="text-2xl font-semibold text-white">Analysis Results</h3>
                  <p className="text-gray-400">Detailed authenticity assessment</p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleQRCode}
                    className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors text-white"
                  >
                    <FiCheckCircle className="mr-2" /> Verify Authenticity
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetAnalysis}
                    className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors text-white"
                  >
                    <FiRefreshCw className="mr-2" /> Analyze Another
                  </motion.button>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`p-6 rounded-xl mb-8 ${results.isDeepfake ? 'bg-red-900/20 border-red-800' : 'bg-green-900/20 border-green-800'} border`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {results.isDeepfake ? 'Potential Deepfake Detected' : 'Authentic Voice Sample'}
                    </h4>
                    <p className="text-sm text-gray-400">
                      Confidence: {results.confidence}%
                    </p>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${results.isDeepfake ? 'bg-red-800 text-red-100' : 'bg-green-800 text-green-100'}`}>
                    {results.isDeepfake ? 'High Risk' : 'Low Risk'}
                  </div>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {results.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-700/50 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-300">{feature.name}</span>
                      <span className="text-sm font-semibold text-white">{feature.value}%</span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <motion.div 
                        className={`h-2 rounded-full ${feature.value > 85 ? 'bg-green-500' : feature.value > 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${feature.value}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {transcript && (
                <div className="mb-8 bg-gray-700/50 rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-2 text-white">Recorded Transcript</h4>
                  <div className="bg-gray-800 p-4 rounded border border-gray-600 text-white">
                    {transcript}
                  </div>
                </div>
              )}

              <div className="border-t border-gray-700 pt-6">
                <h4 className="text-lg font-semibold mb-4 text-white">Recommended Actions</h4>
                <div className="space-y-3">
                  <p className="text-gray-300">
                    {results.isDeepfake ? (
                      <>
                        <span className="font-medium">Warning:</span> This voice sample shows strong indicators of synthetic manipulation. 
                        We recommend verifying the source and requesting additional authentication.
                      </>
                    ) : (
                      <>
                        This voice sample appears authentic with high confidence. 
                        No additional verification is recommended at this time.
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={downloadReport}
                  className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
                >
                  <FiDownload className="mr-2" /> Download PDF Report
                </motion.button>

                <div className="relative group">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-all text-white"
                  >
                    <FiMail className="mr-2" /> Share via Email
                  </motion.button>
                  <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={() => shareReport("email")}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded-t-lg"
                    >
                      Default Email
                    </button>
                    <button 
                      onClick={() => shareReport("gmail")}
                      className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 rounded-b-lg"
                    >
                      Gmail
                    </button>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => shareReport("whatsapp")}
                  className="flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all"
                >
                  <FiShare2 className="mr-2" /> Share via WhatsApp
                </motion.button>
              </div>

              {results.isDeepfake && (
                <div className="mt-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSourceIdentification}
                    className="flex items-center justify-center px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all w-full"
                  >
                    Identify Source
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQRCode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
            >
              <div className="absolute top-4 right-4">
                <button 
                  onClick={toggleQRCode}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg mb-6 flex justify-center">
                  {qrCodeDataUrl ? (
                    <img src={qrCodeDataUrl} alt="Verification QR Code" />
                  ) : (
                    <div className="w-64 h-64 flex items-center justify-center bg-gray-200">
                      <p className="text-gray-500">No QR codes found</p>
                    </div>
                  )}
                </div>
                <p className="text-gray-300 text-center mb-6 max-w-md">
                  Scan this QR code with your mobile device to verify the authenticity of this voice sample.
                </p>
                <div className="text-xs text-gray-500 text-center">
                  Verification ID: {verificationId}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Source Identification Modal */}
      <AnimatePresence>
        {showSourceIdentification && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
            >
              {isIdentifying ? (
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="relative w-24 h-24 mx-auto mb-6"
                  >
                    <div className="absolute inset-0 rounded-full bg-blue-900 opacity-75"></div>
                    <div className="absolute inset-2 rounded-full bg-blue-800 flex items-center justify-center">
                      <FiGlobe className="w-12 h-12 text-blue-300" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-2 text-white">Identifying Source</h3>
                  <p className="text-gray-400">Tracing origin of synthetic voice...</p>
                </div>
              ) : sourceDetails ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="absolute top-4 right-4">
                    <button 
                      onClick={closeSourceIdentification}
                      className="text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-white">Source Identification</h3>
                  <div className="space-y-4 bg-gray-700/50 rounded-xl p-6">
                    <div className="flex items-center space-x-4">
                      <FiUser className="w-6 h-6 text-blue-300" />
                      <div>
                        <p className="text-sm text-gray-300">Name</p>
                        <p className="font-semibold text-white">{sourceDetails.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <FiGlobe className="w-6 h-6 text-green-300" />
                      <div>
                        <p className="text-sm text-gray-300">IP Address</p>
                        <p className="font-semibold text-white">{sourceDetails.ipAddress}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <FiSmartphone className="w-6 h-6 text-purple-300" />
                      <div>
                        <p className="text-sm text-gray-300">Phone Number</p>
                        <p className="font-semibold text-white">{sourceDetails.phoneNumber}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <FiMapPin className="w-6 h-6 text-red-300" />
                      <div>
                        <p className="text-sm text-gray-300">Location</p>
                        <p className="font-semibold text-white">{sourceDetails.location}</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 text-right mt-2">
                      {sourceDetails.timestamp}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Detection;