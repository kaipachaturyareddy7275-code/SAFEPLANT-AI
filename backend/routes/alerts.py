from flask import Blueprint, jsonify

from backend.ai.alert_manager import (
    get_alerts,
    clear_alerts
)

alerts = Blueprint("alerts", __name__)


@alerts.route("/alerts")
def fetch_alerts():

    return jsonify(get_alerts())


@alerts.route("/clear-alerts", methods=["POST"])
def clear():

    clear_alerts()

    return jsonify({
        "message": "Alerts Cleared"
    })