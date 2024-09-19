// 스와이퍼
var swiper1 = new Swiper(".main_swiper", {
  pagination: {
    el: ".main_pagination",
    clickable: true
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  }
});
var swiper2 = new Swiper(".preview_swiper", {
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 15
});


// 플로팅
let $window = $(window);
$window.on('scroll', function() {
	$('.main_login').each(function(){
		var scrollTop = $window.scrollTop();
		var	scrollBottom = scrollTop + $window.height();
		var	contentOffset = $(this).offset();

		if(scrollBottom > contentOffset.top) {
			$('.wrap').addClass('is_scroll');
		}else{
			$('.wrap').removeClass('is_scroll');
		};
	});

	$('main .item_wrap').each(function(){
		var scrollTop = $window.scrollTop();
		var	scrollBottom = scrollTop;
		var	contentOffset = $(this).offset();

		if(scrollBottom > contentOffset.top) {
			$('.fixed_item').addClass('is_topfixed');
		}else{
			$('.fixed_item').removeClass('is_topfixed');
		};
	});

  var scroll = $(window).scrollTop();
  if (scroll >= 5) {
    $(".floating_side").show();
  } else {
    $(".floating_side").hide();
  }
});

// 맨위로
$("#btn_top").click(function () {
  $("html, body").animate({ scrollTop: 0 }, 500);
});

// 레이어팝업 열기
function openLayer(layercf) {
  $("." + layercf).fadeIn(200);
  $("body").addClass("is_body");
}
// 레이어팝업 닫기
$(".layer_close").on("click", function (e) {
  e.preventDefault();
  $("body").removeClass("is_body");
  $(".layercf").hide();
});
$(".dim_replace").on("click", function (e) {
  e.preventDefault();
  $(this).closest(".layercf").removeClass("is_active");
  $("body").removeClass("is_body");
  $(".layercf").fadeOut(200);
});

// 툴팁 닫기
function tooltip_close() {
  $(".item_tooltip").hide();
}

// tab
$('.item_main > div:nth-of-type(1)').show();
$('.item_top a').click(function(e) {
    $('.item_main > div').hide();
    $('.item_top li').removeClass('is_active');
    $(this).parent().addClass('is_active');
    let currentTab = $(this).attr('href');
    $(currentTab).show();
    e.preventDefault(); 
});