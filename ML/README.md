# Machine Learning Models

This folder contains all machine learning models, training scripts, and utilities for deepfake audio detection.

## Structure

### 📂 New/
Current and production-ready ML implementations:
- **QR_generator.py** - QR code generation for verification
- **watermarking.py** - Audio watermarking implementation
- **extract_features.py** - Audio feature extraction utilities
- **models/** - Trained ML models (Random Forest, XGBoost, Neural Networks)
- **deepfake_audio_data.csv** - Dataset for training
- **QR_images/** - Generated QR codes for audio verification

### 📂 old/
Previous iterations and experimental code:
- **generated/** - Data generation scripts
- **models/** - Legacy model implementations
- **taitil/** - Various detection approaches and experiments

## Key Components

### Feature Extraction
Extracts 150+ vocal characteristics including:
- Spectral features (MFCCs, spectral centroid, bandwidth)
- Temporal features (zero-crossing rate, tempo)
- Harmonic features (pitch, harmonicity)
- Statistical features (mean, variance, skewness)

### Models
- **Random Forest** - Ensemble learning for classification
- **XGBoost** - Gradient boosting for improved accuracy
- **Neural Networks** - Deep learning models for complex patterns
- **SVM** - Support Vector Machine for binary classification

### Detection Pipeline
1. Audio preprocessing and normalization
2. Feature extraction from audio samples
3. Model inference and confidence scoring
4. Result generation and verification

## Usage

### Training a Model
```python
python ML/New/extract_features.py
# Train model with extracted features
```

### Running Detection
```python
from ML.New import extract_features
# Extract features and run prediction
```

## Accuracy
Current models achieve **98.7% accuracy** in detecting deepfake audio across various synthesis methods.

## Dependencies
- librosa - Audio processing
- numpy, pandas - Data manipulation
- scikit-learn - ML algorithms
- tensorflow/pytorch - Deep learning
- opencv-python - QR code generation
