
    document.addEventListener('DOMContentLoaded', function () {
        const burgerMenuBtn = document.querySelector('.burger-menu-btn');
        const burgerSidebar = document.querySelector('.burger-sidebar');

        burgerMenuBtn.addEventListener('click', function () {
            burgerSidebar.style.display = (burgerSidebar.style.display === 'block') ? 'none' : 'block';
        });
    });

