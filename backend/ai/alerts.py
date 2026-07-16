from datetime import datetime

def create_alert(status, risk):

    if risk >= 80:
        print(f"[{datetime.now()}] 🚨 CRITICAL ALERT")

    elif risk >= 50:
        print(f"[{datetime.now()}] ⚠ HIGH RISK")

    elif risk >= 20:
        print(f"[{datetime.now()}] ⚠ MEDIUM RISK")

    else:
        print(f"[{datetime.now()}] ✅ SAFE")
    