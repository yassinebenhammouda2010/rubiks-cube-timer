const navButtons = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const targetPage = button.dataset.page;

        // Désactiver tous les boutons
        navButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Activer le bouton sélectionné
        button.classList.add("active");

        // Cacher toutes les pages
        pages.forEach(page => {
            page.classList.remove("active-page");
        });

        // Afficher la page demandée
        document
            .getElementById(targetPage)
            .classList.add("active-page");

    });

});