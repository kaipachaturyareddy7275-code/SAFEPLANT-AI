import csv
import os
from datetime import datetime

FILE = "incidents.csv"

def log_incident(event, risk, status):

    exists = os.path.isfile(FILE)

    with open(FILE, "a", newline="") as file:

        writer = csv.writer(file)

        if not exists:
            writer.writerow([
                "Date",
                "Time",
                "Event",
                "Risk",
                "Status"
            ])

        now = datetime.now()

        writer.writerow([
            now.strftime("%d-%m-%Y"),
            now.strftime("%H:%M:%S"),
            event,
            risk,
            status
        ])