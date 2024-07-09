$(document).ready(function(){
	//상담신청 버튼
	$("#btn_request").click(function(e){
		var result = quick_input_check("quick_frm");
		if(result){
			save_quick_input("quick_frm");
		}

		if (e.preventDefault) {
		    e.preventDefault();
		} else {
		    e.returnValue = false;
		}
	});
	
	$("#bt_quick_close").click(function(e){
		$("#input_quick_area").rich_popup_close();

		if (e.preventDefault) {
		    e.preventDefault();
		} else {
		    e.returnValue = false;
		}
	});
});

//입력체크
function quick_input_check(frm){
	var name = $("form#"+frm+" input[name=name]");
	var hphone2 = $("form#"+frm+" input[name=hphone2]");
	var hphone3 = $("form#"+frm+" input[name=hphone3]");
	var birth = $("form#"+frm+" input[name=birth]");
	var customer_car = $("form#"+frm+" input[name=quick_customer_car]");

	if($.trim(name.val()) == "") {
		alert("이름을 정확히 입력해 주시기 바랍니다.");
		name.focus();
		return false;
	} else if(!onlyKorean($.trim(name.val()))) {
		alert("이름을 한글로 다시 입력해주시기 바랍니다.");
		name.focus();
		return false;
	}

	if($.trim(hphone2.val()) == ""){
		alert("전화번호를 정확히 입력해 주시기 바랍니다.");
		hphone2.focus();
		return false;
	} else if(!onlyNumber($.trim(hphone2.val()))){
		alert("전화번호는 숫자로 입력해주시기 바랍니다.");
		hphone2.focus();
		return false;
	}
	
	if($.trim(birth.val()) == ""|| !$("form#"+frm+" input[name=quick_customer_birth_flag]").val()){
		alert("생년월일은 8자리 숫자로 입력해주시기 바랍니다.");
		birth.focus();
		return false;
	}

	if ($.trim(birth.val()) && $("form#"+frm+" input[name=quick_customer_birth_flag]").val()) {
		var check_result = check_birth_date(birth.val());
			
		if(check_result == "no_length" || check_result == "no_number"){
			alert("생년월일은 8자리 숫자로 입력해주시기 바랍니다.");
			birth.focus();
			return false;
		}else if(check_result == "no_date"){
			alert("생년월일을 날짜형식에 맞게 입력해주시기 바랍니다.\n예)19770101");
			birth.focus();
			return false;
		}
	}

	if($.trim(customer_car.val()) == "" || !$("form#"+frm+" input[name=quick_customer_car_flag]").val()){
		alert("차종을 입력해 주시기 바랍니다.");
		customer_car.focus();
		return false;
	}

	if($("form#"+frm+" input:checkbox[name=agree1]:checked").length == 0) {
		if (frm == "quick_request_frm") alert("수집동의하셔야 자동차 보험료 계산이 가능합니다.");
		else alert("수집동의하셔야 무료 상담신청이 가능합니다.");
		return false;
	}
	return true;
}
// 동부화재 폼 전송시 IE한글깨짐 방지
function emulAcceptCharset(form) {
	if (form.canHaveHTML) { // detect IE
		document.charset = form.acceptCharset;
	}
	return true;
}
// 정보 저장
function save_quick_input(frm){
	var data = $("#"+frm).serialize();
	var customer_name = $("#"+frm+" [name=name]").val();
	var customer_sex = $("#"+frm+" [name=customer_sex]:checked").val();
	var customer_car = $("#"+frm+" [name=quick_customer_car]").val();
	
	$.ajax({
		type: "POST",
		url: "/FRONT/customer_process/free_request_input",
		data: data,
		success: function(result_data){
			var opt = {};
			
			if ($.browser.msie && $.browser.version < 8) {
				opt = {
					zIndex : 10002
					,width  : '560px'
					,top : ($(window).scrollTop()) + (($(window).height() - 426) / 2) +"px"
					,left:($(window).scrollLeft()) + (($(window).width() - 560) / 2) + "px"
				};
			} else {
				opt = {
					zIndex : 10002
					,width  : '560px'
					,top: Math.max(0, ($(window).scrollTop()*2))  + 'px'
				};
			}
			
			if(frm=="quick_frm") $("#input_quick_area").rich_popup_close();
			
			$("form").each(function() { this.reset(); });
			$("form#"+frm+" input:checkbox[name=agree1]").attr("checked",false);

			$('#input_result_area').html("");
			$('#input_result_area').html(result_data);
			$('#input_result_area').rich_popup(opt);

			$("#bt_result_close").click(function(event){
				$("#input_result_area").rich_popup_close();
			});
		},complete: function(result_data) {
			var type = '';
			if (frm == "quick_request_frm") type = 'main';
			else type = 'popup';
			
			add_ace_counter(type);
			
			input_text_encoding(customer_name, customer_sex, customer_car, data);
		}
    });
}

function input_text_encoding(customer_name, customer_sex, customer_car, data) {
	
	$.ajax({
		type: "POST",
		url: "/FRONT/encoding/encrypt_function",
		data: data,
		success: function(result_data){
			var result_data_array = result_data.split('|');
			$("form#dongbu_submit_frm [name=name]").val(customer_name);
			$("form#dongbu_submit_frm [name=birth]").val(result_data_array[0]);
			$("form#dongbu_submit_frm [name=sex_info]").val(customer_sex);
			$("form#dongbu_submit_frm [name=mobile]").val(result_data_array[1]);
			$("form#dongbu_submit_frm [name=car_type]").val(customer_car);

			$("#dongbu_submit_frm").submit();
		}
    });
}
//통합견적 레이어
function open_quotation_layer() {
	$("#input_quick_area").rich_popup({width:'450px'});
	
	if ($.browser.msie && $.browser.version < 8) {
		$(".richpop_input_quick_area").css({position:'absolute'}).css({
			top : Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + (($(window).height() - 345) / 2) +"px"
			,left:Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + (($(window).width() - 450) / 2) + "px"
		});
	} else {
		$(".richpop_input_quick_area").css({position:'absolute'}).css({
			top : Math.max(0, ($(window).scrollTop()*2))  + 'px'
		});
	}
}

//개인정보 처리방침
function open_carbohum_privacy(view_flag) {
	var url = "/FRONT/site_info_manage/open_privacy/"+view_flag+"/direct-carbohum";
	window.open(url,"PRIVACY","width=553,height=505,left=400,top=190,scrollbars=no");
}

//개인정보활용동의 이미지 클릭
function click_agreement_img_car(form_name, targer_name){
	var url = "/FRONT/site_info_manage/open_agreement/"+form_name+"/"+targer_name+"/company-direct-carbohum";
	window.open(url,"AGREEMENT","width=552,height=510,left=400,top=190,scrollbars=no");
}

//에이스카운터 링크
function add_ace_counter(type) {
	db_AceCounter(type);
}