const correctOrder = [
    "Mojar las manos",
    "Aplicar jabón",
    "Frotar las palmas",
    "Enjuagar con agua",
    "Secar con una toalla"
  ];
  
  let shuffledSteps;
  let selectedSteps = [];
  
  const stepButtonsContainer = document.getElementById("step-buttons");
  const selectedStepsList = document.getElementById("selected-steps");
  const checkButton = document.getElementById("checkButton");
  const retryButton = document.getElementById("retryButton");
  const result = document.getElementById("result");
  
  function initializeGame() {
    stepButtonsContainer.innerHTML = "";
    selectedStepsList.innerHTML = "";
    result.textContent = "";
    selectedSteps = [];
    
    shuffledSteps = [...correctOrder].sort(() => Math.random() - 0.5);
  
    shuffledSteps.forEach(step => {
      const btn = document.createElement("button");
      btn.textContent = step;
      btn.classList.add("step");
      btn.addEventListener("click", () => {
        btn.disabled = true;
        selectedSteps.push(step);
        const li = document.createElement("li");
        li.textContent = step;
        selectedStepsList.appendChild(li);
      });
      stepButtonsContainer.appendChild(btn);
    });
  }
  
  // Verificar orden
  checkButton.addEventListener("click", () => {
    if (selectedSteps.length !== correctOrder.length) {
      result.textContent = "¡Debes seleccionar todos los pasos!";
      result.style.color = "red";
      return;
    }
  
    const isCorrect = selectedSteps.every((step, index) => step === correctOrder[index]);
  
    result.textContent = isCorrect
      ? "✅ ¡Correcto! ¡Has armado el algoritmo bien!"
      : "❌ Hay errores. Puedes intentarlo de nuevo.";
    result.style.color = isCorrect ? "green" : "red";
  });
  
  // Reintentar
  retryButton.addEventListener("click", initializeGame);
  
  // Iniciar al cargar
  initializeGame();  