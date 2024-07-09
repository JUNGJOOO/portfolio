



$scope.showNotice1 = function(){
    $('.youneed-cont01').slideToggle(400);
    $('.youneed-type01').toggleClass('on');
}
$scope.showNotice2 = function(){
    $('.youneed-cont02').slideToggle(400);
    $('.youneed-type02').toggleClass('on');
}

$scope.openCompanyBenefit = function(companyCode){
    $(".mflayer_"+companyCode).fadeIn(300);
    $("body").addClass("is_clipped");
} 