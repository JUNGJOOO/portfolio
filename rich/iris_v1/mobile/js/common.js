$(document).ready(function() {
    $('.js-select').css('color','#c0c0c0');
    $('.js-select').change(function() {
       var current = $('.js-select').val();
       if (current != 'null') {
           $('.js-select').css('color','#444');
       } else {
           $('.js-select').css('color','#c0c0c0');
       }
    }); 

    $('select').niceSelect();

    // modal 스크롤시 
    $(".modal_body").on('scroll', function(){
        $(".modal").addClass("is_fixed");
    });

    // wrap-type2
    $(window).scroll(function() {
        if ($(document).scrollTop() > 250) {
            $(".wrap-type2").addClass("is_topfixed");
        } else {
            $(".wrap-type2").removeClass("is_topfixed");
        }
    });

    // wrap-type3
    $(window).scroll(function() {
        if ($(document).scrollTop() > 400) {
            $(".wrap-type3").addClass("is_topfixed");
        } else {
            $(".wrap-type3").removeClass("is_topfixed");
        }
    });

});

var limit = 0;
$('input[name~=insur-choice]').on('change', function(evt) {
   if($(this).parents('li').siblings().children(':checked').length == limit) {
       this.checked = true;
   }
});

// swiper ===================================================
var mySwiperFixed = new Swiper(".swiper_item_fixed", {
    effect: "slide",
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 10,
    allowTouchMove : true,
    loopFillGroupWithBlank : true,
    loop: false,
    auto: false,
    navigation: false,
    speed: 500,
});
var mySwiper = new Swiper(".swiper_item", {
    effect: "slide",
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 10,
    allowTouchMove : true,
    loopFillGroupWithBlank : true,
    loop: false,
    auto: false,
    navigation: false,
    speed: 500,
});
mySwiper.controller.control = mySwiperFixed;
mySwiperFixed.controller.control = mySwiper;

// swiper 기본 결과
var addSwiper = new Swiper(".swiper_add", {
    slidesPerView: 'auto',
    spaceBetween: 8,
    slidesOffsetBefore: 20,
    slidesOffsetAfter: 20
});

$( ".tooltip_hide" ).click( function() {
    $(this).parent().hide();
});

// 팝업 열기
function openLayer(cf) {
    $("." + cf).fadeIn(10);
    $("body").addClass("is_body");
    $(".graph").addClass("is_active");
}
// 팝업 닫기
$(".layer_close").on("click", function (e) {
    e.preventDefault();
    $(this).closest(".cf").removeClass("is_active");
    $("body").removeClass("is_body");
    $(".cf").fadeOut(10);
});
// 모달 닫기
$(".modal_close").on("click", function (e) {
    e.preventDefault();
    $(this).closest(".modal").removeClass("is_active");
    $("body").removeClass("is_body");
    $(".modal").fadeOut(10);
});

// 그 외 영역 클릭시 닫기
$(".dim_replace").on("click", function (e) {
    e.preventDefault();
    $(this).closest(".cf").removeClass("is_active");
    $("body").removeClass("is_body");
    $(".cf").fadeOut(10);
});

