// Burger menu

const menu = document.querySelector('.menu');
const menuBtn = document.querySelector('.icon-menu');

menuBtn.addEventListener('click', function(){
    menu.classList.toggle('active');
    menuBtn.classList.toggle('active');
})

// top-slider

if(document.querySelector('.top-slider')){
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
}

// products of the week - filtering cards

if(document.querySelector('.products__cards')){
    const mixerProducts = mixitup('.products__cards',{
        selectors:{
            target: '.products__block',
            control: '.products__control'
        }
    });
}

if(document.querySelector('.filter-menu')){
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
}

// design mixitup

if(document.querySelector('.design__cards')){
    const mixerDesign = mixitup('.design__cards',{
        selectors:{
            target: '.design__block',
            control: '.design__control'

        }
    })
}

// video
if(document.querySelector('.video')){
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
}

// product sliders

if(document.querySelector('.product__pictures')){
    const productThumbs = new Swiper('.product__pictures', {
        slidesPerView: 1,

        effect: 'fade',

        speed: 1000,    

        thumbs: {
            swiper: {
                el: '.product__thumbs',

                slidesPerView: 3,
                direction: 'vertical',
                spaceBetween: 25,
            }
        }
    })
}

//product rating

if(document.querySelector('.product__rating')){
    $(function () { 
        $('.product__rating').rateYo({
            starWidth: '16px',
            ratedFill: "#ffcc00",
            rating: 3.6
        });       
    });
}

// order quantity buttons

if(document.querySelector('.product__quantity-change')){
    const changePlus = document.querySelector('.product__quantity-change--plus');
    const changeMinus = document.querySelector('.product__quantity-change--minus');
    const input = document.querySelector('.product__quantity-value');    

    changePlus.addEventListener('click', function(){
        input.value = Number(input.value) + 1;
    })
    changeMinus.addEventListener('click', function(){
        if(Number(input.value)>1){
            input.value=Number(input.value) - 1;
        }
    })
}

/// tabs

class Tabs {
    constructor(selector, options){
        let defaultOptions = {
            isChanged: () => {}
        }
        this.options = Object.assign(defaultOptions, options);
        this.selector = selector;
        this.tabs = document.querySelector(`[data-tabs = "${selector}"]`);
        if(this.tabs){
            this.tabList = this.tabs.querySelector('.tabs__nav');
            this.tabsBtns = this.tabList.querySelectorAll('.tabs__btn');
            this.tabsPanels = this.tabs.querySelectorAll('.tabs__panel');
        }else{
            console.error("The selector data-tabs doesn't exists");
            return;
        }
        this.check();
        this.init();
        this.events();
    }

    check(){
        if(document.querySelectorAll(`[data-tabs=${this.selector}]`).length > 1){
            console.error('More that one data-tabs element with the same name!')
            return;
        }

        if(this.tabsBtns.length !== this.tabsPanels.length){
            console.error('The quantity of tab buttons is not equal to tab panels');
            return;
        }
    }

    init(){
        this.tabList.setAttribute('role', 'tablist');

        this.tabsBtns.forEach((el, i) => {
            el.setAttribute('role', 'tab');
            el.setAttribute('tabindex', '-1');
            el.setAttribute('id', `${this.selector}${i + 1}`);
            el.classList.remove('tabs__btn--active');
        });
        this.tabsPanels.forEach((el, i) => {
            el.setAttribute('role', 'tabpanel');
            el.setAttribute('tabindex', '-1');
            el.setAttribute('aria-labelledby', this.tabsBtns[i].id);
            el.classList.remove('tabs__panel--active');
        });        

        this.tabsBtns[0].classList.add('tabs__btn--active');
        this.tabsBtns[0].removeAttribute('tabindex');
        this.tabsBtns[0].setAttribute('aria-selected', 'true');

        this.tabsPanels[0].classList.add('tabs__panel--active');
    }
    events(){
        this.tabsBtns.forEach((el, i) => {
            el.addEventListener('click', (e) => {
                let currentTab = this.tabList.querySelector('[aria-selected]');
                
                if(e.currentTarget !== currentTab){
                    this.switchTabs(e.currentTarget, currentTab);
                }
            });

            el.addEventListener('keydown', (e) => {
                let index = Array.prototype.indexOf.call(this.tabsBtns, e.currentTarget);
                let dir = null;

                if(e.which === 37){
                    dir = index - 1;
                }
                else if(e.which === 39){
                    dir = index + 1;
                }
                else if(e.which === 40){
                    dir = 'down';
                }

                if(dir !== null){
                    if(dir === 'down'){
                        this.tabsPanels[i].focus();
                    }
                    else if(this.tabsBtns[dir]){
                        this.switchTabs(this.tabsBtns[dir], e.currentTarget);
                    }
                    else{}
                }
            })
        });        
    }

    switchTabs(newTab, oldTab = this.tabsBtns.querySelector('[aria-selected]')){
        newTab.focus();
        newTab.removeAttribute('tabindex');
        newTab.setAttribute('aria-selected', 'true');

        oldTab.setAttribute('tabindex', '-1');
        oldTab.removeAttribute('aria-selected');

        let index = Array.prototype.indexOf.call(this.tabsBtns, newTab);
        let oldIndex = Array.prototype.indexOf.call(this.tabsBtns, oldTab);

        this.tabsPanels[oldIndex].classList.remove('tabs__panel--active');
        this.tabsPanels[index].classList.add('tabs__panel--active');

        this.tabsBtns[oldIndex].classList.remove('tabs__btn--active');
        this.tabsBtns[index].classList.add('tabs__btn--active');

        this.options.isChanged(this);
    }
}

if(document.querySelector('[data-tabs]')){
    const tabs1 = new Tabs('tabProduct', {
        isChanged: (tabs) => {}
    })
}

// related products slider

if(document.querySelector('.related__slider')){
    const relatedSlider = new Swiper('.related__slider', {
        slidesPerView: 4,
        spaceBetween: 30,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },

        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            550: {
                slidesPerView: 2,
            },
            900:{
                slidesPerView: 3,
            },
            1250: {
                slidesPerView: 4,
            }
        }
    });
}

//card rating

if(document.querySelector('.card__rating')){
    $(function () { 
        $('.card__rating').rateYo({
            starWidth: '16px',
            ratedFill: "#ffcc00",
            rating: 4.6,
            spacing: "10px",
        });       
    });
}

if(document.querySelector('.recent__rating')){
    $(function () { 
        $('.recent__rating').rateYo({
            starWidth: '10px',
            ratedFill: "#ffcc00",
            rating: 4.6,
            spacing: "5px",
        });       
    });
}

// changing products view
if(document.querySelector('.catalogue__nav-list')){
    const buttonList = document.querySelector('.catalogue__nav-list');
    const buttonGrid = document.querySelector('.catalogue__nav-grid');
    const pageWrapper = document.querySelector('.wrapper');

    buttonList.addEventListener('click', function(){
        pageWrapper.classList.add('catalogue-list');
        buttonGrid.classList.remove('button-active');
        buttonList.classList.add('button-active');
    })

    buttonGrid.addEventListener('click', function(){
        pageWrapper.classList.remove('catalogue-list');
        buttonList.classList.remove('button-active');
        buttonGrid.classList.add('button-active');
    })
}

// range slider

if(document.querySelector('.price__slider')){
    const priceSlider = document.querySelector('.price__slider');

    noUiSlider.create(priceSlider, {
        start: [200, 800],
        connect: true,
        range: {
            'min': 100,
            'max': 2000
        }
    });

    const input0 = document.querySelector('#input-from');
    const input1 = document.querySelector('#input-to');
    const inputs = [input0, input1];

    priceSlider.noUiSlider.on('update', function(values, handle){
        inputs[handle].value = Math.round(values[handle]);
    });

    function setRangeSlider(i, value){
        let arr = [null, null];
        arr[i] = value;

        priceSlider.noUiSlider.set(arr);
    }

    inputs.forEach((el, index) => {
        el.addEventListener('change', (e) => {
            setRangeSlider(index, e.currentTarget.value);
        })
    })
}

// filter-button with overlay

if(document.querySelector('.filter-button')){
    const filterButton = document.querySelector('.filter-button');
    const filtersMenu = document.querySelector('.filters');
    const overlay = document.querySelector('.overlay');

    filterButton.addEventListener('click', function(){
        filtersMenu.classList.toggle('filters-active');
        overlay.classList.toggle('overlay-active')
    });
    overlay.addEventListener('click', function(){
        filtersMenu.classList.remove('filters-active');
        overlay.classList.remove('overlay-active')
    })
}
