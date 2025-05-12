  const availableZone = document.getElementById('available-zone'); 
    const selectedZone = document.getElementById('selected-zone');
    const totalDisplay = document.getElementById('total-points');
    const sumLine = document.getElementById('sum-line');
    const message = document.getElementById('message');

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
            message.textContent = "❌ No puedes tener más de 5 jugadores.";
            message.className = "message error";
            return;
          }

          if (currentTotal + newScore > 14) {
            message.textContent = "❌ No puedes superar los 14 puntos.";
            message.className = "message error";
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

    enableDragDrop(availableZone);
    enableDragDrop(selectedZone);