var indexApp = angular.module('indexApp', ['ngRoute','ui.router', 'oc.lazyLoad', 'ui.bootstrap', 'ngCookies', 'ngAnimate', 'pasvaz.bindonce', 'ng.shims.placeholder']);

indexApp

.animation('.ng-slide', function() {
	var NG_HIDE_CLASS = 'ng-hide';
	return {
		beforeAddClass: function(element, className, done) {
			if(className === NG_HIDE_CLASS) {
				element.slideUp(done);
			}
		},
		removeClass: function(element, className, done) {
			if(className === NG_HIDE_CLASS) {
				element.hide().slideDown(done);
			}
		}
	}
})

// YYYY.MM.DD 타입
.filter('cf_datetype', function() {
    return function(text, sep) {
         var pattern = /(\d{4})(\d{2})(\d{2})/;
         if (!text) return '';
         else return text.replace(pattern, '$1' + sep + '$2'+ sep + '$3');
    };
})

// MM.DD 타입
.filter('cf_datetype2', function() {
    return function(text, sep) {
         var pattern = /(\d{2})(\d{2})/;
        return text.replace(pattern, '$1' + sep + '$2');
    };
})

// yyyy-MM-dd HH:mm:ss 타입
.filter('datetime', function() {
    return function(text, time) {
        var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
        if (text) {
            var datetime = text.replace(pattern, '$1' + "-" + '$2'+ "-" + '$3');
            if (time) {
                datetime = text.replace(pattern, '$1' + "-" + '$2'+ "-" + '$3'+ " " + '$4'+ ":" + '$5'+ ":" + '$6');
            }
            return datetime;
        }
    };
})

// html 컨텐츠 표시 (ng-bind-html과 같이 써야함)
.filter("html", ['$sce', function($sce) {
    return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
    }
}])

// nl2br (ng-bind-html과 같이 써야함) {{ text | newline | html }}
.filter('newline', function () {
    return function(text) {
        return text.replace(/\n/g, '<br/>');
    }
})

// null 컨텐츠 표시
.filter('nvl', function() {
    return function(text, defaultText) {
        if (!text)
            text = defaultText;
        return text;
    };
})

// 폰번호 표시 필터
.filter('phoneFormat', function() {
    return function(phoneNumber, mask) {
        var phone = phoneFormat(phoneNumber);
        if (mask) {
            return phone.substr(0, phone.lastIndexOf("-")) + "-****";
        }
        return phone;
    }
})

// 배열 to String 및 <br>태그 -> \n replace all
.filter("arrayToStr", function() {
    return function(array) {
        if(!array) return "";
        return array.join("\n").replace(/<br>/gi,"\n");
    }
})

// 금액 표시 (콤마)
.filter("numberFormat", function() {
    return function(number) {
        return setComma(number);
    }
})

.filter("concat", function() {
    return function(str, concatStr, arrayStr) {
        var returnStr = str + concatStr;
        if (arrayStr) {
            for (var i=0; i<arrayStr.length; i++) {
                returnStr = returnStr + arrayStr[i];
            }
        }
        return returnStr;
    }
})

.filter('replaceAll', function(){
    return function(input, target, replace){
        var v_ret = null;
        var v_regExp = new RegExp(target, "g");
        v_ret = input.replace(v_regExp, replace);
        return v_ret;
    }
})

.filter('br_replace', function() {
    return function(text) {
        text = text.replace(/<br\/>/g, "");
        text = text.replace(/<br>/g, "");
        return text;
    };
})

// 폰번호 입력 체크
.directive('phoneFormat', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            ctrl.$formatters.push(phoneFormat);

            element.bind("keyup", function () {
                if(scope.siteCode == 'WT' || scope.siteCode == 'WS' || scope.siteCode == 'WW'){
                    var value = phoneCommonFormat(element.val());
                }else{
                    var value = phoneFormat(element.val());
                }
                if (!!value) {
                    ctrl.$setViewValue(value);
                    ctrl.$render();
                }
                scope.$apply();
            });
        }
    }
})


// 문자 입력 체크
.directive('restrictTo', function() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var re = RegExp(attrs.restrictTo);
            var exclude = /Backspace|Enter|Tab|Delete|Del|ArrowUp|Up|ArrowDown|Down|ArrowLeft|Left|ArrowRight|Right/;

            element.on('compositionstart', function(e) {
                e.stopImmediatePropagation();
            });

            element[0].addEventListener('keydown', function(event) {
                if (!exclude.test(event.key) && !re.test(event.key)) {
                    event.preventDefault();
                }
            });
        }
    }
})

// 숫자만 입력
.directive('onlyNumber', function() {
    return { 
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {

            if(!ngModelCtrl) {
                return; 
            }

            element.on('compositionstart', function(e) {
                e.stopImmediatePropagation();
            });

            ngModelCtrl.$parsers.push(function(val) {
                if (angular.isUndefined(val)) {
                    var val = '';
                }
                
                var clean = val.replace(/[^-0-9\.]/g, ''); 

                if (val !== clean) {
                ngModelCtrl.$setViewValue(clean);
                ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function(event) {
                if(event.keyCode === 32) {
                event.preventDefault();
                }
            }) 
        }
    }
})

// 숫자만 입력 '-' 제외
.directive('onlyNumber2', function() {
    return { 
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {

            if(!ngModelCtrl) {
                return; 
            }

            element.on('compositionstart', function(e) {
                e.stopImmediatePropagation();
            });

            ngModelCtrl.$parsers.push(function(val) {
                if (angular.isUndefined(val)) {
                    var val = '';
                }
                
                var clean = val.replace(/[^0-9\.]/g, '');

                if (val !== clean) {
                ngModelCtrl.$setViewValue(clean);
                ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function(event) {
                if(event.keyCode === 32) {
                event.preventDefault();
                }
            }) 
        }
    }
})

// ie input 한글 오류
.directive('krInput', function() {
    return {
        priority : 2,
        restrict : 'A',
        compile : function(element) {
            element.on('compositionstart', function(e) {
                e.stopImmediatePropagation();
            });
        }
    }
})

// 공백제거
.directive('removeSpace', function() {
    return {
        link: function (scope, element, attrs) {
            element.bind('keypress', function(event) {
                if (event.keyCode === 32) {
                    event.preventDefault();
                }
            }) 
        }
    }
})

// 개인정보처리방침 - 애드인슈
.directive('openAdinsuPrivacyAgree', function() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function(e){
                 window.open('/common/adinsu/open_privacy?privacy',"PRIVACY","width=553,height=526,left=400,top=190,scrollbars=no");
            });
        }
    }
})

// 개인정보취급방침 및 활용동의 - 애드인슈
.directive('openAdinsuAgreement', function() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function(e){
                var param = (attrs.agreeId) ? '?chkboxId='+attrs.agreeId : '';
                param += (scope.siteCode == '오쎼') ? '&siteCode='+scope.siteCode : '';
                //window.open('/html/common/open_agreement_https.html'+param,"openAdinsuAgreement","width=553,height=523,left=400,top=190,scrollbars=no");
                window.open('/common/adinsu/open_agreement'+param,"openAdinsuAgreement","width=553,height=523,left=400,top=190,scrollbars=no");
            });
        },
        controller : ['$scope', function($scope) {
            window.setCustomerAgree = function(checked) {
                $scope.customer.customerAgree = checked;
                $scope.validation(checked, 'openAgreement');
            }
        }]
    }
})

// 개인정보처리방침 - 애드인슈 - 제휴
.directive('openAdinsuPrivacyAgreeJe', function() {
    return {
        restrict: 'A',        
        link: function (scope, element, attrs) {
            element.on('click', function(e){
                 window.open(scope.tmpUrl,"PRIVACY","width=553,height=523,left=400,top=190,scrollbars=no");
            });
        }
    }
})

// 개인정보처리방침 - 운전자센터
.directive('openPrivacyDriver', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.on('click', function(e) {
                window.open('/common/adinsu/open_privacy_driver', 'PRIVACY', 'width=500, height=500, left=400, top=200');
            });
        }
    }
})

// 개인정보수집 및 활용동의 - 운전자센터
.directive('openAgreementDriver', function() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function(e) {
                var param = (attrs.agreeId) ? '?chkboxId=' + attrs.agreeId : '';
                var separator = (param.length > 0) ? '&' : '?';
                param += (attrs.agreeMarketingId) ? separator + 'marketingId=' + attrs.agreeMarketingId : '';
                
                window.open('/common/adinsu/open_agreement_driver' + param, 'openAgreementDriver', 'width=500, height=500, left=400, top=200');
            });
        }
    }
})
    
// 한글, 영문(모바일 키보드) 입력 가능
.directive('nameInput', function() {
    return {
        require: '?ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {

            if(!ngModelCtrl) {
                return;
            }

            element.on('compositionstart', function(e) {
                e.stopImmediatePropagation();
            });

            ngModelCtrl.$parsers.push(function(val) {
                if (angular.isUndefined(val)) {
                    var val = '';
                }

                var clean = val.replace(/[^(가-힣ㄱ-ㅎㅏ-ㅣㆍᆢa-zA-Z\-)]/g, '');

                if (val !== clean) {
                    ngModelCtrl.$setViewValue(clean);
                    ngModelCtrl.$render();
                }
                return clean;
            });

            element.bind('keypress', function(event) {
                if(event.keyCode === 32) {
                    event.preventDefault();
                }
            })
        }
    }
});