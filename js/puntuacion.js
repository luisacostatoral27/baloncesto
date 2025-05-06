 // Habilitar funcionalidad de arrastrar y soltar para los jugadores
 document.addEventListener('DOMContentLoaded', () => {
    const jugadores = document.querySelectorAll('.jugador');// Selecciona todos los elementos con la clase 'jugador'
    const banco = document.getElementById('banco');// Selecciona el elemento con el id 'banco'
    const zona = document.querySelector('.zona'); // Selecciona el primer elemento con la clase 'zona'

    jugadores.forEach(jugador => {
        jugador.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.outerHTML); // Almacena el HTML del jugador arrastrado
            e.dataTransfer.effectAllowed = 'move'; // Permite el efecto de movimiento
            jugador.classList.add('dragging'); // Añade la clase 'dragging' al jugador arrastrado
        });

        jugador.addEventListener('dragend', () => {
            jugador.classList.remove('dragging'); // Elimina la clase 'dragging' al soltar el jugador
        });
    });
   
  
    zona.addEventListener('drop', () => {
        actualizarPuntuacion(); // Actualiza la puntuación al soltar un jugador en la zona
    });

    zona.addEventListener('dragover', (e) => {
        e.preventDefault();
        zona.classList.add('highlight'); // Añade la clase 'highlight' a la zona de destino al arrastrar un jugador sobre ella
    });

    zona.addEventListener('dragleave', () => {
        zona.classList.remove('highlight');
    });

    zona.addEventListener('drop', (e) => { 
        e.preventDefault(); // Evita el comportamiento por defecto del navegador
        const jugadorHTML = e.dataTransfer.getData('text/plain'); // Obtiene el HTML del jugador arrastrado
        zona.insertAdjacentHTML('beforeend', jugadorHTML); // Inserta el jugador en la zona de destino
        zona.classList.remove('highlight'); // Elimina la clase 'highlight' de la zona
    });
   
});