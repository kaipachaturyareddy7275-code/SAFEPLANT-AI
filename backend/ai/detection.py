import cv2
import requests
from ultralytics import YOLO

from backend.ai.risk_engine import calculate_risk
from backend.ai.alerts import create_alert
from backend.ai.incident_logger import log_incident
from backend.ai.ppe_detector import detect_ppe
from backend.ai.alert_manager import add_alert
from backend.ai.zone_detector import check_zone

import backend.ai.camera_stream as stream

from backend.config.safety_zones import ZONES
from backend.routes.notifications import add_notification


# -----------------------------
# Load YOLO Model
# -----------------------------
model = YOLO("yolov8n.pt")


def start_detection():

    # Open Webcam
    camera = cv2.VideoCapture(0)

    camera.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
    camera.set(cv2.CAP_PROP_BUFFERSIZE, 1)

    if not camera.isOpened():
        print("❌ Unable to open Webcam")
        return

    print("✅ AI Detection Started")

    while True:

        success, frame = camera.read()

        if not success:
            continue

        # Mirror camera
        frame = cv2.flip(frame, 1)

        # Run YOLO
        results = model(frame)

        annotated = results[0].plot()
        
        annotated = annotated.copy()

        persons = 0
        helmets = 0
        person_boxes = []

        # -----------------------------
        # Count Objects
        # -----------------------------
        for box in results[0].boxes:

            cls = int(box.cls[0])
            label = model.names[cls]

            if label == "person":

                persons += 1

                x1, y1, x2, y2 = map(int, box.xyxy[0])

                person_boxes.append((x1, y1, x2, y2))

            # Placeholder for Helmet Detection
            elif label == "sports ball":

                helmets += 1

        # PPE Detection
        ppe = detect_ppe(persons, helmets)

        # Risk Calculation
        risk_data = calculate_risk(persons, helmets)

        # Zone Detection
        violations = check_zone(person_boxes)
        
                # ---------------------------------
        # Display Information on Frame
        # ---------------------------------

        cv2.putText(
            annotated,
            f"Workers : {persons}",
            (20, 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (0, 255, 0),
            2
        )

        cv2.putText(
            annotated,
            f"PPE : {ppe['status']}",
            (20, 75),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (255, 255, 0),
            2
        )

        cv2.putText(
            annotated,
            f"Risk : {risk_data['status']} ({risk_data['risk']}%)",
            (20, 110),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            (0, 0, 255),
            2
        )

        # ---------------------------------
        # Draw Safety Zones
        # ---------------------------------

        for zone in ZONES:

            cv2.rectangle(
                annotated,
                (zone["x1"], zone["y1"]),
                (zone["x2"], zone["y2"]),
                (0, 0, 255),
                2
            )

            cv2.putText(
                annotated,
                zone["name"],
                (zone["x1"], zone["y1"] - 8),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.6,
                (0, 0, 255),
                2
            )

        # ---------------------------------
        # Zone Violation Warning
        # ---------------------------------

        if violations:

            cv2.putText(
                annotated,
                "ZONE VIOLATION!",
                (20, 150),
                cv2.FONT_HERSHEY_SIMPLEX,
                1,
                (0, 0, 255),
                3
            )

        # ---------------------------------
        # IMPORTANT
        # Update Frame for Flask Streaming
        # ---------------------------------

        with stream.frame_lock:
            stream.output_frame = annotated.copy()

        # ---------------------------------
        # Update Dashboard
        # ---------------------------------

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

        except requests.exceptions.RequestException:
            pass
        
                # ---------------------------------
        # Generate Alerts
        # ---------------------------------

        if risk_data["risk"] >= 70:

            add_alert(
                "HIGH",
                "Worker without proper PPE detected"
            )

            create_alert(
                risk_data["status"],
                risk_data["risk"]
            )

            log_incident(
                "Detection",
                risk_data["risk"],
                risk_data["status"]
            )

            add_notification(
                "HIGH",
                "Worker without proper PPE detected"
            )

        elif risk_data["risk"] >= 40:

            add_alert(
                "MEDIUM",
                "Potential Safety Risk"
            )

            add_notification(
                "MEDIUM",
                "Potential Safety Risk"
            )

        else:

            add_alert(
                "LOW",
                "Plant Operating Normally"
            )

        # ---------------------------------
        # Zone Alerts
        # ---------------------------------

        if violations:

            add_alert(
                "HIGH",
                "Worker entered Restricted Area"
            )

            create_alert(
                "HIGH",
                90
            )

            log_incident(
                "Safety Zone",
                90,
                "HIGH"
            )

            add_notification(
                "HIGH",
                "Worker entered Restricted Area"
            )

        # ---------------------------------
        # Show Local Window
        # ---------------------------------

        cv2.imshow("SafePlant AI", annotated)

        print(
            f"Workers: {persons} | "
            f"Helmets: {helmets} | "
            f"Risk: {risk_data['risk']} | "
            f"PPE: {ppe['status']}"
        )

        # Exit on ESC
        key = cv2.waitKey(1) & 0xFF

        if key == 27:
            break

    # ---------------------------------
    # Cleanup
    # ---------------------------------

    camera.release()

    cv2.destroyAllWindows()