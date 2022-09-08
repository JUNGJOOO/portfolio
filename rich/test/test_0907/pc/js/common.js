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

// 클릭시이동
function fnMove(seq){
    var offset = $("#item" + seq).offset();
    $('html, body').animate({scrollTop : offset.top}, 400);
}