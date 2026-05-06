$(document).ready(function(){
    $.getJSON("../../photos/data.json", function (data) {
        render(data);
    });
    function render(data) {
        var html, li = "";
        for (var i = 0; i < data.length; i++) {
            li += '<li><div><h2>'+ data[i].title +'</h2><p>'+ data[i].desc +'</p></div><img src="' + data[i].url + '" alt="'+ data[i].title +'"/></li>';            
        }
        $(".iw_thumbs").append(li);
    }
	
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var v_yiYanJson = eval('(' + xhr.responseText + ')');
            $("#txtsjtp1").html(v_yiYanJson['text']);
        }
    }
    xhr.open("GET", "https://api.btstu.cn/yan/api.php?charset=utf-8&encode=json",true);
    xhr.send();
	
    var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function () {
        if (xhr1.readyState === 4) {
            var v_yiYanJson = eval('(' + xhr1.responseText + ')');
            $("#txtsjtp2").html(v_yiYanJson['text']);
        }
    }
    xhr1.open("GET", "https://api.btstu.cn/yan/api.php?charset=utf-8&encode=json",true);
    xhr1.send();
	
    var xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function () {
        if (xhr2.readyState === 4) {
            var v_yiYanJson = eval('(' + xhr2.responseText + ')');
            $("#txtsjtp3").html(v_yiYanJson['text']);
        }
    }
    xhr2.open("GET", "https://api.btstu.cn/yan/api.php?charset=utf-8&encode=json",true);
    xhr2.send();
    
    var xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function () {
        if (xhr2.readyState === 4) {
            var v_yiYanJson = eval('(' + xhr2.responseText + ')');
            $("#txtsjtp4").html(v_yiYanJson['text']);
        }
    }
    xhr2.open("GET", "https://api.btstu.cn/yan/api.php?charset=utf-8&encode=json",true);
    xhr2.send();
    
    var xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function () {
        if (xhr2.readyState === 4) {
            var v_yiYanJson = eval('(' + xhr2.responseText + ')');
            $("#txtsjtp5").html(v_yiYanJson['text']);
        }
    }
    xhr2.open("GET", "https://api.btstu.cn/yan/api.php?charset=utf-8&encode=json",true);
    xhr2.send();
})