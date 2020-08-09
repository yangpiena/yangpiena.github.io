$(window).load(function () {
	//整合页面欺骗特效 window.onload有冲突
    var OriginTitile = document.title;
    var titleTime;
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            $('[rel="icon"]').attr('href', "../../img/avatar/ironman2.png");
            $('[rel="shortcut icon"]').attr('href', "../../img/avatar/ironman2.png");
            document.title = v_yiYan;
            clearTimeout(titleTime);
        } else {
            $('[rel="icon"]').attr('href', "../../img/avatar/ironman.png");
            $('[rel="shortcut icon"]').attr('href', "../../img/avatar/ironman.png");
            document.title = '没有阳光，沉默而居';
            titleTime = setTimeout(function () {
                document.title = OriginTitile;
            }, 2000);
        }
    });
	//YPN 2020-08-09 请求获得从7种分类中随机抽取一个句子，并以纯文本格式输出：https://v1.hitokoto.cn/?encode=text
	//https://v1.hitokoto.cn/（从7种分类中随机抽取）
	//https://v1.hitokoto.cn/?c=b （请求获得一个分类是漫画的句子）
	//https://v1.hitokoto.cn/?c=f&encode=text （请求获得一个来自网络的句子，并以纯文本格式输出）
	var v_yiYan = "让我安静一会儿";
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			var v_yiYanJson = eval('(' + xhr.responseText + ')');
			v_yiYan = v_yiYanJson['hitokoto'];
		}
	}
	xhr.open("GET", "https://v1.hitokoto.cn/",true);
	xhr.send();
});