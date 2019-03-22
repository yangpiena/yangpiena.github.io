---
title: Hexo博客增加一言API
author: 昜丿捺
categories: 技术
tags: Hexo
timestamp: 1553267229
date: 2019-03-22 23:07:09
authorDesc:
description:
---
打开主题layout下的文件common-article.ejs，加入以下内容：

	<!-- YPN Add 2019-03-22 没有authorDesc时，显示一言经典语句-->
	<% if (post.authorDesc) { %>
		<p><%= post.authorDesc ? post.authorDesc : theme.webmaster.desc %></p>
	<% }else { %>
		<script type="text/javascript" src="https://api.lwl12.com/hitokoto/v1?encode=js&charset=utf-8"></script>
		<p><span id="lwlhitokoto"><script>lwlhitokoto()</script></span></p>
	<% } %>