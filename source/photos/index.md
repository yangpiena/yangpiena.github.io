---
layout: photos
title: "相册"
date: 2017-10-03 10:48:33
description: ""
aplayer: true
fixed: false
---
<div class="content">
    <!-- 视频 -->
    <div class="vidage" style="margin-top: -110px;" align=center>
        <video class="vidage-video" width="830" height="480" preload="metadata" loop autoplay muted>
            <source src="/photos/photos/bg.webm" type="video/webm">
            <source src="/photos/photos/bg.mp4" type="video/mp4">
        </video>
    </div>
    <!-- 图片 -->
    <div class="iw_wrapper">
        <!-- 动态加载本地图片 -->
        <ul class="iw_thumbs" id="iw_thumbs">
            <li>
                <div><h2>博派</h2><p>博派（Autobots）是长篇动画《变形金刚》系列中的重要派别，其他译名为“汽车人”。博派是《变形金刚》系列中的正面角色，是地球人的朋友，胸怀保卫生命、追求和平的理想。</p></div>
                <img src="/photos/photos/20200625140704.jpg" alt="博派"/>
            </li>
        </ul>
        <!-- 随机图片API -->
        <ul>
            <li>
                <div><h2>随机壁纸</h2><p id="txtsjtp1"></p></div>
                <img src="https://tuapi.eees.cc/api.php?category={dongman,fengjing,biying}" alt="随机图片">
            </li>
            <li>
                <div><h2>随机微博</h2><p id="txtsjtp2"></p></div>
                <img src="http://3650000.xyz/api/?type=img&mode=1" alt="随机图片">
            </li>
            <li>
                <div><h2>随机图片</h2><p id="txtsjtp2"></p></div>
                <img src="https://3650000.xyz/api/?type=img" alt="随机图片">
            </li>
            <li>
                <div><h2>随机原神</h2><p id="txtsjtp3"></p></div>
                <img src="https://api.r10086.com/樱道随机图片api接口.php?自适应图片系列=原神" alt="随机图片">
            </li>
            <li>
                <div><h2>随机图片</h2><p id="txtsjtp4"></p></div>
                <img src="https://tuapi.eees.cc/api.php?category=meinv" alt="随机图片">
            </li>
            <li>
                <div><h2>随机图片</h2><p id="txtsjtp5"></p></div>
                <img src="https://imgapi.cn/api.php" alt="随机图片">
            </li>
        </ul>
    </div>
    <div>
        <img src="https://api.btstu.cn/netcard/api.php" alt="IP签名档">
    </div>
</div>


<!-- 加载图片 -->
<script type="text/javascript" src="/js/ypn.js/jquery.min.js"></script>
<script type="text/javascript" src="/js/ypn.js/load-image.js"></script>