// var header = document.querySelector('#header');
// var walletw = header.querySelector('.header__wrap-wallet');
// var noticew = header.querySelector('.header__wrap-notice');
// var walletP = header.querySelector('.wallet-pop-wrap');
// var noticeP = header.querySelector('.header__notice-box');
// function clickHanlder_w(){
//     walletP.classList.toggle('header_active');
// }
// function clickHanlder_n(){
//     noticeP.classList.toggle('header_active');
// }
// walletw.addEventListener('click', clickHanlder_w);
// noticew.addEventListener('click', clickHanlder_n);



function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("header_active");
}
function myFunction2() {
    var popup = document.getElementById("myPopup2");
    popup.classList.toggle("header_active");
}
function myFunction3(xtarget) {
    var x = document.getElementById("gnbMobile");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
    xtarget.classList.toggle("change");
}
