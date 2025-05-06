document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle'); // Seleccionamos el ícono del menú hamburguesa
    const menu = document.querySelector('.menu'); // Seleccionamos el menú desplegable
    
    // Inicializamos el estado del menú como cerrado (aria-expanded = false)
    menuToggle.setAttribute('aria-expanded', 'false');

    // Función que se ejecuta cuando el usuario hace clic en el ícono del menú hamburguesa
    menuToggle.addEventListener('click', () => {
        const isActive = menu.classList.toggle('active'); // Cambiamos la clase del menú para mostrarlo u ocultarlo
        // Cambiamos el ícono del menú hamburguesa según el estado del menú
        
        // Cambiamos el atributo aria-expanded al abrir o cerrar el menú
        menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // Añadimos funcionalidad para cerrar el menú al hacer clic en cualquier enlace de la lista
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active'); // Cerramos el menú
            menuToggle.setAttribute('aria-expanded', 'false'); // Actualizamos el estado del aria-expanded
        });
    });
});
// Añadimos funcionalidad para cerrar el menú al hacer clic fuera de él
document.addEventListener('click', (event) => {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.querySelector('.menu');

    // Verificamos si el clic fue fuera del menú y del botón de menú
    if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
        menu.classList.remove('active'); // Cerramos el menú
        menuToggle.setAttribute('aria-expanded', 'false'); // Actualizamos el estado del aria-expanded
    }

});

