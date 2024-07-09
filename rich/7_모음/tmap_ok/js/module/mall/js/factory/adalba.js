/*
* 애드알바 관련
*/
indexApp.factory('AdalbaFactory', function($http) {
    var header = {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    }

    var AdalbaFactory = function(AppConf){
    };

    // 푸터정보 조회
    AdalbaFactory.prototype.getFooterInfo = function(partnerID,callback) {
        var param = {
            partnerID : partnerID //파트너아이디
        }

        $http({
            method: 'POST',
            url: '/api',
            params: {
                uri:'/adalba/member/footer-info'
            },
            data: $.param(param),
            headers: header
        }).success(function(res) {
            if(res.responseCode == 200 && res.data.result == "SUCCESS")
                callback(res.data);
            else
                callback([]);
        })
    }

    return AdalbaFactory;
})