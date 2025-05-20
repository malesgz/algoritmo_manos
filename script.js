let currentLevel = 1;
let currentSteps = [];
let correctSequence = [];
let decision = "";

const level1Steps = [
  "Ponerse la remera manga larga",
  "Ponerse los pantalones",
  "Ponerse las medias",
  "Ponerse las zapatillas",
  "Ponerse la campera",
];

const teaSteps = [
  "Hervir agua",
  "Colocar la bolsita de té en la taza",
  "Verter el agua caliente",
  "Esperar unos minutos",
  "Retirar la bolsita y disfrutar",
];

const coffeeSteps = [
  "Hervir agua",
  "Colocar café en la taza y el azúcar",
  "Verter agua caliente en la taza",
  "Revolver",
  "Esperar unos minutos hasta que entibie",
  "Tomarlo y disfrutar",
];

function shuffle(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

function renderButtons(steps) {
  const container = document.getElementById("step-buttons");
  container.innerHTML = "";
  shuffle(steps).forEach((step) => {
    const btn = document.createElement("button");
    btn.textContent = step;
    btn.className = "step";
    btn.onclick = () => selectStep(step);
    container.appendChild(btn);
  });
}

function selectStep(step) {
  currentSteps.push(step);
  const list = document.getElementById("selected-steps");
  const li = document.createElement("li");
  li.textContent = step;
  list.appendChild(li);
  checkProgress();
}

function verifySequence() {
  const message = document.getElementById("result-message");

  if (currentSteps.length !== correctSequence.length) {
    message.textContent = "🚨 Aún faltan pasos por agregar.";
    message.style.color = "orange";
    return;
  }

  const isCorrect = currentSteps.every((step, index) => step === correctSequence[index]);

  if (isCorrect) {
    message.textContent = "✅ ¡Correcto! Has completado el algoritmo.";
    message.style.color = "green";

    if (currentLevel === 1) {
      document.getElementById("next-level").style.display = "inline-block";
      document.getElementById("instructions").textContent = "¡Nivel completado! 🎉";
    } else {
      showFinalPage();
    }
  } else {
    message.textContent = "❌ El orden no es correcto. Intentá de nuevo.";
    message.style.color = "red";
    resetGame();
  }
}

function checkProgress() {
  if (currentSteps.length === correctSequence.length) {
    verifySequence();
  }
}

function resetGame() {
  currentSteps = [];
  document.getElementById("selected-steps").innerHTML = "";
  document.getElementById("next-level").style.display = "none";

  if (currentLevel === 1) {
    correctSequence = level1Steps;
    renderButtons(correctSequence);
  } else if (currentLevel === 2) {
    showDecision();
  }
}

function nextLevel() {
  currentLevel = 2;
  decision = "";
  document.getElementById("result-message").textContent = "";
  document.getElementById("instructions").textContent = "Elige qué bebida preparar:";
  document.getElementById("next-level").style.display = "none";
  document.getElementById("selected-steps").innerHTML = "";
  document.getElementById("step-buttons").innerHTML = "";
  document.getElementById("choice-container").innerHTML = `
    <button class="choice-button" onclick="startDrink('té')">🍵 Té</button>
    <button class="choice-button" onclick="startDrink('café')">☕ Café</button>
  `;
}

function showDecision() {
  if (decision === "té") {
    correctSequence = teaSteps;
  } else {
    correctSequence = coffeeSteps;
  }
  renderButtons(correctSequence);
}

function startDrink(type) {
  decision = type;
  document.getElementById("choice-container").innerHTML = "";
  document.getElementById("instructions").textContent = `Preparando ${type}...`;
  resetGame();
}

function showFinalPage() {
  document.getElementById("main-content").style.display = "none";
  document.getElementById("final-page").style.display = "block";
}

window.onload = () => {
  correctSequence = level1Steps;
  renderButtons(correctSequence);
};