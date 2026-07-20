from datetime import datetime

alerts = []


def add_alert(level, message):

    alerts.insert(0, {
        "time": datetime.now().strftime("%H:%M:%S"),
        "level": level,
        "message": message
    })

    # Keep only the latest 20 alerts
    if len(alerts) > 20:
        alerts.pop()


def get_alerts():
    return alerts


def clear_alerts():
    alerts.clear()