/**
 * 공통 / 기타 관련 API Call
 */
indexApp.factory('CommonFactory', function ($http) {
    var header = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }

    var CommonFactory = function (AppConf) {
        this.siteCode = AppConf.siteCode;
        this.siteDoain = AppConf.siteDomain;
    };

    // 핸드폰 인증번호 요청
    CommonFactory.prototype.getSmsCertNum = function (customerMobile, callback) {
        var param = {
            siteCode: this.siteCode,
            customerMobile: customerMobile       // 핸드폰 번호
        }
        $http({
            method: 'POST',
            url: '/api',
            params: {
                uri: '/api/user/cert'
            },
            data: $.param(param),
            headers: header
        }).success(function (res) {
            if (res.result == "SUCCESS")
                callback(res);
            else
                callback([]);
        })
    }

    // 핸드폰 인증번호 발송
    CommonFactory.prototype.sendSmsCertNum = function (customerMobile, certNum, certSeq, callback) {
        var param = {
            customerMobile: customerMobile,
            phoneNum: customerMobile,
            certNum: certNum,
            certSeq: certSeq
        }
        $http({
            method: 'POST',
            url: '/api',
            params: {
                uri: '/api/user/cert/check'
            },
            data: $.param(param),
            headers: header
        }).success(function (res) {
            if (res.result == "SUCCESS")
                callback(res.result);
            else
                // callback([]);
                // alert(res.message);
                alert("인증번호가 같지 않습니다. 재입력 해주세요.");
        })
    }

    // 쿠키 설정 
    CommonFactory.prototype.setCookie = function (cookieName, value, maxAge, isEncrypt) {
        return $http({
            method: 'POST',
            url: '/cookie/set/' + cookieName,
            params: {
                maxAge: maxAge,
                value: value,
                domain: this.siteDoain,
                isEncrypt: isEncrypt
            }
        })
    }

    // GET
    CommonFactory.prototype.getCookie = function (cookieName, isEncrypt) {
        return $http({
            method: 'POST',
            url: '/cookie/get/' + cookieName,
            params: {
                isEncrypt: isEncrypt
            },
            headers: header
        })
    }

    // 쿠키삭세 cookieName == all 이면 전체 삭제
    CommonFactory.prototype.deleteCookie = function (cookieName) {
        return $http({
            method: 'POST',
            url: '/cookie/delete/' + cookieName,
            headers: header
        })
    }

    // 리모트 IP
    CommonFactory.prototype.getUserIP = function () {
        return $http({ method: 'GET', url: '/util/remoteip' })
    }

    // 오늘 날짜 (return type : YYYYMMDD)
    CommonFactory.prototype.getToday = function () {
        return $http({ method: 'GET', url: '/util/date/today' })
    }

    // 오늘날짜 add (return type : YYYYMMDD)
    CommonFactory.prototype.getTodayAdd = function (days) {
        return $http({ method: 'GET', params: { days: days }, url: '/util/date/add' })
    }
    
    return CommonFactory;
})