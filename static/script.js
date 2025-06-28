const chatbox = document.getElementById("chatbox");
const inputField = document.getElementById("userInput");
const scrollBtn = document.getElementById("scrollBtn");

window.addEventListener("load", () => {
  appendMessage("bot", "Hello! My name is Stefan and I am here to help you with my information security knowledge! Below are some popular topics!");
  inputField.focus();
  loadTopics(); // ← Încarcă topicurile la pornire
});

inputField.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

chatbox.addEventListener("scroll", () => {
  scrollBtn.style.display = chatbox.scrollTop < chatbox.scrollHeight - chatbox.clientHeight - 150 ? "block" : "none";
});

document.getElementById("topicDropdown").addEventListener("change", function () {
  const selected = this.value;
  if (selected) {
    inputField.value = selected.replace(/_/g, ' ');
    sendMessage();
  }
});

function scrollToBottom() {
  chatbox.scrollTo({ top: chatbox.scrollHeight, behavior: 'smooth' });
}

function toggleTheme() {
  document.body.classList.toggle("dark");

  const themeButton = document.getElementById("themeToggle");
  const isDark = document.body.classList.contains("dark");

  themeButton.textContent = isDark ? "🌕" : "🌑";
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function quickSend(text) {
  inputField.value = text;
  sendMessage();
}

async function sendMessage() {
  const message = inputField.value.trim();
  if (!message) return;
  appendMessage("user", message);
  inputField.value = "";

  const typingId = appendMessage("bot", "Typing...", true); // Typing effect

  const response = await fetch("/send_message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await response.json();

  removeTyping(typingId);
  appendMessage("bot", data.response);
}

function appendMessage(sender, text, isTyping = false) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerText = text;
  if (isTyping) msg.classList.add("typing");

  const wrapper = document.createElement("div");
  wrapper.appendChild(msg);

  const time = document.createElement("div");
  time.className = "timestamp";
  time.innerText = getCurrentTime();
  wrapper.appendChild(time);

  chatbox.appendChild(wrapper);
  scrollToBottom();

  return wrapper;
}

function removeTyping(wrapper) {
  if (wrapper && wrapper.parentNode === chatbox) {
    chatbox.removeChild(wrapper);
  }
}

async function loadTopics() {
  try {
    const response = await fetch("/topics");
    const data = await response.json();
    const dropdown = document.getElementById("topicDropdown");

    if (data.topics) {
      data.topics.forEach(topic => {
        const option = document.createElement("option");
        option.value = topic;
        option.textContent = topic.charAt(0).toUpperCase() + topic.slice(1).replace(/_/g, ' ');
        dropdown.appendChild(option);
      });
    }
  } catch (error) {
    console.error("Failed to load topics:", error);
  }
}
