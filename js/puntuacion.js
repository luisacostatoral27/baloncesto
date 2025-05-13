// puntuacion.js actualizado con modal animado, botón Aceptar y mensaje emergente adicional con botón debajo del mensaje

const availableZone = document.getElementById('available-zone'); 
const selectedZone = document.getElementById('selected-zone');
const totalDisplay = document.getElementById('total-points');
const sumLine = document.getElementById('sum-line');
const message = document.getElementById('message');

function updateDisplay() {
  const players = selectedZone.querySelectorAll('.player'); // Obtiene todos los jugadores seleccionados
  const values = Array.from(players).map(p => parseFloat(p.dataset.score)); // Convierte los valores de los jugadores a un array de números
  const total = values.reduce((a, b) => a + b, 0); // Suma los valores de los jugadores
  totalDisplay.textContent = total.toFixed(1); // Muestra el total de puntos
  sumLine.textContent = values.length ? values.join(" + ") + " = " + total.toFixed(1) + " puntos" : ""; // Muestra la suma de los valores de los jugadores
  message.textContent = "";
  message.className = "message";

  if (total > 14) {
    message.textContent = " No puedes superar los 14 puntos.";
    message.classList.add("error");
    showModal(" No puedes superar los 14 puntos. Elige otro jugador o elimina uno actual.");
  } else if (players.length > 5) {
    message.textContent = " No puedes tener más de 5 jugadores.";
    message.classList.add("error");
    showModal(" Has seleccionado más de 5 jugadores. Elimina uno para continuar.");
  } else if (total === 14 && players.length === 5) {
    message.textContent = "✅ ¡Equipo completo!";
    message.classList.add("complete");
    showModal("✅ ¡Equipo completo! Has seleccionado exactamente 5 jugadores y 14 puntos.");
  }
}

function resetEquipo() {
  const players = selectedZone.querySelectorAll('.player');
  players.forEach(p => availableZone.appendChild(p)); // Mueve todos los jugadores de vuelta a la zona disponible
  updateDisplay();
}

function enableDragDrop(zone) {
  zone.addEventListener('dragover', (e) => e.preventDefault());
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/id");
    const dragged = document.getElementById(id);// Cambia la zona de destino
    if (!dragged) return;

    if (zone.id === "selected-zone") {
      const currentPlayers = selectedZone.querySelectorAll('.player');// 
      const currentTotal = Array.from(currentPlayers).reduce((acc, p) => acc + parseFloat(p.dataset.score), 0);// Cambia la zona de destino
      const newScore = parseFloat(dragged.dataset.score);// 

      if (currentPlayers.length >= 5) {
        showModal(" Has superado el máximo de 5 jugadores.");
        message.textContent = "No puedes tener más de 5 jugadores.";
        message.className = "message error";
        return;
      }

      if (currentTotal + newScore > 14) { // Verifica si la suma total supera 14
        showModal("Has superado el límite de 14 puntos."); // Cambia el mensaje aquí
        message.textContent = "No puedes superar los 14 puntos.";// Cambia el mensaje aquí
        message.className = "message error";
        return;// Cambia la clase aquí
      }
    }

    zone.appendChild(dragged);
    updateDisplay();// Cambia la zona de destino
  });
}

document.querySelectorAll('.player').forEach((player, index) => {
  player.id = `player-${index}`;
  player.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData("text/id", player.id);
  });
});

enableDragDrop(availableZone);
enableDragDrop(selectedZone);

function showModal(messageText) {
  const modal = document.getElementById("custom-alert");
  const message = document.getElementById("alert-message");
  message.innerHTML = `${messageText}<br><br><button class="modal-ok" onclick="closeModal()">Aceptar</button>`;
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("custom-alert");
  modal.style.display = "none";
}
