function navToggle(){
    $('.header-trigger').toggleClass("js-close");
    
    if ($('.header-trigger').hasClass('js-close')) {
        $("body").addClass('is_over');
        $(".dimmed").fadeIn();
        $(".header-gnb-wrap").addClass('is_active');
    } else {
        $("body").removeClass('is_over');
        $(".dimmed").fadeOut();
        $(".header-gnb-wrap").removeClass('is_active');
    };
};

$('.gnb-consult > a').on('click', function () {
    $(this).parent().toggleClass("is_active");
    $(this).next('.gnb-2depth').slideToggle();
    return false;
});

// 공통 레이어 열기
$('.layer-open').on('click', function(e) {
    e.preventDefault();
    var el = $($(this).attr('href'));
    if (!el.hasClass('is-active')) {
        el.addClass('is-active');
    } else {
        el.removeClass('is-active');
    }
    $('body').addClass('is-body');
});

// 공통 레이어 닫기
$('.layer-close').on('click', function(e) {
    e.preventDefault();
    $(this).closest('.has-common').removeClass('is-active');
    $('body').removeClass('is-body');
});