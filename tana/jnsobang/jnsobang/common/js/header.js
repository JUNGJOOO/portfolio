$( document ).ready(function() {



    $(window).resize(function (){
        var width = window.outerWidth;
        if (width <= 800) {
            $('#wrap > .contents').addClass('active');
            $('.jnsobang_wrap').addClass('active');
            $('.school_wrap').addClass('active');
            $('.voulenteer_wrap').addClass('active');
        }
        else if(width >= 800){
            $('#wrap > .contents').removeClass('active');
            $('.jnsobang_wrap').removeClass('active');
            $('.school_wrap').removeClass('active');
            $('.voulenteer_wrap').removeClass('active');

            $('.header').removeClass('active');
            $('#wrap > .contents').css('position', 'static').css('overflow-y','unset');
            $('.jnsobang_wrap').css('position', 'static').css('overflow-y','unset');
            $('.school_wrap').css('position', 'static').css('overflow-y','unset');
            $('.voulenteer_wrap').css('position', 'static').css('overflow-y','unset');

        }
    })
});



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
            $('.school_wrap').css('position', 'fixed').css('overflow-y','auto');
            $('.voulenteer_wrap').css('position', 'fixed').css('overflow-y','auto');

            // $('.contents').css('display', 'none');
            // $('.footer').css('display', 'none');
            // $('.jnsobang_wrap').css('display', 'none');
            // $('.school_wrap').css('display', 'none');
            // $('.voulenteer_wrap').css('display', 'none');
        } else { 
            $('.contents').css('position', 'static').css('overflow-y','auto');
            $('.jnsobang_wrap').css('position', 'static').css('overflow-y','auto');
            $('.school_wrap').css('position', 'static').css('overflow-y','auto');
            $('.voulenteer_wrap').css('position', 'static').css('overflow-y','auto');
            // $('.contents').css('display', 'block');
            // $('.footer').css('display', 'block');
            // $('.jnsobang_wrap').css('display', 'block');
            // $('.school_wrap').css('display', 'block');
            // $('.voulenteer_wrap').css('display', 'block');
        }
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
		$(".depth1_menu").hide();
		$(this).parent().find(".depth1_menu").show();
		$(".depth1 > li").removeClass("on");
               $(this).parent().addClass("on");
        });
    
	$(".depth1_item > a").on('click', function(e){ 
		$(this).parent().find(".depth1_menu").show();		
		e.stopPropagation()
	});

	$(".depth1_item").mouseleave(function(){
		$(".depth1_menu").hide();
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
});



$( ".toggle_menu_mb" ).click(function() {
    $( ".gnb_home_mb > a" ).focus();
});



// 모바일일때 탭메뉴 열리기

$(".gnb_allmb_depth2").hide();
$(".gnb_allmb_btn").on('click', function(e){ 
    $(this).parent().toggleClass("on");
    $(this).parent().find(".gnb_allmb_depth2").slideToggle();
    e.stopPropagation()
});