  // Script para el carrusel
  let currentSlide = 0;  // Variable para llevar el control del slide actual
  const slides = document.querySelectorAll('.carousel-container img'); // Selecciona todas las imágenes dentro del contenedor del carrusel
  const totalSlides = slides.length; // Obtiene el número total de imágenes
  const indicators = document.getElementById("indicators"); // Selecciona el contenedor de indicadores
  // Agrega un evento al botón "anterior" para mover el carrusel hacia atrás
  prevButton.addEventListener("click", () => moverCarrusel(-1)); 
  
  // Agrega un evento al botón "siguiente" para mover el carrusel hacia adelante
  nextButton.addEventListener("click", () => moverCarrusel(1));  nextButton.addEventListener("click", () => moverCarrusel(1)); 
  crearIndicadores(); // Crea los indicadores de los slides
  setInterval(() => moverCarrusel(1), 5000); // Cambia la imagen cada 5 segundos
  // Actualiza el carrusel al cargar la página
  updateCarousel(); 
  
// Muestra la imagen actual con un efecto de transición
function updateCarousel() {
  slides.forEach((slide, idx) => {
    slide.style.opacity = idx === currentSlide ? "1" : "0"; // Muestra solo la imagen actual
  });

  [...indicators.children].forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentSlide); // Actualiza los indicadores
  });
}
  function updateCarousel()  { 
    const container = document.getElementById("carousel-container"); // Selecciona el contenedor del carrusel
    container.style.transform = `translateX(-${currentSlide * 100}%)`; // Mueve el contenedor según el slide actual
    [...indicators.children].forEach((dot, idx) => { // Recorre los indicadores
      // Cambia la clase "active" del indicador según el slide actual
      dot.classList.toggle("active", idx === currentSlide); 
    });
  }
  function moverCarrusel(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides; // Actualiza el índice del slide actual según la dirección (adelante o atrás)
    updateCarousel(); // Actualiza la posición del carrusel y los indicadores
  }


  // Función para crear los indicadores del carrusel
  function crearIndicadores() { 
    // Recorre el número total de slides para crear un indicador por cada uno
    for (let i = 0; i < totalSlides; i++)  {
      // Crea un elemento "span" para cada indicador
      const dot = document.createElement("span"); // Crea un elemento "span" para cada indicador
      dot.setAttribute("data-slide-to", i); // Establece un atributo "data-slide-to" con el índice del slide
      dot.classList.add("dot"); // Agrega la clase "dot" al indicador

      // Si es el primer slide, marca el indicador como activo
      if (i === 0) dot.classList.add("active");

      // Asigna un evento "onclick" para cambiar al slide correspondiente
      dot.onclick = () => {
        currentSlide = i; // Actualiza el índice del slide actual
        updateCarousel(); // Actualiza la posición del carrusel y los indicadores
      };

      // Agrega el indicador al contenedor de indicadores
      indicators.appendChild(dot); 
    }
    
  }

  

