# 🛡️ chatbot-infosec

This is a simple conversational chatbot designed to answer common questions about **cybersecurity**. It provides helpful information to users who want to better understand digital threats and learn how to stay safe online.

## 💡 Features

The chatbot can respond to various cybersecurity-related questions, such as:

- What is phishing?
- How do I create a secure password?
- Do I need antivirus software?
- How can I protect my personal data online?

It also supports small talk like greetings, affirmations, and expressions of thanks.

## 🚀 Getting Started

### 1. Install Rasa

Make sure you have Python installed (preferably Python 3.8+), then install Rasa:

```bash
pip install rasa
```

### 2. Run the Rasa server

To start the Rasa server with API support, run:

```bash
rasa run --enable-api
```

### 3. Run your custom application

Run the web application:

```bash
python app.py
```

Open the web application (default: `http://localhost:5000`).

## 📁 Project Structure

- `nlu.yml`: Contains user message examples and intents (e.g., `greet`, `phishing`, `thank you`)
- `rules.yml`: Defines how the bot should respond to specific intents
- `stories.yml`: Example conversation paths for training
- `domain.yml`: Defines the intents, responses, and actions used by the assistant

## 🧠 Future Improvements

- Add more security topics (e.g., password managers, public Wi-Fi safety)
- Build a web interface for interaction
- Integrate with messaging platforms (Telegram, WhatsApp, etc.)

## 📋 License

This project is open-source and free to use for educational purposes.

---

Stay safe online! 🔐
