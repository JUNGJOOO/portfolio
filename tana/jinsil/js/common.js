$(document).ready(function() {
// pc : 전체메뉴 열기 닫기
    (function(){
        $(".gnb_menu_list").bind("mouseenter focusin hover", function(e) {
            $(this).addClass( "on" );
            e.stopPropagation();
        });
        $(".gnb_menu_list").bind("mouseleave focusout", function() {
            $(".gnb_menu_list").removeClass('on');
        })
    })();

// tablet : 햄버거메뉴 열기 닫기
    $( "#btn_sitemap" ).click( function() {
        $("body").toggleClass( "is_tablet" );
    });
    $( "#btn_allmenu" ).click( function() {
        $("body").toggleClass( "is_mobile" );
    });

// mobile : 햄버거메뉴 열기 닫기
    $( "#btnToggleGnb_mb" ).click( function() {
        $(".header").toggleClass( "active" );
    });

    $(".gnb_menu_list > a").on('click', function(e){
        $(this).parent().toggleClass("is_open");
        $(this).parent().find(".gnb_allmb_depth2").slideToggle();
        e.stopPropagation()
    });


    $(".gnb_allmb_depth1 > li:nth-of-type(5) > a").bind("mouseleave focusout", function() {
        $("#btnToggleGnb_mb").attr("tabindex", 0).focus()
    })

// tab
    $('.tab_drop > .tab_dropbtn').on('click', function (e) {
        $('.tab_drop > .tab_default').toggleClass('active');
        $(this).toggleClass('active');
    });

    $('.tab_drop2 > .tab_dropbtn').on('click', function (e) {
        $('.tab_drop2 > .tab_default').toggleClass('active');
        $(this).toggleClass('active');
    });

});