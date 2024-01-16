document.addEventListener("DOMContentLoaded", function () {
    const burgerMenu = document.querySelector(".burger-menu");
    const navLink = document.querySelector(".nav-link");

    burgerMenu.addEventListener("click", function () {
        navLink.classList.toggle("show");
    });
});
