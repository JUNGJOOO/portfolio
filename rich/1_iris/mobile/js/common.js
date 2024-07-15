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
<script type="text/javascript">
$( ".tooltip_hide" ).click( function() {
    $(this).parent().hide();
});
