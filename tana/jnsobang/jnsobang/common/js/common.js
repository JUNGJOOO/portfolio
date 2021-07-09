$(document).ready(function(){

    $('.tab_dropbtn').on('click', function (e) {
        $('.tab_default').toggleClass('active');
        $(this).toggleClass('active');
    });

    $(document).on("change","input[type=file]",function(){
        $(this).next().html($(this)[0].files[0].name); 
        $("#mainfile").parent().find(".fileXX").removeClass('hide');
        $(this).parent().find(".fileX").removeClass('hide');
    });
});

function fnCancleFile(thiz){
  thiz.addClass('hide').prev().text('');
  thiz.parent().find('[type=file]').val('');
}
function fnCancleFile2(thizz){
  thizz.addClass('hide').prev().text('');
  thizz.parent().find('[type=file]').val('');
}


window.onload = function() {

    var galleryThumbs = new Swiper('.photogallery-thumbs', {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    var galleryTop = new Swiper('.photogallery-top', {
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: galleryThumbs
      }
    });

}







$( ".ui-datepicker" ).datepicker({
	dateFormat: "yy-mm-dd",
	closeText: '닫기', 
	nextText: '다음 달',
	prevText: '이전 달'
});


















// 본문 콘텐츠 소셜 공유
	var currentUrl = encodeURIComponent($(location).attr('href'));
	var title = encodeURIComponent($(document).attr('title'));	
	var fb = "http://www.facebook.com/sharer/sharer.php?u="+currentUrl;
	//var twt = "http://twitter.com/share?url="+currentUrl+"&amp;text="+title;
	var twt = "http://twitter.com/intent/tweet?text=" + title + "&url=" + currentUrl;
	var gplus = "https://plus.google.com/share?hl=ko&url="+currentUrl;	
	var m2 = "http://me2day.net/plugins/post/new?new_post[body]=%22"+title+"%22:"+currentUrl;
	var nband = "http://www.band.us/plugin/share?body="+title+"&route="+currentUrl;
	$('.facebook a').attr('href',fb);
	$('.twitter a').attr('href',twt);	
	$('.googleplus a').attr('href',gplus);	
	$('.me2day a').attr('href',m2);
	$('.naverband a').attr('href',nband);
	$('.kakaostory a').on('click',function(e){
		e.preventDefault();
		Kakao.init('3a546a4f3d20ea963d2cc4c738c11eea');
		Kakao.Story.share({
			url: $(location).attr('href'),
			text: $(document).attr('title')
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





//민원마당 - 불법행위신고 - 소방서별 신고센터 안내 스크롤
  $('a[href*="#"]').on('click', function (e) {
    e.preventDefault()
    $('html, body').animate( { 
        scrollTop: $($(this).attr('href')).offset().top, 
    }, 500 )
})