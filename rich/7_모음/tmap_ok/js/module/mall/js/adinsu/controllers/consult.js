
var consultApp = angular.module("consultApp",[]);

consultApp.controller("ConsultController", function($scope, $http, $window, $location, $modalInstance, $document , $cookies, AppConf, CommonFactory, CommonService, AdInsuDirectCarFactory, ConsultFactory, ConsultPopupService) {
    var common = new CommonFactory(AppConf);
    var adInsuDirectCar = new AdInsuDirectCarFactory(AppConf);

    $scope.imageDomain = AppConf.imageDomain;
    $scope.publicUrl = AppConf.publicUrl;
    $scope.staticName = AppConf.staticName;
    $scope.adinsuImageHost = AppConf.adinsuImageHost;
    $scope.siteCode = AppConf.siteCode;
    $scope.is_service_time = items.is_service_time;
    $scope.operate_comment = items.operate_comment;
    $scope.layer_type = items.layer_type;
    $scope.browser_type = items.browser_type;

    var inType = AppConf.inType; 
    
    $scope.addList = [];
    $scope.list = {};
    $scope.initData = function(){
        $scope.customer  = {
            customerName : '',
            phoneNumber : '010',
            mobileNumber : '',
            customerMobile : '',
            customerMobile1 : '',
            customerMobile2 : '',
            areaCode : 'COMMON___LYR01',
            mainCode : 'A01',
            agreeMarketing : '',
            customerAgree : '',
            subCode : '20'            
        }
    };

    $scope.initData();
    
    // 거주지역 리스트
    $scope.addList = address(); 

    //초기 정보 셋팅
    /* 애드인슈 요청으로 쿠키값 삭제
    common.getCookie(AppConf.cookie_customer, true).then(
        function(customer) {
            $scope.customer = customer.data;
            if(!customer.data) $scope.customer = {phoneNumber :'010'};
        }
    );
    */
    // 성공여부
    $scope.toggle = {
        showResult: false
    }

    // URL 이동
    $scope.goUrl = function(url, reload) {
        if (reload == undefined || url == $location.path()) reload = true;
        if (reload == 'new') $window.open(url, '_blank');
        else if (reload) $window.location.href = url;
        else $location.url(url);
    }

    //보험사 리스트 조회 - API 호출
    adInsuDirectCar.getCompanyList({}, function(result) {
        $scope.companyList = result.companyList;
        $scope.companyInfo = result.companyInfo;
        angular.forEach(result.companyInfo, function(insurInfo, key) {
            $scope.list[key] = new Array;
            $scope.list[key][0] = insurInfo.insurName;
            $scope.list[key][1] = insurInfo.companyCode;
            $scope.list[key][2] = insurInfo.approvalNo;
            $scope.list[key][3] = insurInfo.detail;
            $scope.list[key][4] = insurInfo.detailList;
            $scope.list[key][5] = insurInfo.insurUrl;
            $scope.list[key][6] = insurInfo.title;
            $scope.list[key][7] = insurInfo.phoneNum;
        });
    });
    
    // 상담신청용 쿠키저장
    var consultSetCookie = function(customerName, customerMobile1, customerMobile2) {
        var cookieValue = {
            customerName : customerName,
            phoneNumber : customerMobile1,
            phoneNumber1 : customerMobile2
        }
        common.setCookie(AppConf.cookie_customer, JSON.stringify(cookieValue), AppConf.cookieExpireTime, true);
    }

    // 상담신청
    $scope.consult = function() {
        // 개인정보수집 및 활용동의 체크
        if (!$scope.customer.customerAgree) {
            var objCnt = $document[0].getElementsByName('agree').length;
            var objIdx = (objCnt - 1);

            $scope.customer.customerAgree = ($document[0].getElementsByName('agree')[objIdx].checked) ? true : false;
        }

        // 마케팅동의 체크
        if($("#agree_marketing").prop('checked') == true) $scope.customer.agreeMarketing = 'Y';
        else $scope.customer.agreeMarketing = 'N';

		$scope.customer.mobileNumber = $scope.customer.phoneNumber+$scope.customer.phoneNumber1;//전화번호 합침.

        if($scope.siteCode == 'WT' || $scope.siteCode == '오햬'
            || $scope.siteCode == 'G6' || $scope.siteCode == 'G7'
            || $scope.siteCode == 'M2' || $scope.siteCode == 'M3' 
            || $scope.siteCode == '오쎼' ){
            var mobileNumbers = checkTelNumberNoAlert($scope.customer.phoneNumber, $scope.customer.phoneNumber1);
        }else{
            var mobileNumbers = splitMobileNumber($scope.customer.mobileNumber, false);
        }

        $scope.customer.customerMobile1 = mobileNumbers.number1;
        $scope.customer.customerMobile2 = mobileNumbers.number2;
        $scope.customer.customerMobile  = mobileNumbers.number;

        // validation check로직 - 공통로직
        if(!CommonService.checkCustomerNotAgree($scope.customer)){
            return false;
        }

        if (!$scope.customer.customerAgree ) {
            alert("개인정보수집 및 활용동의를 체크해 주세요.");
            return false;
        }

        //상담 운영시간 확인
        //$scope.getServiceTime();

        jQuery(".btn_quick_request").hide();
        jQuery(".btn_quick_request_loader").show();

        var consultData = ConsultFactory.get('consult');
        $scope.customer.areaCode = consultData.areaCode || 'COMMON___LYR01';
        $scope.customer.mainCode = consultData.mainCode || 'A01';   // CRM 메인코드 (기본값 : 무료상담신청)

        if(items.subCode != '') $scope.customer.subCode = items.subCode;
        else $scope.customer.subCode = consultData.subCode || '';

        // 상담신청 API 호출
        adInsuDirectCar.requestOperaConsult($scope.customer, function(callback) {
            if (callback.seqno && callback.seqno > 0) {
                $scope.toggle.showResult = true; 
                
                // 쿠키저장
                consultSetCookie($scope.customer.customerName, $scope.customer.customerMobile1, $scope.customer.customerMobile2);

                // 운영시간체크 - 템플릿 타입 코드 변경
                var type = ($scope.is_service_time == 'Y') ? 'adinsu03': 'adinsu04';

                if($scope.siteCode != '오쎼'){  // 티맵입점 사이트(모바일) 의 경우 알림톡 호출 제외
                    // (#7605) 알림톡 호출
                    adInsuDirectCar.callAlimTalk($scope.customer, type, function(callback) {
                        if (callback.sendResults && callback.sendResults.length > 0) {
                            console.log('kakao alimtalk result : ' + callback.sendResults[0].resultMessage);
                        }
                    });
                }

                $scope.initData();

            } else {
                alert('인터넷 연결 상태가 원할하지 않습니다. 잠시 후 다시 시도해 주시기 바랍니다.');
            } 

            jQuery(".btn_quick_request").show();
            jQuery(".btn_quick_request_loader").hide();
        });
    }

    //팝업창 닫기
    $scope.close = function () {
        $modalInstance.close();
    }

    //원수사 팝업
    $scope.openCompanyPopup = function(companyCode,chk){
        // #8726 명절연휴 팝업조절
        let currentDate = new Date();
        let year = currentDate.getFullYear(), month = (currentDate.getMonth()+1), day = currentDate.getDate();
        let hour = currentDate.getHours(), minutes = currentDate.getMinutes()

        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;
        if (hour < 10) hour = '0' + hour;
        if (minutes < 10) minutes = '0' + minutes;

        let Ymd = year + '' + month + '' + day + '' + hour + '' + minutes;

        var startDate = '202009291800'; // 202009291800  //연휴시작일시
        var endDate = '202010042359';   // 202010042359  //연휴종료일시

        if(startDate <= Ymd && endDate >= Ymd){
            ConsultPopupService.companyPopup(companyCode,0);
            return false;
        }
        //명절연휴 팝업조절 End

        var adalbaPartner;
        if ($cookies.adalba) {
            var adalbaCookie = JSON.parse($cookies.adalba);
            if (typeof adalbaCookie === 'object' && adalbaCookie.partnerID) adalbaPartner = adalbaCookie.partnerID;
        }
        
        common.getCookie(AppConf.cookie_customer, true).then(
            function(custom) {
                if(inType || adalbaPartner){
                    if(!custom.data) alert('보험료 통합견적비교를 신청하시면 확인 가능합니다.');
                    else ConsultPopupService.companyPopup(companyCode,0);
                }else{
                    ConsultPopupService.companyPopup(companyCode,0);
                }                     
            }                        
        );
    }
    
});


consultApp.service('ConsultPopupService', function (AppConf, AdInsuDirectCarFactory) {   
    var adInsuDirectCar = new AdInsuDirectCarFactory(AppConf);
    var siteCode = AppConf.siteCode;
    var customerIp = AppConf.userIP;

    //원수사로 seqno 담아서 팝업 띄우기
    this.companyPopup = function(companyCode, cstSeqno, callback){
        var apiParam = {
            siteCode: siteCode,            // 사이트 코드(필수. String)
            customerIp: customerIp,        // 고객 IP (String. 필수)
            companyCode: companyCode,      // 보험사코드 (String. 필수)
            cstSeqno : cstSeqno
        }       
        
        //팝업차단 메시지 우회용 소스 다이렉트 마케팅 요청업무 
        var objPop = window.open('','','height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes , resizable=yes, scrollbars=yes'); //팝업창 미리생성            
        
        adInsuDirectCar.getClickLogSeqno(apiParam,function(result,callback){
            if(result.clickSeqno > 0){
                var sendUrl = result.companyInfo.insurUrl; 
                if(result.companyInfo.sendVar != '') {
                    if(companyCode == "HKF"){//https://richnco.atlassian.net/browse/SITE-129
                        const originalSendUrl = sendUrl;
                        const paramString = '&'+result.companyInfo.sendVar+'='+result.clickSeqno;
                        if (originalSendUrl.toLowerCase().includes("%23")){
                            sendUrl = originalSendUrl.replace(/(%23)/, paramString+"#"); 
                        }else{
                            sendUrl = originalSendUrl.replace(/(#)/, paramString+"#");
                        }
                    }else{
                        sendUrl = result.companyInfo.insurUrl+'&'+result.companyInfo.sendVar+'='+result.clickSeqno;
                    }
                }
                if (typeof objPop === 'undefined') objPop = parent.document;
                //objPop.location = sendUrl;        //사파리 이슈로 다시복구
                objPop.location.href = sendUrl;
                //window.open(sendUrl,'_blank');    // 20200928 새탭으로 변경요청
            } 
        });
    }
});

// resize
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    console.log(vh)
})