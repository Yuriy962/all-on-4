$(window).on('load', () => {

    var header = document.querySelector('.header__inner');
    var sticky = header.offsetTop;

    const menu = document.querySelector('.menu'),
    hamburger = document.querySelector('.hamburger'),
    menuItem = document.querySelectorAll('.menu__item');
    

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger--active');
        menu.classList.toggle('menu--active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('hamburger--active');
            menu.classList.remove('menu--active');
        });
    });


    $('a[href^="#"]:not(a.popup)').on('click', function() {
        let href = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(href).offset().top
        });
        return false;
    });

    $('.slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        adaptiveHeight: true,
        prevArrow: 
        '<button type="button" class="slick-arrow slick-prev">' +
            '<img src="../icons/arrow.png" alt="arrow">' +
        '</button>',
        nextArrow: 
        '<button type="button" class="slick-arrow slick-next">'+
            '<img src="../icons/arrow.png" alt="arrow">' +
        '</button>',
         responsive: [
             {
                 breakpoint: 1199,
                 settings: {
                    slidesToShow: 2
                 }
             },
            {
                 breakpoint: 767,
                 settings: {
                    slidesToShow: 1
                 }
             }
         ]
    });
    let formContent = '';
    // Тест формы -- раскомментировать и юзать при необходимости
    $("form").on("submit", (function (e) {
        e.preventDefault();
        let form = $(this);
        formContent = 
        '<h2 class="title title--popup text-center"> Спасибо, наш менеджер свяжется с Вами в ближайшее время </h2>' + 
            '<h3 class="text form-popup__text text-center">А пока можете ознакомится с другими нашими услугами на сайте <a href="https://ortoprof.ru/">ortoprof.ru</a> </h3>' + 
            '<div class="form__row form-popup__row">' +
            '<a class="btn form-popup__btn text-white" href="https://ortoprof.ru/" style="padding: 0">Перейти на сайт</a>' + 
        '</div>';
        console.log('success');
        form[0].innerHTML = formContent;
    }));

    // Отправка формы
    $("form").on("submit", (function (e) {
        e.preventDefault();
        let form = $(this);
        return $.ajax({
            type: "POST",
            url: "send.php",
            data: $(this).serialize(),
            success: function (e) {
                e = JSON.parse(e);
                formContent = 
                '<h2 class="title text-center form-popup__title"> Спасибо, наш менеджер свяжется с Вами в ближайшее время </h2>' + 
                    '<h3 class="subtitle text-center form-popup__subtitle">А пока можете ознакомится с другими нашими услугами на сайте <a href="https://ortoprof.ru/" style="color: #e35191">ortoprof.ru</a> </h3>' + 
                    '<div class="form__row form-popup__row">' +
                    '<a class="btn form-popup__btn text-white" href="https://ortoprof.ru/" style="padding: 0">Перейти на сайт</a>' + 
                '</div>';
                console.log('success');
                form[0].innerHTML = formContent;
                form.find("input[type='name'], input[type='tel']").val(""), $("form").trigger("reset");
            }
        });
    }));

    $().fancybox();

    $('input[type="tel"]').inputmask('+7 (999) 999-99-99');

});

// Map
YaMapsShown = false; 
$(window).scroll(function() {
    if (!YaMapsShown){
        if($(window).scrollTop() + $(window).height() > $(document).height() - 702) {      
        showYaMaps();
        YaMapsShown = true;
        }
    }
});
function showYaMaps(){
    var script   = document.createElement("script");
    script.type  = "text/javascript";
    script.src   = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A32062da92eafd2a9f620ab4b66e0726df9b6520bcd7502c0ff743d1ad9434ff3&amp;width=100%25&amp;height=100%&amp;lang=ru_RU&amp;scroll=true";
    document.getElementById("YaMap").appendChild(script);
}