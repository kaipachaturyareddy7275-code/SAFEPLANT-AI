from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Home Route
@app.get("/")
def home():
    return {
        "message": "SafePlant AI Backend Running"
    }

# Sensors API
@app.get("/sensors")
def get_sensors():

    df = pd.read_csv("../datasets/sensors.csv")

    return df.to_dict(orient="records")


# Permits API
@app.get("/permits")
def get_permits():

    df = pd.read_csv("../datasets/permits.csv")

    return df.to_dict(orient="records")


# Workers API
@app.get("/workers")
def get_workers():

    df = pd.read_csv("../datasets/workers.csv")

    return df.to_dict(orient="records")


# Dashboard Summary
@app.get("/dashboard")
def dashboard():

    workers = pd.read_csv("../datasets/workers.csv")
    permits = pd.read_csv("../datasets/permits.csv")

    return {
        "active_workers": len(workers),
        "active_permits": len(permits),
        "active_alerts": 1,
        "overall_risk": "HIGH"
    }


# Risk Detection Engine
@app.get("/risk")
def detect_risk():

    sensors = pd.read_csv("../datasets/sensors.csv")
    permits = pd.read_csv("../datasets/permits.csv")

    risks = []

    for _, permit in permits.iterrows():

        zone = permit["zone"]

        sensor_data = sensors[sensors["zone"] == zone]

        if not sensor_data.empty:

            gas = int(sensor_data.iloc[0]["gas"])
            temp = int(sensor_data.iloc[0]["temp"])
            pressure = int(sensor_data.iloc[0]["pressure"])

            risk = "LOW"
            score = 20

            if gas > 70 and permit["type"] == "Hot Work":
                risk = "HIGH"
                score = 85

            if pressure > 90:
                risk = "CRITICAL"
                score = 95

            risks.append({
                "zone": str(zone),
                "permit": str(permit["type"]),
                "gas": gas,
                "temperature": temp,
                "pressure": pressure,
                "risk": risk,
                "score": score
            })

    return risks


# Incident Report Generator
@app.get("/report")
def generate_report():

    return {
        "incident_id": "INC001",
        "zone": "B",
        "permit": "Hot Work",
        "gas_level": 85,
        "temperature": 40,
        "pressure": 90,
        "risk": "HIGH",
        "reason": "Elevated gas level detected during active hot work operation.",
        "actions": [
            "Stop Hot Work",
            "Evacuate Workers",
            "Notify Safety Officer",
            "Inspect Gas Leakage"
        ],
        "status": "Open"
    }


# AI Safety Recommendation
@app.get("/recommendation")
def recommendation():

    return {
        "risk": "HIGH",
        "recommendations": [
            "Stop hot work immediately",
            "Evacuate workers from Zone B",
            "Inspect gas leakage source",
            "Notify safety officer",
            "Recheck sensor readings"
        ]
    }


@app.get("/alerts")
def get_alerts():

    return [
        {
            "id": 1,
            "zone": "B",
            "level": "HIGH",
            "message": "Gas level exceeded safe limit.",
            "time": "10:30 AM"
        },
        {
            "id": 2,
            "zone": "C",
            "level": "MEDIUM",
            "message": "Temperature approaching threshold.",
            "time": "10:35 AM"
        },
        {
            "id": 3,
            "zone": "A",
            "level": "LOW",
            "message": "Pressure normal.",
            "time": "10:40 AM"
        }
    ]

