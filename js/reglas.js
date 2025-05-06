const images = document.querySelectorAll('.responsive-img'); // Selecciona todas las imágenes con la clase 'responsive-img'
const popup = document.getElementById('popup'); // Selecciona el contenedor del popup
const popupImg = document.getElementById('popup-img'); // Selecciona la imagen dentro del popup
const closePopup = document.getElementById('close-popup');  // Selecciona el botón de cerrar el popup

images.forEach(image => {
    image.addEventListener('click', () => {
        popup.style.display = 'block'; // Muestra el popup al hacer clic en la imagen
        popupImg.src = image.src; // Cambia la fuente de la imagen del popup a la imagen que se hizo clic
    });
});

closePopup.addEventListener('click', () => {
    popup.style.display = 'none'; // Cierra el popup al hacer clic en el botón de cerrar
});

window.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none'; // Cierra el popup si se hace clic fuera de la imagen
    }
}); 
