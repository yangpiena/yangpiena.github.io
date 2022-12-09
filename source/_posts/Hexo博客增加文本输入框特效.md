---
title: Hexo博客增加文本输入框特效
author: 昜丿捺
copyright: true
categories: 技术
timestamp: 1553668756
date: 2019-03-27 14:39:16
authorDesc:
tags: [hexo]
description:
---
打开layout下的文件footer.ejs，增加文本输入框特效：

	<!--2017-10-06 YPN Add 添加输入框特效。 -->
	<script src="/js/activate-power-mode.js"></script>
	<script>
	  POWERMODE.colorful = true;  // 控制开启/开启礼花特效  
	  POWERMODE.shake    = false; // 控制开启/关闭屏幕震动特效  
	  document.body.addEventListener('input', POWERMODE);
	</script>