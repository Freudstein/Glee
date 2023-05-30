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

const mixerProducts = mixitup('.products__cards',{
    selectors:{
        target: '.products__block',
        control: '.products__control'
    }
});

const filterMenu = document.querySelectorAll('.filter-menu');
const menuLinks = document.querySelectorAll('.filter-menu__link');

filterMenu.forEach( menu => {
    menu.addEventListener('click', function(evt){
        let target = evt.target;
        if(target.classList.contains('filter-menu__link')){
            menuLinks.forEach( elem => {
                elem.classList.remove('filter-menu__link--current');
            })
            target.classList.add('filter-menu__link--current');
        }
    })
})

// design mixitup

const mixerDesign = mixitup('.design__cards',{
    selectors:{
        target: '.design__block',
        control: '.design__control'

    }
})

// video

const videoModule = document.querySelector('.video');
const videoButton = document.querySelector('.video__play-button');
videoButton.addEventListener('click', function(evt){
    const video = videoModule.querySelector('video');

    if(!videoModule.classList.contains('_init')){
        videoModule.classList.add('_active');
        videoModule.classList.add('_init');
            videoButton.classList.add('playing');
        video.play();
        video.muted = false;
    }else{
        if(video.paused){
            video.play();
        }
        else{
            video.pause();
        }
        videoModule.classList.toggle('_active');
        videoButton.classList.toggle('playing');            
    }
})