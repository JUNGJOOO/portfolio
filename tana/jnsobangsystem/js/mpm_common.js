


window.onload = function(){
    //모달 오픈 버튼  class : openModal
    $(".openModal").on("click",function(){
        $("#modal").attr("style","display:flex");
    });

    //모달 닫기 버튼 class : close
    $(".close").on("click",function(){
        $("#modal").attr("style","display:none");
    });

    //모달 나가기
    $(document).on("click",function(e){
       if(e.target.id == 'modal'){
        // $("#modal").attr("style","display:none");
        $(".close").click();
       }
    });
}



// 예약현황 - 일별 
function scollTop_day(x, y) {
    $(".mpmd_day > ul")[0].scrollBy(0, -115)
}
function scrollBottom_day(x, y) {
    $(".mpmd_day > ul")[0].scrollBy(0, 115)
}

// 예약현황 - 주별
function scollTop_week(x, y) {
    $(".table_week")[0].scrollBy(0, -101)
}
function scrollBottom_week(x, y) {
    $(".table_week")[0].scrollBy(0, 101)
}
