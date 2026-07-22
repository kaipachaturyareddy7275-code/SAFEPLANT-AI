from flask import Blueprint, jsonify

notifications = Blueprint("notifications", __name__)

notification_list = []


def add_notification(level, message):
    notification_list.insert(0, {
        "level": level,
        "message": message
    })

    if len(notification_list) > 30:
        notification_list.pop()


@notifications.route("/notifications")
def get_notifications():
    return jsonify(notification_list)