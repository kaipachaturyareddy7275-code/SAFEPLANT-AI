# 🏭 SafePlant AI
### AI-Powered Industrial Safety Monitoring & Risk Assessment Platform

> **SafePlant AI** is an intelligent industrial safety monitoring system developed to enhance workplace safety using Artificial Intelligence, Computer Vision, and Real-Time Analytics. The platform continuously monitors workers, detects PPE compliance, identifies safety zone violations, evaluates risk levels, and provides instant alerts through an interactive dashboard.

---

# 🚀 Problem Statement

Industrial workplaces are prone to accidents caused by:

- Missing Personal Protective Equipment (PPE)
- Unauthorized entry into hazardous zones
- Delayed risk identification
- Lack of real-time monitoring
- Manual safety inspections

SafePlant AI addresses these challenges through an AI-driven automated monitoring system that improves worker safety and operational efficiency.

---

# 💡 Solution Overview

SafePlant AI leverages **YOLOv8**, **OpenCV**, and **Flask APIs** to process live video streams and detect workplace safety violations in real time.

The system automatically:

- Detects workers
- Monitors PPE compliance
- Identifies restricted area violations
- Calculates dynamic risk scores
- Generates alerts and notifications
- Logs safety incidents
- Displays live analytics through an interactive React dashboard

---

# ✨ Key Features

## 🤖 AI & Computer Vision

- Real-Time Worker Detection
- PPE Monitoring
- Restricted Zone Detection
- AI Risk Assessment Engine
- Live Camera Streaming
- Incident Logging

---

## 📊 Dashboard

- Live Industrial Camera Feed
- Worker Count
- Active Alerts
- Risk Score
- Permit Monitoring
- Sensor Analytics
- Notification Center
- Reports Dashboard

---

## 🚨 Safety Monitoring

- Real-Time Alerts
- High / Medium / Low Risk Classification
- Restricted Area Monitoring
- Incident History
- Notification System

---

# 🏗 System Architecture

```
Industrial Camera
        │
        ▼
   OpenCV Video Capture
        │
        ▼
      YOLOv8 AI Model
        │
        ▼
 Worker Detection
        │
        ▼
 PPE Verification
        │
        ▼
 Zone Detection
        │
        ▼
 Risk Assessment Engine
        │
        ▼
 Flask REST APIs
        │
        ▼
 React Dashboard
```

---

# 🛠 Technology Stack

## Frontend

- React.js
- Vite
- JavaScript
- CSS3
- Recharts

---

## Backend

- Python
- Flask
- Flask-CORS

---

## Artificial Intelligence

- Ultralytics YOLOv8
- OpenCV
- NumPy

---

## Development Tools

- Visual Studio Code
- Git
- GitHub

---

# 📂 Project Structure

```
SafePlant-AI
│
├── backend
│   ├── ai
│   │   ├── detection.py
│   │   ├── risk_engine.py
│   │   ├── ppe_detector.py
│   │   ├── alerts.py
│   │   ├── incident_logger.py
│   │   ├── zone_detector.py
│   │   └── camera_stream.py
│   │
│   ├── routes
│   │   ├── dashboard.py
│   │   ├── analytics.py
│   │   ├── sensors.py
│   │   ├── permits.py
│   │   ├── alerts.py
│   │   ├── reports.py
│   │   ├── notifications.py
│   │   └── video.py
│   │
│   ├── config
│   ├── logs
│   └── app.py
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
└── README.md
```

---

# 📈 Workflow

```
Live Camera
      │
      ▼
AI Detection
      │
      ▼
Worker Detection
      │
      ▼
PPE Detection
      │
      ▼
Safety Zone Detection
      │
      ▼
Risk Calculation
      │
      ▼
Alert Generation
      │
      ▼
Dashboard Visualization
```

---

# 🔗 REST API Endpoints

| Endpoint | Purpose |
|-----------|---------|
| `/risk` | Dashboard Risk Data |
| `/update-risk` | Update Live Risk |
| `/video_feed` | Live Camera Stream |
| `/analytics` | Analytics Data |
| `/sensors` | Sensor Information |
| `/alerts` | Alert Records |
| `/notifications` | Notification Feed |
| `/reports` | Incident Reports |
| `/permits` | Permit Information |

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/kaipachaturyareddy7275-code/SAFEPLANT-AI
cd SafePlant-AI
```

---

## Backend

Create virtual environment

```bash
python -m venv .venv
```

Activate

Windows

```bash
.venv\Scripts\activate
```

Install packages

```bash
pip install -r requirements.txt
```

Run backend

```bash
python backend/app.py
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend

```
http://localhost:5173
```

Backend

```
http://127.0.0.1:5000
```

---

# 🎯 Innovation Highlights

- AI-powered industrial safety monitoring
- Real-time computer vision for workplace surveillance
- Automated PPE compliance detection
- Intelligent risk scoring engine
- Live dashboard with analytics
- Modular and scalable architecture
- RESTful API integration
- Designed for smart manufacturing environments

---

# 🌟 Future Scope

- Multi-camera support
- AI-based helmet and safety vest detection
- Face recognition for worker identification
- Predictive accident analytics
- Cloud deployment
- IoT sensor integration
- Email and SMS alerts
- Mobile application support

---

# 👨‍💻 Team

**Kaipa Chaturya Reddy**

---

# 🏆 Hackathon Submission

**Project Name:** SafePlant AI

**Category:** Artificial Intelligence • Computer Vision • Industrial Safety

**Objective:** Improve workplace safety through real-time AI-powered monitoring, automated risk assessment, and intelligent alert generation.

---

# 📄 License

This project was developed as part of a hackathon and academic learning initiative. It is intended for demonstration, research, and educational purposes.
