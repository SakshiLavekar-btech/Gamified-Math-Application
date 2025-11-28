const chat = document.getElementById("chat");
const form = document.getElementById("inputForm");
const input = document.getElementById("messageInput");

function addMessage(text, who = "bot") {
  const bubble = document.createElement("div");
  bubble.className = "msg " + (who === "user" ? "user-bubble" : "bot-bubble");
  bubble.textContent = text;
  chat.appendChild(bubble);
  chat.scrollTop = chat.scrollHeight;
}

function calculate(expr) {
  if (!/^[0-9+\-*/(). %]+$/.test(expr)) {
    return "⚠️ Only numbers and + - * / % ( ) allowed.";
  }
  try {
    const result = Function(`"use strict"; return (${expr})`)();
    if (Number.isFinite(result)) {
      return `✅ Answer: ${result}`;
    } else {
      return "⚠️ Invalid math expression.";
    }
  } catch {
    return "⚠️ Could not solve that.";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const expr = input.value.trim();
  if (!expr) return;
  addMessage(expr, "user");
  const ans = calculate(expr);
  addMessage(ans, "bot");
  input.value = "";
});
