document.addEventListener("DOMContentLoaded", function () {
    const serviceBoxes = document.querySelectorAll(".service-box");

    function animateServiceBoxes() {
        serviceBoxes.forEach((box) => {
            const boxPosition = box.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (boxPosition < windowHeight - 50) {
                box.classList.add("animate");
            }
        });
    }

    // Executa ao carregar a página e ao rolar
    window.addEventListener("scroll", animateServiceBoxes);
    animateServiceBoxes();
});
