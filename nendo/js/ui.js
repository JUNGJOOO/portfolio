$(document).ready(function(){

    var 로드몰감싸기 = document.querySelector(".loadmore");
    var 로드몰버튼 = 로드몰감싸기.querySelector(".more");
    var 제품리스트 = document.querySelector(".pj_list");
    var ul요소 = 제품리스트.querySelector("ul");
    var ul요소높이 = ul요소.offsetHeight;
    var 자를높이 = 제품리스트.offsetHeight;
    
    로드몰버튼.addEventListener("click", 할일);
    function 할일 (사건정보) {
        if (사건정보.target.nodeName === "A") {
            
            자를높이 += 640;
            제품리스트.style.height = 자를높이 + "px";
            if ( 자를높이 > ul요소높이 ) {
                로드몰버튼.style.display = "none";
                로드몰감싸기.style.display = "none";
            }
        }
        사건정보.preventDefault();
    }
})


$(document).ready(function(){
    $('.bxslider').bxSlider({
        infiniteLoop: false,
        hideControlOnEnd: true,
    });
    $('.nonepc_info').bxSlider({
        slideWidth: 460,
        minSlides: 2,
        maxSlides: 3,
        moveSlides: 1,
        slideMargin: 20
      });
    $('.introslider').bxSlider({
        infiniteLoop: true,
        auto:true,
        hideControlOnEnd: true,
    });
    
    
    
    

    var 창넓이 = window.innerWidth;

//pj_main_steel
    var Aslide = $("#pj_main_steel").bxSlider();
    할일();
    window.addEventListener("resize", 할일);
    function 할일() {
        창넓이 = window.innerWidth;
        if (창넓이 < 480) {
            Aslide.reloadSlider({ 
                mode: "horizontal",
                moveSlides: 1,
                minSlides: 2,
                maxSlides: 2,
                slideWidth: 286,
                slideMargin: 10
            });
        } else if (창넓이 < 768) {
            Aslide.reloadSlider({ 
                mode: "horizontal",
                moveSlides: 1,
                minSlides: 2,
                maxSlides: 2,
                slideWidth: 400,
                slideMargin: 14
            }); 
        } else if (창넓이 < 1024) {
            Aslide.reloadSlider({ 
                mode: "horizontal",
                moveSlides: 1,
                minSlides: 3,
                maxSlides: 3,
//                slideWidth: 480,
                slideMargin: 15
            }); 

        } else if (창넓이 < 1200) {
            Aslide.reloadSlider({ 
                mode: "horizontal",
                moveSlides: 1,
                minSlides: 3,
                maxSlides: 3,
                slideWidth: 510,
                slideMargin: 18
            }); 
        } else {
            Aslide.reloadSlider({ 
                mode: "horizontal",
                minSlides: 3,
                maxSlides: 3,
                slideWidth: 580,
                slideMargin: 20
            }); 

        } 
    }  
//pj_main_table
    var Aslide = $("#pj_main_table").bxSlider();
    할일();
    window.addEventListener("resize", 할일);
    function 할일() {
        창넓이 = window.innerWidth;
        if (창넓이 < 480) {
            Aslide.reloadSlider({ 
                mode: "horizontal",
                moveSlides: 1,
                minSlides: 2,
                maxSlides: 2,
                slideWidth: 286,
                slideMargin: 10
            });
        } else if (창넓이 < 768) {
            Aslide.reloadSlider({ 
                mode: "horizontal",
                moveSlides: 1,
                minSlides: 2,
                maxSlides: 2,
                slideWidth: 400,
                slideMargin: 14
            }); 
        } else if (창넓이 < 1024) {
            Aslide.reloadSlider({ 
                mode: "horizontal",
                moveSlides: 1,
                minSlides: 3,
                maxSlides: 3,
                slideWidth: 480,
                slideMargin: 15
            }); 

        } else if (창넓이 < 1200) {
            Aslide.reloadSlider({ 
                mode: "horizontal",
                moveSlides: 1,
                minSlides: 3,
                maxSlides: 3,
                slideWidth: 510,
                slideMargin: 18
            }); 
        } else {
            Aslide.reloadSlider({ 
                mode: "horizontal",
                minSlides: 3,
                maxSlides: 3,
                slideWidth: 580,
                slideMargin: 20
            }); 

        } 
    }  
//pj_main_manga
    var Aslide = $("#pj_main_manga").bxSlider();
    할일();
    window.addEventListener("resize", 할일);
    function 할일() {
        창넓이 = window.innerWidth;
        if (창넓이 < 480) {
            Aslide.reloadSlider({ 
                mode: "horizontal",
                moveSlides: 1,
                minSlides: 2,
                maxSlides: 2,
                slideWidth: 286,
                slideMargin: 10
            });
        } else if (창넓이 < 768) {
            Aslide.reloadSlider({ 
                mode: "horizontal",
                moveSlides: 1,
                minSlides: 2,
                maxSlides: 2,
                slideWidth: 400,
                slideMargin: 14
            }); 
        } else if (창넓이 < 1024) {
            Aslide.reloadSlider({ 
                mode: "horizontal",
                moveSlides: 1,
                minSlides: 3,
                maxSlides: 3,
                slideWidth: 480,
                slideMargin: 15
            }); 

        } else if (창넓이 < 1200) {
            Aslide.reloadSlider({ 
                mode: "horizontal",
                moveSlides: 1,
                minSlides: 3,
                maxSlides: 3,
                slideWidth: 510,
                slideMargin: 18
            }); 
        } else {
            Aslide.reloadSlider({ 
                mode: "horizontal",
                minSlides: 3,
                maxSlides: 3,
                slideWidth: 580,
                slideMargin: 20
            }); 

        } 
    }
//pj_main_chair
    var Aslide = $("#pj_main_chair").bxSlider();
    할일();
    window.addEventListener("resize", 할일);
    function 할일() {
        창넓이 = window.innerWidth;
        if (창넓이 < 480) {
            Aslide.reloadSlider({ 
                mode: "horizontal",
                moveSlides: 1,
                minSlides: 2,
                maxSlides: 2,
                slideWidth: 286,
                slideMargin: 10
            });
        } else if (창넓이 < 768) {
            Aslide.reloadSlider({ 
                mode: "horizontal",
                moveSlides: 1,
                minSlides: 2,
                maxSlides: 2,
                slideWidth: 400,
                slideMargin: 14
            }); 
        } else if (창넓이 < 1024) {
            Aslide.reloadSlider({ 
                mode: "horizontal",
                moveSlides: 1,
                minSlides: 3,
                maxSlides: 3,
                slideWidth: 480,
                slideMargin: 15
            }); 

        } else if (창넓이 < 1200) {
            Aslide.reloadSlider({ 
                mode: "horizontal",
                moveSlides: 1,
                minSlides: 3,
                maxSlides: 3,
                slideWidth: 510,
                slideMargin: 18
            }); 
        } else {
            Aslide.reloadSlider({ 
                mode: "horizontal",
                minSlides: 3,
                maxSlides: 3,
                slideWidth: 580,
                slideMargin: 20
            }); 

        } 
    }
    
    
    
})