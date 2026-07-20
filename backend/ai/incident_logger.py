import json
import os
from datetime import datetime

LOG_FILE = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "logs",
    "incidents.json"
)


def log_incident(source, risk, status):

    incident = {
        "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "source": source,
        "risk": risk,
        "status": status
    }

    try:
        with open(LOG_FILE, "r") as file:
            data = json.load(file)
    except:
        data = []

    data.insert(0, incident)

    with open(LOG_FILE, "w") as file:
        json.dump(data, file, indent=4)