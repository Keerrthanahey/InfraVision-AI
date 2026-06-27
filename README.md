# InfraVision AI

Next-generation AI platform for **Infrared Image Enhancement & Colourisation** — built for the Bharathiya Antariksh Hackathon.

## Architecture

```
frontend/     Next.js 15 + TypeScript + Tailwind + Framer Motion
backend/      FastAPI + OpenCV + PyTorch + YOLO
```

## Quick Start

### 1. Frontend

```bash
cd frontend
cp .env.local.example .env.local
# Add Google OAuth credentials and NEXTAUTH_SECRET
npm install
npm run dev
```

Open [http://localhost:3000/login](http://localhost:3000/login) → Sign in with Google → Dashboard.

### 2. Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create OAuth 2.0 Client ID (Web application)
3. Add redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID & Secret to `.env.local`

## How It Works

See the explanation in the app README sections below.

## Project Structure

- `frontend/src/app/login` — Google OAuth login page
- `frontend/src/components/dashboard` — 4-panel IR processing UI
- `backend/services/` — CLAHE, colourisation, YOLO detection
