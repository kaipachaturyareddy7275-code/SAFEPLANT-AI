import cv2
import requests
from ultralytics import YOLO

from backend.ai.risk_engine import calculate_risk
from backend.ai.alerts import create_alert
from backend.ai.incident_logger import log_incident
from backend.ai.ppe_detector import detect_ppe
from backend.ai.alert_manager import add_alert
import backend.ai.camera_stream as stream
from backend.ai.zone_detector import check_zone
from backend.config.safety_zones import ZONES

# Load YOLO model
model = YOLO("yolov8n.pt")


def start_detection():

    camera = cv2.VideoCapture(0)

    if not camera.isOpened():
        print("❌ Unable to open webcam")
        return

    print("✅ AI Detection Started")

    while True:

        success, frame = camera.read()

        if not success:
            continue

        # Run YOLO detection
        results = model(frame)

        # Draw detections
        annotated = results[0].plot()

        persons = 0
        helmets = 0
        person_boxes = []

        # Count detected objects
        for box in results[0].boxes:

            cls = int(box.cls[0])
            label = model.names[cls]

            if label == "person":

                persons += 1

                x1, y1, x2, y2 = map(int, box.xyxy[0])

                person_boxes.append((x1, y1, x2, y2))

            # Placeholder until PPE model is added
            elif label == "sports ball":
                helmets += 1

        # PPE Detection
        ppe = detect_ppe(persons, helmets)

        # Calculate Risk
        risk_data = calculate_risk(persons, helmets)
        
        # Check Safety Zones
        violations = check_zone(person_boxes)

        # Display Risk
        cv2.putText(
            annotated,
            f"Risk: {risk_data['status']}",
            (20, 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 0, 255),
            2
        )

        # Display PPE Status
        cv2.putText(
            annotated,
            f"PPE: {ppe['status']}",
            (20, 80),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (0, 255, 255),
            2
        )

        # Display Worker Count
        cv2.putText(
            annotated,
            f"Workers: {persons}",
            (20, 120),
            cv2.FONT_HERSHEY_SIMPLEX,
            1,
            (255, 255, 0),
            2
        )
        
        # Draw Safety Zones
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
                (zone["x1"], zone["y1"] - 10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.7,
                (0, 0, 255),
                2
            )

        # Show Zone Violation
        if violations:

            cv2.putText(
                annotated,
                "ZONE VIOLATION",
                (20, 160),
                cv2.FONT_HERSHEY_SIMPLEX,
                1,
                (0, 0, 255),
                3
            )

        # Update Live Camera Stream
        stream.output_frame = annotated.copy()

        # Update Dashboard
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

        # Generate Alerts
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

        elif risk_data["risk"] >= 40:

            add_alert(
                "MEDIUM",
                "Potential safety risk detected"
            )
            
        else:

            add_alert(
            "LOW",
            "Plant operating normally"
            )
            
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

        # Show Local Window
        cv2.imshow("SafePlant AI", annotated)

        print(
            f"Workers: {persons} | "
            f"Helmets: {helmets} | "
            f"Risk: {risk_data['risk']} | "
            f"PPE: {ppe['status']}"
        )

        # Press ESC to Exit
        if cv2.waitKey(1) & 0xFF == 27:
            break

    camera.release()
    cv2.destroyAllWindows()