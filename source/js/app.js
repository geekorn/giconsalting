var Menu = (function () {
  var menu = document.querySelector('.header__container'),
    burgerMenu = document.querySelector('.menu-button');

  return {
    toggle: function () {
      burgerMenu.classList.toggle('menu-button_closed');
      menu.classList.toggle('header__container_active');
    }
  }
})();


(function() {
  'use strict';

  var menuButton = document.querySelector('.menu-button');

  menuButton.addEventListener('click', function() {
    Menu.toggle();    
  });

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
    submitHandler: function(form) {
      $(form).submit(function(e) {
        var $form = $(this);
        $.ajax({
          type: $form.attr('method'),
          url: $form.attr('action'),
          data: $form.serialize()          
        }).done(function() {
          console.log('success');
          $form.trigger("reset");;
        }).fail(function() {
          console.log('fail');
        });

        e.preventDefault(); 
      });
    }
 });


})();