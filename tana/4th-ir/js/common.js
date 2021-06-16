$(document).ready(function() {
// pc : 전체메뉴 열기 닫기
    (function(){
        $(".totalmenu > nav > ul").bind("mouseenter focusin hover", function(e) {
            $(this).addClass( "active" );
            $(".bg_totalmenu").css("height","230px");
            e.stopPropagation();
        });
        $(".totalmenu > nav > ul").bind("mouseleave focusout", function() {
            $(".totalmenu_nav > ul").removeClass('active');
            $(".bg_totalmenu").css("height","0")
        })
        $(".totalmenu_nav > ul > li").bind("focusin focusout", function() {
            $(this).toggleClass("is_focus")
        });
    })();

// mobile : 햄버거메뉴 열기 닫기
    $( ".mbmenu_toggle" ).click( function() {
        $(".mbmenu").addClass( "is_open" );
    });
    $( ".mbmenu_close" ).click( function() {
        $(".mbmenu").removeClass( "is_open" );
    });
// mobile : 전체메뉴 열기 닫기
    $('.dropdown_menu').hide();
    $(".dropdown > a").on('click', function(e){
        $(this).parent().toggleClass("is_open");
        $(this).parent().find(".dropdown_menu").slideToggle();
        e.stopPropagation()
    });



// modals
    var $modalCloses = getAll('.modal_background, .modal_close, .modal_card_head .modal_close');
    $(document).on("click",".modal_button",function(){
        var target = $(".modal_button").data().target;
        openModal(target);
         // bxslider
        $('.bxslider').bxSlider({
            mode: 'horizontal',// 가로 방향 수평 슬라이드
            speed: 500,        // 이동 속도를 설정
            pager: true,      // 현재 위치 페이징 표시 여부 설정
            moveSlides: 1,     // 슬라이드 이동시 개수
            minSlides: 1,      // 최소 노출 개수
            maxSlides: 1,      // 최대 노출 개수
            slideMargin: 0,    // 슬라이드간의 간격
            auto: false,        // 자동 실행 여부
            autoHover: false,   // 마우스 호버시 정지 여부
            controls: true    // 이전 다음 버튼 노출 여부
        });
    });

    if ($modalCloses.length > 0) {
        $modalCloses.forEach(function ($el) {
            $el.addEventListener('click', function () {
                closeModals();
            });
        });
    }

    document.addEventListener('keydown', function (event) {
        var e = event || window.event;
            if (e.keyCode === 27) {
            closeModals();
            closeDropdowns();
        }
    });

// tab
    $(".tab_content").hide();
    $("ul.tab_list li:first").show();
    $(".tab_content:first").show();

    $("ul.tab_list li").click(function() {
        $("ul.tab_list li").removeClass("active");
        $(this).addClass("active"); 
        $(".tab_content").hide(); 
        var activeTab = $(this).find("a").attr("href"); 
        $(activeTab).fadeIn(); 
        return false;
    });

});


function getAll(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
}

function openModal(target) {
    $("html").addClass('is-clipped');
    $("#"+target).addClass('is-active');

}

function closeModals() {
    $("html").removeClass('is-clipped');
    $('.modal').removeClass('is-active');
}