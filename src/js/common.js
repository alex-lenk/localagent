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
            1024: {
                slidesPerView: 4,
                spaceBetween: 40
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            }
        }
    });
});
