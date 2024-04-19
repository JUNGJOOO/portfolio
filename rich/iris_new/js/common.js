$(document).ready(function() {
	$('select').niceSelect();

	// item-1th
	$(".item-1th").mouseover(function(){
		$(".item-1th").addClass("is_mouse"); 
		$(".fixed_item .item-1th").addClass("is_mouse"); 
	})
	$(".item-1th").mouseout(function(){
		$(".item-1th").removeClass("is_mouse");
	});

	// item-2th
	$(".item-2th").mouseover(function(){
		$(".item-2th").addClass("is_mouse"); 
	})
	$(".item-2th").mouseout(function(){
		$(".item-2th").removeClass("is_mouse");
	});

	// item-3th
	$(".item-3th").mouseover(function(){
		$(".item-3th").addClass("is_mouse"); 
	}
	$(".item-3th").mouseout(function(){
		$(".item-3th").removeClass("is_mouse");
	});

	// 팝업오픈
	$('.layer_open').on('click', function(e) {
        e.preventDefault();
        var el = $($(this).attr('href'));
        if (!el.hasClass('is_active')) {
            el.addClass('is_active');
        } else {
            el.removeClass('is_active');
        }
        $('body').addClass('is_body');
    });
    $('.layer_close').on('click', function(e) {
        e.preventDefault();
        $(this).closest('.layer').removeClass('is_active');
        $('body').removeClass('is_body');
    });

});

$(window).scroll(function() {
	var scroll = $(window).scrollTop();
	// stpe1
	if (scroll >= 275) {
		$(".wrap-step1 .fixed_item").addClass("is_topfixed");
	} else {
		$(".wrap-step1 .fixed_item").removeClass("is_topfixed");
	}

	// step2
	if (scroll >= 90) {
		$(".wrap-step2 .fixed_item").addClass("is_topfixed");
	} else {
		$(".wrap-step2 .fixed_item").removeClass("is_topfixed");
	}

	// step3
	if (scroll >= 175) {
		$(".wrap-step3 .fixed_item").addClass("is_topfixed");
	} else {
		$(".wrap-step3 .fixed_item").removeClass("is_topfixed");
	}
});

// swiper
var swiper = new Swiper(".swiper_preview", {
	effect: "slide",
	slidesPerView: 1,
	speed: 500,
	loop: true,
	navigation: {
		nextEl: ".preview-button-next",
		prevEl: ".preview-button-prev",
	},
	pagination: {
		el: ".preview-pagination",
		type: "fraction",
		clickable : true,
		formatFractionCurrent: function (number) {
			return '서비스 미리보기 ' + number;
		}
	}
});

// 레이어팝업 열고닫기
function openLayer(layer) {
	$("." + layer).fadeIn(200);
	$("body").addClass('is_body')
}
$(".layer_close").click(function() {
	$('.layer').fadeOut(200);
	$("body").removeClass('is_body')
});

// 맨위로
$("#btn_qtop").click( function() {
	$('html, body').animate({scrollTop:0},500);
});

// 툴팁 닫기
function tooltip_close() {
	$(".item_tooltip").hide()
}

// skeleton 실행취소
function timer(){
	$(".wrap-step3").removeClass("is_skeleton");
}
var timerVar = setTimeout(timer, 5000);