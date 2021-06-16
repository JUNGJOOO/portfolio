



// 
function scollTop_ebd(x, y) {
    $(".ebd .contents_inner")[0].scrollBy(0, -200)
}
function scrollBottom_ebd(x, y) {
    $(".ebd .contents_inner")[0].scrollBy(0, 200)
}


// 
function scollTop_ebd2(x, y) {
    $(".ebd .contents_inner")[0].scrollBy(0, -200)
}
function scrollBottom_ebd2(x, y) {
    $(".ebd .contents_inner")[0].scrollBy(0, 200)
}


// 
function scollTop_ebd24(x, y) {
    $(".ebd .contents_inner")[0].scrollBy(0, -200)
}
function scrollBottom_ebd24(x, y) {
    $(".ebd .contents_inner")[0].scrollBy(0, 200)
}


$(".boxgp_section").each(function(a,b){
    if($(".boxgp_section").length < 5){
        var boxgpSize =  b.children.length;
        if(boxgpSize>5){
            $(this).addClass("boxgp_section2");
        }
     }
    $(this).prepend("<b></b>");
});

var boxgpli = $(".land_exe > li");
var boxgplileng = $(".land_exe > li").length;
var boxgpgroup = $(".land");
$(boxgpgroup).addClass("land" + boxgplileng);