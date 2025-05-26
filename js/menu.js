document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.querySelector('.menu');

    // Estado inicial del botón hamburguesa
    menuToggle.setAttribute('aria-expanded', 'false');

    // Alternar visibilidad del menú
    menuToggle.addEventListener('click', () => {
        const isActive = menu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // Cerrar menú al hacer clic en un enlace (excepto si hay submenú en responsive)
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            const submenu = link.nextElementSibling;
            const isMobile = window.innerWidth <= 768;

            if (!(submenu && submenu.classList.contains('submenu') && isMobile)) {
                menu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            menu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Mostrar submenús con el primer clic, permitir enlace con el segundo
    document.querySelectorAll('.menu > li > a').forEach(link => {
        link.addEventListener('click', (e) => {
            const submenu = link.nextElementSibling;
            const isMobile = window.innerWidth <= 768;

            if (submenu && submenu.classList.contains('submenu') && isMobile) {
                if (!submenu.classList.contains('show-submenu')) {
                    e.preventDefault(); // Solo bloquear el primer clic
                    submenu.classList.add('show-submenu');
                }
                // Segundo clic sigue el enlace
            }
        });
    });
});
