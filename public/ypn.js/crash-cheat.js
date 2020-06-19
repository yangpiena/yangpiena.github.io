$(window).load(function () {
//整合页面欺骗特效 window.onload有冲突
    var OriginTitile = document.title;
    var titleTime;
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            $('[rel="icon"]').attr('href', "../../img/avatar/ironman2.png");
            $('[rel="shortcut icon"]').attr('href', "../../img/avatar/ironman2.png");
            document.title = '网站已崩溃！';
            clearTimeout(titleTime);
        } else {
            $('[rel="icon"]').attr('href', "../../img/avatar/ironman.png");
            $('[rel="shortcut icon"]').attr('href', "../../img/avatar/ironman.png");
            document.title = '欢迎回来~！~ ';
            titleTime = setTimeout(function () {
                document.title = OriginTitile;
            }, 2000);
        }
    });
});