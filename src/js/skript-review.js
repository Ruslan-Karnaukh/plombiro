$(document).ready(function(){
    $('.slider').slick({
        dots: true,
        adaptiveHeight: true,
        speed: 3000,
        easing: 'easeInExpo',
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnFocus: true,
        pauseOnHover: true,
        pauseOnDotsHover: true,
        touchThreshold: 10,
        waitForAnimate: false,
        
    });
    
    $('.slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        console.log('currentSlide');
    });    
    $('.slider').on('afterChange', function (event, slick, currentSlide) {
        console.log('currentSlide');
    });
});