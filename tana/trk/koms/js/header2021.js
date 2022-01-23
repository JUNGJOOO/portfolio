$( document ).ready(function() {
    $( ".btn_menu_open" ).click( function() {
        $(".gnb").toggleClass("gnb_open");
    });
    $( ".btn_menu_close" ).click( function() {
        $(".gnb").toggleClass("gnb_open");
    });
    $( ".btn_menu_all" ).click( function() {
        $(".sitemap").toggleClass("sitemap_open");
        $(".gnb").toggleClass("gnb_none");
    });
    $( ".gnb_title" ).click( function(e) {
        $(this).parent().toggleClass("is_open");
        e.stopPropagation()
    });
    $( ".gnb_depth3_title" ).click( function(e) {
        $(this).parent().toggleClass("is_open");
        e.stopPropagation()
    });
    $('.alarm_list .btn_alarm_drop').on('click',function(){
        $('.alarm_list').toggleClass("is_open");
    });
    $('.header_util a').on('click',function(){
        $('.alarm').toggleClass('show');
    });
    $(".tabs").tabs();
});

// alert
function alertshow(sGetalert){
    $("html").addClass('is_clipped');
    var $alert_layer = $("#"+ sGetalert);
    $alert_layer.addClass("show");
}
function alerthide(sGetalert){
    $("html").removeClass('is_clipped');
    $("#"+ sGetalert).removeClass("show");
}

// pop
function popshow(sGetName){
    $("html").addClass('is_clipped');
    var $modal_layer = $("#"+ sGetName);
    $modal_layer.addClass("is_active");
}
function pophide(sGetName){
    $("html").removeClass('is_clipped');
    $("#"+ sGetName).removeClass("is_active");
}