// Función para cerrar el popup modal
function closePopup() {
  document.getElementById('popup-modal').style.display = 'none';
}

// Función para mostrar el popup modal con un mensaje
function showPopup(message) {
  document.getElementById('popup-message').textContent = message;
  document.getElementById('popup-modal').style.display = 'flex';
}

// Variables para almacenar orden inicial
let initialOrder = [];

document.addEventListener('DOMContentLoaded', function () {
  const selectedZone = document.getElementById('selected-zone');
  const availableZone = document.getElementById('available-zone');
  const totalPointsSpan = document.getElementById('total-points');
  const maxPlayers = 5;
  const maxPoints = 14;

  // Guardar orden inicial al cargar
  initialOrder = Array.from(availableZone.children);

  // Marcar todos los jugadores como arrastrables
  initialOrder.forEach((player, index) => {
    player.setAttribute('draggable', 'true');
    player.dataset.initialIndex = index; // Guardar el índice original
    player.addEventListener('dragstart', function (e) {
      e.dataTransfer.setData('text/plain', player.querySelector('img').src);
      e.dataTransfer.effectAllowed = 'move';
    });
  });

  // Obtener estado actual del equipo
  function getTeamState() {
    const players = selectedZone.querySelectorAll('.player');
    let total = 0;
    players.forEach(p => total += parseFloat(p.getAttribute('data-score')));
    return { count: players.length, points: total };
  }

  // Permitir soltar
  selectedZone.addEventListener('dragover', function (e) {
    e.preventDefault();
  });

  selectedZone.addEventListener('drop', function (e) {
    e.preventDefault();
    const imgSrc = e.dataTransfer.getData('text/plain');

    // Evitar duplicados
    const existing = Array.from(selectedZone.querySelectorAll('img')).some(img => img.src === imgSrc);
    if (existing) {
      showPopup('Este jugador ya está en el equipo.');
      return;
    }

    // Encontrar jugador en zona de disponibles
    const player = Array.from(availableZone.children).find(p => p.querySelector('img').src === imgSrc);
    if (!player) return;

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

    selectedZone.appendChild(player);
    totalPointsSpan.textContent = (points + score).toString();
  });
});

// Función para reiniciar el equipo y restaurar orden original
function resetEquipo() {
  const selectedZone = document.getElementById('selected-zone');
  const availableZone = document.getElementById('available-zone');
  const totalPointsSpan = document.getElementById('total-points');

  // Tomar jugadores actualmente en el equipo
  const returningPlayers = Array.from(selectedZone.querySelectorAll('.player'));

  // Vaciar zona de seleccionados
  returningPlayers.forEach(player => selectedZone.removeChild(player));

  // Insertar de nuevo los jugadores en el orden original
  initialOrder.forEach((originalPlayer, i) => {
    if (!availableZone.contains(originalPlayer)) {
      // Si está en el equipo, volverlo a poner en su posición original
      const beforeNode = availableZone.children[i] || null;
      availableZone.insertBefore(originalPlayer, beforeNode);
    }
  });

  // Reiniciar puntos
  totalPointsSpan.textContent = '0';

  // Mostrar confirmación
  showPopup('El equipo ha sido reiniciado y los jugadores volvieron a su lugar original.');
}
