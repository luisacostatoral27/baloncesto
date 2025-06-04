document.addEventListener("DOMContentLoaded", () => {
    let currentSlide = 0; 
    const slides = document.querySelectorAll('.carousel-container img');
    const totalSlides = slides.length;

    // Crear dinámicamente el contenedor de indicadores
    const indicatorsContainer = document.createElement("div");
    indicatorsContainer.id = "indicators";
    indicatorsContainer.classList.add("carousel-indicators");
    document.querySelector(".carousel-wrapper").appendChild(indicatorsContainer);

    const indicators = document.getElementById("indicators");

    let autoSlideInterval;

    // Función para actualizar el carrusel
    function updateCarousel() {
        const container = document.getElementById("carousel-container");
        container.style.transform = `translateX(-${currentSlide * 100}%)`;
        [...indicators.children].forEach((dot, idx) => {
            dot.classList.toggle("active", idx === currentSlide);
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

    // Función para crear los indicadores
    function crearIndicadores() {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement("span");
            dot.setAttribute("data-slide-to", i);
            dot.classList.add("dot");
            if (i === 0) dot.classList.add("active");
            dot.onclick = () => {
                currentSlide = i;
                updateCarousel();
                resetAutoSlide();
            };
            indicators.appendChild(dot);
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
    crearIndicadores();
    updateCarousel();
    autoSlideInterval = setInterval(() => moverCarrusel(1), 5000);
});
