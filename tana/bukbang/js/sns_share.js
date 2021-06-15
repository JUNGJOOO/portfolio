Kakao.init("b28beb398a29793ef7883351e27456fe");
$(".sns_share").click(function(e){
		e.preventDefault();
		
		var _this = $(this);
		var sns_type = $(this).data('service');
		var title = $(".h3-title").text();
		var href = $(location).attr("href");

		var loc = "";
		
		if( ! sns_type || !href || !title){
			return;
		}
		
		switch(sns_type){
			case 'facebook' : loc = '//www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(href);
window.open(loc);
			break;
			case 'twitter' : loc = 'https://twitter.com/intent/tweet?text='+encodeURIComponent(title)+'&url='+encodeURIComponent(href);
window.open(loc);
			break;
			case 'kakaotalk' : sharekKakaotalk(title,href);

			break;
			default : urlCopy(href);
return false;
		}
		
		return false;
	});

function sharekKakaotalk(title,href){
	var filter = "win16|win32|win64|mac|Win16|Win32|Win64";
	if(navigator.platform){
		if(0 > filter.indexOf(navigator.platform.toLowerCase())){
			Kakao.Link.sendDefault({
				objectType: 'feed',
				content: {
					title: title,
					description: "",
					imageUrl: 'http://bukbang.go.kr/bukbang/common/images/content/pic_ci_logo.png',
					link: {
						//webUrl: webLink,
						webUrl: href,
						mobileWebUrl: href
					}
				},
				buttons: [{
					title: '자세히보기',
					link: {
						webUrl: href,
						mobileWebUrl: href
					}
				}]
			});
return false;
		}else{
			alert("이 기능은 모바일에서만 사용할 수 있습니다.");
			return false;
		}
	}
}

function urlCopy(href){
	var t = document.createElement("textarea");
  document.body.appendChild(t);
  t.value = href;
  t.select();
	try{
		var successful =   document.execCommand('copy');
  document.body.removeChild(t);
		alert("URL이 복사되었습니다.");
	}catch (err){
		alert('이 브라우저는 지원하지 않습니다.');
 document.body.removeChild(t);
	}
}