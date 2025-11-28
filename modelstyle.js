
document.addEventListener("mousemove", (e) => {
  const circle = document.getElementById("circle");
  circle.style.left = `${e.clientX}px`;
  circle.style.top = `${e.clientY}px`;
});

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}
document.addEventListener("mousemove", (e) => {
  const circle = document.getElementById("circle");
  circle.style.left = `${e.clientX}px`;
  circle.style.top = `${e.clientY}px`;

  const sparkle = document.createElement("span");
  sparkle.textContent = "✨";
  sparkle.style.position = "fixed";
  sparkle.style.left = e.clientX + "px";
  sparkle.style.top = e.clientY + "px";
  sparkle.style.fontSize = "14px";
  sparkle.style.opacity = "1";
  sparkle.style.transition = "all 0.8s ease-out";
  sparkle.style.zIndex = 9998;
  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, 0.1px)`;
    sparkle.style.opacity = "0";
  }, 10);

  setTimeout(() => sparkle.remove(), 800);
});


const buttos = document.querySelectorAll("#button button");
const pages = document.querySelectorAll("#main #page > div");

buttos.forEach((button, index) => {
    button.addEventListener("click", () => {
        buttos.forEach(btn => btn.style.backgroundColor = "");
        button.style.backgroundColor = "pink";
        pages[index].scrollIntoView({ behavior: "smooth" });
    });
});

buttos.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        btn.style.transform = "scale(1.1)";
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "scale(1)";
    });
});

gsap.from("#welcome", {
    x: "-100%",
    opacity: 0,
    duration: 2,
    ease: "power3.out"
});

gsap.from("#to", {
    x: "100%",
    opacity: 0,
    duration: 2,
    delay: 0.5,
    ease: "power3.out"
});
gsap.from("#dora", {
    x: -500, 
    opacity: 0,
    duration: 2,
    ease: "power3.out"
});

gsap.from("#nobita", {
    x: 500,
    opacity: 0,
    duration: 2,
    ease: "power3.out",
    delay: 0.5
});

const buttons = document.querySelectorAll(".button");
const display = document.getElementById("w");
// Voice synthesis
// function speak(text) {
//   const utterance = new SpeechSynthesisUtterance(text);
//   speechSynthesis.speak(utterance);
// }

// Mascot feedback
// function updateMascot(message) {
//   document.getElementById("mascot").textContent = message;
// }

// Voice input
// const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
// recognition.continuous = false;
// recognition.lang = 'en-US';

// function startVoiceInput() {
//   recognition.start();
//   speak("Listening...");
// }

// recognition.onresult = function(event) {
//   const spokenText = event.results[0][0].transcript;
//   display.value = spokenText;
//   try {
//     const result = eval(spokenText);
//     display.value = result;
//     speak("equal to " + result.toString());
//     updateMascot("🎉 Great job! You said: " + spokenText);
//   } catch {
//     display.value = "Error";
//     speak("Error");
//     updateMascot("Oops! Try again.");
//   }
// };

// // Math magic trick
// function showMagicTrick() {
//   const trick = "Pick a number. Multiply by 2. Add 8. Divide by 2. Subtract your original number. The answer is 4!";
//   display.value = trick;
//   speak(trick);
//   updateMascot("Magic! 🎩✨");
// }

// Real-life scenarios
// function loadScenario(type) {
//   let prompt = "";
//   if (type === "shopping") prompt = "You buy 3 candies at ₹5 each. How much?";
//   if (type === "cooking") prompt = "You need 2 eggs per cake. How many eggs for 4 cakes?";
//   display.value = prompt;
//   speak(prompt);
//   updateMascot("Let's solve a real-life problem!");
// }

// Step-by-step explanation (basic addition)

let currentInput = "";
const speakMap = {
  "+": "plus",
  "-": "minus",
  "*": "times",
  "/": "divided by",
  "=": "equals",
  "C": "clear"
};

buttons.forEach(button => {
  button.addEventListener("click", () => {
    let value = button.textContent;

    if (value === "C") {
      currentInput = "";
      display.value = "";
      speak("Clear");
    } else if (value === "=") {
      try {
        currentInput = eval(currentInput.replace("x", "*"));
        display.value = currentInput;
        speak("equal to"+currentInput.toString()); // Speak result
      } catch (e) {
        display.value = "Error";
        currentInput = "";
        speak("Error");
      }
    } else {
      currentInput += value;
      display.value = currentInput;
      speak(speakMap[value] || value);; // Speak digit or operator
    }
  });
});

gsap.from("#game", {
    x:0,
  color: "pink",
  duration:10,
  repeat: -1, 
});
gsap.from("#game", {
    x:100,
color: "red",
  duration:2,
  repeat: -1, 
});
// gsap.from("#quiz", {
//     opacity:1,
//     x:100,
// color: "white",
//   duration:2,
//   repeat: -1, 
// });
// gsap.from("#quiz", {
//     opacity:1,
//     x:100,
// color: "black",
//   duration:2,
//   repeat: -1, 
// });
function submitQuiz() {
  const answers = {
    q1: "8",
    q2: "6",
    q3: "30",
    q4: "5",
    q5: "5"
  };
  let score = 0;
  for (let q in answers) {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    if (selected && selected.value === answers[q]) {
      score++;
    }
  }
  document.getElementById("quiz-score").textContent = `✅ Your Score: ${score} / 5`;
}
function speak(text) {
  // Remove emojis using a regex that targets common emoji ranges
  const cleanedText = text.replace(/[\u{1F600}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}]/gu, '');
  const utterance = new SpeechSynthesisUtterance(cleanedText);
  speechSynthesis.speak(utterance);
}

function generateNote() {
  const topic = document.getElementById("topic-select").value;
  const output = document.getElementById("note-output");
  const exampleBtn = document.createElement("button");
  exampleBtn.textContent = "🎯 Show Example";
  exampleBtn.onclick = () => showExample(topic);

  const notes = {
    addition: `➕ ADDITION NOTES:
1️⃣ Putting things together: 2 + 3 = 5 eg 🍎🍎 + 🍎🍎🍎 = 🍎🍎🍎🍎🍎
2️⃣ Adding zero: 7 + 0 = 7 eg 🐶 + 0 = 🐶
3️⃣ Vertical addition: Stack and add column by column
4️⃣ Real-life: ₹10 + ₹5 = ₹15 
5️⃣ Add many numbers: 2 + 3 + 4 = 9 eg consider apples 🍎🍎🍎🍎🍎🍎🍎🍎🍎`,
    subtraction: `➖ SUBTRACTION NOTES:
1️⃣ Taking away: 5 - 2 = 3 🐶🐶🐶🐶🐶 - 🐶🐶 = 🐶🐶🐶
2️⃣ Subtracting zero: 8 - 0 = 8
3️⃣ Vertical subtraction: Stack and subtract
4️⃣ Real-life: ₹20 - ₹5 = ₹15
5️⃣ Subtract from zero: 0 - 3 = -3`,
    multiplication: `✖️ MULTIPLICATION NOTES:
1️⃣ Repeated addition: 3 × 2 = 6 ⭐⭐ ⭐⭐ ⭐⭐
2️⃣ Multiply by 0: 5 × 0 = 0
3️⃣ Vertical multiplication: Stack and multiply
4️⃣ Real-life: ₹5 per toy × 4 toys = ₹20
5️⃣ Multiply many: 2 × 3 × 4 = 24`,
    division: `➗ DIVISION NOTES:
1️⃣ Sharing equally: 6 ÷ 2 = 3 🍪🍪🍪🍪🍪🍪 → 3 each
2️⃣ Divide by 1: 9 ÷ 1 = 9
3️⃣ Long division steps
4️⃣ Real-life: ₹12 split among 3 friends = ₹4 each
5️⃣ Division with remainder: 7 ÷ 2 = 3 R1`,
    bodmas: `📐 BODMAS NOTES:
1️⃣ Brackets first: (2 + 3) × 4 = 20
2️⃣ Orders (powers): 2² = 4
3️⃣ Division before multiplication
4️⃣ Addition before subtraction
5️⃣ Real-life: Solve step-by-step like a puzzle!`,
    numberline: `📏 NUMBER LINE NOTES:
1️⃣ Start at 0 and hop forward for addition
2️⃣ Hop backward for subtraction
3️⃣ Negative numbers go left
4️⃣ Positive numbers go right
5️⃣ Use number line to visualize math`,
    realnumbers: `🔢 REAL & WHOLE NUMBERS:
1️⃣ Whole numbers: 0, 1, 2, 3...
2️⃣ Real numbers include fractions and decimals
3️⃣ Negative numbers are also real
4️⃣ Infinity is not a real number
5️⃣ Real numbers are everywhere in life!`,
    negativerules: `➖ NEGATIVE RULES:
1️⃣ Negative × Negative = Positive 😊
2️⃣ Negative × Positive = Negative 😠
3️⃣ Positive ÷ Negative = Negative
4️⃣ Negative ÷ Negative = Positive
5️⃣ Think of moods: bad × bad = good!`,
    differentiation: `📈 DIFFERENTIATION NOTES:
1️⃣ Finds rate of change
2️⃣ Slope of a curve
3️⃣ Speed = change in distance/time
4️⃣ Used in physics and graphs
5️⃣ Symbol: dy/dx`,
    integration: `📉 INTEGRATION NOTES:
1️⃣ Adds up small pieces
2️⃣ Area under a curve
3️⃣ Used in physics and economics
4️⃣ Symbol: ∫
5️⃣ Think of filling a pool drop by drop!`
  };

  output.innerHTML = `<pre>${notes[topic] || "📌 Select a topic to see the note."}</pre>`;
  speak(notes[topic] || "Please select a topic.");
  output.appendChild(exampleBtn);
}

function showExample(topic) {
  const output = document.getElementById("note-output");
  output.innerHTML += `<div id="example-box"></div>`;
  const box = document.getElementById("example-box");

  if (topic === "addition") {
    box.innerHTML = `
      <div id="vertical-addition">
        <div>23</div>
        <div>+45</div>
        <div>----</div>
        <div id="result">68</div>
      </div>`;
    gsap.from("#vertical-addition div", {
      y: -50,
      opacity: 0,
      stagger: 0.5,
      duration: 1,
      ease: "bounce"
    });
    speak("Twenty three plus forty five equals sixty eight");
  }

  if (topic === "subtraction") {
    box.innerHTML = `
      <div id="vertical-subtraction">
        <div>58</div>
        <div>-23</div>
        <div>----</div>
        <div id="result">35</div>
      </div>`;
    gsap.from("#vertical-subtraction div", {
      x: -50,
      opacity: 0,
      stagger: 0.5,
      duration: 1,
      ease: "power2.out"
    });
    speak("Fifty eight minus twenty three equals thirty five");
  }

  if (topic === "multiplication") {
    box.innerHTML = `
      <div id="vertical-multiplication">
        <div>12</div>
        <div>× 3</div>
        <div>----</div>
        <div id="result">36</div>
      </div>`;
    gsap.from("#vertical-multiplication div", {
      scale: 0,
      opacity: 0,
      stagger: 0.5,
      duration: 1,
      ease: "elastic"
    });
    speak("Twelve times three equals thirty six");
  }
}
let botActive = false;
let currentValue = 2;
let correctCount = 0;
let expectedAnswer = 5;

function speak(text) {
  const cleanedText = text.replace(/[\u{1F600}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}]/gu, '');
  const utterance = new SpeechSynthesisUtterance(cleanedText);
  speechSynthesis.speak(utterance);
}

function startBot() {
  botActive = true;
  correctCount = 0;
  mode = document.getElementById("bot-mode").value;
  currentValue = mode === "multiplication" ? 2 : 10;
  expectedAnswer = getExpectedAnswer();

  if (mode === "puzzle") {
    document.getElementById("bot-output").innerHTML = `🧩 What number is missing: 2, 4, 6, __, 10?`;
    speak("What number is missing: 2, 4, 6, blank, 10?");
    return;
  }

  document.getElementById("bot-output").innerHTML = `🤖 Let's play ${mode}! What is ${getQuestionText()}?`;
  document.getElementById("mascot-reaction").textContent = "🙂";
  speak(`Let's play ${mode}. What is ${getQuestionText()}?`);
}
function getExpectedAnswer() {
  if (mode === "addition") return currentValue + 3;
  if (mode === "subtraction") return currentValue - 2;
  if (mode === "multiplication") return currentValue * 2;
  if (mode === "division") return currentValue / 2;
  return null;
}

function getQuestionText() {
  if (mode === "addition") return `${currentValue} + 3`;
  if (mode === "subtraction") return `${currentValue} - 2`;
  if (mode === "multiplication") return `${currentValue} × 2`;
  if (mode === "division") return `${currentValue} ÷ 2`;
  return "";
}

function stopBot() {
  botActive = false;
  document.getElementById("bot-output").innerHTML = "🛑 Game stopped.";
  document.getElementById("mascot-reaction").textContent = "😴";
  speak("Game stopped.");
}

function praiseUser() {
  const praises = ["Bravo!", "Genius!", "Superb!", "You're amazing!", "Math Wizard!"];
  const message = praises[Math.floor(Math.random() * praises.length)];
  document.getElementById("bot-output").innerHTML = `🏆 ${message}`;
  document.getElementById("mascot-reaction").textContent = "🎉";
  speak(message);
  botActive = false;
}

function askNext() {
  if (correctCount >= 5) {
    praiseUser();
    return;
  }
  expectedAnswer = currentValue + 2;
  document.getElementById("bot-output").innerHTML = `🤖 What is ${currentValue} + 2?`;
  speak(`What is ${currentValue} plus 2?`);
  currentValue = expectedAnswer;
}

function handleWrongAnswer() {
  document.getElementById("bot-output").innerHTML = `
    ❌ Oops! That's not right.<br>
    <button onclick="retryBot()">🔁 Try Again</button>
    <button onclick="showAnswer()">👀 Show Answer</button>
  `;
  document.getElementById("mascot-reaction").textContent = "😟";
  speak("Oops! That's not right. Try again or see the answer.");
}

function retryBot() {
  currentValue -= 2;
  askNext();
}

function showAnswer() {
  document.getElementById("bot-output").innerHTML = `✅ The correct answer was ${expectedAnswer}. Let's try another!`;
  document.getElementById("mascot-reaction").textContent = "🤓";
  speak(`The correct answer was ${expectedAnswer}. Let's try another.`);
  askNext();
}

document.addEventListener("keydown", (e) => {
  if (!botActive || e.key !== "Enter") return;
  const answer = prompt("Your answer:");
  if (!answer || isNaN(answer)) return;

  const num = parseInt(answer);
  if (num === expectedAnswer) {
    correctCount++;
    document.getElementById("bot-output").innerHTML = `✅ Correct! Now ${currentValue} + 2?`;
    document.getElementById("mascot-reaction").textContent = "😄";
    speak(`Correct! Now what is ${currentValue} plus 2?`);
    currentValue += 2;
    expectedAnswer = currentValue;
  } else {
    handleWrongAnswer();
  }
});
function submitBotAnswer() {
  if (!botActive) return;
  const input = document.getElementById("bot-answer").value.trim();
  if (!input || isNaN(input)) {
    speak("Please enter a number.");
    return;
  }

  const num = parseInt(input);
  document.getElementById("bot-answer").value = "";

  if (mode === "puzzle") {
    if (num === 8) {
      document.getElementById("bot-output").innerHTML = "🎉 Correct! You're a pattern master!";
      document.getElementById("mascot-reaction").textContent = "🧠";
      speak("Correct! You're a pattern master!");
    } else {
      handleWrongAnswer();
    }
    botActive = false;
    return;
  }

  if (num === expectedAnswer) {
    correctCount++;
    document.getElementById("bot-output").innerHTML = `✅ Correct! Next: ${getQuestionText()}?`;
    document.getElementById("mascot-reaction").textContent = "😄";
    speak(`Correct! Now what is ${getQuestionText()}?`);
    updateCurrentValue();
    expectedAnswer = getExpectedAnswer();
    if (correctCount >= 5) praiseUser();
  } else {
    handleWrongAnswer();
  }
}

function updateCurrentValue() {
  if (mode === "addition") currentValue += 3;
  if (mode === "subtraction") currentValue -= 2;
  if (mode === "multiplication") currentValue *= 2;
  if (mode === "division") currentValue /= 2;
}
  const num = parseInt(input);
  document.getElementById("bot-answer").value = ""; // Clear input

  if (num === expectedAnswer) {
    correctCount++;
    document.getElementById("bot-output").innerHTML = `✅ Correct! Now ${currentValue} + 2?`;
    document.getElementById("mascot-reaction").textContent = "😄";
    speak(`Correct! Now what is ${currentValue} plus 2?`);
    currentValue += 2;
    expectedAnswer = currentValue;
    if (correctCount >= 5) praiseUser();
  } else {
    handleWrongAnswer();
  }
