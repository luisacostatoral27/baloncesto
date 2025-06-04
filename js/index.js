document.addEventListener("DOMContentLoaded", () => {
    let currentSlide = 0; 
    const slides = document.querySelectorAll('.carousel-container img');
    const totalSlides = slides.length;

    // Crear dinámicamente el contenedor para los puntos
    const dotsContainer = document.createElement("div");
    dotsContainer.id = "image-dots";
    dotsContainer.style.position = "absolute";
    dotsContainer.style.bottom = "10px";
    dotsContainer.style.width = "100%";
    dotsContainer.style.textAlign = "center";
    dotsContainer.style.zIndex = "10";
    dotsContainer.style.color = "white";
    dotsContainer.style.fontSize = "20px";
    dotsContainer.style.fontWeight = "bold";
    dotsContainer.style.textShadow = "0 0 5px black";
    document.querySelector(".carousel-wrapper").appendChild(dotsContainer);

    let autoSlideInterval;

    // Función para actualizar los puntos y el carrusel
    function updateCarousel() {
        const container = document.getElementById("carousel-container");
        container.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Actualizar puntos
        [...dotsContainer.children].forEach((dot, idx) => {
            dot.style.opacity = idx === currentSlide ? "1" : "0.5"; // Resaltar el punto activo
        });
    }

    // Función para mover el carrusel
    function moverCarrusel(direction) {
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Función para reiniciar el intervalo automático
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => moverCarrusel(1), 5000);
    }

    // Crear los puntos "º º º"
    function crearPuntos() {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement("span");
            dot.textContent = "º";
            dot.style.cursor = "pointer";
            dot.style.margin = "0 5px";
            dot.style.opacity = i === 0 ? "1" : "0.5"; // Resaltar el primer punto
            dot.onclick = () => {
                currentSlide = i;
                updateCarousel();
                resetAutoSlide();
            };
            dotsContainer.appendChild(dot);
        }
    }

    // Agregar eventos a los botones
    document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
        moverCarrusel(-1);
        resetAutoSlide();
    });

    document.querySelector('.carousel-btn.next').addEventListener('click', () => {
        moverCarrusel(1);
        resetAutoSlide();
    });

    // Inicialización del carrusel
    crearPuntos();
    updateCarousel();
    autoSlideInterval = setInterval(() => moverCarrusel(1), 5000);
});
