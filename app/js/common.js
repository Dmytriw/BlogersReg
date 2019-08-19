$(function () {
    var
        w = $(window).width();

    $('.popup__container').on('scroll', function(e){
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    // $("input[type='tel']").mask("+79999999999");

    $('input').focus(function () {
       $(this).closest('.label__popup').removeClass('errorInput');
    });

    navigation();
    closingPopups();



    ////////////////////
    //Відкриття попапів
    $('.openPopup').click(function (e) {
        e.preventDefault();

        var
            $this = $(this),
            thisHref = $this.attr('href'),
            thisPopup = $(thisHref);

        var scrollWidth = window.innerWidth - document.documentElement.clientWidth;

        $('.popup__container').hide();
        thisPopup.show();
        $('body, html').css({'overflow' : 'hidden'});
        $('html').css({'padding-right' : scrollWidth+'px'});
        $('.header').css({'right' : scrollWidth+'px'});
    });


    //////////////////
    //Забули пароль
    $('.gorget__pass').click(function (e) {
        e.preventDefault();

        $('.enter__container').hide();
        $('.forget__container').show();

        $('.popup__warning').hide();
    });

    $('.forget__container .back__popup').click(function (e) {
        e.preventDefault();

        var
            $this = $(this),
            thisContainer = $this.closest('.forget__step');

        if(thisContainer.hasClass('firstStep')) {
            $('.forget__container').hide();
            $('.enter__container').show();
            $('.popup__warning').show();
        } else {
            $('.forget__step').hide();
            thisContainer.prev().show();
        }
    });

    $('.reg__container .back__popup').click(function (e) {
        e.preventDefault();

        var
            $this = $(this),
            thisContainer = $this.closest('.reg__container');

        $('.reg__container').hide();
        thisContainer.prev().show();
    });



    $('.sendRepeat').click(function (e) {
        e.preventDefault();

        var
            $this = $(this),
            theCount = $this.next().find('.countdown'),
            thisNum = $this.next().find('.trayNum'),
            thisTheNum = parseInt(thisNum.text()) + 1;

        if(!$this.hasClass('blockButton')) {
            $('.firstStep').submit();
            thisNum.text(thisTheNum);
            $this.next().show();
            countdown(60, theCount, $this);
            $this.addClass('blockButton')
        }

    });

    //////////////////
    $('.inputFalse').click(function (e) {
        e.preventDefault();

        var
            $this = $(this),
            thisLabel = $this.closest('.agreeLabel'),
            thisUnput = thisLabel.find('input');

        if(!thisLabel.hasClass('checked')) {
            thisLabel.addClass('checked');
            thisUnput.prop('checked', true);
        } else {
            thisLabel.removeClass('checked');
            thisUnput.prop('checked', false);
        }

        thisLabel.removeClass('errorInput');
    });




    /////////////////
    $('.notSms').click(function (e) {
        e.preventDefault();

        var
            $this = $(this);

        if(!$this.hasClass('showedTool')) {
            $this.addClass('showedTool');
        } else {
            $this.removeClass('showedTool');
        }
    });

    $('body').click(function (evt) {
        if(!$(evt.target).is('.notSms, .notSms span')) {
            $('.showedTool').removeClass('showedTool');
        }
    });



    $('.head_open_sekect').click(function () {
        var
            $this = $(this),
            thisSelect = $this.next();

        if(!$this.hasClass('openedSel')) {
            $('.head__select__container').hide();
            $('.head_open_sekect').removeClass('openedSel');
            $this.addClass('openedSel');
            thisSelect.show();
        } else {
            $this.removeClass('openedSel');
            thisSelect.hide();
        }
    });

    $('body').click(function (evt) {
        if(!$(evt.target).is('.head_open_sekect')) {
            $('.head_open_sekect').removeClass('openedSel');
            $('.head__select__container').hide();
        }
    });

});



//Меню в хедері
function navigation() {
    $('.hamburger__button').click(function (e) {
        e.preventDefault();

        var windowTop = $(window).scrollTop();

        setTimeout(function () {
            $('body').attr('data-top', windowTop);
            $('.header__nav__container').addClass('openedNav');
            $('html, body').css({'overflow' : 'hidden', 'position' : 'fixed'});

            var windowTopData = $('body').attr('data-top');

            $('body').scrollTop(windowTopData);
        }, 50);
    });

    $('.vav__close, .nav__overlay').click(function (e) {
        e.preventDefault();

        var windowTop = $('body').attr('data-top');

        $('.header__nav__container').removeClass('openedNav');
        $('html, body').css({'overflow' : 'visible', 'position' : 'relative'});

        $(window).scrollTop(windowTop);

    });

}



//Зворотній відлік
function countdown(start, count, button) {
    var counter = start;

    console.log(count);

    setInterval(function() {
        counter--;
        if (counter >= 0) {
            count.html(counter);
        }
        if (counter === 0) {
            clearInterval(counter);
            button.removeClass('blockButton');
            button.css({'display' : 'block'});
        }

    }, 1000);
}

//Попапи
function closingPopups() {
    $('.popup__close_reg, .popups__overlay').click(function (e) {
        e.preventDefault();

        $('.popup__container').hide();
        $('body, html').css({'overflow' : 'visible'});
        $('html').css({'padding-right' : '0'});
        $('.header').css({'right' : '0'});
    });
}




