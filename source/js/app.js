$(document).ready(function () {
    'use strict';
    var data = {
        showMenu: false,
        showForm: true
    }

    /** Функции обработчики */

    function toggleMenu() {
        var menu = document.querySelector('.header__container'),
            burgerMenu = document.querySelector('.menu-button');

        burgerMenu.classList.toggle('menu-button_closed');
        menu.classList.toggle('header__container_active');
    }


    function toggleForm() {
        var flipper = document.querySelector('.flipper');
        var rotate = data.showForm ? 180 : 0;
        
        flipper.style.transform = `rotateY(${rotate}deg)`;
        data.showForm = !data.showForm;
    }

    function ajaxForm(form) {        
        $('.form__button').addClass('form__button_pending');

        $.ajax({
            type: $(form).attr('method'),
            url: $(form).attr('action'),
            data: $(form).serialize()
        }).done(function () {
            toggleForm();
            $(form).trigger("reset");;
        }).fail(function () {            
            $('.answer').addClass('answer_error');
            toggleForm();
        }).always(function () {
            setTimeout(
                function(){
                    $('.form__button').removeClass('form__button_pending');
                },
                2000
            );
        });
    }


    $('.menu-button').on('click', toggleMenu);

    $('.answer__button .button').on('click', toggleForm);

    $('#form').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                number: true,
                minlength: 10,
                maxlength: 10
            }
        },
        messages: {
            name: {
                required: "Поле 'Имя' обязательно к заполнению",
                minlength: "Введите не менее 2-х символов в поле 'Имя'"
            },
            email: {
                required: "Поле 'Email' обязательно к заполнению",
                email: "Необходим формат адреса email"
            },
            phone: {
                required: "Поле 'Сайт' обязательно к заполнению",
                number: "Телефон должен содержать только цифры",
                minlength: "Телефон должен содержать не менее 10 цифр",
                maxlength: "Телефон должен содержать не более 10 цифр",
            }
        },
        submitHandler: function (form, e) {
            e.preventDefault();            
            $('.answer').removeClass('answer_error');
            ajaxForm(form);
        }
    });

});
