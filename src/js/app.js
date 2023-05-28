// Burger menu

const menu = document.querySelector('.menu');
const menuBtn = document.querySelector('.icon-menu');

menuBtn.addEventListener('click', function(){
    menu.classList.toggle('active');
    menuBtn.classList.toggle('active');
})

// top-slider

const topSlider = new Swiper('.top-slider', {
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        renderBullet: function (index, className) {
            return `<span class="${className}">${index + 1}</span>`;
          },              
    },

    infinite: true,
    autoplay: true,
    speed: 1000,
    loop: true,
});

// products of the week - filtering cards

const mixer = mixitup('.products__cards');

const filterMenu = document.querySelector('.products__menu');
const menuLinks = document.querySelectorAll('.products__link');
filterMenu.addEventListener('click', function(evt){
    let target = evt.target;
    if(target.classList.contains('products__link')){
        menuLinks.forEach( elem => {
            elem.classList.remove('products__link--current');
        })
        target.classList.add('products__link--current');
    }
})