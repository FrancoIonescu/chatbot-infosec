from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

RASA_URL = "http://localhost:5005/webhooks/rest/webhook"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/send_message", methods=["POST"])
def send_message():
    user_message = request.json.get("message")
    payload = {"sender": "user", "message": user_message}
    response = requests.post(RASA_URL, json=payload)

    bot_response = ""
    if response.ok:
        responses = response.json()
        if responses:
            bot_response = responses[0].get("text", "")
    return jsonify({"response": bot_response})

@app.route("/topics")
def get_topics():
    try:
        with open("topics.txt", encoding="utf-8") as f:
            topics = [line.strip() for line in f if line.strip()]
        return jsonify({"topics": topics})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
