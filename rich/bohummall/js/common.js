// 메인 비주얼 swiper
var swiper2 = new Swiper(".main_visual_swiper", {
    slidesPerView: 1,
    autoplay: {
        delay: 3000,
    },
    navigation: {
        prevEl: ".main-button-prev",
        nextEl: ".main-button-next",
    },
});

// header
var gnbbody = $('body');
var header_wrap = $('#header_wrap');
var headertop_menu = $('.header_top .menu_trigger');
var headergnb_menu = $('.header_gnb_wrap .menu_trigger');

// 열기
$(headertop_menu).click(function() {
    $(gnbbody).toggleClass('is_over');
    $(header_wrap).toggleClass('is_active');
    $(this).toggleClass("is_active");
});

// header_gnb 열고닫기
$('.gnb_droptit').on('click', function () {
    $(this).parent().toggleClass("is_active");
    $(this).find('.gnb_2depth').slideToggle('is_active');
});

// 더보기 버튼
function open_add_main_list(){
    $(".main_list_box > li").each(function(){
        $(this).show();
    });
    $(".best_open").hide();
    $(".best_close").show();
}
// 더보기 닫기버튼
function close_add_main_list(){
    $(".main_list_box > li").each(function(){
        if($(this).index() > 4){
            $(this).hide();
        }
    });
    $(".best_close").hide();
    $(".best_open").show();
}

// 제휴보험사 : 탭
$('.comcompany_menu a').click(function(e) {
    $('.comcompany_menu li').removeClass('is_active');
    $(this).parent().addClass('is_active');
    let currentTab = $(this).attr('href');
    $('.comcompany_cont > div').parent().toggleClass('is_lshow')
    $(currentTab).parent().toggleClass('is_fshow')
    e.preventDefault(); 
});

// 제휴보험사 : 롤링
$(document).ready(function(){
    $('.scroller_item1').bxSlider({
        minSlides: 4,
        maxSlides: 4,
        slideWidth: 90,
        slideMargin: 16,
        ticker: true,
        tickerHover: true,
        speed: 20000
    });
    $('.scroller_item2').bxSlider({
        minSlides: 4,
        maxSlides: 4,
        slideWidth: 90,
        slideMargin: 16,
        ticker: true,
        tickerHover: true,
        speed: 23000
    });
    $('.scroller_item3').bxSlider({
        minSlides: 4,
        maxSlides: 4,
        slideWidth: 90,
        slideMargin: 16,
        ticker: true,
        tickerHover: true,
        speed: 30000
    });
    $('.scroller_item4').bxSlider({
        minSlides: 4,
        maxSlides: 4,
        slideWidth: 90,
        slideMargin: 16,
        ticker: true,
        tickerHover: true,
        speed: 33000
    });
});

// quick
$(".quick-link-top").click(function() {
    $('html, body').animate({
    scrollTop : 0
    }, 400);
    return false;
});