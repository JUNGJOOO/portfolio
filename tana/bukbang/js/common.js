/*
* rwdImageMaps jQuery plugin v1.6
*
* Allows image maps to be used in a responsive design by recalculating the area coordinates to match the actual image size on load and window.resize
*
* Copyright (c) 2016 Matt Stow
* https://github.com/stowball/jQuery-rwdImageMaps
* http://mattstow.com
* Licensed under the MIT license
*/
;(function(a){a.fn.rwdImageMaps=function(){var c=this;var b=function(){c.each(function(){if(typeof(a(this).attr("usemap"))=="undefined"){return}var e=this,d=a(e);a("<img />").on('load',function(){var g="width",m="height",n=d.attr(g),j=d.attr(m);if(!n||!j){var o=new Image();o.src=d.attr("src");if(!n){n=o.width}if(!j){j=o.height}}var f=d.width()/100,k=d.height()/100,i=d.attr("usemap").replace("#",""),l="coords";a('map[name="'+i+'"]').find("area").each(function(){var r=a(this);if(!r.data(l)){r.data(l,r.attr(l))}var q=r.data(l).split(","),p=new Array(q.length);for(var h=0;h<p.length;++h){if(h%2===0){p[h]=parseInt(((q[h]/n)*100)*f)}else{p[h]=parseInt(((q[h]/j)*100)*k)}}r.attr(l,p.toString())})}).attr("src",d.attr("src"))})};a(window).resize(b).trigger("resize");return this}})(jQuery);

$OBJ = {
	'win' : $(window),
	'doc' : $(document),
	'html' : $('html')
}

function winW(){//창 너비
	return $OBJ.win.width();
}

function winH(){// 창 높이
	return $OBJ.win.height();
}

function winSh(){// 스크롤 값
	return $OBJ.win.scrollTop();
}

function mathceil(num){// 소수 점 올림
	return Math.ceil(num);
}

function mathfloor(num){// 소수 점 절사
	return Math.floor(num);
}


$(function() {
    // header select language
    if( $('.header-menu .select-box.lang').length){
        $('.select-box.lang .select-title').on('click', function(){
            $(this).parent().toggleClass('__open-select');
        });
    }
		

    // 정보.자료 - 메인03 관련사이트
    if($('.section-latest.site').length){
        var linkBtn = $('.section-latest.site .site-content > dl > dt > button'),
            linkClose = $('.section-latest.site .site-content .link-list .btn-close');

        linkBtn.on('click',function(){
            $(this).closest('dl').siblings('dl').children('.link-list').removeClass('__open');
            $(this).parent('dt').siblings('.link-list').addClass('__open');
        });
        linkClose.on('click',function(){
            $(this).parent('.link-list').removeClass('__open');
        });
    }

    // 카드뉴스 설정
    if ($('.cardnews-list').length) {
        $('.cardnews-list').not('.slick-initialized').slick({
            dots: true,
            arrows:true,
            mobileFirst:true,
            infinite: false,
            autoplay: false,
            slidesToShow: 1,
            nextArrow: '<button class="bnr-next"></button>',
            prevArrow: '<button class="bnr-prev"></button>'
        });
        $('.cardnews-list .slick-arrow').on('click',function(e){
            e.preventDefault();
        });
    }

    // sub lnb scrollbar
    if ($('.lnb').length) {
        $(".lnb").mCustomScrollbar({
            axis:"x", // horizontal scrollbar
            theme:"dark-thin"
        });
    }

    // sub2 비전.정책 9-bridge 전략
    if($('.bridge-strategy').length){
        $('.strategy-content > section').on('click',function(){
            $(this).addClass('__on').siblings('section').removeClass('__on');
        });
        // map effect
        var map = $('.img-map .map');
        var shadow = $('.img-map .map-shadow');
        var korea = $('.img-map .korea');
        var icons = $('.icon-group');
        var paths = $('#group-arrow > div');
        paths.each(function(i, e) {
            //e.style.strokeDasharray = e.style.strokeDashoffset = e.getTotalLength();
        });
        var tl = new TimelineMax();
        tl.add([
            TweenMax.staggerTo(map,    1, {opacity:1, delay:0.0, ease:Power3.easeIn}, 0.3),
            TweenMax.staggerTo(map,    1, {y:-20, delay:1, ease:Power3.easeIn}, 0.3),
            TweenMax.staggerTo(shadow, 1, {opacity:1, y:20, delay:1, ease:Power3.easeIn}, 0.3),
            TweenMax.staggerTo(korea,  1, {opacity:1, y:-30, delay:2.0, ease:Power3.easeIn}, 0.3),
            TweenMax.staggerTo(icons,  1, {opacity:1, y:30, delay:3.3, ease:Power3.easeIn}, 0.3),
            TweenLite.to(paths.eq(0),  1, {width:210, delay: 3.0, ease:Power3.easeIn}),
            TweenLite.to(paths.eq(1),  1, {width:465, delay: 3.3, ease:Power3.easeIn}),
            TweenLite.to(paths.eq(2),  1, {width:139, delay: 3.6, ease:Power3.easeIn}),
            TweenLite.to(paths.eq(3),  1, {width:164, delay: 3.9, ease:Power3.easeIn}),
            TweenLite.to(paths.eq(4),  1, {width:123, delay: 4.2, ease:Power3.easeIn}),
        ]);
    }

    // main4 소개.홍보 - 홍보영상 modal popup youtube
    if($('.section-mbox.quickmenu').length) {
        // main movie to play
        $('.quickmenu .movie').on('click', function(e) {
            e.preventDefault();
            $('body').addClass('__modal');
        });
        $('.pop-movie .btn-close').on('click', function(e) {
            e.preventDefault();
            $('body').removeClass('__modal');
            player.stopVideo();
            $('.section-mbox.quickmenu .movie').focus();
        });
    }
    // main04 timeline
    if($('.section-mbox.middle').length){
        var history01 = $('.bukbang-history .history01');
        var history02 = $('.bukbang-history .history02');
        var history03 = $('.bukbang-history .history03');
        var history04 = $('.bukbang-history .history04');
        var history05 = $('.bukbang-history .history05');
        var history06 = $('.bukbang-history .history06');
        var tl = new TimelineMax();
        tl.add([
            TweenMax.staggerTo(history01, 1, {opacity:1, y:-50, delay:0.0, ease:Power3.easeIn}, 0.3),
            TweenMax.staggerTo(history02, 1, {opacity:1, y:-50, delay:0.3, ease:Power3.easeIn}, 0.3),
            TweenMax.staggerTo(history03, 1, {opacity:1, y:-50, delay:0.6, ease:Power3.easeIn}, 0.3),
            TweenMax.staggerTo(history04, 1, {opacity:1, y:-50, delay:0.9, ease:Power3.easeIn}, 0.3),
            TweenMax.staggerTo(history05, 1, {opacity:1, y:-50, delay:1.2, ease:Power3.easeIn}, 0.3),
            TweenMax.staggerTo(history06, 1, {opacity:1, y:-50, delay:1.5, ease:Power3.easeIn}, 0.3),
        ]);
    }

    // sub4 소개.홍보 - 위원회의 역할
    if($('.div-role').length){
        $('.div-role .parts li').matchHeight({
            byRow: true,
            property: 'height'
        });
    }

    // sub4 sub4 소개.홍보 - 민간위원 슬라이드
    if($('.div-committeeman').length) {
        $('.div-committeeman .committeeman-content').slick({
            slidesToShow: 4,
            slidesToScroll: 4,
            dots:true,
            autoplay:false,
            prevArrow: '<button type="button" class="main bnr-prev">Pre</button>',
            nextArrow: '<button type="button" class="main bnr-next">Next</button>',
            responsive: [
                {
                    breakpoint: 1080,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots:false
                    }
                },
                {
                    breakpoint: 540,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots:false
                    }
                }
            ]
        });
    }

    //비전정책 지역별전략
    if( $(".section-area").length ){
    //초기화
        var resize_check = false;
        heightfix();

        $(".sub-title").on("click",function(e){
            e.preventDefault();
            $(".sub-title").removeClass("__on").next("div").removeClass("__vis");
            $(this).addClass("__on").next("div").addClass("__vis");
            $(".upper_img > img").removeClass("__vis");
            if( $(this).attr("href") == "#east" )
            {
                $(".upper_img > img._east").addClass("__vis");
            }
            else if( $(this).attr("href") == "#west" )
            {
                $(".upper_img > img._west").addClass("__vis");
            }
            else
                $(".upper_img > img._mid").addClass("__vis");
            heightfix();
        });

        $(window).resize(function(){
            if(resize_check !== false)
                clearTimeout(resize_check);
            resize_check = setTimeout(heightfix,200);
        });
    }

    // sitemap matchHeight
    if($('.article-sitemap').length){
        $('.article-sitemap .sitemap_Dept01 > li').matchHeight({
            byRow:true,
            property:'min-height'
        });
    }

    // select-box custom
    $('.select-custom').each(function(){
        var before_name = $.trim($(this).find('option:selected').text());
        $(this).find('label').text(before_name);
    });




		
    if( $('#head .lang').length){
        $('#head .select-title').on('click', function(){
            $(this).closest('.lang').toggleClass('__open-select');
        });
    }




});


function mChk(){// 모바일 체크
	return $('#mchk').is(':visible');
}

var head = {
	init : function(){
		if($('#head').length > 0){
			this.action();
		}
	},
	action : function(){
		var a = $('#head');
		var gnb = a.find('.gnb');
		var mnu = a.find('.menu')
		var nav = $('#nav');;
		var close = nav.find('.close');
		var navGnb = nav.find('.gnb button');

		gnb.on({
			'mouseenter' : function(){
				if(winW() > 1000){
					$OBJ.html.addClass('gnb-on');
				}
			},
			'mouseleave' : function(){
				if(winW() > 1000){
					$OBJ.html.removeClass('gnb-on');
				}
			}
		});
		
		mnu.on('click',function(){
			$OBJ.html.addClass('nav-on');
		});

		close.on('click',function(){
			$OBJ.html.removeClass('nav-on');
		});

		navGnb.on('click',function(){
			$(this).closest('li').toggleClass('active').siblings().removeClass('active');
		});

	}
};



var mcon = {
	init : function(){
		if($('.__mcon .box1 .link').length > 1){
			this.action();
		}
	},
	action : function(){
		var roll = $('.__mcon .box1 .roll');
		var go = $('.__mcon .box1 .go');
		var stop = $('.__mcon .box1 .stop');

		roll.slick({
			dots: true,
			infinite: true,
			speed: 300,
			autoplay: true,
			autoplaySpeed: 5000,
			dotsClass: 'dot'
		});


		go.on('click',function(){
			roll.slick('slickPlay');
		});
		stop.on('click',function(){
			roll.slick('slickPause');
		});

	}
};




var snb = {
	init : function(){
		if($OBJ.html.hasClass('sub')){
			this.action();
		}
	},
	action : function(){
		var svis = $('.sidebar');
		var dep = [];
		var tit = [];
		dep[0] = $('.gnb > .active').index();
		tit[0] = $('.gnb > .active > a').text();

		if($('.gnb > .active > ul > .active').length > 0){
			dep[1] = $('.gnb > .active > ul > .active').index();
			tit[1] = $('.gnb > .active > ul > .active > a').text();
		}

		if($('.gnb > .active > ul > .active > ul > .active').length > 0){
			dep[2] = $('.gnb > .active > ul > .active > ul > .active').index();
			tit[2] = $('.gnb > .active > ul > .active > ul > .active > a').text();
		}

		var dep1 = $('.gnb').html();

		svis.after('<div id="snb"><ul class="inner snb"><li class="home"><a href="/bukbang/"><i class="axi axi-home"></i><span class="blind">HOME</span></a></li></ul></div>');

		$('#snb').find('.snb').append('<li class="ov"><span>'+tit[0]+'</span><ul>'+dep1+'</ul></li>');
		if(dep.length >= 2){
			$('#snb').find('.snb').append('<li class="ov"><span>'+tit[1]+'</span><ul>'+$('.gnb > .active > ul').html()+'</ul></li>');
		}
		if(dep.length >= 3){
			$('#snb').find('.snb').append('<li class="ov"><span>'+tit[2]+'</span><ul>'+$('.gnb > .active > ul > .active > ul').html()+'</ul></li>');
		}
		$('#snb').addClass('leng'+dep.length);


		$(document).on('click','#snb .ov',function(){
			if(mChk()==true){
				$(this).closest('li').toggleClass('active').siblings().removeClass('active');
			}
		});

		$(document).on('mouseenter','#snb .ov',function(){
			if(mChk()==false){
				$(this).closest('li').addClass('active');
			}
		});
		$(document).on('mouseleave','#snb .ov',function(){
			if(mChk()==false){
				$(this).closest('li').removeClass('active');
			}
		});

	
		$('.sidebar .h2-title').text(tit[0]);
		$('.sub #content .h3-title').text(tit[1]);
		console.log(dep.length);
	}
};


var wide = {
	init : function(){
		if($('._wide').length > 0){
			this.action();
		}
	},
	action : function(){
		$OBJ.html.addClass('wide');
	}
};

var tab = {
	init : function(){
		if($('._tab').length > 0){
			this.action();
		}
	},
	action : function(){
		var a = $('._tab > *');
		var box = $('._tabbox');

		a.on('click',function(){
			$(this).addClass('active').siblings().removeClass('active');
			box.eq($(this).index()).addClass('active').siblings().removeClass('active');
		});
	}
};

var tab2 = {
	init : function(){
		if($('.__tab2').length > 0){
			this.action();
		}
	},
	action : function(){
		var a = $('.__tab2 > a');

		a.on('click',function(){
			$(this).closest('.__tab2').toggleClass('active');
		});
	}
};


var sitemap = {
	init : function(){
		if($('#sitemap').length > 0){
			this.action();
		}
	},
	action : function(){
		var a = $('#sitemap');
		a.html('<ul class="gnb">'+$('#nav .gnb').html()+'</ul>');
		$('#snb .snb > li').eq(1).children('span').text('사이트맵');
	}
};


function nPopOpen(num){
	$('.__pop').fadeIn(500);
	$('.__pop').find('.box').eq(num).addClass('active').siblings().removeClass('active');
}

function nPopClose(){
	$('.__pop').fadeOut(500);
}

$(document).ready(function(){
	head.init();
	mcon.init();
	tab.init();
	tab2.init();
	snb.init();
	wide.init();
	sitemap.init();
	$('img[usemap]').rwdImageMaps();
});

// select-box custom
function schange(id){
    var select_name = $('.select-custom #' + id).children('option:selected').text();
    $('.select-custom #' + id).siblings('label').text(select_name);
    //console.log(select_name);
}

//지역별전략 높이조절
function heightfix(){
    var content_h = $('div.detail_wrap.__vis').height();
    var btn_h = $("ul.area_list").height();
    $("ul.area_list").css("padding-bottom",content_h+42);
    $("div.detail_wrap.__vis").css("top",btn_h);
}