$( document ).ready(function() {
    $('.lang').on('click', function (e) {
        $(this).toggleClass('is_active');
    });
    // lang focusout
    $(".lang_box > li:last > a").focusout(function(){
        $(".lang").toggleClass('is_active');
    });
    $('.google').on('click', function (e) {
        $(this).toggleClass('is_active');
    });
    // google focusout
    $(".google_box > li:last > a").focusout(function(){
        $(".google").toggleClass('is_active');
    });

    // gnb_pc
    $(".gnb_pc > ul > li > a").on('click', function(e){
        $(this).parent().toggleClass("is_active");
        $(this).parent().find(".gnb_list").slideToggle();
        e.stopPropagation()
    });

    // footer mb
    $(".footer_item > a").on('click', function(){
        $(this).parent().toggleClass("is_active");
    });

    // aside > lnb
    $(".lnb_filter > .depth1 > li > a").on('click', function(){
        $(this).parent().toggleClass("is_active");
    });
    $(".lnb li > a").on('click', function(){
        $(this).parent().toggleClass("is_active");
    });
    // aside > filter 모바일
    $('.btn_filter_mb').on('click', function (e) {
        $('aside').show("slide", { direction: "right" }, 300);
        $(".wrap").addClass('_fixed');
        $(".mask").show();
    });

    // aside > mypage 모바일
    $('.btn_mypage_mb').on('click', function (e) {
        $('aside').show("slide", { direction: "right" }, 300);
        $(".wrap").addClass('_fixed');
        $(".mask").show();
    });


    $('.lnb_mb_close').on('click', function (e) {
        $('aside').hide("slide", { direction: "right" }, 300);
        $(".wrap").removeClass('_fixed');
        $(".mask").hide();
    });

    $(".tabs").tabs();
    $(".datepicker").datepicker({dateFormat: "yy-mm-dd"});
    $('.accordion > li').click(function() {
        if ( $(this).hasClass('is_active') ) {
            $(this).find(' > .accordion_box').stop().slideUp(300);
            $(this).removeClass('is_active');
        }
        else {
            $(this).find(' > .accordion_box').stop().slideDown(300);
            $(this).addClass('is_active');
        }
    });
    

});
function getAll(selector) {
	return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
}

// pop
function popshow(sGetName){
    $(".wrap").addClass('_fixed');
    var $modal_layer = $("#"+ sGetName);
    $modal_layer.addClass("is_active");
}
function pophide(sGetName){
    $(".wrap").removeClass('_fixed');
    $("#"+ sGetName).removeClass("is_active");
}

// tooltip
function tooltipshow(ToolName){
    $('.btn_tooltip').show();
}
function tooltiphide(ToolName){
    $('.btn_tooltip').hide();
}