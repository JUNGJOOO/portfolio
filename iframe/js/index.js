$(document).ready(function(){
    //헤더 스크롤되면 헤더에 그림자넣기 
    $(window).on('scroll', function(){
        var scroll = $(this).scrollTop();
        console.log(scroll);
    });
    
    //리뷰와 리스트
    $('header .notice h2 a').on('mouseenter', function(){
        $(this).parent().next().stop().fadeIn();
        $(this).parent().parent().siblings().find('ul').stop().fadeOut();
    });
    $('header .notice ul').on('mouseenter', function(){
       $(this).stop().fadeIn(); 
    });
    $('header .notice ul').on('mouseleave', function(){
        $(this).stop().fadeOut();
    });
    //반응형 
    $(".list_list li").on("click",function(){
        var idx = $(this).index();
        console.log(idx);
        $(".res ul").eq(idx).fadeIn();
        $(".res ul").eq(idx).siblings().fadeOut();
    });
    $(".res ul li").on("click", function(){
        var idx2 = $(this).index();
        console.log(idx2);
        $(this).addClass("on");
        $(this).siblings().removeClass("on");
        if( idx2 === 0){
            $(".iframe iframe").css('width',100+"%");
        }else if( idx2 === 1){
            $(".iframe iframe").css('width',1400+"px");
        }else if( idx2 === 2){
            $(".iframe iframe").css('width',900+"px");
        }else if( idx2 === 3){
            $(".iframe iframe").css('width',490+"px");
        }
    });
});