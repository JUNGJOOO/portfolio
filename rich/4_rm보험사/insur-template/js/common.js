$(document).ready(function() {
    // select
    $('.js-select').niceSelect();
   
    // 클릭이벤트 : 보험료 계산하기
    $("#checkAgreement").click(function(event) {
        $(".main-spot").addClass('is_active');
    });
    $("#checkAgreement_close").click(function(event) {
        $(".main-spot").removeClass('is_active');
    });

    // 클릭이벤트 : 상담신청
    $(".uipi-bttn > a:nth-of-type(3)").click(function(event) {
        $(this).parent().parent().toggleClass('is_active');
    });

    // 클릭이벤트 : 펼쳐보기
    $(".alltree-viewbtn").on("click", function (e) {
        e.preventDefault();
        $(".ui-all-tree").toggleClass("is_on");
    });
});

// 레이어팝업
function openLayer(lpcdiv) {
    $("." + lpcdiv).fadeIn(200);
    $("body").addClass("is-body");
}
$(".layer-bg").on("click", function (e) {
    e.preventDefault();
    $("body").removeClass("is-body");
    $(".lpc-div").fadeOut(200);
});
$(".layer-close").on("click", function (e) {
    e.preventDefault();
    $("body").removeClass("is-body");
    $(".lpc-div").fadeOut(200);
});
$(".layer-close-btn").on("click", function (e) {
    e.preventDefault();
    $("body").removeClass("is-body");
    $(".lpc-div").fadeOut(200);
});

// include
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                elmnt.innerHTML = this.responseText;
                elmnt.removeAttribute("include-html");
                includeHTML();        }
            }      
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}
includeHTML();