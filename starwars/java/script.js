//document.addEventListener("scroll", scrollWork);
//
//function scrollWork() {
//	var html요소 = document.querySelector("html");
//    var header요소 = document.querySelector("header");
//    var logo요소 = document.querySelector(".logo");
//	var nav요소 = document.querySelector("nav");
//    
//	var 스크롤된높이 = html요소.scrollTop;
//
//	if (스크롤된높이 >= 240) {
//		nav요소.className = "active";
//        logo요소.className = "logochange";    
//	} else if (스크롤된높이 < 240) {
//		nav요소.className = "";
//		header요소.className = ".logo";
//	} 
//	console.log(스크롤된높이);
//}
//



//버거메뉴("linkright_burger");
//
//function 버거메뉴(전달대상){
//    var 버튼 = document.querySelector("." + 전달대상);
//    var 타겟 = document.querySelector("." + 전달대상);
//    console.log(버튼);
//    console.log(타겟);
//    버튼.addEventListener("click", 할일);
//
//    function 할일(e){
//        if(e.target.className === "on"){
////            e.target.className = "";
//        } else{
////            e.target.className = "on";
//        }
//        e.preventDefault();
//    }
//}
//
//toggle("linkright_burger");
//
//function toggle(classPass) {
//    var btn = document.querySelector("." + classPass + "> .but");
//    console.log(btn);
//}



