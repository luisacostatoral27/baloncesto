let scores = { A: 0, B: 0, C: 0, D: 0 }; // Inicializar los puntajes de los equipos
let quarter = 1;
let history = JSON.parse(localStorage.getItem("history")) || [];

document.addEventListener("DOMContentLoaded", () => {
  updateDisplay(); 
  renderHistory();
  renderFinalScore();
  renderQuarterSummary?.();
  renderChangeLog?.();
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
}

function nextQuarter() {
  const last = history[history.length - 1] || { totalA: 0, totalB: 0, totalC: 0, totalD: 0 };

  const puntosCuarto = {
    quarter,
    scoreA: scores.A - last.totalA,
    scoreB: scores.B - last.totalB,
    scoreC: scores.C - last.totalC,
    scoreD: scores.D - last.totalD,
    totalA: scores.A,
    totalB: scores.B,
    totalC: scores.C,
    totalD: scores.D,
  };

  history.push(puntosCuarto);
  quarter++;

  localStorage.setItem("history", JSON.stringify(history));

  renderHistory();
  renderFinalScore();
  renderQuarterSummary?.();
  renderChangeLog?.();

  mostrarResultadoFinal(); // Mostramos el resultado por pantalla
}

function resetGame() {
  scores = { A: 0, B: 0, C: 0, D: 0 };
  quarter = 1;
  history = [];
  localStorage.clear();
  updateDisplay();
  renderHistory();
  renderFinalScore();
  renderQuarterSummary?.();
  renderChangeLog?.();

  // Limpiar resultados mostrados
  document.getElementById("resultadoTextoMasculino").innerText = "";
  document.getElementById("resultadoTextoFemenino").innerText = "";
}

function renderHistory() {
  const historyBody = document.getElementById("historyBody");
  if (!historyBody) return;

  historyBody.innerHTML = "";

  history.forEach((entry, index) => {
    const row = document.createElement("tr");

    const cellQ = document.createElement("td");
    cellQ.innerText = entry.quarter;

    const inputA = crearInput(entry, "scoreA", index, `Q${entry.quarter}: Equipo A`);
    const inputB = crearInput(entry, "scoreB", index, `Q${entry.quarter}: Equipo B`);
    const inputC = crearInput(entry, "scoreC", index, `Q${entry.quarter}: Equipo C`);
    const inputD = crearInput(entry, "scoreD", index, `Q${entry.quarter}: Equipo D`);

    const cellA = document.createElement("td"); cellA.appendChild(inputA);
    const cellB = document.createElement("td"); cellB.appendChild(inputB);
    const cellC = document.createElement("td"); cellC.appendChild(inputC);
    const cellD = document.createElement("td"); cellD.appendChild(inputD);

    row.appendChild(cellQ);
    row.appendChild(cellA);
    row.appendChild(cellB);
    row.appendChild(cellC);
    row.appendChild(cellD);
    historyBody.appendChild(row);
  });
}

function crearInput(entry, key, index, descripcion) {
  const input = document.createElement("input");
  input.type = "number";
  input.value = entry[key];
  input.onchange = (e) => {
    const old = entry[key];
    entry[key] = parseInt(e.target.value) || 0;
    updateTotals(index);
    localStorage.setItem("history", JSON.stringify(history));
    renderFinalScore();
    renderQuarterSummary?.();
    addToLog?.(`Editado ${descripcion} ${old} → ${entry[key]}`);
  };
  return input;
}

function updateTotals(startIndex) {
  let totalA = 0, totalB = 0, totalC = 0, totalD = 0;
  for (let i = 0; i < history.length; i++) {
    totalA += history[i].scoreA;
    totalB += history[i].scoreB;
    totalC += history[i].scoreC;
    totalD += history[i].scoreD;
    history[i].totalA = totalA;
    history[i].totalB = totalB;
    history[i].totalC = totalC;
    history[i].totalD = totalD;
  }
  scores.A = totalA;
  scores.B = totalB;
  scores.C = totalC;
  scores.D = totalD;
  updateDisplay();
}

function renderFinalScore() {
  document.getElementById("finalA").innerText = scores.A;
  document.getElementById("finalB").innerText = scores.B;
  document.getElementById("finalC").innerText = scores.C;
  document.getElementById("finalD").innerText = scores.D;
}

function mostrarResultadoFinal() {
  const textoMasculino = document.getElementById("resultadoTextoMasculino");
  const textoFemenino = document.getElementById("resultadoTextoFemenino");

  if (textoMasculino && textoFemenino) {
    textoMasculino.innerText = `Resultado Final Masculino: ${scores.A} - ${scores.B}`;
    textoFemenino.innerText = `Resultado Final Femenino: ${scores.C} - ${scores.D}`;
  }
}
