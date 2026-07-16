from flask import Blueprint, Response
import cv2

import backend.ai.camera_stream as stream

video = Blueprint("video", __name__)


def generate():

    while True:

        if stream.output_frame is None:
            continue

        ret, buffer = cv2.imencode(".jpg", stream.output_frame)

        if not ret:
            continue

        frame = buffer.tobytes()

        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n"
            + frame +
            b"\r\n"
        )


@video.route("/video_feed")
def video_feed():

    return Response(
        generate(),
        mimetype="multipart/x-mixed-replace; boundary=frame"
    )