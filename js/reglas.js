const images = document.querySelectorAll('.responsive-img'); // Selecciona todas las imágenes con la clase 'responsive-img'
const popup = document.getElementById('popup'); // Selecciona el contenedor del popup
const popupImg = document.getElementById('popup-img'); // Selecciona la imagen dentro del popup
const closePopup = document.getElementById('close-popup');  // Selecciona el botón de cerrar el popup
  document.querySelectorAll('.faq-question').forEach(function(btn) {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.faq-question').forEach(function(otherBtn) {
                    if (otherBtn !== btn) {
                        otherBtn.classList.remove('active');
                        otherBtn.nextElementSibling.style.display = 'none';
                    }
                });
                const answer = btn.nextElementSibling;
                const isOpen = btn.classList.contains('active');
                if (!isOpen) {
                    btn.classList.add('active');
                    answer.style.display = 'block';
                } else {
                    btn.classList.remove('active');
                    answer.style.display = 'none';
                }
            });
        });
        
document.addEventListener('click', function(event) {
    const openBtn = document.querySelector('.faq-question.active');
    if (openBtn && !event.target.classList.contains('faq-question')) {
        openBtn.classList.remove('active');
        openBtn.nextElementSibling.style.display = 'none';
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const openBtn = document.querySelector('.faq-question.active');
        if (openBtn) {
            openBtn.classList.remove('active');
            openBtn.nextElementSibling.style.display = 'none';
        }
    }
});

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
// Agrega un evento de clic al botón de cerrar el popup
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        popup.style.display = 'none'; // Cierra el popup si se presiona la tecla Escape
    }
});

