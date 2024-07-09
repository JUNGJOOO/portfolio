indexApp.service("CommonService", function ($modal, $log, $window, AppConf, CommonFactory, AdInsuDirectCarFactory) {
    var common = new CommonFactory(AppConf);
    var adInsuDirectCar = new AdInsuDirectCarFactory(AppConf);

    //---------------------------------------------------------------------------------------------
    // 서버 타임
    //---------------------------------------------------------------------------------------------
    common.getToday().then(
        function (data) {
            today = data.data;
        }
    )

    this.getToday = function () {
        return common.getToday();
    }

    this.getTodayAdd = function (days) {
        return common.getTodayAdd(days);
    }

    //---------------------------------------------------------------------------------------------
    // 핸드폰 인증
    //---------------------------------------------------------------------------------------------
    // 핸드폰 인증문자 발송
    this.sendPhoneCertNum = function (customer, callback) {
        var returnData = {
            success: false,
            certSeq: '',
            message: ''
        }

        if (!customer.customerMobile || customer.customerMobile.length < 10) {
            returnData.message = '연락처를 정확히 입력해주시기 바랍니다.';
            if (callback) callback(returnData);
            return true;
        }

        common.getCookie(AppConf.cookie_phone_cert, true).then(
            function (data) {
                if (data.data == customer.customerMobile) {
                    returnData.success = true;
                    returnData.message = '이미 인증되었습니다.';
                    if (callback) callback(returnData);
                    return true;
                }

                if (customer.customerMobile == '010-0000-1111') {    // 테스트폰 예외 처리
                    returnData.success = true;
                    returnData.certSeq = '0';
                    returnData.message = '인증번호를 입력해주세요.';
                    if (callback) callback(returnData);
                    return true;
                }

                common.getSmsCertNum(customer.customerMobile.replace(/-/g, ""), function (result) {   // (API) 인증 번호 요청
                    if (result.result == 'SUCCESS') {
                        returnData.success = true;
                        returnData.certSeq = result.certSeq;
                        returnData.message = '휴대폰 인증번호를 요청하였습니다.\n휴대폰에 전송된 인증번호를 3분 이내에 입력해주세요.';
                    }

                    if (callback) callback(returnData);
                    return true;
                });
            }
        );
    }

    // 핸드폰 인증문자 확인
    // param : apiCertSeq(api에서 전송받은 인증번호), customCertNum(고객이 입력한 인증번호), customer(고객정보), isSetCookie(쿠키저장여부)
    this.checkPhoneCertNum = function (apiCertSeq, customCertNum, customer, isSetCookie, callback) {
        var returnData = {
            success: false,
            message: ''
        }

        var cookieExpireTime = (AppConf.cookieExpireTime && AppConf.cookieExpireTime > 0) ? AppConf.cookieExpireTime : 10 * 60 * 1000;

        if (!customCertNum) {
            returnData.message = '전송받은 인증번호를 입력해주세요.';
            if (callback) callback(returnData);
            return false;
        }

        // (API) 인증번호 확인
        common.sendSmsCertNum(customer.customerMobile.replace(/-/g, ""), customCertNum, apiCertSeq, function (result) {
            returnData.success = true;
            returnData.message = '정상 인증되었습니다.';

            if (isSetCookie) {
                common.setCookie(AppConf.cookie_phone_cert, customer.customerMobile, cookieExpireTime, true).then(function (res) {
                    if (callback) callback(returnData);
                    return true;
                });
            } else {
                if (callback) callback(returnData);
                return true;
            }
        });
    }

    //---------------------------------------------------------------------------------------------
    // 입력 데이터 유효성 체크
    //---------------------------------------------------------------------------------------------
    var checkCustomer = function (customer) {
        var chkName = (customer.customerName) ? customer.customerName.replace(/(^\s*)|(\s*$)/gi, "") : '';
        var chkMobile2 = (customer.customerMobile2) ? customer.customerMobile2.replace(/-/g, "") : '';

        // 이름 체크
        if (!chkName) {
            alert("이름을 입력해 주세요.");
            return false;
        } else if (!onlyKorean(chkName)) {
            alert("이름을 한글로 다시 입력해주시기 바랍니다.");
            return false;
        } else if (chkName.length < 2 || chkName.length > 10) {
            alert("이름을 정확히 입력해주시기 바랍니다.");
            return false;
        }
        
        // 연락처 체크
        if (customer.customerMobile3) {
            var customerMobile = customer.customerMobile2 + customer.customerMobile3;
            if (customerMobile.length < 7 || !onlyNumber(customerMobile)) {
                alert("연락처를 정확히 입력해주시기 바랍니다.");
                return false;
            }

        } else if (chkMobile2.length < 7 || !onlyNumber(chkMobile2)) {
            alert("연락처를 정확히 입력해주시기 바랍니다.");
            return false;
        }
        
        return true;
    }

    var checkCustomerAgree = function (customer, onlyAgree) {
        if (!onlyAgree && !checkCustomer(customer)) {
            return false;
        }

        if (!customer.customerAgree) {
            alert("개인정보수집 및 활용동의를 체크해 주세요.");
            return false;
        }
        return true;
    }

    // Customer 유효성 체크
    this.checkCustomer = function (custom, onlyAgree) {
        return checkCustomerAgree(custom, onlyAgree);
    }

    // Customer 유효성 체크 (개인정보수집 및 활용동의 분리)
    this.checkCustomerNotAgree = function (custom) {
        return checkCustomer(custom);
    }

    //---------------------------------------------------------------------------------------------
    // Modal 레이어 오픈
    //---------------------------------------------------------------------------------------------
    var modalOpen = function (url, ctrl, items, modalsize, callback) {
        var modalInstance = $modal.open({
            backdrop: 'static',
            templateUrl: url,
            controller: ctrl,
            size: modalsize || '',  // lg, mobile-lg...
            resolve: {
                items: function () {
                    return items;
                }
            }
        });

        modalInstance.result.then(callback, function (result) {
            if (callback) callback(result);
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    this.modalOpen = function (url, ctrl, items, modalsize, callback) {
        modalOpen(url, ctrl, items, modalsize, callback);
    }

    //---------------------------------------------------------------------------------------------
    // CM 클릭 로그 저장 후 원수사 페이지로 이동
    //---------------------------------------------------------------------------------------------
    this.saveClickLog = function(isWindowOpen, isMobile, companyCode) {
        if (!companyCode) companyCode = AppConf.siteCompanyCode;

        adInsuDirectCar.getClickLogSeqno({companyCode: companyCode, customerIP: AppConf.userIP}, function(apiResult) {
            var clickSeqno = (apiResult.clickSeqno) ? apiResult.clickSeqno : 0;
            var insurUrl = (apiResult.companyInfo && apiResult.companyInfo.insurUrl) ? apiResult.companyInfo.insurUrl : '';
            var sendVar = (apiResult.companyInfo && apiResult.companyInfo.sendVar) ? apiResult.companyInfo.sendVar : '';

            if (clickSeqno > 0 && insurUrl.length > 0 && sendVar.length > 0) {
                var redirectUrl = insurUrl + '&' + sendVar + '=' + clickSeqno;

                if (isWindowOpen) {
                    if (isMobile) {
                        firebaseEventForApp('main','원수사 클릭','button');
                        openPopupForApp(redirectUrl);
                    } else {
                        $window.open(redirectUrl, 'popCM', 'height=' + $window.innerHeight + ', width=' + $window.innerWidth + ', fullscreen=yes, resizable=yes, scrollbars=yes');
                    }
                } else {
                    $window.location.href = redirectUrl;
                }
            } else if (clickSeqno > 0 && insurUrl.length > 0) {
                if (isWindowOpen) {
                    if (isMobile) {
                        firebaseEventForApp('main','원수사 클릭','button');
                        openPopupForApp(insurUrl);
                    } else {
                        $window.open(insurUrl, 'popCM', 'height=' + $window.innerHeight + ', width=' + $window.innerWidth + ', fullscreen=yes, resizable=yes, scrollbars=yes');
                    }
                } else {
                    $window.location.href = insurUrl;
                }
            }
        });
    }

    //---------------------------------------------------------------------------------------------
    // CM 클릭 로그 저장 만 / 원수사 페이지는 개별 이동
    //---------------------------------------------------------------------------------------------
    this.returnClickLog = function(callback) {
        adInsuDirectCar.getClickLogSeqno({companyCode: AppConf.siteCompanyCode, customerIP: AppConf.userIP}, function(apiResult) {
            var clickSeqno = (apiResult.clickSeqno) ? apiResult.clickSeqno : 0;
            
            callback(clickSeqno);
        });
    }
})