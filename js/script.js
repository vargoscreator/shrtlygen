function moveHeaderUser() {
    if(document.querySelector(".header__user")){
        const headerUser = document.querySelector(".header__user");
        const headerMenu = document.querySelector(".header__menu");
        const headerInner = document.querySelector(".header__inner");
        if (window.innerWidth < 768) {
            headerMenu.appendChild(headerUser);
        } else {
            headerInner.appendChild(headerUser);
        }
    }
}
moveHeaderUser();
window.addEventListener("resize", moveHeaderUser);

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    function checkScroll() {
        if (window.scrollY >= 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.header__menu');
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
    });

});



if(document.querySelector('.cookiesPopup')){
    document.querySelector('.cookiesPopup__close').addEventListener('click', () => {
        document.querySelector('.cookiesPopup').classList.remove('show');
    });
}