$( document ).ready(function() {
// check
    $("#checkall").click(function(){
        if($("#checkall").prop("checked")){
            $("input[name=check]").prop("checked",true);
        }else{
            $("input[name=check]").prop("checked",false);
        }
    })
    $("#checkall_1").click(function(){
        if($("#checkall_1").prop("checked")){
            $("input[name=checkall_1]").prop("checked",true);
        }else{
            $("input[name=checkall_1]").prop("checked",false);
        }
    })
    $("#checkall_2").click(function(){
        if($("#checkall_2").prop("checked")){
            $("input[name=checkall_2]").prop("checked",true);
        }else{
            $("input[name=checkall_2]").prop("checked",false);
        }
    })
    $("#checkall_3").click(function(){
        if($("#checkall_3").prop("checked")){
            $("input[name=checkall_3]").prop("checked",true);
        }else{
            $("input[name=checkall_3]").prop("checked",false);
        }
    })
    $("#checkall_4").click(function(){
        if($("#checkall_4").prop("checked")){
            $("input[name=checkall_4]").prop("checked",true);
        }else{
            $("input[name=checkall_4]").prop("checked",false);
        }
    })

// select
    var selectTarget = $('.select_box select');
    selectTarget.change(function() {
        var select_name = $(this).children('option:selected').text();
        $(this).siblings('label').text(select_name);
    });

// dropdown
    $('.dropdown_menu').hide();
    $(".dropdown > a").on('click', function(e){
        $(this).parent().toggleClass("is_open");
        $(this).parent().find(".dropdown_menu").slideToggle();
        e.stopPropagation()
    });

// modal
    var $modalCloses = getAll('.modal, .modal .close');
    $(document).on("click",".modal_button",function(){
        var target = $(".modal_button").data().target;
        openModal(target);
    });
    if ($modalCloses.length > 0) {
        $modalCloses.forEach(function ($el) {
            $el.addEventListener('click', function () {
                closeModals();
            });
        });
    }
    document.addEventListener('keydown', function (event) {
        var e = event || window.event;
            if (e.keyCode === 27) {
            closeModals();
            closeDropdowns();
        }
    });
});

function getAll(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
}
function openModal(target) {
    $("html").addClass('is-clipped');
    $("#"+target).addClass('is_active');

}
function closeModals() {
    $("html").removeClass('is-clipped');
    $('.modal').removeClass('is_active');
}