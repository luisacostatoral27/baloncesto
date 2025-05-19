  const availableZone = document.getElementById('available-zone'); // Zona de jugadores disponibles
    const selectedZone = document.getElementById('selected-zone'); // Zona de jugadores seleccionados
    const totalDisplay = document.getElementById('total-points'); // Total de puntos
    const sumLine = document.getElementById('sum-line'); // Línea de suma
    const message = document.getElementById('message'); // Mensaje de error o éxito
    const resetButton = document.getElementById('reset-button'); // Botón de reinicio
    const players = document.querySelectorAll('.player'); // Jugadores disponibles



    function checkLimits() {
      const players = selectedZone.querySelectorAll('.player');
      const values = Array.from(players).map(p => parseFloat(p.dataset.score)); // Obtener los valores de los jugadores seleccionados
      const total = values.reduce((a, b) => a + b, 0); // Sumar los valores
      totalDisplay.textContent = total.toFixed(1); // Mostrar el total

      if (total > 14) {
        showAlert("❌ No puedes superar los 14 puntos.");// Mensaje de error
        alert("No puedes superar los 14 puntos.");// Mensaje de error
      } else if (players.length > 5) {
        showAlert("❌ No puedes tener más de 5 jugadores.");// Mensaje de error  
      }
    }

    selectedZone.addEventListener('DOMSubtreeModified', checkLimits);


    function updateDisplay() {
      const players = selectedZone.querySelectorAll('.player');
      const values = Array.from(players).map(p => parseFloat(p.dataset.score));
      const total = values.reduce((a, b) => a + b, 0);
      totalDisplay.textContent = total.toFixed(1);
      sumLine.textContent = values.length ? values.join(" + ") + " = " + total.toFixed(1) + " puntos" : "";
      message.textContent = "";
      message.className = "message";

      if (total > 14) {
        message.textContent = "❌ No puedes superar los 14 puntos.";
        message.classList.add("error");
      } else if (players.length > 5) {
        message.textContent = "❌ No puedes tener más de 5 jugadores.";
        message.classList.add("error");
      } else if (total === 14 && players.length === 5) {
        message.textContent = "✅ ¡Equipo completo!";
        message.classList.add("complete");
      }
    }

    function resetEquipo() {
      const players = selectedZone.querySelectorAll('.player');
      players.forEach(p => availableZone.appendChild(p));
      updateDisplay();
    }

    function enableDragDrop(zone) {
      zone.addEventListener('dragover', (e) => e.preventDefault());
      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("text/id");
        const dragged = document.getElementById(id);
        if (!dragged) return;

        if (zone.id === "selected-zone") {
          const currentPlayers = selectedZone.querySelectorAll('.player');
          const currentTotal = Array.from(currentPlayers).reduce((acc, p) => acc + parseFloat(p.dataset.score), 0);
          const newScore = parseFloat(dragged.dataset.score);

          if (currentPlayers.length >= 5) {
            message.textContent = " No puedes tener más de 5 jugadores.";

            return;
          }

          if (currentTotal + newScore > 14) {
            message.textContent = " No puedes superar los 14 puntos.";

            return;
          }
        }

        zone.appendChild(dragged);
        updateDisplay();
      });
    }

    document.querySelectorAll('.player').forEach((player, index) => {
      player.id = `player-${index}`;
      player.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData("text/id", player.id);
      });
    });
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

    enableDragDrop(availableZone);
    enableDragDrop(selectedZone);