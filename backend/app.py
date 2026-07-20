from flask import Flask
from flask_cors import CORS

from backend.routes.dashboard import dashboard
from backend.routes.video import video

from threading import Thread
from backend.ai.detection import start_detection

from backend.routes.sensors import sensors
from backend.routes.alerts import alerts

from backend.routes.reports import reports
from backend.routes.analytics import analytics


app = Flask(__name__)

CORS(app)

app.register_blueprint(dashboard)
app.register_blueprint(video)
app.register_blueprint(sensors)
app.register_blueprint(alerts)
app.register_blueprint(reports)
app.register_blueprint(analytics)


@app.route("/")
def home():
    return {
        "message": "SafePlant AI Backend Running"
    }


if __name__ == "__main__":

    Thread(
        target=start_detection,
        daemon=True
    ).start()

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=False,
        threaded=True
    )