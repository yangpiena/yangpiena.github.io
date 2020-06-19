---
title: Hexo博客增加音乐
author: 昜丿捺
copyright: true
categories: 技术
timestamp: 1553844903
date: 2019-03-29 15:35:03
authorDesc:
tags: [hexo]
description:
---
根据你的需求，在合适地方加入音乐。例如，打开主题layout下的文件common-article.ejs，加入：

<!-- more -->

```
<!-- YPN Add 2019-03-29 增加背景音乐Aplayer-->
<!-- 参数如下：（粗体为必填项） -->
<!-- data-id: 歌曲/专辑/歌单 ID -->	
	<!-- data-server: 音乐平台，支持如下参数 -->
	<!-- netease （网易云音乐） -->
	<!-- tencent （qq音乐） -->
	<!-- xiami （虾米音乐） -->
	<!-- kugou （酷狗音乐） -->
	<!-- baidu （百度音乐） -->	
<!-- data-type: 请求类型，支持如下参数 -->
	<!-- song （单曲） -->
	<!-- album （专辑） -->
	<!-- playlist （歌单） -->
	<!-- search （搜索） -->
<!-- data-mode: 播放模式 -->
	<!-- random （随机） -->
	<!-- single （单曲） -->
	<!-- circulation （列表循环） -->
	<!-- order （列表） -->
<!-- data-autoplay: 自动播放  -->
	<!-- true -->
	<!-- false -->
<section class='music'>
	<div class='content material'>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer@1.7.0/dist/APlayer.min.css">
		<div class="aplayer"
			data-theme="#1BCDFC"
			data-mode="random"
			data-server="netease"
			data-type="playlist"
			data-list-folded="false"
			data-id="745065239"
			data-volume="0.7">
		</div>
		<script src="https://cdn.jsdelivr.net/npm/aplayer@1.7.0/dist/APlayer.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/meting@1.1.0/dist/Meting.min.js"></script>
	</div>
</section>
```