    document.addEventListener("DOMContentLoaded", function () {
        const items = document.querySelectorAll(".timeline-item");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible");
                }
            });
        }, {
            threshold: 0.25
        });

        items.forEach(item => observer.observe(item));
    });