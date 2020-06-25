---
layout: photos
title: "相册"
date: 2017-10-03 10:48:33
description: ""
aplayer: true
fixed: false
---
<div class="content">
	<div class="iw_wrapper">
		<ul class="iw_thumbs" id="iw_thumbs">
			<li>
				<div><h2>博派</h2><p>博派（Autobots）是长篇动画《变形金刚》系列中的重要派别，其他译名为“汽车人”。博派是《变形金刚》系列中的正面角色，是地球人的朋友，胸怀保卫生命、追求和平的理想。</p></div>
				<img src="/photos/photos/20200625140704.jpg" alt="博派"/>
			</li>
		</ul>
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
})
</script>