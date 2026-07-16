import cv2
import requests
from ultralytics import YOLO

from backend.ai.risk_engine import calculate_risk
from backend.ai.alerts import create_alert
from backend.ai.incident_logger import log_incident
import backend.ai.camera_stream as stream

model = YOLO("yolov8n.pt")


def start_detection():

    camera = cv2.VideoCapture(0)

    if not camera.isOpened():
        print("Unable to open webcam")
        return

    print("AI Detection Started")

    while True:

        success, frame = camera.read()

        if not success:
            continue

        results = model(frame)

        annotated = results[0].plot()

        persons = 0
        helmets = 0

        for box in results[0].boxes:

            cls = int(box.cls[0])
            label = model.names[cls]

            if label == "person":
                persons += 1

            if label == "sports ball":
                helmets += 1

        risk_data = calculate_risk(persons, helmets)

        stream.output_frame = annotated.copy()

        payload = {
            "active_workers": persons,
            "active_permits": 8,
            "active_alerts": 1 if risk_data["risk"] >= 50 else 0,
            "overall_risk": risk_data["status"],
            "risk_score": risk_data["risk"]
        }

        try:
            requests.post(
                "http://127.0.0.1:5000/update-risk",
                json=payload,
                timeout=0.5
            )
        except:
            pass

        if risk_data["risk"] >= 50:
            create_alert(
                risk_data["status"],
                risk_data["risk"]
            )

            log_incident(
                "Detection",
                risk_data["risk"],
                risk_data["status"]
            )