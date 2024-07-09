/**
 * 사이트 전체 상수 선언
 */
 indexApp.constant('AppConf', {
    siteCode : site_code,
    siteDomain : site_domain,
    staticName : '제휴_티맵모빌리티',
    cookie_phone_cert : 'phone_cert',
    cookie_customer : 'customer',
    cookie_adalba: 'adalba',
    publicUrl : public_host,
    imageDomain: image_host+"/adinsu/carbohum-direct/mo/",
    adinsuImageHost: image_host,
    adminImageHost: admin_image_host,
    inType: in_type
});

indexApp.config(function($ocLazyLoadProvider, $routeProvider, $locationProvider, $sceDelegateProvider, AppConf) {
    $locationProvider.html5Mode(true);

    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        AppConf.publicUrl+'/**'
    ]);
    $ocLazyLoadProvider.config({
        'debug': false,     // For debugging 'true/false'
        'events': false,    // For Event 'true/false'
        'modules': [
        {                   // Set modules initially
            name : 'main',  // State1 module
            files: [
                '/js/module/main/main.js',                
                '/js/module/mall/js/adinsu/controllers/consult.js'
            ],
            serie: true // 순서대로 파일을 로드 함
        },
        {
            name: "consult",
            files: [
                '/js/module/main/main.js',
                '/js/module/mall/js/adinsu/controllers/consult.js'
            ],
            serie: true,
        },
        ]
    });

    $routeProvider
    .when('/', {
        templateUrl: '/html/partials/main/main.html',
        controller: 'mainController',
        controllerAs: 'main',
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('main');
            }]
        }
    })
    .when('/consult', {
        templateUrl: '/html/partials/main/consult.html',
        controller: 'mainController',
        controllerAs: 'main',
        resolve : {
            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load('main');
            }]
        }
    })
    .otherwise({redirectTo:'/'});
 });

indexApp.controller('IndexController', function ($scope, $window, $location, AppConf, AdalbaFactory, $routeParams ,CommonFactory,PopupLayer) {
    $scope.siteCode = AppConf.siteCode;
    $scope.imageDomain = AppConf.imageDomain;

    $scope.mainLoadComplete = false;
    $scope.$on('$viewContentLoaded', function(event) {
        $scope.mainLoadComplete = true;
    });

    $scope.isConsulting = false;
    if($location.path() == '/consult') {
        $scope.isConsulting = true;
    }

    // 디자인 A안 클래스명 : tmap_intype01 / B안 클래스명 : tmap_intype02
    $scope.inTypeClass = 'tmap_intype01';

    // 사이트 내 공통 상수 추가
    var common = new CommonFactory(AppConf);
    var adalba = new AdalbaFactory(AppConf);

    common.getUserIP().then(
        function(data) {
            angular.extend(AppConf, {userIP: data.data, cookieExpireTime: 10*60*1000});
        }
    )    

    //애드알바 파트너 정보
    var adalbaCookie = null;
    
    common.getCookie(AppConf.cookie_adalba, false).then(
        function(cookieData) {
            adalbaCookie = cookieData.data;  
        }
    );
      

    // 파트너 푸터정보
    $scope.footerInfo = {
        footerContents: "",
        footerName: ""
    }

    // 파트너 푸터정보           
    common.getCookie(AppConf.cookie_adalba, false).then(
        function(cookieData) {
            if(cookieData){
                adalba.getFooterInfo(cookieData.data.partnerID,function(res){
                    if(res.footerInfo){
                        if(res.footerInfo.footerInfoName) $scope.footerInfo.footerName = "ㅣ 담당 "+res.footerInfo.footerInfoName;                            
                        if(res.footerInfo.footerInfoContents) $scope.footerInfo.footerContents = res.footerInfo.footerInfoContents;   
                    }         
                });    
            }
        }
    );      

    $scope.goHome = function() {
        $window.location.href = "/"; 
    }

    $scope.goBack = function() {
        if ($window.history.length) $window.history.back();
        else $scope.goUrl('/');
    }

    $scope.goUrl = function(url,reload) {
        if (reload == undefined || url == $location.path()) reload = true;
        
        if (in_type) url = url+"?inType="+in_type;

        if (reload == 'new') $window.open(url, '_blank');
        else if (reload) $window.location.href = url;
        else $location.url(url);
    }

    // 보험료 비교견적 신청 레이어
    $scope.consultLayer = function(subCode) {
        items = {
            resultType: 'consult',
            areaCode: 'MAINPAGE_LYR01',
            subCode: subCode || '',
        };

        PopupLayer.layerFreeReq(items);
    }

    $scope.backToPages = function(url){
        
        var now_url = '/';
        var move_url = 'http://m.carrot-direct.com';
        if(url != "") move_url = url;

        window.history.pushState(null, '', location.href);
        window.addEventListener('popstate', function(event){
            if(window.location.pathname == '/'){
                window.location.replace(move_url);
            }else if ( window.location == move_url){
                history.go(-2);
            }		
            history.replaceState(null, '', location.href);
        });

        window.onpageshow = function(event) {
            if ( event.persisted ) {
                // Back Forward Cache로 브라우저가 로딩될 경우 혹은 브라우저 뒤로가기 했을 경우
                console.log('back log..');
            }
        }
    }
});

indexApp.service('PopupLayer', function (AppConf, CommonService,AdInsuDirectCarFactory) {   
    var adInsuDirectCar = new AdInsuDirectCarFactory(AppConf);
    
    //무료견적신청 레이어
    this.layerFreeReq = function(items) {

        adInsuDirectCar.getOperateServiceTime(function(operData){ 
            items.is_service_time = operData.is_service_time;
            items.operate_comment = operData.operate_comment;
            items.layer_type = 'mv2';
            items.browser_type = 'mo';

            CommonService.modalOpen('/common/adinsu/consult_A', 'ConsultController', items);
        });    
    }

    //무료견적신청 완료레이어
    this.layerResult = function(items) {
        adInsuDirectCar.getOperateServiceTime(function(operData){ 
            items.is_service_time = operData.is_service_time;
            items.operate_comment = operData.operate_comment;
            items.layer_type = 'mv2';
            items.browser_type = 'mo';
            CommonService.modalOpen('/common/adinsu/result_layerA', 'ConsultController',items);
        });
    }
});

indexApp.service('GetApiData', function (AppConf, AdInsuDirectCarFactory) {   
    var adInsuDirectCar = new AdInsuDirectCarFactory(AppConf);

    this.getClickLogSeqno = function(companyCode,callback){
        adInsuDirectCar.getClickLogSeqno(companyCode,function(result){
            callback(result);
        });
    }

    this.getCompanyList = function(callback) {
        var companyList = [];
        
        adInsuDirectCar.getCompanyList({},function(result){
            //console.log(result.companyList);
            angular.forEach(result.companyList, function(info, key) {
                if(result.companyInfo[info]){
                    companyList.push({ 
                        "companyCode" : info , 
                        "insurName" : result.companyInfo[info].insurName,
                        "approvalNo" : result.companyInfo[info].approvalNo,
                        "phoneNum" : result.companyInfo[info].phoneNum,
                        "title" : result.companyInfo[info].title,
                        "detail" : result.companyInfo[info].detail,
                        "detailList" : result.companyInfo[info].detailList,
                        "insurUrl" : result.companyInfo[info].insurUrl,
                        "insurMoUrl" : result.companyInfo[info].insurMoUrl,
                        "insurPcUrl" : result.companyInfo[info].insurPcUrl
                    });
                }
            }, this);
        });

        callback(companyList);
    }
});

indexApp.factory('ConsultFactory', function($window) {
    return {
        set: function(areaCode, parentCategoryCode, insurCode, insurCodeList, mainCode, subCode) {
            var consultData = {
                areaCode: areaCode || '',
                parentCategoryCode: parentCategoryCode || '',
                insurCode: insurCode || '',
                insurCodeList: insurCodeList || '',
                mainCode: mainCode || '',
                subCode: subCode || ''
            }

            if ($window.localStorage) {
                //$window.localStorage.clear();
                $window.localStorage['consult'] = JSON.stringify(consultData);
            }
        },
        get: function(key) {
            if ($window.localStorage) return JSON.parse($window.localStorage[key] || '{}');
            else return JSON.parse('{}');
        }
    }
});
