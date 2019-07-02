---
title: Hexo博客增加鼠标点击特效
author: 昜丿捺
categories: 技术
timestamp: 1553668241
date: 2019-03-27 14:30:41
authorDesc:
tags: [hexo]
description:
---
打开layout下的文件footer.ejs，增加社会主义核心价值观特效：

	<!--2017-10-06 YPN Add 添加鼠标点击特效 -->
	<script type="text/javascript">
	  /* 鼠标点击特效 */
	  var a_idx = 0;
	  jQuery(document).ready(function($) {
		  $("body").click(function(e) {
	  var a = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正" ,"法治", "爱国", "敬业", "诚信", "友善");
	  var $i = $("<span/>").text(a[a_idx]);
			  a_idx = (a_idx + 1) % a.length;
	  var x = e.pageX,
			  y = e.pageY;
			  $i.css({
	  "z-index": 999999999999999999999999999999999999999999999999999999999999999999999,
	  "top": y - 20,
	  "left": x,
	  "cursor":"default",
	  "position": "absolute",
	  "font-weight": "bold",
	  "color": "#ff6651"
			  });
			  $("body").append($i);
			  $i.animate({
	  "top": y - 180,
	  "opacity": 0
			  },
			  1500,
	  function() {
				  $i.remove();
			  });
		  });
	  });
	</script>