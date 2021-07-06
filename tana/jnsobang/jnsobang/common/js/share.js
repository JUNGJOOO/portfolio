// 본문 콘텐츠 소셜 공유
var currentUrl = encodeURIComponent($(location).attr('href'));
var title = encodeURIComponent($(document).attr('title'));	
var fb = "http://www.facebook.com/sharer/sharer.php?u="+currentUrl;
//var twt = "http://twitter.com/share?url="+currentUrl+"&amp;text="+title;
var twt = "http://twitter.com/intent/tweet?text=" + title + "&url=" + currentUrl;
var gplus = "https://plus.google.com/share?hl=ko&url="+currentUrl;	
var m2 = "http://me2day.net/plugins/post/new?new_post[body]=%22"+title+"%22:"+currentUrl;
var nband = "http://www.band.us/plugin/share?body="+title+"&route="+currentUrl;

var katalk = "http://www.band.us/plugin/share?body="+title+"&route="+currentUrl;
var insta = "http://www.band.us/plugin/share?body="+title+"&route="+currentUrl;

$('.facebook a').attr('href',fb);
$('.twitter a').attr('href',twt);	
$('.googleplus a').attr('href',gplus);	
$('.me2day a').attr('href',m2);
$('.naverband a').attr('href',nband);

$('.kakao a').attr('href',katalk);
$('.instagram a').attr('href',insta);




/* $('.kakaostory a').on('click',function(e){
    e.preventDefault();
    Kakao.init('3a546a4f3d20ea963d2cc4c738c11eea');
    Kakao.Story.share({
        url: $(location).attr('href'),
        text: $(document).attr('title')
    });
});
 */
// Kakao.init('39e8b439408177d2cf355e3925b70b7e');


$('.kakao a').on('click',function(e){
  e.preventDefault();
  Kakao.init('8c17e8e8c50cfe2163f5a96962f50f2a');

    
    /* Kakao.Link.sendScrap({    
        requestUrl:  $(location).attr('href'),
    }) */

   /*  Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: title,
          description: '전남소방',
          link: {
            mobileWebUrl: currentUrl,
          },
        }
      }); */


  /*     Kakao.API.request({
        url: '/v2/api/talk/memo/scrap/send', 
        template_id: 37306,
        requestUrl:  $(location).attr('href'),
      }); */

/*       Kakao.Link.sendCustom({
        templateId: 37309 ,
        templateArgs: {
          'title': title,
          'description': currentUrl
        },
    
      }); */

/*       Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: title,
          description: title,
          imageUrl:
            'http://1.220.33.27:15180/jnsobang/common/img/2020082709400044995.jpg',
          link: {
            mobileWebUrl: currentUrl,
            androidExecParams: 'test',
          },
        },
  
        buttons: [
          {
            title: '웹으로 이동',
            link: {
              mobileWebUrl: currentUrl,
            },
          },
          {
            title: '앱으로 이동',
            link: {
              mobileWebUrl: currentUrl,
            },
          },
        ]
      }); */

      Kakao.Link.sendDefault({
        objectType: 'text',
        text: '전남소방',
        link: {
          mobileWebUrl: $(location).attr('href'),
          webUrl: $(location).attr('href')
        },
        serverCallbackArgs: { // 콜백 파라미터 설정
          key: 'value'
        }
      });


});



$('.btn-share').on('click',function(e){
    e.preventDefault();
    var $sns = $(this).next('.sns-wrap');
    if ($sns.hasClass('is_open')) {
        $sns.removeClass('is_open');
    } else {
        $sns.addClass('is_open');
    }
});


$('.btn-sns-close').on('click',function(e){
    e.preventDefault();
    var $sns = $(this).closest('.sns');
    if ($sns.hasClass('__open-share')) {
        $sns.removeClass('__open-share');
    } else {
        $sns.addClass('__open-share');
    }
});