let scores = { A: 0, B: 0 };
let quarter = 1;
let history = JSON.parse(localStorage.getItem("history")) || [];

document.addEventListener("DOMContentLoaded", () => {
  updateDisplay();
  renderHistory();
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
}

function nextQuarter() {
  const last = history[history.length - 1] || { totalA: 0, totalB: 0 };
  const puntosCuarto = {
    quarter,
    scoreA: scores.A - last.totalA,
    scoreB: scores.B - last.totalB,
    totalA: scores.A,
    totalB: scores.B
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
  scores = { A: 0, B: 0 };
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
    inputA.value = entry.scoreA;
    inputA.onchange = (e) => {
      const old = entry.scoreA;
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
    };

    const cellA = document.createElement("td");
    cellA.appendChild(inputA);
    const cellB = document.createElement("td");
    cellB.appendChild(inputB);

    row.appendChild(cellQ);
    row.appendChild(cellA);
    row.appendChild(cellB);
    historyBody.appendChild(row);
  });
}

function updateTotals(startIndex) {
  let totalA = 0;
  let totalB = 0;
  for (let i = 0; i < history.length; i++) {
    totalA += history[i].scoreA;
    totalB += history[i].scoreB;
    history[i].totalA = totalA;
    history[i].totalB = totalB;
  }
  scores.A = totalA;
  scores.B = totalB;
  updateDisplay();
}

function renderFinalScore() {
  let totalA = 0;
  let totalB = 0;

  history.forEach(entry => {
    totalA += parseInt(entry.scoreA) || 0;
    totalB += parseInt(entry.scoreB) || 0;
  });

  document.getElementById("finalA").innerText = totalA;
  document.getElementById("finalB").innerText = totalB;
}

function renderQuarterSummary() {
  const summary = document.getElementById("quarterSummaryList");
  summary.innerHTML = "";

  const nameA = document.getElementById("nameA").value || "Equipo A";
  const nameB = document.getElementById("nameB").value || "Equipo B";

  history.forEach(entry => {
    const p = document.createElement("p");
    p.innerText = `Q${entry.quarter} → ${nameA}: ${entry.scoreA} | ${nameB}: ${entry.scoreB}`;
    summary.appendChild(p);
  });
}

function renderChangeLog() {
  const log = JSON.parse(localStorage.getItem("log")) || [];
  const logContainer = document.getElementById("changeLog");
  logContainer.innerHTML = "";

  log.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    logContainer.appendChild(li);
  });
}

function addToLog(message) {
  const log = JSON.parse(localStorage.getItem("log")) || [];
  const timestamp = new Date().toLocaleString();
  log.unshift(`[${timestamp}] ${message}`);
  localStorage.setItem("log", JSON.stringify(log));
  renderChangeLog();
}
