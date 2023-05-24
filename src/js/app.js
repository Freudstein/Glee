// Burger menu

const menu = document.querySelector('.menu');
const menuBtn = document.querySelector('.icon-menu');

menuBtn.addEventListener('click', function(){
    menu.classList.toggle('active');
    menuBtn.classList.toggle('active');
})