from flask import Blueprint, jsonify
import csv
import os

permits = Blueprint("permits", __name__)

DATA_FILE = os.path.join(
    os.path.dirname(__file__),
    "..",
    "..",
    "datasets",
    "permits.csv"
)


@permits.route("/permits")
def get_permits():

    permit_list = []

    if os.path.exists(DATA_FILE):

        with open(DATA_FILE, newline="", encoding="utf-8") as file:

            reader = csv.DictReader(file)

            for row in reader:
                permit_list.append(row)

    return jsonify(permit_list)