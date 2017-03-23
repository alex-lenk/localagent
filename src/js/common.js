$(document).ready(function () {
    $(".navbar-toggle").click(
        function () {
            $('.navbar-menu').toggleClass("navbar-menu__active");
        }
    );

    $('.insurance-type-point').on('click', function () {
        $('.insurance-type-point').removeClass('current');
        $(this).addClass('current');
    });

    var swiper = new Swiper('.partners-carousel', {
        grabCursor: true,
        slidesPerView: 5,
        breakpoints: {
            1199: {
                slidesPerView: 4
            },
            991: {
                slidesPerView: 3
            },
            767: {
                slidesPerView: 2
            },
            320: {
                slidesPerView: 1
            }
        }
    });

    var statisticsCarousel = new Swiper('.statistics-carousel', {
        grabCursor: true,
        slidesPerView: 2,
        spaceBetween: 30
    });
});
