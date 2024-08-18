$(document).ready(function () {
  $("select").niceSelect();
  $(".nice-select .list li").each(function (index) {
    var relatedOption = $("select option").eq(index);
    if (relatedOption.data("default")) {
      $(this).addClass('is_default');
      // var text = $(this).text();
      // $(this).html(text + "<span class='list_default'>(기본)</span>");
    }
  });
  
  scrollFix();
  scrollMove();
  mouseAct();
});


function scrollFix() {
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    // stpe1
    if (scroll >= 275) {
      $(".wrap-step1 .fixed_item").addClass("is_topfixed");
    } else {
      $(".wrap-step1 .fixed_item").removeClass("is_topfixed");
    }

    // step2
    if (scroll >= 90) {
      $(".wrap-step2 .fixed_item").addClass("is_topfixed");
    } else {
      $(".wrap-step2 .fixed_item").removeClass("is_topfixed");
    }

    // step3
    if (scroll >= 175) {
      $(".wrap-step3 .fixed_item").addClass("is_topfixed");
    } else {
      $(".wrap-step3 .fixed_item").removeClass("is_topfixed");
    }
  });
}
function scrollMove() {
  // footer도달시 fix되는
  var btnTopmove = $(".quick_navi");
  var btBottom;
  var footerWrap = $("footer");
  var fHeight;
  $(window).on("scroll", function () {
    btnTopmove.removeAttr("style");
    btBottom = parseInt(btnTopmove.css("bottom"));
    fHeight = footerWrap.outerHeight();

    if ($(window).scrollTop() >= document.documentElement.scrollHeight - fHeight - $(window).height()) {
      btnTopmove.css({
        position: "absolute",
        bottom: "auto",
        top: document.documentElement.scrollHeight - fHeight - btnTopmove.height() - btBottom + "px",
      });
    } else if ($(window).scrollTop() < document.documentElement.scrollHeight - fHeight - $(window).height()) {
      btnTopmove.css({
        position: "fixed",
        bottom: btBottom + "px",
        top: "auto",
      });
    }

    var scroll2 = $(window).scrollTop();
    if (scroll2 >= 5) {
      $(".quick_navi").show();
    } else {
      $(".quick_navi").hide();
    }
  });

  // 맨위로
  $("#btn_qtop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
  });
}
function mouseAct() {
  // item-1th
  $(".item-1th").mouseover(function () {
    $(".item-1th").addClass("is_mouse");
    $(".fixed_item .item-1th").addClass("is_mouse");
  });
  $(".item-1th").mouseout(function () {
    $(".item-1th").removeClass("is_mouse");
  });

  // item-2th
  $(".item-2th").mouseover(function () {
    $(".item-2th").addClass("is_mouse");
  });
  $(".item-2th").mouseout(function () {
    $(".item-2th").removeClass("is_mouse");
  });

  // item-3th
  $(".item-3th").mouseover(function () {
    $(".item-3th").addClass("is_mouse");
  });
  $(".item-3th").mouseout(function () {
    $(".item-3th").removeClass("is_mouse");
  });
}

// 레이어팝업 열기
function openLayer(layercf) {
  $("." + layercf).fadeIn(200);
  $("body").addClass("is_body");
}
// 레이어팝업 닫기
$(".layer_close").on("click", function (e) {
  e.preventDefault();
  $(this).closest(".layercf").removeClass("is_active");
  $("body").removeClass("is_body");
  $(".layercf").fadeOut(200);
});
$(".dim_replace").on("click", function (e) {
  e.preventDefault();
  $(this).closest(".layercf").removeClass("is_active");
  $("body").removeClass("is_body");
  $(".layercf").fadeOut(200);
});

// 툴팁 닫기
function tooltip_close() {
  $(".item_tooltip").hide();
}

// swiper
var swiper = new Swiper(".swiper_preview", {
  effect: "slide",
  slidesPerView: 1,
  speed: 500,
  loop: true,
  navigation: {
    nextEl: ".preview-button-next",
    prevEl: ".preview-button-prev",
  },
  pagination: {
    el: ".preview-pagination",
    type: "fraction",
    clickable: true,
    formatFractionCurrent: function (number) {
      return "서비스 미리보기 " + number;
    },
  },
});

// skeleton 실행취소
function timer() {
  $(".wrap-step3").removeClass("is_skeleton");
}
var timerVar = setTimeout(timer, 3500);

// 숫자카운트 효과
var memberCountConTxt1 = 36500;
var memberCountConTxt2 = 45000;
var memberCountConTxt3 = 130000;
$({ val: 0 }).animate(
  { val: memberCountConTxt1 },
  {
    duration: 3500,
    step: function () {
      var num = numberWithCommas(Math.floor(this.val));
      $(".count_num1").text(num);
    },
    complete: function () {
      var num = numberWithCommas(Math.floor(this.val));
      $(".count_num1").text(num);
    },
  }
);
$({ val: 0 }).animate(
  { val: memberCountConTxt2 },
  {
    duration: 3500,
    step: function () {
      var num = numberWithCommas(Math.floor(this.val));
      $(".count_num2").text(num);
    },
    complete: function () {
      var num = numberWithCommas(Math.floor(this.val));
      $(".count_num2").text(num);
    },
  }
);
$({ val: 0 }).animate(
  { val: memberCountConTxt3 },
  {
    duration: 3500,
    step: function () {
      var num = numberWithCommas(Math.floor(this.val));
      $(".count_num3").text(num);
    },
    complete: function () {
      var num = numberWithCommas(Math.floor(this.val));
      $(".count_num3").text(num);
    },
  }
);
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
