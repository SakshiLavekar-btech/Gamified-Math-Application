const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const infoBox = document.getElementById("infoBox");
const resetBtn = document.getElementById("resetBtn");

let level = 3; // Start with triangle
let dots = [];
let current = 0;
let clickedPoints = [];

function generatePolygon(sides, radius = 150, centerX = 250, centerY = 250) {
  const angleStep = (2 * Math.PI) / sides;
  dots = [];
  for (let i = 0; i < sides; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    dots.push({ x, y });
  }
  drawDots();
}

function drawDots() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dots.forEach((dot, i) => {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.font = "14px Arial";
    ctx.fillText(i + 1, dot.x - 5, dot.y - 15);
  });
}

function animateFullShape(points, callback) {
  let i = 0;
  function drawNext() {
    if (i < points.length) {
      const start = points[i];
      const end = points[(i + 1) % points.length];
      animateLine(start.x, start.y, end.x, end.y, () => {
        i++;
        drawNext();
      });
    } else {
      callback();
    }
  }
  drawNext();
}

function animateLine(x1, y1, x2, y2, callback) {
  let progress = 0;
  const steps = 20;
  const dx = (x2 - x1) / steps;
  const dy = (y2 - y1) / steps;

  function drawStep() {
    if (progress <= steps) {
      const cx = x1 + dx * progress;
      const cy = y1 + dy * progress;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(cx, cy);
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 3;
      ctx.stroke();
      progress++;
      requestAnimationFrame(drawStep);
    } else {
      callback();
    }
  }

  drawStep();
}

canvas.addEventListener("click", (e) => {
  if (current >= dots.length) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const target = dots[current];

  if (Math.abs(x - target.x) < 20 && Math.abs(y - target.y) < 20) {
    clickedPoints.push(target);
    current++;
   if (current === dots.length) {
  animateFullShape(dots, () => {
    showShapeInfo();
    setTimeout(() => {
      level++;
      if (level <= 10) {
        resetGame();
      }
    }, 3000); // Wait 3 seconds before next shape
  });
}
  }
});

function showShapeInfo() {
  const shapeNames = {
    3: "Triangle",
    4: "Square",
    5: "Pentagon",
    6: "Hexagon",
    7: "Heptagon",
    8: "Octagon",
    9: "Nonagon",
    10: "Decagon"
  };

  const formulas = {
    3: "Area = ½ × base × height<br>Perimeter = a + b + c",
    4: "Area = a²<br>Perimeter = 4a",
    5: "Area = (5a² / 4) × cot(π/5)<br>Perimeter = 5a",
    6: "Area = (3√3 / 2) × a²<br>Perimeter = 6a",
    7: "Area = (7a² / 4) × cot(π/7)<br>Perimeter = 7a",
    8: "Area = 2a²(1 + √2)<br>Perimeter = 8a",
    9: "Area = (9a² / 4) × cot(π/9)<br>Perimeter = 9a",
    10: "Area = (5a² / 2) × √(5 + 2√5)<br>Perimeter = 10a",
    circle: "Area = πr²<br>Circumference = 2πr"
  };

  const name = shapeNames[level] || "Circle";
  const formula = formulas[level] || formulas.circle;

  infoBox.innerHTML = `🎉 <strong>${name}</strong><br>Sides: ${level}<br><br><strong>Formulas:</strong><br>${formula}`;
}

function resetGame() {
  current = 0;
  clickedPoints = [];
  infoBox.innerHTML = "";
  generatePolygon(level);
}

resetBtn.addEventListener("click", resetGame);

generatePolygon(level);