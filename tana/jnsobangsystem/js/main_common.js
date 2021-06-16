
window.onload = function(){

    //모달 오픈 버튼  class : openModal
    $(".openModal").on("click",function(){
        $("#modal").attr("style","display:flex");
    });

    //모달 오픈 버튼  class : openModal2
    $(".openModal2").on("click",function(){
        $("#modal2").attr("style","display:flex");
    });


    //층별 가로세로 모달 오픈 버튼
    $(".row_floorModal1").on("click",function(){
        $("#row_floorModal1").attr("style","display:flex");
    });
    $(".row_floorModal1-1").on("click",function(){
        $("#row_floorModal1-1").attr("style","display:flex");
    });
    $(".row_floorModal2").on("click",function(){
        $("#row_floorModal2").attr("style","display:flex");
    });
    $(".row_floorModal2-1").on("click",function(){
        $("#row_floorModal2-1").attr("style","display:flex");
    });
    $(".row_floorModal3").on("click",function(){
        $("#row_floorModal3").attr("style","display:flex");
    });
    $(".row_floorModal3-1").on("click",function(){
        $("#row_floorModal3-1").attr("style","display:flex");
    });
    $(".row_floorModal3-2").on("click",function(){
        $("#row_floorModal3-2").attr("style","display:flex");
    });
    $(".row_floorModal4").on("click",function(){
        $("#row_floorModal4").attr("style","display:flex");
    });
    $(".row_floorModal4-1").on("click",function(){
        $("#row_floorModal4-1").attr("style","display:flex");
    });



    $(".col_floorModal1").on("click",function(){
        $("#col_floorModal1").attr("style","display:flex");
    });
    $(".col_floorModal1-1").on("click",function(){
        $("#col_floorModal1-1").attr("style","display:flex");
    });
    $(".col_floorModal2").on("click",function(){
        $("#col_floorModal2").attr("style","display:flex");
    });
    $(".col_floorModal2-1").on("click",function(){
        $("#col_floorModal2-1").attr("style","display:flex");
    });
    $(".col_floorModal3").on("click",function(){
        $("#col_floorModal3").attr("style","display:flex");
    });
    $(".col_floorModal3-1").on("click",function(){
        $("#col_floorModal3-1").attr("style","display:flex");
    });
    $(".col_floorModal3-2").on("click",function(){
        $("#col_floorModal3-2").attr("style","display:flex");
    });
    $(".col_floorModal4").on("click",function(){
        $("#col_floorModal4").attr("style","display:flex");
    });
    $(".col_floorModal4-1").on("click",function(){
        $("#col_floorModal4-1").attr("style","display:flex");
    });



    //모달 닫기 버튼 class : close
    $(".close").on("click",fnClose);

    //모달 나가기
    $(document).on("click",function(e){
        var classList = e.target.classList;
        if(classList.contains('modal')){
            fnClose();
        }
    });
}

function fnClose(){
    $("#modal").attr("style","display:none");
    $("#modal2").attr("style","display:none");

    // 층별 가로세로
    $("#row_floorModal1").attr("style","display:none");
    $("#row_floorModal1-1").attr("style","display:none");
    $("#row_floorModal2").attr("style","display:none");
    $("#row_floorModal2-1").attr("style","display:none");
    $("#row_floorModal3").attr("style","display:none");
    $("#row_floorModal3-1").attr("style","display:none");
    $("#row_floorModal3-2").attr("style","display:none");
    $("#row_floorModal4").attr("style","display:none");
    $("#row_floorModal4-1").attr("style","display:none");

    $("#col_floorModal1").attr("style","display:none");
    $("#col_floorModal1-1").attr("style","display:none");
    $("#col_floorModal2").attr("style","display:none");
    $("#col_floorModal2-1").attr("style","display:none");
    $("#col_floorModal3").attr("style","display:none");
    $("#col_floorModal3-1").attr("style","display:none");
    $("#col_floorModal3-2").attr("style","display:none");
    $("#col_floorModal4").attr("style","display:none");
    $("#col_floorModal4-1").attr("style","display:none");

}





// 가로 종합안내도 메인
function dep() {
    $(".modal-dep").css("display","flex")
    $(".modal-stf").css("display","none")
}
function stf() {
    $(".modal-dep").css("display","none")
    $(".modal-stf").css("display","flex")
}

// 가로 종합안내도 메인 부서검색
function scollTop_modal_dep(x, y) {
    $(".modal-dep .modal-searchlist")[0].scrollBy(0, -80)
}
function scrollBottom_modal_dep(x, y) {
    $(".modal-dep .modal-searchlist")[0].scrollBy(0, 80)
}



// 가로 종합안내도 메인 부서검색
function scollTop_row1(x, y) {
    $(".dep-searchresult .group")[0].scrollBy(0, -80)
}
function scrollBottom_row1(x, y) {
    $(".dep-searchresult .group")[0].scrollBy(0, 80)
}



// 가로 종합안내도 메인 직원검색
function scollTop_modal_stf(x, y) {
    $(".modal-stf .modal-searchlist")[0].scrollBy(0, -80)
}
function scrollBottom_modal_stf(x, y) {
    $(".modal-stf .modal-searchlist")[0].scrollBy(0, 80)
}

function stf_back() {
    $(".modal-stf .stf-searchresult").css("display","none");
    $(".modal-stf .modal-search").css("display","flex");
}



$(".row .boxg_section").each(function(a,b){
    if($(".row .boxg_section").length < 4){
        var boxgSize =  b.children.length;
        if(boxgSize>4){
            $(this).addClass("boxg_section2");
        }
     }
    $(this).prepend("<b></b>");
});

$(".col .boxg_section").each(function(a,b){
    $(this).prepend("<b></b>");
});
var boxg = $(".boxg")
var boxgli = $(".group > ul > li");
var boxglileng = $(".group > ul > li").length;
var boxggroup = $(".group");
$(boxggroup).addClass("group" + boxglileng);
if(boxglileng > 4){
    $(boxg).removeClass("boxg_section2")
    
    // 아래꺼 삭제
    // $(boxg).addClass("boxg_section")
}

