var bookmarkApp = angular.module("bookmarkApp", []);

bookmarkApp.directive('bookmarkPage', function($window, $location) {
    return {
        restrict: "AE",
        link: function (scope, element, attrs) {
            $(element).click(function (e) {
                var bookmarkURL = $location.protocol() + "://" + $location.host();
                var bookmarkTitle = document.title;
                var triggerDefault = false;

                if (window.sidebar && window.sidebar.addPanel) {
                    // Firefox version < 23
                    window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
                } else if ((window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)) || (window.opera && window.print)) {
                    // Firefox version >= 23 and Opera Hotlist
                    var $this = $(this);
                    $this.attr('href', bookmarkURL);
                    $this.attr('title', bookmarkTitle);
                    $this.attr('rel', 'sidebar');
                    $this.off(e);
                    triggerDefault = true;
                } else if (window.external && ('AddFavorite' in window.external)) {
                    // IE Favorite
                    window.external.AddFavorite(bookmarkURL, bookmarkTitle);
                } else {
                    // WebKit - Safari/Chrome
                    alert((navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D키를 누르시면 즐겨찾기에 추가하실 수 있습니다.');
                }

                return triggerDefault;
            });
        }
    }
});