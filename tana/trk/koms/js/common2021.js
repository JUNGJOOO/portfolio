$( document ).ready(function() {
    // select
    var selectTarget = $('.select_box select');
    selectTarget.change(function() {
        var select_name = $(this).children('option:selected').text();
        $(this).siblings('label').text(select_name);
    });

    // datepicker
    $(".datepicker").datepicker({
        dateFormat: "yy-mm-dd"
    });

    $( ".btn_fdwrap" ).click( function() {
        $(".fdwrap").toggleClass("is_active");
    });

    $("#fileupload").change(function(){
        fileList = $("#fileupload")[0].files;
        fileListTag = '';
        for(i = 0; i < fileList.length; i++){
            fileListTag += "<li><span>"+fileList[i].name+"</span><button>닫기</button></li>";
        }
        $('.filelist').html(fileListTag);
    });
    // toolip
	$(document).tooltip({
		items: 'p[title]'
	});

});
function getAll(selector) {
	return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
}
