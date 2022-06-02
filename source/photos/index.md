---
layout: photos
title: "相册"
date: 2017-10-03 10:48:33
description: ""
aplayer: true
fixed: false
---
<div class="content">
    <div class="vidage" style="margin-top: -110px;" align=center>
        <video class="vidage-video" width="830" height="480" preload="metadata" loop autoplay muted>
            <source src="/photos/photos/bg.webm" type="video/webm">
            <source src="/photos/photos/bg.mp4" type="video/mp4">
        </video>
    </div>
    <div class="iw_wrapper">
        <ul class="iw_thumbs" id="iw_thumbs">
            <li>
                <div><h2>博派</h2><p>博派（Autobots）是长篇动画《变形金刚》系列中的重要派别，其他译名为“汽车人”。博派是《变形金刚》系列中的正面角色，是地球人的朋友，胸怀保卫生命、追求和平的理想。</p></div>
                <img src="/photos/photos/20200625140704.jpg" alt="博派"/>
            </li>
        </ul>
        <ul>
            <li>
                <div><h2>必应壁纸</h2><p id="txtsjtp1"></p></div>
                <img src="http://3650000.xyz/api/bing.php" alt="随机图片">
            </li>
            <li>
                <div><h2>360壁纸</h2><p id="txtsjtp2"></p></div>
                <img src="http://3650000.xyz/api/360.php?cid=1" alt="随机图片">
            </li>
            <li>
                <div><h2>随机图片</h2><p id="txtsjtp3"></p></div>
                <img src="https://api.btstu.cn/sjbz/api.php?lx=suiji" alt="随机图片">
            </li>
            <li>
                <div><h2>随机二次元图片</h2><p id="txtsjtp4"></p></div>
                <img src="https://www.dmoe.cc/random.php" alt="随机图片">
            </li>
            <li>
                <div><h2>随机微博图片</h2><p id="txtsjtp5"></p></div>
                <img src="http://3650000.xyz/api/?mode=1" alt="随机图片">
            </li>
        </ul>
    </div>
    <div>
        <img src="https://api.btstu.cn/netcard/api.php" alt="IP签名档">
    </div>
</div>


<script type="text/javascript" src="/js/ypn.js/jquery.min.js"></script>
<script type="text/javascript" src="/js/ypn.js/jquery.masonry.min.js"></script>
<script type="text/javascript" src="/js/ypn.js/jquery.easing.1.3.js"></script>
<!-- 加载图片 -->
<script type="text/javascript">
$(document).ready(function(){
    $.getJSON("../../photos/data.json", function (data) {
        render(data);
    });
    function render(data) {
        var html, li = "";
        for (var i = 0; i < data.length; i++) {
            //li += '<li style="list-style-type:none"><p><span class="authorLabel">'+ data[i].title +'</span> 创建于 '+ data[i].desc +'</p><img src="' + data[i].url + '" alt="Thumb'+ i +'"/></li>';
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
</script>