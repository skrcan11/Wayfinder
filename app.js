const chat = document.getElementById("chat");
const input = document.getElementById("input");

async function sendMessage() {
  const userMessage = input.value;
  if (!userMessage.trim()) return;

  appendMessage("You", userMessage);
  input.value = "";

  appendMessage("Assistant", "Thinking...", true);
  const response = await getAIResponse(userMessage);
  document.querySelector(".ai.typing").remove();
  appendMessage("Assistant", response);
}

function appendMessage(sender, text, typing = false) {
  const message = document.createElement("div");
  message.className = `message ${sender === "You" ? "user" : "ai"}${typing ? " typing" : ""}`;
  message.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
}

async function getAIResponse(message) {
  const apiKey = "YOUR_OPENAI_API_KEY_HERE";  // Replace with your actual API key

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      temperature: 0.5
    })
  });

  const data = await res.json();
  return data.choices[0].message.content;
}
