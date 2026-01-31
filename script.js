const container = document.getElementById("particle-container");
const shapes = ["circle", "square", "triangle"];
const shapeCount = 15;

for (let i = 0; i < shapeCount; i++) {
  const shape = document.createElement("div");
  const type = shapes[Math.floor(Math.random() * shapes.length)];
  const size = Math.random() * 20 + 10;

  shape.className = `shape ${type}`;
  if (type !== "triangle") {
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
  }

  shape.style.left = `${Math.random() * 100}%`;
  shape.style.top = `${Math.random() * 100}%`;

  container.appendChild(shape);
  animateShape(shape);
}

function animateShape(el) {
  let posX = parseFloat(el.style.left);
  let posY = parseFloat(el.style.top);
  let velX = (Math.random() - 0.5) * 0.05;
  let velY = (Math.random() - 0.5) * 0.05;

  function move() {
    posX += velX;
    posY += velY;

    if (posX < -5) posX = 105;
    if (posX > 105) posX = -5;
    if (posY < -5) posY = 105;
    if (posY > 105) posY = -5;

    el.style.left = posX + "%";
    el.style.top = posY + "%";
    requestAnimationFrame(move);
  }
  move();
}
