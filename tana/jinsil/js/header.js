$( document ).ready(function() {
    $('#btnToggleGnb').on('click', function (e) {
        if($('.gnb_all').hasClass('active')) {
            $('.gnb_all').removeClass('active');
            $('.nav_bg').removeClass('active');
            $('body').css('overflow-x', 'hidden');
        } else { 
            $('.gnb_all').addClass('active');
            $('.nav_bg').addClass('active');
            $('body').css('overflow-x', 'hidden');
        }
    });

    $('#btnToggleGnb_mb').on('click', function (e) {
        $(this).parent().parent().parent().toggleClass('active');
        if($(this).parent().parent().parent().hasClass('active')) {
            $('.contents').css('position', 'fixed').css('overflow-y','scroll');
            $('.jnsobang_wrap').css('position', 'fixed').css('overflow-y','auto');
        } else { 
            $('.contents').css('position', 'static').css('overflow-y','auto');
            $('.jnsobang_wrap').css('position', 'static').css('overflow-y','auto');
        }
    });

    $(window).resize(function (){
        var width = window.outerWidth;
        if (width <= 800) {
            $('#contents').addClass('active');
        }
        else if(width >= 800){
            $('#contents').removeClass('active');
            $('.header').removeClass('active');
            $('#contents').css('position', 'static').css('overflow-y','unset');
        }
    })
});




$('.language_select_wrap').on('click', function (e) {
    $('.langbtn_box').toggleClass('active');
    $(this).toggleClass('active');
});

// footer에서
$('#langbtn2').on('click', function (e) {
    $('.langbtn_box').toggleClass('active');
    $(this).toggleClass('active');
});



//웹접근성_주메뉴 탭하기 할때
$(function(){
	$(".depth1_item > a").mouseenter(function(){
		$(this).parent().find(".depth1_menu").show();
		$(".depth1 > li").removeClass("on");
        $(this).parent().addClass("on");
    });
	$(".depth1_item > a").on('click', function(e){ 
		$(this).parent().find(".depth1_menu").show();		
		e.stopPropagation()
	});
	$(".depth1_item").mouseleave(function(){
        $(".depth1 > li").removeClass("on");
	});
	$(".depth1_item > a").focus(function(){
		$(".depth1_menu").hide();
		$(this).next(".depth1_menu").show();
		$(".depth1 > li").removeClass("on");
               $(this).parent().addClass("on");
	});
	$(".depth2 > li:last > a").focusout(function(){
		$(".depth1_menu").hide();
    });
    $(".gnb_all .gnb_all_depth1 > li:last .gnb_all_depth2 li:last a").focusout(function(){
		$(".gnb_all").removeClass("active");
		$(".nav_bg").removeClass("active");
    })
});

$( ".toggle_menu_mb" ).click(function() {
    $( ".gnb_home_mb > a" ).focus();
});




// 모바일일때 탭메뉴 열리기
$(function(){
    $(".gnb_allmb_depth2").hide();
	$(".gnb_allmb_btn").on('click', function(e){ 
        $(this).parent().toggleClass("on");
		$(this).parent().find(".gnb_allmb_depth2").slideToggle();
		e.stopPropagation()
    });
});