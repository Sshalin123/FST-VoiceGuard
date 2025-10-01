# 🎙️ VoiceGuard Pro - AI-Powered Deepfake Detection Platform

![VoiceGuard Pro](https://img.shields.io/badge/VoiceGuard-Pro-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.8+-yellow?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)

**VoiceGuard Pro** is an advanced deepfake detection platform built by students at **DJ Sanghvi College of Engineering**. This project leverages cutting-edge machine learning and AI technologies to detect synthetic audio with **98.7% accuracy**.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [Team](#-team)
- [Demo](#-demo)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- 🎯 **98.7% Accuracy** - State-of-the-art ML models for deepfake detection
- ⚡ **Real-time Analysis** - Instant detection with neural networks
- 🔐 **Blockchain Verification** - Immutable verification records
- 📊 **Detailed Analytics** - Comprehensive reports and insights
- 🎨 **Beautiful UI** - Modern glassmorphism design with smooth animations
- 📱 **Responsive** - Works seamlessly on all devices
- 🔒 **Enterprise Security** - Military-grade encryption
- 🌐 **Multi-format Support** - WAV, MP3, AAC, FLAC

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI Framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Router DOM** - Routing
- **Chart.js** - Data visualization

### Backend
- **Python 3.8+** - Core language
- **Flask/FastAPI** - API framework
- **TensorFlow/PyTorch** - ML models
- **NumPy/Pandas** - Data processing
- **Librosa** - Audio processing

### Database & Storage
- **MongoDB** - Database
- **GridFS** - File storage

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download here](https://python.org/)
- **npm** or **yarn** - Package manager
- **Git** - Version control

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Sshalin123/FST-VoiceGuard.git
cd FST-VoiceGuard
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

Or create a virtual environment (recommended):

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## 🏃 Running the Application

### Frontend (Development Mode)

```bash
npm run dev
```

The frontend will start at `http://localhost:5173`

### Backend Server

```bash
cd backend
python app.py
```

The backend API will start at `http://localhost:5000`

### Production Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
FST-VoiceGuard/
├── src/                      # Frontend source code
│   ├── components/          # React components
│   ├── pages/              # Page components
│   ├── styles/             # CSS and styling
│   ├── contexts/           # React contexts
│   ├── services/           # API services
│   └── App.tsx             # Main app component
├── backend/                 # Backend source code
│   ├── app.py              # Flask/FastAPI app
│   ├── models/             # ML models
│   ├── routes/             # API routes
│   └── utils/              # Utility functions
├── ML/                      # Machine Learning code
│   ├── New/                # Latest ML implementations
│   └── old/                # Previous versions
├── public/                  # Public assets
├── package.json            # Frontend dependencies
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
└── README.md               # This file
```

## 👥 Team

**VoiceGuard Pro** is a student-led innovation by Computer Engineering students at DJ Sanghvi College of Engineering:

- **Shalin** - ML Engineer (AI/ML, MLOps, Deep Learning)
- **Taitil** - Lead MLE (Web Development, UI/UX)
- **Vyom** - QUANT Developer (Finance, Quantitative Analysis)
- **Zafir** - Backend Developer (System Architecture, APIs)
- **Shubham** - ML Engineer (AI/ML, Deep Learning)

## 🎬 Demo

Watch our demo video: [VoiceGuard Demo](https://youtu.be/UOoiyXeduo4)

## 📸 Screenshots

### Home Page
![Home Page](docs/screenshots/home.png)

### Detection Interface
![Detection](docs/screenshots/detection.png)

### Results Dashboard
![Dashboard](docs/screenshots/dashboard.png)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Backend
MONGODB_URI=your_mongodb_uri
SECRET_KEY=your_secret_key
PORT=5000

# Frontend
VITE_API_URL=http://localhost:5000/api
```

## 📝 API Documentation

### Endpoints

#### POST `/api/detect`
Upload audio file for deepfake detection

**Request:**
```json
{
  "audio": "base64_encoded_audio"
}
```

**Response:**
```json
{
  "result": "authentic|deepfake",
  "confidence": 98.7,
  "analysis": {...}
}
```

## 🧪 Testing

```bash
# Run frontend tests
npm test

# Run backend tests
cd backend
pytest
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- DJ Sanghvi College of Engineering
- All our professors and mentors
- Open source community

## 📞 Contact

**Email:** sigaiontop@gmail.com  
**Phone:** 6969696969  
**Address:** SVKM state of the art college of engineering

---

<div align="center">
  Made with ❤️ by the Neural Ninjas Team at DJ Sanghvi
</div>
