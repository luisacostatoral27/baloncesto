
 // Function to close the popup modal
  function closePopup() {
    document.getElementById('popup-modal').style.display = 'none';
  }
  // Function to show the popup modal with a message
  function showPopup(message) {
    document.getElementById('popup-message').textContent = message;
    document.getElementById('popup-modal').style.display = 'flex';
  }
  // Popup modal
 function showPopup(message) {
    document.getElementById('popup-message').textContent = message;
    document.getElementById('popup-modal').style.display = 'flex';
  }


  function updateDisplay() {
    const { points } = getTeamState();
    totalPointsSpan.textContent = points.toString();
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


   