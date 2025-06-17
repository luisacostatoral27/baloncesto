let scores = {
  A: 0, // Masculino A
  B: 0, // Masculino B
  C: 0, // Femenino C
  D: 0  // Femenino D
};

document.addEventListener("DOMContentLoaded", () => {
  updateDisplay();
});

function addPoints(team, points) {
  scores[team] += points;
  updateDisplay();
}

function updateDisplay() {
  document.getElementById("scoreA").innerText = scores.A;
  document.getElementById("scoreB").innerText = scores.B;
  document.getElementById("scoreC").innerText = scores.C;
  document.getElementById("scoreD").innerText = scores.D;

  document.getElementById("finalA").innerText = scores.A;
  document.getElementById("finalB").innerText = scores.B;
  document.getElementById("finalC").innerText = scores.C;
  document.getElementById("finalD").innerText = scores.D;
}

function mostrarResultadoFinal(tipo) {
  if (tipo === 'masculino') {
    document.getElementById("resultadoTextoMasculino").innerText =
      `Resultado Final Masculino: ${scores.A} - ${scores.B}`;
  } else {
    document.getElementById("resultadoTextoFemenino").innerText =
      `Resultado Final Femenino: ${scores.C} - ${scores.D}`;
  }
}

function resetGame(tipo) {
  if (tipo === 'masculino') {
    scores.A = 0;
    scores.B = 0;
    document.getElementById("resultadoTextoMasculino").innerText = "";
  } else {
    scores.C = 0;
    scores.D = 0;
    document.getElementById("resultadoTextoFemenino").innerText = "";
  }
  updateDisplay();
}
