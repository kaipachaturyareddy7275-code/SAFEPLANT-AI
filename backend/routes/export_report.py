from flask import Blueprint, send_file
import csv
import os
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

export = Blueprint("export", __name__)


@export.route("/export/csv")
def export_csv():

    os.makedirs("backend/exports", exist_ok=True)

    filename = "backend/exports/incidents.csv"

    rows = [
        ["Time", "Source", "Risk", "Status"],
        ["10:15 AM", "Detection", "85", "HIGH"],
        ["10:20 AM", "Safety Zone", "90", "HIGH"],
        ["10:30 AM", "Detection", "40", "MEDIUM"]
    ]

    with open(filename, "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerows(rows)

    return send_file(filename, as_attachment=True)


@export.route("/export/pdf")
def export_pdf():

    os.makedirs("backend/exports", exist_ok=True)

    filename = "backend/exports/incidents.pdf"

    pdf = canvas.Canvas(filename, pagesize=letter)

    pdf.setFont("Helvetica-Bold", 18)
    pdf.drawString(180, 760, "SafePlant AI Incident Report")

    pdf.setFont("Helvetica", 12)

    y = 710

    data = [
        "10:15 AM | Detection | Risk:85 | HIGH",
        "10:20 AM | Safety Zone | Risk:90 | HIGH",
        "10:30 AM | Detection | Risk:40 | MEDIUM"
    ]

    for line in data:
        pdf.drawString(60, y, line)
        y -= 25

    pdf.save()

    return send_file(filename, as_attachment=True)