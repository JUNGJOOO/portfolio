// 날짜 유효성 체크
function isValidDate(dateStr) {
    dateStr += '';

    if (dateStr.length != 8) return false;
    if (!onlyNumber(dateStr)) return false;

    var year = Number(dateStr.substr(0, 4));
    var month = Number(dateStr.substr(4, 2));
    var day = Number(dateStr.substr(6, 2));

    if (year < 1900 || year >= 2100) return false;

    if (month < 1 || month > 12) { // check month range
        //alert("달은 1월부터 12월까지 입력 가능합니다.");
        return false;
    }

    if (day < 1 || day > 31) {
        //alert("일자는 1일부터 31일까지 입력 가능합니다.");
        return false;
    }

    if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
        //alert(month+"월은 31일이 존재하지 않습니다.");
        return false
    }

    if (month == 2) { // check for february 29th
        var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
        if (day > 29 || (day == 29 && !isleap)) {
            //alert(year + "년 2월은 " + day + "일이 없습니다.");
            return false;
        }
    }

    return true;
}

// 금액 표시
function setComma(number) {
    // 정규표현식 : (+- 존재하거나 존재 안함, 숫자가 1개 이상), (숫자가 3개씩 반복)
    var reg = /(^[+-]?\d+)(\d{3})/;

    // 스트링변환
    number += '';
    while (reg.test(number)) {
        // replace 정규표현식으로 3자리씩 콤마 처리
        number = number.replace(reg, '$1' + ',' + '$2');
    }

    return number;
}

function leadingZeros(n, digits) {
    var zero = '';
    if (!n) n = 0;
    n = n.toString();

    if (n.length < digits) {
        for (var i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}

function serializeObj(obj) {
    var result = [];

    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
}

function removeTag(html) {
    return html.replace(/(<([^>]+)>)/gi, "");
}

// 한글입력 체크
function onlyKorean(str) {
    var pattern = /([^가-힣\x20])/i;

    if (pattern.test(str)) return false;
    else return true;
}

// 숫자입력 체크
function onlyNumber(str) {
    var findStr = str.match(/[0-9]+/);
    if (str == findStr) return true;
    else return false;
}

// 영문 + 숫자만 입력
function onlyEngNum(str){
    var pattern = /[ㄱ-힣~!@#$%^&*()_+|<>?:{}= ]/g;
    
    if(!pattern.test(str)){
        return true;
    }else{
        return false;
    }
}


//이메일 유효성 체크
function isEmail(strValue) {
    var reg_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

    if (!reg_email.test(strValue)) return false;
    else return true;
}

/**
* 쿠키값 추출
* @param cookieName 쿠키명
*/
function getCookie(cookieName) {
    var search = cookieName + "=";
    var cookie = document.cookie;

    // 해당 쿠키명이 존재하는지 검색한 후 존재하면 위치를 리턴.
    var startIndex = cookie.indexOf(cookieName);
    // 만약 존재한다면
    if (startIndex != -1) {
        // 값을 얻어내기 위해 시작 인덱스 조절
        startIndex += cookieName.length;

        // 값을 얻어내기 위해 종료 인덱스 추출
        endIndex = cookie.indexOf(";", startIndex);

        // 만약 종료 인덱스를 못찾게 되면 쿠키 전체길이로 설정
        if (endIndex == -1) endIndex = cookie.length;

        // 쿠키값을 추출하여 리턴
        return unescape(cookie.substring(startIndex + 1, endIndex));
    }
    else {
        // 쿠키 내에 해당 쿠키가 존재하지 않을 경우
        return false;
    }
}

/**
* 쿠키 설정
* @param cookieName 쿠키명
* @param cookieValue 쿠키값
* @param expireDay 쿠키 유효날짜
*/
function setCookie(cookieName, cookieValue, expireminute) {
    var exdate = new Date();
    exdate.setMinutes(exdate.getMinutes() + expireminute);
    document.cookie = cookieName + "=" + escape(cookieValue) + ((expireminute == null) ? "" : ";expires=" + exdate.toUTCString());
}

/**
 * url 파라미터 체크
 */
function checkUrlParam(paramName) {
    var rtParamValue = '';
    var param = window.location.search.substring(1);	// 파라미터 체크
    if (param && param.length > 0) {
        var paramArray = param.split('&');				// '&'를 기준으로 분리
        for (var i = 0, cnt = paramArray.length; i < cnt; i++) {
            var chkParam = paramArray[i].split('=');	// '='를 기준으로 분리 
            if (chkParam.length > 1 && chkParam[0] == paramName) {
                rtParamValue = chkParam[1];
                break;
            }
        }
    }

    return rtParamValue;
}

/**
 * 모바일 url redirect
 */
function moveMobileUrl(mobileUrl) {
    const mobileKeyWords = ['iphone', 'ipad', 'blackberry', 'android', 'lg', 'mot', 'samsung', 'sonyericsson']
    const device = navigator.userAgent.toLowerCase().match(mobileKeyWords.join('|'))
    if(!device){
        return;
    }

    const host = mobileUrl.split('?')[0]
    const search = decodeURIComponent(mobileUrl.split('?')[1]).replace(/\+/g, ' ')
    if (search) {
        let url = host + '/?'
        const searchArr = search.split('&')
        for (var i = 0; i < searchArr.length; i++) {
            const v = searchArr[i]
            const index = v.indexOf('=')
            if (index !== -1) {
                const name = encodeURIComponent(v.substring(0, index))
                const val = encodeURIComponent(v.substring(index + 1, v.length))
                url = url + "&" + name + "=" + val
            }
         }
        location.href = url
    }else{
        location.href = mobileUrl
    }
}

/**
 * Track Google Analytics Events
 * https://developers.google.com/analytics/devguides/collection/gtagjs/events
 */
function GAEvents(action, category, label) {
    if (typeof gtag != 'function') return false;
    if (!gtag || !action) return false;
    
    var gtagParam = { action: action, category: category || '', label: label || '' };

    gtag('event', gtagParam.action, {
        'event_category': gtagParam.category,
        'event_label': gtagParam.label
    });
}

// 휴대폰 포맷
var phoneFormat = function (value, value2) {
    if (value2) {
        value = value + value2;
    }
    var numbers = value && value.replace(/-/g,"");
    var matches = numbers && numbers.match(/^(\d{3})(\d{4})$/);
    if (matches) {
        return matches[1] + "-" + matches[2];
    }
    matches = numbers && numbers.match(/^(\d{4})(\d{4})$/);
    if (matches) {
        return matches[1] + "-" + matches[2];
    }
    matches = numbers && numbers.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (matches) {
        return matches[1] + "-" + matches[2] + "-" + matches[3];
    }
    matches = numbers && numbers.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (matches) {
        return matches[1] + "-" + matches[2] + "-" + matches[3];
    }

    return numbers;
}

// 휴대폰 포맷
var phoneCommonFormat = function (value, value2) {
    if (value2) {
        value = value + value2;
    }
    var numbers = value && value.replace(/-/g,"");
    var matches = numbers && numbers.match(/^(\d{3})(\d{4})$/);
    if (matches) {
        return matches[1] + "-" + matches[2];
    }
    matches = numbers && numbers.match(/^(\d{4})(\d{4})$/);
    if (matches) {
        return matches[1] + "-" + matches[2];
    }
    matches = numbers && numbers.match(/^(\d{2})(\d{3})(\d{4})$/);
    if (matches) {
        return matches[1] + "-" + matches[2] + "-" + matches[3];
    }
    matches = numbers && numbers.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (matches) {
        return matches[1] + "-" + matches[2] + "-" + matches[3];
    }
    matches = numbers && numbers.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (matches) {
        return matches[1] + "-" + matches[2] + "-" + matches[3];
    }
    matches = numbers && numbers.match(/^(\d{4})(\d{4})(\d{4})$/);
    if (matches) {
        return matches[1] + "-" + matches[2] + "-" + matches[3];
    }

    return numbers;
}

// 휴대폰 번호 체크
var splitMobileNumber = function(mobileNumber, isAlert) {
    var numberList = {};
    var checkNumber = mobileNumber || '';
    checkNumber = checkNumber.replace(/-/g, "");

    if (isAlert && (checkNumber.length < 10 || checkNumber.length > 11)) {
        alert("휴대폰번호를 정확히 입력해주시기 바랍니다.");
        return numberList;
    }

    var number1 = checkNumber.substring(0, 3);
    var number2 = checkNumber.substring(3);
    var number = phoneFormat(number1, number2);

    numberList = {
        number1: number1,
        number2: number2,
        number: number
    }

    return numberList;
}

// 휴대폰 번호 체크
var checkTelNumber = function(num_first, num_two) {
    var numberList = {};
    var checkNumber1 = num_first || '';
    checkNumber1 = checkNumber1.replace(/-/g, "");
    var checkNumber2 = num_two || '';
    checkNumber2 = checkNumber2.replace(/-/g, "");

    var phone_rule1 = ['011','016','017','018','019'];
	var phone_rule2 = ['031','032','033','041','042','043','051','052','053','054','055','061','062','063','064','070','050'];


    if(checkNumber1 == '010'){
        // 010 선택시
		if(checkNumber2.length != 8){
            // 총 입력 숫자가 8자리가 아닌 경우
            alert("유효한 전화번호가 아닙니다.\n입력한 전화 번호를 다시 확인해주세요.");
            return numberList;
        } else{         
            var number = phoneCommonFormat(checkNumber1, checkNumber2);

            numberList = {
                number1: checkNumber1,
                number2: checkNumber2,
                number: number
            }
        
            return numberList;
        }
    }else if(phone_rule1.indexOf(checkNumber1) >=0) {
        // 011, 016, 017, 018, 019 선택시
		if(checkNumber2.length <= 6){
			// 총 입력 숫자가 6자리 이하일 경우
            alert("유효한 전화번호가 아닙니다.\n입력한 전화 번호를 다시 확인해주세요.");
            return numberList;
        } else{
            var number = phoneCommonFormat(checkNumber1, checkNumber2);

            numberList = {
                number1: checkNumber1,
                number2: checkNumber2,
                number: number
            }
        
            return numberList;
        }
    }else{
        // 직집입력 선택시
        if(checkNumber2.substring(0,1) != "0"){
			// 처음 입력하는 숫자가 0이 아닌 경우
			alert("유효한 전화번호가 아닙니다.\n지역번호 등이 입력되었는지 다시 확인해주세요.");
			return numberList;
        }
        
        if(checkNumber2.length <= 7){
			// 총 입력 숫자가 7자리 이하일 경우
			alert("유효한 전화번호가 아닙니다.\n입력한 전화 번호를 다시 확인해주세요."); 
			return numberList;
        }
        
        var number1 = checkNumber2.substring(0, 3);
        var number2 = checkNumber2.substring(3);

        if(number1 == '010'){
			// 010 입력시
			if(number2.length != 8){
				// 총 입력 숫자가 8자리가 아닌 경우
				alert("유효한 전화번호가 아닙니다.\n입력한 전화 번호를 다시 확인해주세요.");
				return numberList;
			} else{
                var number = phoneCommonFormat(number1, number2);

                numberList = {
                    number1: number1,
                    number2: number2,
                    number: number
                }
            
                return numberList;
			} 
		} else if(phone_rule1.indexOf(number1) >=0) {
			// 011, 016, 017, 018, 019 입력시
			if(number2.length <= 6){
				// 총 입력 숫자가 6자리 이하일 경우
				alert("유효한 전화번호가 아닙니다.\n입력한 전화 번호를 다시 확인해주세요.");
				return numberList;
			} else{
                var number = phoneCommonFormat(number1, number2);

                numberList = {
                    number1: number1,
                    number2: number2,
                    number: number
                }
            
                return numberList;
			} 
		} else if(checkNumber2.substring(0,2) == '02') {
			// 02 입력시
            var number = phoneCommonFormat(checkNumber2.substring(0,2), checkNumber2.substring(2));

            numberList = {
                number1: checkNumber2.substring(0,2),
                number2:  checkNumber2.substring(2),
                number: number
            }
        
            return numberList;
		} else{
            // 010, 011, 016, 017, 018, 019, 02가 아닐 경우
			
			if(phone_rule2.indexOf(number1)>=0){
				// 031,032,033,041,042,043,051,052,053,054,055,061,062,063,064,070,050인 경우
                var number = phoneCommonFormat(number1, number2);

                numberList = {
                    number1: number1,
                    number2:  number2,
                    number: number
                }
            
                return numberList;
			}else{
				// 위 해당사항이 없을 경우
				alert("유효한 전화번호가 아닙니다.\n지역번호 등이 입력되었는지 다시 확인해주세요.");
				return numberList;
			}
        }
    }
}

// 휴대폰 번호 체크 - 얼럿 없음
var checkTelNumberNoAlert = function(num_first, num_two) {
    var numberList = {};
    var checkNumber1 = num_first || '';
    checkNumber1 = checkNumber1.replace(/-/g, "");
    var checkNumber2 = num_two || '';
    checkNumber2 = checkNumber2.replace(/-/g, "");

    var phone_rule1 = ['011','016','017','018','019'];
	var phone_rule2 = ['031','032','033','041','042','043','051','052','053','054','055','061','062','063','064','070','050'];


    if(checkNumber1 == '010'){
        // 010 선택시
		if(checkNumber2.length != 8){
            // 총 입력 숫자가 8자리가 아닌 경우
            //alert("유효한 전화번호가 아닙니다.\n입력한 전화 번호를 다시 확인해주세요.");
            return false;
        } else{         
            var number = phoneCommonFormat(checkNumber1, checkNumber2);

            numberList = {
                number1: checkNumber1,
                number2: checkNumber2,
                number: number
            }
        
            return numberList;
        }
    }else if(phone_rule1.indexOf(checkNumber1) >=0) {
        // 011, 016, 017, 018, 019 선택시
		if(checkNumber2.length <= 6){
			// 총 입력 숫자가 6자리 이하일 경우
            //alert("유효한 전화번호가 아닙니다.\n입력한 전화 번호를 다시 확인해주세요.");
            return false;
        } else{
            var number = phoneCommonFormat(checkNumber1, checkNumber2);

            numberList = {
                number1: checkNumber1,
                number2: checkNumber2,
                number: number
            }
        
            return numberList;
        }
    }else{
        // 직집입력 선택시
        if(checkNumber2.substring(0,1) != "0"){
			// 처음 입력하는 숫자가 0이 아닌 경우
			//alert("유효한 전화번호가 아닙니다.\n지역번호 등이 입력되었는지 다시 확인해주세요.");
			return false;
        }
        
        if(checkNumber2.length <= 7){
			// 총 입력 숫자가 7자리 이하일 경우
			//alert("유효한 전화번호가 아닙니다.\n입력한 전화 번호를 다시 확인해주세요."); 
			return false;
        }
        
        var number1 = checkNumber2.substring(0, 3);
        var number2 = checkNumber2.substring(3);

        if(number1 == '010'){
			// 010 입력시
			if(number2.length != 8){
				// 총 입력 숫자가 8자리가 아닌 경우
				//alert("유효한 전화번호가 아닙니다.\n입력한 전화 번호를 다시 확인해주세요.");
				return false;
			} else{
                var number = phoneCommonFormat(number1, number2);

                numberList = {
                    number1: number1,
                    number2: number2,
                    number: number
                }
            
                return numberList;
			} 
		} else if(phone_rule1.indexOf(number1) >=0) {
			// 011, 016, 017, 018, 019 입력시
			if(number2.length <= 6){
				// 총 입력 숫자가 6자리 이하일 경우
				//alert("유효한 전화번호가 아닙니다.\n입력한 전화 번호를 다시 확인해주세요.");
				return false;
			} else{
                var number = phoneCommonFormat(number1, number2);

                numberList = {
                    number1: number1,
                    number2: number2,
                    number: number
                }
            
                return numberList;
			} 
		} else if(checkNumber2.substring(0,2) == '02') {
			// 02 입력시
            var number = phoneCommonFormat(checkNumber2.substring(0,2), checkNumber2.substring(2));

            numberList = {
                number1: checkNumber2.substring(0,2),
                number2:  checkNumber2.substring(2),
                number: number
            }
        
            return numberList;
		} else{
            // 010, 011, 016, 017, 018, 019, 02가 아닐 경우
			
			if(phone_rule2.indexOf(number1)>=0){
				// 031,032,033,041,042,043,051,052,053,054,055,061,062,063,064,070,050인 경우
                var number = phoneCommonFormat(number1, number2);

                numberList = {
                    number1: number1,
                    number2:  number2,
                    number: number
                }
            
                return numberList;
			}else{
				// 위 해당사항이 없을 경우
				//alert("유효한 전화번호가 아닙니다.\n지역번호 등이 입력되었는지 다시 확인해주세요.");
				return false;
			}
        }
    }
}

//거주지역
var address = function(){
    var addressList = new Array("시/도", "서울", "강원", "경기", "경남", "경북", "광주", "대구", "대전", "부산", "울산", "인천", "전남", "전북", "제주", "충남", "충북");
    return addressList;
}

/**
 * 앱 웹뷰 > Firebase Event
 */
function firebaseEventForApp(itemId, itemName, contentType) {
	if (navigator.userAgent.match(/Android/i) != null && (window.AppInterface != null && window.AppInterface != 'undefined')) {
        // android
        window.AppInterface.appLogEvent(itemId, itemName, contentType);
        
	} else if (navigator.userAgent.match(/iPhone|iPad|iPod/i) != null && (navigator.userAgent.match(/Safari/i) == null)) {
        // IOS
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

/**
 * 앱 웹뷰 > 외부링크 팝업 띄우기 
 */
function openPopupForApp(urlAddr, popName, popOption) {
	if (!popName) popName = 'popEvent';
    if (!popOption) popOption = 'height=' + screen.height + ', width=' + screen.width + ', fullscreen=yes, resizable=yes, scrollbars=yes';
    
	var winPop = window.open(urlAddr, popName, popOption);

    var osType = 'mobileWeb';
	if (navigator.userAgent.match(/Android/i) != null && (window.AppInterface != null && window.AppInterface != 'undefined')) {
        osType = 'android';
	} else if (navigator.userAgent.match(/iPhone|iPad|iPod/i) != null && (navigator.userAgent.match(/Safari/i) == null)) {
        osType = 'ios';
    }

    if (osType == 'android') {
        location.href = urlAddr;

    } else if (osType == 'ios') {
        webkit.messageHandlers.appInterface.postMessage(
            {
                method: 'openBrowser',
                url: urlAddr
            }
        );

    } else {
        winPop.location = urlAddr;
    }
}

/** 
 * 사파리 브라우저 체크 얼럿
*/
function checkSafariAlert(){
    var agent = navigator.userAgent.toLowerCase();    
    
    if(/iP(ad|od|hone)/i.test(agent)&&/WebKit/i.test(agent)&&!(/(CriOS|FxiOS|OPiOS|mercury)/i.test(agent))){
        alert("사파리 브라우저에서 링크가 열리지 않을 경우에는 팝업 차단 기능을 해제해주세요.");
    }
}