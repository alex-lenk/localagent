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
        slidesPerView: 2
    });
});

$(function () {
    //Chrome Smooth Scroll
    try {
        $.browserSelector();
        if ($("html").hasClass("chrome")) {
            $.smoothScroll();
        }
    } catch (err) {
    }

    $("a").on("dragstart", function (event) {
        event.preventDefault();
    });
});



const insuranceInput = $('.insurance-input');

insuranceInput.click(function () {
    $(this).toggleClass('current-input').parent().toggleClass('active-input');
    inputSelect.slideToggle();
    input_wrapperSpan.toggleClass('act_ar');
});



const cars_name = $('.cars_name');
const cars_model = $('.cars_model');
const cars_year = $('.cars_year');

const firma = $('.firma');
const model = $('.model');
const model_year = $('.model_year');

const input_wrapperSpan = $('.active_arrow');
const inputSelect = $('.input_select');


input_wrapperSpan.click(function () {
    $(this).toggleClass('act_ar');
});


$('.input_wrapper input').click(function () {
    $(this).toggleClass('active_input');
    inputSelect.slideToggle();
    input_wrapperSpan.toggleClass('act_ar');
});

$('.select_cars.firma a').click(function () {
    $('.select_cars.model').toggleClass('active_tab');
    $('.select_cars.firma').removeClass('active_tab');
    $('.car-brand').addClass('hide');
    $('.car-model').removeClass('hide');
    $('.selected-car').removeClass('not-complete-car');
});

$('.select_cars.model a').click(function () {
    $('.select_cars.model_year').toggleClass('active_tab');
    $('.select_cars.model').removeClass('active_tab');
});

$('.select_cars.firma a').click(function () {
    var text = $(this).text();
    $('.input_wrapper input.cars_name').val(text);
    $('.input_wrapper input.cars_name').addClass('active_input_wrap');
    $('.for_mm .active_arrow').addClass('active_tab');
});

$('.select_cars.model a').click(function () {
    var text = $(this).text();
    $('.input_wrapper input.cars_model').val(text);
    $('.input_wrapper input.cars_model').addClass('active_input_wrap');
    $('.for_mmm .active_arrow').addClass('active_tab');
    $('.for_mmm').css('z-index', '0');
});

$('.select_cars.model_year a').click(function () {
    var text = $(this).text();
    $('.input_wrapper input.cars_year').val(text);
    $('.input_wrapper input.cars_year').addClass('active_input_wrap');
    $('.for_mm .active_arrow').addClass('active_tab');
    $('.for_mmmm .active_arrow').addClass('active_tab');
    $('.for_mmmm').css('z-index', '0');
    inputSelect.css('display', 'none');
    input_wrapperSpan.removeClass('act_ar');
});

$('.cars_name.active_input_wrap.active_input').click(function () {
    inputSelect.slideToggle();
    $('.select_cars.firma').toggleClass('active_tab');
});

$('.cars_model.active_input_wrap').click(function () {
    inputSelect.slideToggle();
    $('.select_cars.model').toggleClass('active_tab');
});

$('.cars_year.active_input_wrap').click(function () {
    inputSelect.slideToggle();
    $('.select_cars.model_year').toggleClass('active_tab');
});


cars_name.click(function () {
    if (cars_name.hasClass('active_input_wrap') && cars_model.hasClass('active_input_wrap') && cars_year.hasClass('active_input_wrap')) {
        firma.css('display', 'block');
        model.css('display', 'none');
        model_year.css('display', 'none');
        $('.firma a').bind('click', function () {
            inputSelect.css('display', 'none');
        });
        $('.for_mm .active_arrow').toggleClass('act_ar');
    }
});

cars_model.click(function () {
    if (cars_name.hasClass('active_input_wrap') && cars_model.hasClass('active_input_wrap') && cars_year.hasClass('active_input_wrap')) {
        firma.css('display', 'none');
        model.css('display', 'block');
        model_year.css('display', 'none');
        $('.model a').bind('click', function () {
            inputSelect.css('display', 'none');
        });
        $('.for_mmm .active_arrow').toggleClass('act_ar');
    }
});

cars_year.click(function () {
    if (cars_name.hasClass('active_input_wrap') && cars_model.hasClass('active_input_wrap') && cars_year.hasClass('active_input_wrap')) {
        firma.css('display', 'none');
        model.css('display', 'none');
        model_year.css('display', 'block');
        $('.model_year a').bind('click', function () {
            inputSelect.css('display', 'none');
        });
        $('.for_mmmm .active_arrow').toggleClass('act_ar');
    }
});
