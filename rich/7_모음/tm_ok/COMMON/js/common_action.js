

$(document).ready(function () {
	// 이름 입력예 초기화
	$("form#quick_request_frm input:text[name=name]").click(function() {
		if(!$("form#quick_request_frm input:hidden[name=name_flag]").val()){
			reset_default_value('quick_request_frm', 'name', 'name_flag', 'input');
		}
	});
	$("form#quick_request_frm input:text[name=name]").focusin(function() {
		if(!$("form#quick_request_frm input:hidden[name=name_flag]").val()){
			reset_default_value('quick_request_frm', 'name', 'name_flag', 'input');
		}
	});
	
	phone_format($("form#quick_request_frm select[name=hphone1]"),$("form#quick_request_frm input[name=hphone]"));

	var phone_select = $("select#hphone1");
	var sin_local_select = $("select#sin_local");
	
	phone_select.change(function(){
		var select_name = $(this).children("option:selected").text();
		$(this).siblings("label").text(select_name);
	});
	
	sin_local_select.change(function(){
		var select_name = $(this).children("option:selected").text();
		$(this).siblings("label").text(select_name);
	});

});

function phone_format(hphone_first_tag, hphone_tag) {
	hphone_tag.bind('focusin keyup', function (e) {
		e.preventDefault();

		var phone_rule = ['010', '011', '016', '017', '018', '019'];

		var num_first = hphone_first_tag.val();
		var num = hphone_tag.val();
		num = num.replace(/[^0-9]/gi, "");
		hphone_tag.val(phone_num);

		if (phone_rule.indexOf(num_first) >= 0) {
			var phone_num = num.replace(/([0-9]{4}|[0-9]{3})([0-9]{4}|[0-9]{3})/, "$1-$2");
			hphone_tag.val(phone_num);
		} else {
			if (num.length >= 9 && num.length < 11) {
				var phone_num = num.replace(/(^02.{0}|^01.{1}|^050.{1}|[0-9]{3})([0-9]{3}|[0-9]{4})([0-9]{4}|[0-9]{3})/, "$1-$2-$3");
				hphone_tag.val(phone_num);
			} else if (num.length >= 7 && num.length < 9) {
				var phone_num = num.replace(/([0-9]{4}|[0-9]{3})([0-9]{3}|[0-9]{4})/, "$1-$2");
				hphone_tag.val(phone_num);
			} else if (num.length == 12) {
				var phone_num = num.replace(/([0-9]{4})([0-9]{4})([0-9]{4})/, "$1-$2-$3");
				hphone_tag.val(phone_num);
			} else {
				var phone_num = num.replace(/(^02.{0}|^01.{1}|^050.{1}|[0-9]{3})([0-9]{4}|[0-9]{3})([0-9]{4})/, "$1-$2-$3");
				hphone_tag.val(phone_num);
			}
		}

	});
}


