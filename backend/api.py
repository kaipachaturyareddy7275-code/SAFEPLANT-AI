from flask import Flask,jsonify

app=Flask(__name__)

@app.route("/risk")

def risk():

    return jsonify({

        "risk":85,

        "status":"HIGH"

    })

app.run()