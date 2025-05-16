let scores = { A: 0, B: 0, C: 0, D: 0 }; // Inicializar los puntajes de los equipos
let quarter = 1;
let history = JSON.parse(localStorage.getItem("history")) || [];

document.addEventListener("DOMContentLoaded", () => {
  updateDisplay(); // Actualizar la pantalla al cargar la página
  renderHistory();// Renderizar el historial de puntajes
  renderFinalScore();
  renderQuarterSummary();
  renderChangeLog();
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
  const last = history[history.length - 1] || { totalA: 0, totalB: 0, };
  const puntosCuarto = {
    quarter,
    scoreA: scores.A - last.totalA,
    scoreB: scores.B - last.totalB,

    totalA: scores.A,
    totalB: scores.B,
    scoreC: scores.C,
    scoreD: scores.D,
 
  };

  history.push(puntosCuarto);
  quarter++;

  localStorage.setItem("history", JSON.stringify(history));

  renderHistory();
  renderFinalScore();
  renderQuarterSummary();
  renderChangeLog();
}

function resetGame() {
  scores = { A: 0, B: 0 , C: 0, D: 0 };
  quarter = 1;
  history = [];
  localStorage.clear();
  updateDisplay();
  renderHistory();
  renderFinalScore();
  renderQuarterSummary();
  renderChangeLog();
}

function renderHistory() {
  const historyBody = document.getElementById("historyBody");
  historyBody.innerHTML = "";

  history.forEach((entry, index) => {
    const row = document.createElement("tr");


    const cellQ = document.createElement("td");
    cellQ.innerText = entry.quarter;

    const inputA = document.createElement("input");
    inputA.type = "number";
    inputA.value = entry.scoreA; // Cambia el valor inicial a 0
    inputA.onchange = (e) => {
      const old = entry.scoreA; // Guardar el valor anterior
      entry.scoreA = parseInt(e.target.value) || 0;
      updateTotals(index);
      localStorage.setItem("history", JSON.stringify(history));
      renderFinalScore();
      renderQuarterSummary();
      addToLog(`Editado Q${entry.quarter}: Equipo A ${old} → ${entry.scoreA}`);
    };

    const inputB = document.createElement("input");
    inputB.type = "number";
    inputB.value = entry.scoreB;
    inputB.onchange = (e) => {
      const old = entry.scoreB;
      entry.scoreB = parseInt(e.target.value) || 0;
      updateTotals(index);
      localStorage.setItem("history", JSON.stringify(history));
      renderFinalScore();
      renderQuarterSummary();
      addToLog(`Editado Q${entry.quarter}: Equipo B ${old} → ${entry.scoreB}`);

      const inputC = document.createElement("input");
      inputC.type = "number";
      inputC.value = entry.scoreC;
      inputC.onchange = (e) => {
        const old = entry.scoreC;
        entry.scoreC = parseInt(e.target.value) || 0;
        updateTotals(index);
        localStorage.setItem("history", JSON.stringify(history));
        renderFinalScore();
        renderQuarterSummary();
        addToLog(`Editado Q${entry.quarter}: Equipo C ${old} → ${entry.scoreC}`);
      };
      const inputD = document.createElement("input");
      inputD.type = "number";
      inputD.value = entry.scoreD;
      inputD.onchange = (e) => {
        const old = entry.scoreD;
        entry.scoreD = parseInt(e.target.value) || 0;
        updateTotals(index);
        localStorage.setItem("history", JSON.stringify(history));
        renderFinalScore();
        renderQuarterSummary();
        addToLog(`Editado Q${entry.quarter}: Equipo D ${old} → ${entry.scoreD}`);
      };
    };
   

    // Crear la celda para el equipo A
    const cellA = document.createElement("td"); 
    cellA.appendChild(inputA); 
    const cellB = document.createElement("td"); 
    cellB.appendChild(inputB);
    const cellC = document.createElement("td");
    cellC.appendChild(inputC);
    const cellD = document.createElement("td");
    cellD.appendChild(inputD);

    row.appendChild(cellQ);
    row.appendChild(cellA);
    row.appendChild(cellB);
    row.appendChild(cellC);
    row.appendChild(cellD);
    historyBody.appendChild(row);
  });
}

function updateTotals(startIndex) {
  let totalA = 0;
  let totalB = 0;
  let totalC = 0;
  let totalD = 0;
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
  let totalA = 0;
  let totalB = 0;
  let totalC = 0;
  let totalD = 0;

  history.forEach(entry => {
    totalA += parseInt(entry.scoreA) || 0;
    totalB += parseInt(entry.scoreB) || 0;
    totalC += parseInt(entry.scoreC) || 0;
    totalD += parseInt(entry.scoreD) || 0;
  });

  document.getElementById("finalA").innerText = totalA;
  document.getElementById("finalB").innerText = totalB;
  document.getElementById("finalC").innerText = totalC;
  document.getElementById("finalD").innerText = totalD;
}

function renderQuarterSummary() {
  const summary = document.getElementById("quarterSummaryList");
  summary.innerHTML = "";

  const nameA = document.getElementById("nameA").value || "Equipo A";
  const nameB = document.getElementById("nameB").value || "Equipo B";
  const nameC = document.getElementById("nameC").value || "Equipo C";
  const nameD = document.getElementById("nameD").value || "Equipo D";

  history.forEach((entry, idx) => {
    const li = document.createElement("li");
    li.innerText = `Q${entry.quarter}: ${nameA} ${entry.scoreA}, ${nameB} ${entry.scoreB}, ${nameC} ${entry.scoreC}, ${nameD} ${entry.scoreD}`;
    summary.appendChild(li);
  });

  // Guardar historial separado por equipo
  const teamHistories = { A: [], B: [], C: [], D: [] };
  history.forEach(entry => {
    teamHistories.A.push(entry.scoreA);
    teamHistories.B.push(entry.scoreB);
    teamHistories.C.push(entry.scoreC);
    teamHistories.D.push(entry.scoreD);
  });
  localStorage.setItem("historyA", JSON.stringify(teamHistories.A));
  localStorage.setItem("historyB", JSON.stringify(teamHistories.B));
  localStorage.setItem("historyC", JSON.stringify(teamHistories.C));
  localStorage.setItem("historyD", JSON.stringify(teamHistories.D));
}



function addToLog(message) {
  const log = JSON.parse(localStorage.getItem("log")) || [];
  const timestamp = new Date().toLocaleString();
  log.unshift(`[${timestamp}] ${message}`);
  localStorage.setItem("log", JSON.stringify(log));
  renderChangeLog();
}
