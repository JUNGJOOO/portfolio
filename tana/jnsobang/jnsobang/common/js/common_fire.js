//각 템플릿에 맞는 background 이미지 넣기.

$(document).ready(function(){
    var url = document.location.pathname;
    var key = url.split('/')[2];
    // console.log(key)
    if(key == 'minwon') {
        console.log(1)
        $('.sidebar .inner').css('background', 'url(/jnsobang/common/img/2020083113053964249.jpg)');
        $('.gnb .depth1 > li:nth-of-type(1) > a').addClass('active');
    } else if (key == 'data') {
        $('.sidebar .inner').css('background', 'url(/jnsobang/common/img/202008311305543064.jpg)');
        $('.gnb .depth1 > li:nth-of-type(2) > a').addClass('active');
    } else if (key == 'stats') {
        $('.sidebar .inner').css('background', 'url(/jnsobang/common/img/2020083113060576879.jpg)');
        $('.gnb .depth1 > li:nth-of-type(3) > a').addClass('active');
    } else if (key == 'commu') {
        $('.sidebar .inner').css('background', 'url(/jnsobang/common/img/2020083113061684464.jpg)');
        $('.gnb .depth1 > li:nth-of-type(4) > a').addClass('active');
    } else if (key == 'safety') {
        $('.sidebar .inner').css('background', 'url(/jnsobang/common/img/2020083113063323990.jpg)');
        $('.gnb .depth1 > li:nth-of-type(5) > a').addClass('active');
    } else if (key == 'center') {
        $('.sidebar .inner').css('background', 'url(/jnsobang/common/img/2020083113064444560.jpg)');
        $('.gnb .depth1 > li:nth-of-type(6) > a').addClass('active');
    } else if (key == 'use') {
        $('.sidebar .inner').css('background', 'url(/jnsobang/common/img/2020083113135707782.jpg)');
    } else if (key == 'etc') {
        $('.sidebar .inner').css('background', 'url(/jnsobang/common/img/202008311314079472.jpg)');
    }
});