from flask import Blueprint, jsonify
import json
import os
import csv
from flask import send_file

reports = Blueprint("reports", __name__)

LOG_FILE = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "logs",
    "incidents.json"
)


@reports.route("/reports")
def get_reports():

    try:
        with open(LOG_FILE, "r") as file:
            data = json.load(file)
    except:
        data = []

    return jsonify(data)

@reports.route("/export-csv")
def export_csv():

    csv_file = os.path.join(
        os.path.dirname(LOG_FILE),
        "incidents.csv"
    )

    try:
        with open(LOG_FILE, "r") as file:
            data = json.load(file)
    except:
        data = []

    with open(csv_file, "w", newline="") as file:

        writer = csv.writer(file)

        writer.writerow([
            "Time",
            "Source",
            "Risk",
            "Status"
        ])

        for item in data:

            writer.writerow([
                item["time"],
                item["source"],
                item["risk"],
                item["status"]
            ])

    return send_file(
        csv_file,
        as_attachment=True
    )