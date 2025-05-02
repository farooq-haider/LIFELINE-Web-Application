function injectChatbotHTML(path, callback) {
  fetch(path)
    .then((res) => res.text())
    .then((html) => {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = html;
      document.body.appendChild(wrapper);
      if (callback) callback();
    })
    .catch((err) => console.error("Failed to load chatbot HTML:", err));
}
function initializeChatbot() {
  const toggleBtn = document.getElementById("chatbot-toggle");
  const chatbotWindow = document.querySelector(".chatbot-window");
  const inputField = document.getElementById("chatbot-input");
  const sendBtn = document.getElementById("chatbot-send");
  const chatbotBody = document.querySelector(".chatbot-body");

  toggleBtn.addEventListener("click", () => {
    chatbotWindow.classList.toggle("hidden");
  });

  sendBtn.addEventListener("click", sendMessage);

  inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendBtn.click();
    }
  });

  async function sendMessage() {
    const msg = inputField.value.trim();
    if (msg !== "") {
      appendMessage("user", msg);
      inputField.value = "";

      const response = await fetch(`http://127.0.0.1:3000/api/chatbot/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ prompt: msg }),
      });

      if (!response.ok) {
        alert("Error while sending message. Please try again.");
        return;
      }

      const data = await response.json();

      setTimeout(() => {
        appendMessage(
          "bot",
          data.response || "Sorry, I didn't understand that."
        );
      }, 600);
    }
  }

  function appendMessage(sender, text) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("chatbot-message", sender);
    msgDiv.textContent = text;
    chatbotBody.appendChild(msgDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }

  document.addEventListener("click", function (event) {
    const chatbotContainer = document.querySelector(".chatbot-container");
    const chatbotWindow = document.querySelector(".chatbot-window");
    const toggleBtn = document.getElementById("chatbot-toggle");

    const clickedInside = chatbotContainer.contains(event.target);

    if (!clickedInside && !chatbotWindow.classList.contains("hidden")) {
      chatbotWindow.classList.add("hidden");
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  injectChatbotHTML("../chatbot/chatbot.html", initializeChatbot);
});
