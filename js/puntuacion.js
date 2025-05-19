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

function showPopup(message) {
    document.getElementById('popup-message').textContent = message;
    document.getElementById('popup-modal').style.display = 'flex';
  }

  // Hook into your drag/drop logic
  document.addEventListener('DOMContentLoaded', function() {
    const selectedZone = document.getElementById('selected-zone');
    const availableZone = document.getElementById('available-zone');
    const totalPointsSpan = document.getElementById('total-points');
    const maxPlayers = 5;
    const maxPoints = 14;

    // Helper to get current team state
    function getTeamState() {
      const players = selectedZone.querySelectorAll('.player');
      let total = 0;
      players.forEach(p => total += parseFloat(p.getAttribute('data-score')));
      return { count: players.length, points: total };
    }

    // Listen for dragstart
    availableZone.querySelectorAll('.player').forEach(player => {
      player.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', player.outerHTML);
        e.dataTransfer.effectAllowed = 'move';
      });
    });

    // Allow drop
    selectedZone.addEventListener('dragover', function(e) {
      e.preventDefault();
    });

    selectedZone.addEventListener('drop', function(e) {
      e.preventDefault();
      const data = e.dataTransfer.getData('text/plain');
      const temp = document.createElement('div');
      temp.innerHTML = data;
      const player = temp.firstElementChild;
      const score = parseFloat(player.getAttribute('data-score'));
      const { count, points } = getTeamState();

      if (count >= maxPlayers) {
        showPopup('No puedes añadir más de 5 jugadores.');
        return;
      }
      if (points + score > maxPoints) {
        showPopup('No puedes exceder los 14 puntos en el equipo.');
        return;
      }
      // Prevent duplicate players
      const imgs = Array.from(selectedZone.querySelectorAll('img')).map(img => img.src);
      if (imgs.includes(player.querySelector('img').src)) {
       
      }
      selectedZone.appendChild(player);
      totalPointsSpan.textContent = (points + score).toString();
    });
  });
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