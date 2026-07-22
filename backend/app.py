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

from backend.routes.notifications import notifications
from backend.routes.export_report import export

from backend.routes.permits import permits


app = Flask(__name__)

CORS(app)

app.register_blueprint(dashboard)
app.register_blueprint(video)
app.register_blueprint(sensors)
app.register_blueprint(alerts)
app.register_blueprint(reports)
app.register_blueprint(analytics)
app.register_blueprint(notifications)
app.register_blueprint(export)
app.register_blueprint(permits)


@app.route("/")
def home():
    return {
        "message": "SafePlant AI Backend Running"
    }

if __name__ == "__main__":

    # Start AI Detection Thread
    Thread(
        target=start_detection,
        daemon=True
    ).start()

    print("✅ AI Detection Started")

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True,
        threaded=True
    )