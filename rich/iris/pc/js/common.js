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
});

var limit = 0;
$('input[name~=insur-choice]').on('change', function(evt) {
   if($(this).parents('li').siblings().children(':checked').length == limit) {
       this.checked = true;
   }
});

$(".wrap-type2 main").on('scroll', function(){
    if ($("main").scrollTop() > 105) {
        $('.wrap').addClass("is_topfixed");
    } else {
        $('.wrap').removeClass("is_topfixed");
    }

});
$(".wrap-type3 main").on('scroll', function(){
    if ($("main").scrollTop() > 105) {
        $('.wrap').addClass("is_topfixed");
    } else {
        $('.wrap').removeClass("is_topfixed");
    }
});

// swiper ===================================================
var mySwiperFixed = new Swiper(".swiper_item_fixed", {
    effect: "slide",
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 28,
    allowTouchMove : false,
    loopFillGroupWithBlank : true,
    loop: true,
    speed: 0,
    navigation: {
        prevEl: ".item_prev",
        nextEl: ".item_next"
    },
});
var mySwiper = new Swiper(".swiper_item", {
    effect: "slide",
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 28,
    allowTouchMove : false,
    loopFillGroupWithBlank : true,
    loop: true,
    speed: 0,
    navigation: {
        prevEl: ".item_prev",
        nextEl: ".item_next"
    },
    pagination: {
        el: '.item_pagination',
        type: 'fraction',
        clickable: true,
        renderFraction: function (currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' + ' <em>|</em> ' + '<span class="' + totalClass + '"></span>';
        }
    },
    thumbs: {
        swiper: mySwiperFixed,
    },
});

// autoHeight : false, // 자동높이 사용여부 : 사용하지 않을시 기본값은 false
// watchOverflow : true // 슬라이드가 1개 일 때 pager, button 숨김 여부 설정