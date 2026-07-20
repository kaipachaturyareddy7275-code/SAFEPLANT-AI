from flask import Blueprint, jsonify
import json
import os

analytics = Blueprint("analytics", __name__)

LOG_FILE = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "logs",
    "incidents.json"
)


@analytics.route("/analytics", methods=["GET"])
def get_analytics():

    try:
        with open(LOG_FILE, "r") as file:
            incidents = json.load(file)
    except:
        incidents = []

    # Count alert levels
    high = 0
    medium = 0
    low = 0

    risk_history = []
    worker_history = []

    # Process latest 10 incidents
    for incident in incidents[:10]:

        risk = incident.get("risk", 0)
        status = incident.get("status", "LOW")

        risk_history.append(risk)

        # Simulated worker history (replace with real data later)
        worker_history.append(max(1, risk // 20))

        if status == "HIGH":
            high += 1

        elif status == "MEDIUM":
            medium += 1

        else:
            low += 1

    # Ensure charts always have values
    if len(risk_history) == 0:
        risk_history = [0]

    if len(worker_history) == 0:
        worker_history = [0]

    return jsonify({
        "risk": risk_history[::-1],
        "workers": worker_history[::-1],
        "alerts": {
            "HIGH": high,
            "MEDIUM": medium,
            "LOW": low
        }
    })