$(document).on('click','.go',function(){
    var url = $(this).prev().val();
    if(url==''){ alert("사이트를 선택하시기 바랍니다.");
        $(this).prev().focus();
    }else{
        window.open(url,'_blank');
    }
});