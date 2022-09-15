
// layer 공통팝업 열기
function openlayer(namelayer) {
    document.get
    $("." + namelayer).fadeIn(300);
    $("body").addClass("is_clipped");
}
// layer 공통팝업 닫기
$('.layer__close').click(function() {
    $(this).parent().parent().parent().fadeOut(300);
    $("body").removeClass("is_clipped");
});

// mflayer 팝업 열기
function openMFlayer(nameMFlayer) {
    document.get
    $("." + nameMFlayer).fadeIn(300);
    $("body").addClass("is_clipped");
}
// mflayer 팝업 닫기
$('.layer__close').click(function() {
    $(this).parent().parent().parent().fadeOut(300);
    $("body").removeClass("is_clipped");
});
