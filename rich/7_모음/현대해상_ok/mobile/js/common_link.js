// 메인 페이지
function go_home(intype='') {
	if(intype != '' && intype != 0) location.href = "/?inType="+intype;	
	else location.href = "/";
}

//html페이지 연결
function go_view_html(target_page){
	location.href = "/MOBILE/mobile_main/view_html/"+target_page;
}

//html페이지 새창 연결
function go_view_html_open(target_page){
	window.open("/MOBILE/mobile_main/view_html/"+target_page);
}

//빠른상담신청 - POST방식
function go_request_input_type_post(frm){
	$("#"+frm).submit();
}

function close_window(){
	window.close();
}

//개인정보활용동의 이미지 클릭
function click_agreement_img_car(form_name, targer_name){
	var url = "/FRONT/site_info_manage/open_agreement/"+form_name+"/"+targer_name+"/direct-carbohum";
	window.open(url,"AGREEMENT","");
}

// Firebase Event 수집
function go_firebase_direct_url(itemId, itemName, contentType) {
	if (navigator.userAgent.match(/Android/i) != null) {					// android
		if (window.AppInterface != null && window.AppInterface != 'undefined') {
			window.AppInterface.appLogEvent(itemId, itemName, contentType);
		}
		
	} else if (navigator.userAgent.match(/iPhone|iPad|iPod/i) != null) {	// IOS
		if (navigator.userAgent.match(/Safari/i) == null) {
			webkit.messageHandlers.appInterface.postMessage(
				{
					method: 'appLogEvent',			// 필수 (string)
					itemName: itemName,				// 필수 (string)
					itemId: itemId,					// 선택 (string, 기본값='100')
					contentType: contentType		// 선택 (string, 기본값='button')
				}
			);
		}
	}
}
