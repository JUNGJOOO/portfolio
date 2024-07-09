/*
 * 애드인슈 - 다이렉트카 관련 API
*/
indexApp.factory('AdInsuDirectCarFactory', function($http, $cookies,$filter) {
    var header = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }

    var AdInsuDirectCarFactory = function(AppConf) {
        this.siteCode = AppConf.siteCode;
        this.customerIP = AppConf.userIP;
        this.inType = AppConf.inType || '';
    };

    AdInsuDirectCarFactory.prototype.getOperateServiceTime = function(callback){ 
        var today = new Date();
        var year = today.getFullYear();
        var month = (1 + today.getMonth());
        month = month >= 10 ? month : '0' + month;

        var day = today.getDate();
        day = day >= 10 ? day : '0' + day;

        var apiParam = {
            date : year +"-"+month+"-"+day
        } 
        
        var default_oper_start_time = "09:00"
        var default_oper_end_time = "18:00"

        var operData = {
            is_service_time: 'N',
            operate_comment: ''
        }

        $http({
            method: 'POST',
            url: '/api',
            params: {
                uri:'/adinsu/direct/operatetime'
            },
            data: $.param(apiParam),
            headers: header

        }).success(function(res) {
            if (res.responseCode == 200 && res.data.result == "SUCCESS" && res.data.resultData) {
                operData.is_service_time = res.data.resultData.isOper;
                operData.operate_comment = res.data.resultData.operateComment;

            } else {
                // 기본 운영 시간
                var startTime = $filter('date')(default_oper_start_time, 'hh:mm');
                var endTime = $filter('date')(default_oper_end_time, 'hh:mm'); 

                var nowH = today.getHours()
                nowH = nowH >= 10 ? nowH : '0' + nowH;

                var nowM = today.getMinutes();
                nowM = nowM >= 10 ? nowM : '0' + nowM;

                var nowTime = $filter('date')(nowH+":"+nowM, 'hh:mm');

                operData.is_service_time = (startTime <= nowTime && endTime >= nowTime) ? 'Y' : 'N';
                operData.operate_comment = '운영시간 : 평일 '+startTime+'~'+endTime    
             }

             callback(operData);   
        });
    }

    // 보험사 리스트, 정보 조회 API
    AdInsuDirectCarFactory.prototype.getCompanyList = function(param, callback) {
        var apiParam = {
            siteCode: this.siteCode,       // 사이트 코드(필수. String)
            limit: param.limit || 50
        }

        $http({
            method: 'POST',
            url: '/api',
            params: {
                uri:'/adinsu/code/company'
            },
            data: $.param(apiParam),
            headers: header
        }).success(function(res) {
            if(res.responseCode == 200 && res.data.result == "SUCCESS")
                callback(res.data.resultData);
            else
                callback([]);
        });
    }

    // 클릭로그 저장 API
    AdInsuDirectCarFactory.prototype.getClickLogSeqno = function(param, callback) {
        var apiParam = {
            siteCode: this.siteCode,                            // 사이트 코드(필수. String)
            customerIp: param.customerIP || this.customerIP,    // 고객 IP (String. 필수)
            companyCode: param.companyCode,                     // 보험사코드 (String. 필수)
            cstSeqno : param.cstSeqno                           // 제휴사이트 시컨스번호
        }
        
        $http({
            method: 'POST',
            url: '/api',
            params: {
                uri:'/adinsu/direct/clickLog'
            },
            data: $.param(apiParam),
            headers: header
        }).success(function(res) {
            if(res.responseCode == 200 && res.data.result == "SUCCESS")
                callback(res.data.resultData);
            else
                callback([]);
        });
    }

    //대인배상 10일이내 10000원, 11일 이상부터 가산금 4000원씩 추가합산, 최대금액 600000원
    //대물배상 10일이내  5000원, 11일 이상부터 가산금 2000원씩 추가합산, 최대금액 300000원
    AdInsuDirectCarFactory.prototype.getPenaltyInfo = function(day, type) {
        //대인배상1
        var bodilyInuryPenalty = {
            date : 0,
            shortPenalty : 10000,
            longPenalty : 4000,
            maxPenalty : 600000,
            penaltyValue : 0
        }

        //대물배상1
        var propertyDamagePenalty = {
            date : 0,
            shortPenalty : 5000,
            longPenalty : 2000,
            maxPenalty : 300000,
            penaltyValue : 0
        }
        
        if(type == "bodily"){ 
            //대인배상
            if(day <= 10){
                bodilyInuryPenalty.penaltyValue = bodilyInuryPenalty.shortPenalty * day;
            }else if(day >= 10){
                if(bodilyInuryPenalty.shortPenalty * day >= bodilyInuryPenalty.maxPenalty){
                    bodilyInuryPenalty.penaltyValue = bodilyInuryPenalty.maxPenalty;
                }else{
                    bodilyInuryPenalty.penaltyValue = (bodilyInuryPenalty.shortPenalty * 10) + (bodilyInuryPenalty.longPenalty * (day-10))
                }
            }
            return bodilyInuryPenalty.penaltyValue;
        }else{
            //대물배상
            if(day <= 10){
                propertyDamagePenalty.penaltyValue = propertyDamagePenalty.shortPenalty * day;
            }else if(day >= 10){
                if(propertyDamagePenalty.shortPenalty * day >= propertyDamagePenalty.maxPenalty){
                    propertyDamagePenalty.penaltyValue = propertyDamagePenalty.maxPenalty;
                }else{
                    propertyDamagePenalty.penaltyValue = (propertyDamagePenalty.shortPenalty * 10) + (propertyDamagePenalty.longPenalty * (day-10))
                }
            }           
            return propertyDamagePenalty.penaltyValue;
        }
    }

    // 상담신청 현황 조회 (월 단위 기준으로 조회) API
    AdInsuDirectCarFactory.prototype.getCustomerInfo = function(param, callback) {
        var apiParam = {
            monthPeriod : param.monthPeriod || 1,
            page : param.page || 1,
            rowCount :  param.rowCount || 5,
            getTotalCount : param.getTotalCount || 'Y'
        }

        $http({
            method: 'POST',
            url: '/api',
            params: {
                uri:'/adinsu/direct/customerInfo/list'
            },
            data: $.param(apiParam),
            headers: header
        }).success(function(res) {
            if(res.responseCode == 200 && res.data.result == "SUCCESS")
                callback(res.data);             
            else
                callback([]);
        });
    }

    // 정보관,뉴스 조회 API
    AdInsuDirectCarFactory.prototype.getContentsInfo = function(param, callback) {
        var apiParam = {
            contentsType : param.contentsType || 'INFO',
            siteCode : param.siteCode || '',
            page :  param.page || 1,
            rowCount : param.rowCount || '4' //메인 기본 4개
        }

        $http({
            method: 'POST',
            url: '/api',
            params: {
                uri:'/adinsu/contents/list'
            },
            data: $.param(apiParam),
            headers: header
        }).success(function(res) {
            if(res.responseCode == 200 && res.data.result == "SUCCESS")
                callback(res.data);             
            else
                callback([]);
        });
    }

    // 정보관,뉴스 조회 1건 (seqno) API
    AdInsuDirectCarFactory.prototype.getContentsInfoSeqno = function(seqno, callback) {
        var apiParam = {
            seqno : seqno,
            isGetPrevNext : true
        }

        $http({
            method: 'POST',
            url: '/api',
            params: {
                uri:'/adinsu/contents/view'
            },
            data: $.param(apiParam),
            headers: header
        }).success(function(res) {
            if(res.responseCode == 200)
                callback(res.data);             
            else
                callback([]);
        });
    }
    
    //조회수 증가
    AdInsuDirectCarFactory.prototype.addContentsCount = function(seqno,callback) {
        var apiParam = {
            seqno : seqno
        }

        $http({
            method: 'POST',
            url: '/api',
            params: {
                uri:'/adinsu/contents/hit'
            },
            data: $.param(apiParam),
            headers: header
        }).success(function(res) {
            if(res.responseCode == 200 && res.data.result == "SUCCESS")
                callback(res.data);             
            else
                callback([]);
        });
    }

    // 다이렉트 자동차 - 견적비교하기(seqno 얻기) - 상담신청
    AdInsuDirectCarFactory.prototype.jehuConsult = function(param, callback) {
        var customerMobile2 = param.customerMobile2.replace('-', '');
        var pattern = (param.customerMobile2.length < 8) ? /(\d{3})(\d{4})/ : /(\d{4})(\d{4})/;
        
        var apiParam = {

            companyCode:        param.companyCode || '',                 //보험사코드
            siteCode :          this.siteCode || '',                    //사이트코드
            customerName :      param.customerName || '',               //고객명
            customerPhone :     param.customerMobile1+customerMobile2,
            //customerMobile1:    param.customerMobile1,                  // 연락처(필수)
            //customerMobile2:    customerMobile2.replace(pattern, '$1'), // 연락처(필수)
            //customerMobile3:    customerMobile2.replace(pattern, '$2'), // 연락처(필수)
            expiredMonth :      param.carExpiredDate || '',             //만기 월
            carInfo :           param.carNumber || '',                  //차량정보
            customerAddress:    param.customerRegion || '',             //고객주소
            keywordSeqno :      param.clickSeqno || 0,                  //클릭로그값
            inType :            param.inType || ''                      //인타입
           
        }
        $http({
            method: 'POST',
            url: '/api',
            params: {
                uri:'/adinsu/direct/jehu/consult'
            },
            data: $.param(apiParam),
            headers: header
        }).success(function(res) {
            if(res.responseCode == 200 && res.data.result == "SUCCESS")
                callback(res.data);
            else
                callback([]);
        });
    }

    // 상담 신청 : OPERA API 호출 (#4603)
    AdInsuDirectCarFactory.prototype.requestOperaConsult = function (customer, callback) {
        // 고객 핸드폰번호 체크
        var customerMobile = (customer.customerMobile && customer.customerMobile.length > 0) ? customer.customerMobile : '';
        if (customerMobile.length < 1 && customer.customerMobile1 && customer.customerMobile2) {
            customerMobile = customer.customerMobile1 + "" + customer.customerMobile2;
        }
        customerMobile = customerMobile.replace(/-/g, "");

        var operaApiParam = {
            siteCode: this.siteCode,                            // 사이트 코드, 필수
            mainCode: customer.mainCode || '',                  // crm 메인코드, 필수
            subCode: customer.subCode || '',                    // crm 서브코드, 필수
            categoryCode: '125',                                // 1차 보종코드, 필수
            customerName: customer.customerName,                // 고객 이름, 필수
            customerMobile: customerMobile,                     // 고객 핸드폰번호, 필수 ('-' 없이. ex.01012341234)
            customerRegion: customer.customerRegion || '',      // 지역
            expiredDate: customer.carExpiredDate || '',         // 자동차보험 만기일자 (ex. 19000101)
            intype: this.inType || '',
            marketingFlag: customer.agreeMarketing || 'Y',      // 마케팅동의값
            ipAddress: this.customerIP || '',                   // IP
            keywordSeqno: 0,                                    // 유입로그 Seqno.
            keyword: '',                                        // 유입키워드 (2021.10.14 추가)
            keywordResponseCode: 500,                           // Bohumpro API 호출 결과 코드 (2021.10.14 추가)
            partnerInfo: null,                                  // 애드알바 파트너 정보     
            memo : customer.memo || ''                          // 메모 값 - (2022.09.15 임직원프로모션 추천인 아이디값 사용)
        }

        // 유입로그 Seqno. 쿠키 체크
        if ($cookies.keyword) {
            var keywordCookie = JSON.parse($cookies.keyword);
            if (keywordCookie.seqno && keywordCookie.seqno > 0) operaApiParam.keywordSeqno = keywordCookie.seqno;
        }
        
        // 애드알바 파트너 정보 셋팅 (Bohumpro API 오류시, 파트너 데이터가 전송되지 않을 수 있어 쿠키데이터를 1차로 셋팅)
        if ($cookies.adalba) {
            var adalbaCookie = JSON.parse($cookies.adalba);
            if (typeof adalbaCookie === 'object' && adalbaCookie.partnerID && adalbaCookie.partnerID.length > 0) {
                operaApiParam.partnerInfo = {
                    partnerId: adalbaCookie.partnerID,
                    clickSeqno: adalbaCookie.clickSeqno || 0,
                    siteCode: adalbaCookie.siteCode || ''
                }

                // 파트너 정보가 있으면, inType은 제거
                operaApiParam.intype = '';
            } 
        }

        // 유입로그 Seqno가 없는 경우, Opera API 호출
        if (operaApiParam.keywordSeqno < 1) {
            $http({
                headers: header,
                method: 'POST',
                url: '/opera-api',
                params: {uri: '/externalApi/tm/requestDBIns'},
                data: operaApiParam
            }).success(function (res) {
                if (res.responseCode == 200) callback(res.data);
                else callback([]);
            }).error(function(data, status) {
                callback([]);
            });

        } else {
            // Bohumpro API 호출 (키워드, 애드알바 데이터 조회)
            $http({
                headers: header,
                method: 'POST',
                url: '/bohumpro-api',
                params: {uri: '/FRONT/db_process/getInflowInfo'},
                data: {keywordSeqno: operaApiParam.keywordSeqno}
            }).success(function (res) {
                if (res.result == 'success' && res.data) {
                    operaApiParam.keywordResponseCode = 200;            // Bohumpro API 호출 결과 성공 코드
                    operaApiParam.keyword = res.data.keyword || '';     // 유입 키워드
                    
                    // 애드알바 데이터
                    if (res.data.partnerInfo && res.data.partnerInfo.partnerID && res.data.partnerInfo.partnerID.length > 0) {
                        operaApiParam.partnerInfo = {
                            partnerId: res.data.partnerInfo.partnerID || '',
                            clickSeqno: res.data.partnerInfo.clickSeqno || 0,
                            siteCode: res.data.partnerInfo.siteCode || ''
                        }
                    }
                } else if (res.errCode) {
                    operaApiParam.keywordResponseCode = res.errCode;    // Bohumpro API 호출 결과 에러 코드
                }
            }).finally(function() {
                // 파트너 정보가 있으면, inType은 제거
                if (operaApiParam.partnerInfo && operaApiParam.partnerInfo.partnerId) {
                    operaApiParam.intype = '';
                }

                // Opera API 호출
                $http({
                    headers: header,
                    method: 'POST',
                    url: '/opera-api',
                    params: {uri: '/externalApi/tm/requestDBIns'},
                    data: operaApiParam
                }).success(function (res) {
                    if (res.responseCode == 200) callback(res.data);
                    else callback([]);
                }).error(function(data, status) {
                    callback([]);
                });
            });
        }
    }

    // 운전자센터 상담신청 : TIMS API 호출 (#14458)
    AdInsuDirectCarFactory.prototype.requestTimsConsult = function(customer, callback) {
        // 고객 핸드폰번호 체크
        var customerMobile = (customer.customerMobile && customer.customerMobile.length > 0) ? customer.customerMobile : '';
        if (customerMobile.length < 1 && customer.customerMobile1 && customer.customerMobile2) {
            customerMobile = customer.customerMobile1 + "" + customer.customerMobile2;
        }
        customerMobile = customerMobile.replace(/-/g, "");

        // 필수 데이터 체크
        if (!customer.customerName || customerMobile.length < 1 || !customer.agreeMarketing) {
            callback({resultCode: 500, message: '(error) Missing required parameters!!', dbNo: 0});
            return false;
        }
        
        var param = {
            name: customer.customerName,                // 고객명, String, 필수
            cellTelNo: customerMobile,                  // 고객 연락처, String, 필수 (ex:01000001111)
            maketingAgree: customer.agreeMarketing      // 마케팅 동의여부, String, 필수 (Y/N)
        }
        
        $http({
            method: 'POST',
            url: '/tims-api',
            params: {
                uri: '/api/cnsl/add/site'
            },
            data: param,
            headers: header
        }).success(function (res) {
            callback(res);
        });
    }

    // (#7605) 카카오 알림톡
    AdInsuDirectCarFactory.prototype.callAlimTalk = function(customer, type, callback) {
        // 고객 핸드폰번호 체크
        var customerMobile = (customer.customerMobile && customer.customerMobile.length > 0) ? customer.customerMobile : '';
        if (customerMobile.length < 1 && customer.customerMobile1 && customer.customerMobile2) {
            customerMobile = customer.customerMobile1 + "" + customer.customerMobile2;
        }

        if (customerMobile.length > 0) customerMobile = customerMobile.replace(/-/g, "");
        
        if (customerMobile.length < 10 || customerMobile == '01000001111') {
            callback([]);
            return false;
        }

        var apiParam = {
            plusFriendId: '@adinsu',            // 플러스친구 아이디 (최대 30자)
            templateCode: type,                 // 등록한 발송 템플릿 코드 (최대 20자)
            recipientList: [{                   // 수신자 리스트 (최대 1000명)
                recipientNo: customerMobile,    // 수신번호  (최대 15자)
                templateParameter: {            // 템플릿 파라미터 (템플릿에 치환할 변수 포함 시, 필수)
                    Name: customer.customerName //치환 키(#{key}) : 치환 키에 매핑되는 Value값
                },
                resendParameter: {              // 대체 발송 정보
                    isResend: true              // 발송 실패 시, 문자 대체 발송 여부, 콘솔에서 대체 발송 설정 시, 기본으로 재발송됩니다.
                }
            }]
        }

        $http({
            method: 'POST',
            url: '/external-api',
            params: {
                serviceCode: 'alimtalk',
                uri:''
            },
            data: apiParam,
            headers: header

        }).success(function(res) {
            if (res.header && res.header.resultCode == 0 && res.header.isSuccessful == true) callback(res.message);
            else callback([]);
        });
    }

    return AdInsuDirectCarFactory;
})