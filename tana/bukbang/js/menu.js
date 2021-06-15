$(function(){
	var delay = 300;
	var timer = null;
	resizeHandler();

	$(window).resize(function(){
		clearTimeout(timer);
		timer = setTimeout(resizeHandler,delay);
	});

});

function resizeHandler() {
	var width = $(window).innerWidth();
	if(width < 1025) {
		removeEvent();
		mobileNav();
	}else{
		removeEvent();
		pcNav();
	}
}

function removeEvent() {
	$('#gnb li,#gnb a,#gnb button,#gnb div').off('mouseover mouseout mouseleave focus blur click');
}

function pcNav(){
	$('#gnb').removeClass('mobile');
	if($('#gnb').hasClass('open')){
		$('#gnb').removeClass('open');
		$('#gnb div,#gnb ul').removeClass('open');
	}
	if($('button.btn-menu-close').length){
		$('button.btn-menu-close').remove();
	}
	$('.gnb-container > ul > li ').removeClass('__over');
	var navWrap = $('.gnb-container');
	var nav = navWrap.find('> ul > li');
	var navA = nav.find('a');
	var navDiv = $('.menu-div');
	var navbg = $('.nav-bg');

	$('.btn-menu-close').on('click',function(){
		$('#gnb').removeClass('__over-all');
		//navbg.css({'height':0});
		navbg.css({'opacity':0});
	});
	nav.on('mouseover focus', function(e) {
		//var menuDivHeight = $(this).children('.menu-div').height()-15;
		var menuDivHeight = 105;
		//navWrap.addClass('__over-type');
		$('#gnb').removeClass('__over-all');
		$(this).addClass('__over').siblings('li').removeClass('__over');
		if ($(this).children('.menu-div').length){
			navbg.css({'height':menuDivHeight});
			navbg.css({'opacity':1});
		}
	}).on('mouseleave', function(e) {
		nav.removeClass('__over');
		if (!$('#gnb').hasClass('__over-all')) {
			navbg.css({'height':0});
			navbg.css({'opacity':0});
		}
	});
	navDiv.on('mouseover focus', function(e) {
		nav.removeClass('__over');
		$(this).parent().addClass('__over');
	});
	navWrap.on('mouseleave',function(e) {
		nav.removeClass('__over');
		//navWrap.removeClass('__over-type');
		if (!$('#gnb').hasClass('__over-all')) {
			navbg.css({'height':0});
			navbg.css({'opacity':0});
		}
	});
	$('.gnb-container > ul > li > a').on('focus', function(e) {
		//var menuDivHeight = $(this).next('.menu-div').height()-15;
		var menuDivHeight = 105;
		//navWrap.addClass('__over-type');
		$('#gnb').removeClass('__over-all');
		$(this).parent('li').addClass('__over').siblings('li').removeClass('__over');
		if ($(this).next('.menu-div').length){
			navbg.css({'height':menuDivHeight});
			navbg.css({'opacity':1});
		}
	});
	$('*').not(navA).on('focus',function() {
		nav.removeClass('__over');
		//navWrap.removeClass('__over-type');
		if (!$('#gnb').hasClass('__over-all')) {
			navbg.css({'height':0});
			navbg.css({'opacity':0});
		}
	});
}

function mobileNav(){
	var $gnb = $('#gnb'),
		$gnbWrap = $('.gnb-wrap'),
		$gnbCon = $('.gnb-container'),
		$body = $('body');
	$gnb.addClass('mobile');
	$('.btn-menu').on('click', function(e){
		e.preventDefault();
		$gnb.addClass('open');
		$body.addClass('menuopen');
	});
	if(!$('button.btn-menu-close').length){
		$gnbWrap.append('<button type="button" class="btn-menu-close fa fa-times"><span class="blind">주 메뉴 닫기</span></button>');
	}
	// accordion menu : Mobile menu 1depth
	$('.top-menu > li > button').on('click', function(e) {
		e.preventDefault();
		if($(this).hasClass('open')){
			$(this).removeClass('open');
		}else{
			$('.top-menu > li > button').removeClass('open');
			$(this).addClass('open');
		}
		if($(this).next().hasClass('open')){
			$(this).next().removeClass('open');
		}else{
			$('.top-menu > li > div').removeClass('open');
			$(this).next().addClass('open');
			$('.top-menu > li > div > ul > li > a').removeClass('on').next().removeClass('open');
		}
	});
	// Add class to the 2 depth menu
	$('.top-menu > li > div > ul > li > a').each(function(){
		if ($(this).closest('li').find('ul').length) {
			$(this).addClass('fa hasChild');
		}
	});
	// accordion menu : Mobile menu 2depth
	$('.top-menu > li > div > ul > li > a').on('click', function(e) {
		if ($(this).closest('li').find('ul').length) {
			e.preventDefault();
			if($(this).next().hasClass('open')){
				$(this).removeClass('on').next().removeClass('open');
			}else{
				$('.top-menu > li > div > ul > li > a').removeClass('on').next().removeClass('open');
				$(this).addClass('on').next().addClass('open');
			}
		}
	});
	// btn close
	$('.btn-menu-close').on('click', function(){
		$('#gnb').removeClass('open');
		$('#gnb div,#gnb ul').removeClass('open');
		$('body').removeClass('menuopen');
	});
}
$(document).ready(function(){
	setTimeout(function() {
		menuchangeer();
	}, 500);
});

function menuchangeer(){
	var fnode1 = $("#snb").children(":first").children(".ov");
	var txt = "";
	if(fnode1.length > 0){		
		for(i=0;i<fnode1.length;i++){
			//console.log("fnode1 = "+fnode1.length);
			var fnode2 = fnode1.eq(i);
			if(fnode2.length > 0){
				for(ii=0;ii<fnode2.length;ii++){
					//console.log("fnode2 = "+fnode2.length);
					//console.log(fnode2.children(":first").html());
					txt = fnode2.children(":first").html();
				}
			}
		}
	}
	if(txt != ""){
		$(".h3-title").html(txt);
	}
}