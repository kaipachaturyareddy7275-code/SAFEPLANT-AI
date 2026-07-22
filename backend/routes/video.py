from flask import Blueprint, Response
import cv2
import backend.ai.camera_stream as stream

video = Blueprint("video", __name__)

def generate():

    print("Video stream started")

    while True:

        with stream.frame_lock:

            if stream.output_frame is None:
                print("No frame available")
                continue

            frame = stream.output_frame.copy()

        print(frame.shape)

        success, buffer = cv2.imencode(".jpg", frame)

        if not success:
            print("Encoding failed")
            continue

        frame_bytes = buffer.tobytes()

        yield (
            b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' +
            frame_bytes +
            b'\r\n'
        )


@video.route("/video_feed")
def video_feed():
    return Response(
        generate(),
        mimetype="multipart/x-mixed-replace; boundary=frame"
    )