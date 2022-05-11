$(function(){
    // Header logo reload page start
    let currentLink = window.location
    $('.header__logo').attr('href', `${currentLink}`)
    // Header logo reload page end
    
    // Load cards in mobile version start
    let cardClick = 0;
    $('.portfolio__btn').on('click', function(){
        if (cardClick == 0){
            $('[data-card=7]').css('display', 'inline-flex')
            $('[data-card=8]').css('display', 'inline-flex')
            $('[data-card=9]').css('display', 'inline-flex')
            $('[data-card=10]').css('display', 'inline-flex')
            $('[data-card=11]').css('display', 'inline-flex')
            $('[data-card=12]').css('display', 'inline-flex')
            cardClick++;
        } else if (cardClick == 1){
            $('[data-card=13]').css('display', 'inline-flex')
            $('[data-card=14]').css('display', 'inline-flex')
            $('[data-card=15]').css('display', 'inline-flex')
            cardClick++;
            $(this).css('display', 'none')
        }
        return
    })
    // Load cards in mobile version end

    // Theme swticher start
    $('.header__theme-item').on('click', function(e){
        e.preventDefault();
        $(this).toggleClass('active')
        $('html').toggleClass('night-theme')
    })
    // Theme swticher end

    // Scroll to section start
    $('a.scroll').on('click', function(e) {
        e.preventDefault();
        
        let href = $(this).attr('href');
    
        $('html, body').animate({
            scrollTop: $(href).offset().top - 40
        }, 800);
    
        return false;
    });
    // Scroll to section end

    // Open burger start
    $('.header__burger').on('click', function(){
        $(this).toggleClass('open')
        $(this).siblings('.header__right-bar').toggleClass('open')
    })

    $('.header__nav a').on('click', function(){
        $('.header__burger').removeClass('open')
        $('.header__right-bar').removeClass('open')
    })
    // Open burger end
    
    // Logic animation scroll start
    let scrollAnimCounter = 1;
    function scrollAnim(){
        if (scrollAnimCounter == 1){
            $('#scroll_1').addClass('active')
        }
        if (scrollAnimCounter == 2){
            $('#scroll_2').addClass('active')
        }
        if (scrollAnimCounter == 3){
            $('#scroll_3').addClass('active')
        }

        if (scrollAnimCounter == 4){
            $('#scroll_1').removeClass('active')
        }
        if (scrollAnimCounter == 5){
            $('#scroll_2').removeClass('active')
        }
        if (scrollAnimCounter == 6){
            $('#scroll_3').removeClass('active')
            scrollAnimCounter = 0;
        }

        scrollAnimCounter++;

        setTimeout(scrollAnim, 250)
    }

    scrollAnim();
    // Logic animation scroll end

    // Header sticky and message logic start
    $(window).scroll(windowScroll);

    function windowScroll() {
        if($(this).scrollTop() > 1) {
            $('.header').addClass('sticky');
            $('.message').addClass('sticky');
        } else {
            $('.header').removeClass('sticky');
        }
      }

    windowScroll();

    // Add message sticky with delay
    function messageSticky(){
        $('.message').addClass('sticky');
    }

    setTimeout(messageSticky, 9000);
    // Header sticky and message logic end


    // Message popup start
    $('.message__item.active').on('click', function(){
        $('.message').toggleClass('active')
    })
    // Message popup end

    // Lang switcher start
    $(".header__lang").hover(function(){ 
            if ($( document ).width() >= 1025){
                $('.header__lang-drop').addClass('active');
            }  
	    }, function(){ 
            if ($( document ).width() >= 1025){
                $('.header__lang-drop').removeClass('active');
            }
	  });

    $('#header__lang-btn').on('click', function(e){
        e.preventDefault();

        if ($( document ).width() <= 1024){
            $('.header__lang-drop').toggleClass('active');
        }
    })
    // Lang switcher end

    // Scroll btn logic start
    $('.title__scroll').on('click', function(e){
        e.preventDefault();
    })
    // Scroll btn logic end

    // Magnific popup start
    $('.popup-open').magnificPopup({
        removalDelay: 350,
        mainClass: 'mfp-fade',
        type: 'inline',
        preloader: false,
        focus: '#name',
        callbacks: {
            beforeOpen: function() {
                if($(window).width() < 700) {
                    this.st.focus = false;
                    } else {
                        this.st.focus = '#name';
                    }
                }
            }
    });
    
    $(document).on('click', '.popup-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

    $('.popup__link.disable').on('click', function(e){
        e.preventDefault();
    })

    $('.popup__zoom').on('click', function(){
        $(this).parent('.popup__full-image').toggleClass('full')
    })
    // Magnific popup end

    // Open popup on new page start

    let hashLink = window.location.hash;
    // Проверка, есть ли в hash '#' и исключение зарезервированных ссылок
    if (
        hashLink.search('#') == 0 && 
        hashLink != '#about' && 
        hashLink != '#portfolio' && 
        hashLink != '#services' && 
        hashLink != '#contacts'
        ){
        // Открытие попапа
        $.magnificPopup.open({
            items: {
                src: `${hashLink}`
            },
            mainClass: 'mfp-fade',
            type: 'inline'
        }, 0);
        // Сброс ссылки
        window.history.pushState("", document.title, window.location.pathname);   
    } else {
        return
    }
    // Open popup on new page end   
});