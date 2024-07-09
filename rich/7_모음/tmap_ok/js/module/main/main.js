var mainApp = angular.module('mainApp', ['ngCookies']);

mainApp.controller('mainController', 
    function($scope, $filter,AppConf ,$location ,$document,$window, $cookies,CommonFactory,CommonService,ConsultFactory,PopupLayer,ConsultPopupService, AdInsuDirectCarFactory , GetApiData) {
    
    var common = new CommonFactory(AppConf);
    var adInsuDirectCar = new AdInsuDirectCarFactory(AppConf);
    var inType = AppConf.inType;      
    $scope.adinsuImageDomain = AppConf.adinsuImageHost+"/adinsu/common/logo/partner_mo";
    $scope.companyList = [];
    $scope.imageDomain = AppConf.imageDomain;

    //$scope.PopupLayer = PopupLayer;    

    //보험료 비교견적 데이터 
    $scope.initData = function(){
        $scope.customer  = {
            customerRegion : '',
            customerName : '',
            phoneNumber : '010',
            mobileNumber : '',
            customerMobile : '',
            customerMobile1 : '',
            customerMobile2 : '',
            customerAgree: false,
            areaCode : 'COMMON___LYR01',
            mainCode : 'A01',
            subCode : '20',
            result : 'N',
            agreeMarketing : true,
            clickSeqno : '',
            memo : ''
        }
    };

    $scope.initData();


    // 보험료 비교견적 신청 레이어
    $scope.consultLayer = function(subCode) {
        items = {
            resultType: 'consult',
            areaCode: 'MAINPAGE_LYR01',
            subCode: subCode || '',
        };

        PopupLayer.layerFreeReq(items);
    }
    
    // 거주지역 리스트
    $scope.addList = address();

    //쿠키설정
    common.getCookie(AppConf.cookie_customer, true).then(
        function(customer) {
            /*
            $scope.customer = customer.data;
            if(!customer.data) $scope.customer = { customerRegion : '시/도', phoneNumber :'010'};
            else $scope.customer.result = 'Y';
            */
        }
    );

    //보험사 리스트 얻어오기
    GetApiData.getCompanyList(function(result) {
        $scope.companyList = result;
    });       

    //원수사 팝업
    $scope.openCompanyPopup = function(companyCode,chk){
        var adalbaPartner;
        if ($cookies.adalba) {
            var adalbaCookie = JSON.parse($cookies.adalba);
            if (typeof adalbaCookie === 'object' && adalbaCookie.partnerID) adalbaPartner = adalbaCookie.partnerID;
        }
        
        common.getCookie(AppConf.cookie_customer, true).then(
            function(custom) {
                if(inType || adalbaPartner){
                    if(!custom.data) {
                        alert('보험료 통합견적비교를 신청하시면 확인 가능합니다.');
                        $(".visual #nameBox").focus();
                    } else {
                        ConsultPopupService.companyPopup(companyCode,0);
                    }
                }else{
                    ConsultPopupService.companyPopup(companyCode,0);
                }                     
            }                        
        );
    }

    //상담 운영시간 확인
    var isServiceTime = 'N';
    adInsuDirectCar.getOperateServiceTime(function(operData) {
        if (operData.is_service_time) isServiceTime = operData.is_service_time;
    });

    $scope.name_result = false;
    $scope.phone_result = false;
    $scope.openAgreement = false;

    // 폼 입력 시 유효성 검사 실행
    $scope.validation = function(val, type) {
        if(val && type == 'name') {
            // if (onlyKorean(val)) {
                //$('.site-form-row:nth-child(1)').removeClass('error');
                if(val.length >= 2 && val.length <= 10) {
                    $scope.name_result = true;
                } else {
                    $scope.name_result = false;
                }
            // } else {
            //     $('.site-form-row:nth-child(1)').addClass('error');
            //     $scope.name_result = false;
            // }
        }

        if(val && type == 'phone') {
            if (onlyNumber(val)) {
                //$('.site-form-row:nth-child(2)').removeClass('error');
                if(val.length == 11) {
                    var tempPhone1 = val.substring(0,3);
                    var tempPhone2 = val.substring(3,val.length);
                    if(checkTelNumberNoAlert(tempPhone1, tempPhone2)) {
                        $scope.phone_result = true;
                    } else {
                        $scope.phone_result = false;
                    }
                } else {
                    $scope.phone_result = false;
                }
            } else {
                //$('.site-form-row:nth-child(2)').addClass('error');
                $scope.phone_result = false;
            }
        }

        //$scope.$watch('customer.customerAgree', function(){}, true)

        if(type == 'openAgreement' && typeof val === "boolean" ) openAgreement = val;
        else if(!$scope.customer.customerAgree) $scope.openAgreement = false;

        if($scope.name_result && $scope.phone_result && ($scope.customer.customerAgree || $scope.openAgreement)) {
            $('.site-form-bttn').addClass('btn-active');
        } else {
            if($('.site-form-bttn').hasClass('btn-active')) {
                $('.site-form-bttn').removeClass('btn-active');
            }
        }
    }

    // 보험료 비교견적 신청
    $scope.consult = function(subCode) {
        // 개인정보수집 및 활용동의 체크
        if (!$scope.customer.customerAgree) {
            var objCnt = $document[0].getElementsByName('agree').length;
            var objIdx = (objCnt - 1);

            $scope.customer.customerAgree = ($document[0].getElementsByName('agree')[objIdx].checked) ? true : false;
        }

        // 마케팅동의 체크
        if ($("#agree_marketing").prop('checked') == true) $scope.customer.agreeMarketing = 'Y';
        else $scope.customer.agreeMarketing = 'N';

        //var mobileNumbers = checkTelNumberNoAlert($scope.customer.phoneNumber, $scope.customer.phoneNumber1);
        var tempPhone = $scope.customer.phoneNumber1;
        if(tempPhone != null){
            var tempPhone1 = tempPhone.substring(0,3);
            var tempPhone2 = tempPhone.substring(3,tempPhone.length);

            var mobileNumbers = checkTelNumberNoAlert(tempPhone1, tempPhone2);
            $scope.customer.customerMobile1 = mobileNumbers.number1;
            $scope.customer.customerMobile2 = mobileNumbers.number2;
            $scope.customer.customerMobile  = mobileNumbers.number;
        }
        
        //validation check로직 - 공통로직
        if(!CommonService.checkCustomerNotAgree($scope.customer)){
            return false;
        }

        //지역 선택 여부
        if($scope.customer.customerRegion == '시/도'){
            alert("지역을 선택하세요.");
            return false;
        }

        if (!$scope.customer.customerAgree ) {
            alert("개인정보수집 및 활용동의를 체크해 주세요.");
            return false;
        }
        
        var categoryData = {
            firstCategoryCode: '125',
            secondCategoryCode: ''
        }

        jQuery(".btn_quick_request").hide();
        //jQuery(".btn_quick_request_loader").show();

        /*
        $(".btn_go_wrap layer__open").removeClass("btn_go");
        $(".btn_go_wrap layer__open").html("");
        $(".layer__open").hide();
        */

        var consultData = ConsultFactory.get('consult');
        $scope.customer.areaCode = consultData.areaCode || 'COMMON___LYR01';
        $scope.customer.mainCode = consultData.mainCode || 'A01';   // CRM 메인코드 (기본값 : 무료상담신청)
        //$scope.customer.subCode = consultData.subCode || '20';
        if(subCode) $scope.customer.subCode = subCode;

        // 상담신청용 쿠키저장
        var consultSetCookie = function(customerName, customerMobile1, customerMobile2, customerRegion) {
            var cookieValue = {
                customerName : customerName,
                phoneNumber : customerMobile1,
                phoneNumber1 : customerMobile2,
                customerRegion : customerRegion
            }
            common.setCookie(AppConf.cookie_customer, JSON.stringify(cookieValue), AppConf.cookieExpireTime, true);
        }

        // 애드알바 쿠키 체크
        common.getCookie(AppConf.cookie_adalba, false).then(
            function(cookieData) {
                // 애드알바 유입 seqno
                $scope.customer.clickSeqno = (cookieData.data.clickSeqno) ? cookieData.data.clickSeqno : '';
                // 상담신청 API 호출
                adInsuDirectCar.requestOperaConsult($scope.customer, function(callback) {
                    if (callback.seqno && callback.seqno > 0) {
                        //완료 레이어 호출
                        items = {
                            resultType: 'consult',
                            //areaCode: 'MAINPAGE_LYR01',
                            subCode: '27'
                        };

                        //완료 레이어 호출
                        PopupLayer.layerResult(items);

                        consultSetCookie($scope.customer.customerName, $scope.customer.customerMobile1, $scope.customer.customerMobile2, $scope.customer.customerRegion);

                        //jQuery(".btn_go_wrap layer__open").addClass("btn_go");

                        // 운영시간체크 - 템플릿 타입 코드 변경
                        //var type = (isServiceTime == 'Y') ? 'adinsu03': 'adinsu04';

                        // (#7605) 알림톡 호출
                        // adInsuDirectCar.callAlimTalk($scope.customer, type, function(callback) {
                        //     if (callback.sendResults && callback.sendResults.length > 0) {
                        //         console.log('kakao alimtalk result : ' + callback.sendResults[0].resultMessage);
                        //     }
                        // });

                        $scope.dableStatus = 1;
                        $scope.initData(); // 상담신청후 초기화
                        $scope.customer.result = "Y";

                        $('.site-form-bttn').removeClass('btn-active'); // 보험료 확인하기 버튼 초기화
                        $scope.name_result = false;
                        $scope.phone_result = false;
                        $scope.openAgreement = false;

                    }
                    else {
                        alert('인터넷 연결 상태가 원할하지 않습니다. 잠시 후 다시 시도해 주시기 바랍니다.');
                    }

                    jQuery(".btn_quick_request").show();
                    //jQuery(".btn_quick_request_loader").hide();

                    $(".layer__open").show();

                });
            }
        );
    }

    $scope.slideToggle = function(){
        $('.event_guide_container').slideToggle(300);
        $('.btn_guide').toggleClass('on');
    }
    $scope.showNotice1 = function(){
        $('.youneed-cont01').slideToggle(400);
        $('.youneed-type01').toggleClass('on');
    }
    $scope.showNotice2 = function(){
        $('.youneed-cont02').slideToggle(400);
        $('.youneed-type02').toggleClass('on');
    }
    $scope.openCompanyBenefit = function(companyCode){
        $(".mflayer_"+companyCode).fadeIn(300);
        $("body").addClass("is_clipped");
    }   

    $scope.backToPages("https://m.t-insu.com/?inType=je_TMAP");
});



//보험사별 할인특약 정보
mainApp.directive('mainBenefitLayer', function(GetApiData) {
    return {
        restrict : 'AE',
        templateUrl : '/html/partials/main/company_pop.html',
        scope : { },
        link: function (scope, element, attr) { } ,
        controller : ['$scope','$cookies' , 'AppConf','CommonFactory','AdInsuDirectCarFactory','ConsultPopupService' ,'PopupLayer', function($scope ,$cookies ,AppConf,CommonFactory,AdInsuDirectCarFactory,ConsultPopupService,PopupLayer) {  
            var adInsuDirectCar = new AdInsuDirectCarFactory(AppConf);
            var common = new CommonFactory(AppConf);

            $scope.siteCode = AppConf.siteCode;
            $scope.customerIP = AppConf.userIP;
            $scope.imageDomain = AppConf.imageDomain; 
            
            $scope.adinsuImageDomain = AppConf.adinsuImageHost+"/adinsu/common/logo/partner_mo";
            $scope.adminImgDomain = AppConf.adminImageHost;

            $scope.companyList = [];

            //보험사 리스트 얻어오기
            GetApiData.getCompanyList(function(result) {
                $scope.companyList = result;
            });         
            
            $scope.closeCompanyBenefit = function(companyCode){
                $(".mflayer_"+companyCode).fadeOut(300);
                $("body").removeClass("is_clipped");
            }
            
        }]    
    }
});

//보험사별 할인특약 정보
mainApp.directive('mainConsult', function() {
    return {
        restrict : 'AE',
        templateUrl : '/html/partials/main/consult.html',
        scope : { },
        link: function (scope, element, attr) { } ,
        controller : ['$scope','$cookies' , 'AppConf','CommonFactory','AdInsuDirectCarFactory','ConsultPopupService' ,'PopupLayer', function($scope ,$cookies ,AppConf,CommonFactory,AdInsuDirectCarFactory,ConsultPopupService,PopupLayer) {  
            var adInsuDirectCar = new AdInsuDirectCarFactory(AppConf);
            var common = new CommonFactory(AppConf);

            $scope.siteCode = AppConf.siteCode;
            $scope.imageDomain = AppConf.imageDomain; 
            
            $scope.adinsuImageDomain = AppConf.adinsuImageHost+"/adinsu/common/logo/partner_mo";
            $scope.adminImgDomain = AppConf.adminImageHost;

            $
            
        }]    
    }
});

