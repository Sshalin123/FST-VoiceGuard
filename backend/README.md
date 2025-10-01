# Backend API

This folder contains the backend server implementation for VoiceGuard Pro, handling API requests, audio processing, and ML model integration.

## Structure

```
backend/
├── app.py              # Flask/FastAPI main application
├── server.js           # Node.js server (alternative)
└── routes/
    ├── audioRoutes.js  # Audio upload and processing endpoints
    └── authRoutes.js   # Authentication endpoints
```

## Technologies

- **Python Flask/FastAPI** - Main API framework
- **Node.js/Express** - Alternative server implementation
- **MongoDB** - Database for storing analysis results
- **GridFS** - File storage for audio files

## API Endpoints

### Audio Detection
```
POST /api/detect
Content-Type: multipart/form-data

Upload audio file and receive deepfake detection results
```

**Response:**
```json
{
  "result": "authentic" | "deepfake",
  "confidence": 98.7,
  "analysis": {
    "features": [...],
    "timestamp": "2024-10-02T03:00:00Z",
    "verification_id": "unique_hash"
  }
}
```

### Authentication
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

### User Data
```
GET  /api/user/history
GET  /api/user/stats
POST /api/user/feedback
```

## Setup

### Install Dependencies

**Python:**
```bash
cd backend
pip install -r ../requirements.txt
```

**Node.js:**
```bash
cd backend
npm install
```

### Environment Variables

Create a `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
PORT=5000
ML_MODEL_PATH=../ML/New/models/
```

### Run the Server

**Python:**
```bash
python app.py
```

**Node.js:**
```bash
node server.js
```

Server will start at `http://localhost:5000`

## Features

- Audio file upload and validation
- ML model inference integration
- Real-time processing with WebSockets
- User authentication and authorization
- Analysis history and statistics
- Blockchain verification (planned)
- Rate limiting and security measures

## Integration

The backend integrates with:
- Frontend React application
- ML models in `/ML/New/`
- MongoDB database
- External APIs (blockchain, notifications)
