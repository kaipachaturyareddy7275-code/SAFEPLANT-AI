from flask import Blueprint, jsonify
import random

sensors = Blueprint("sensors", __name__)

@sensors.route("/sensors")
def get_sensor_data():

    return jsonify({

        "temperature": random.randint(28, 42),

        "humidity": random.randint(40, 80),

        "gas": random.randint(10, 60),

        "pressure": random.randint(980, 1020),

        "smoke": random.randint(0, 20)

    })