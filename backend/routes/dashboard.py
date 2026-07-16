from flask import Blueprint, jsonify, request

dashboard = Blueprint("dashboard", __name__)

live_data = {
    "active_workers": 0,
    "active_permits": 8,
    "active_alerts": 0,
    "overall_risk": "SAFE",
    "risk_score": 0
}

@dashboard.route("/risk", methods=["GET"])
def get_risk():
    return jsonify(live_data)

@dashboard.route("/update-risk", methods=["POST"])
def update_risk():
    global live_data

    data = request.get_json()

    live_data["active_workers"] = data.get("active_workers", 0)
    live_data["active_permits"] = data.get("active_permits", 8)
    live_data["active_alerts"] = data.get("active_alerts", 0)
    live_data["overall_risk"] = data.get("overall_risk", "SAFE")
    live_data["risk_score"] = data.get("risk_score", 0)

    return jsonify({
        "message": "Dashboard Updated Successfully"
    })