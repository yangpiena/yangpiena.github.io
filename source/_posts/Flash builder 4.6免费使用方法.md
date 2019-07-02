---
title: Flash builder 4.6免费使用方法
layout: post
comments: true
date: 2016-12-27 15:18:23
categories: 技术
tags: [flex, flash builder]
keywords: 免费
description: 整理自网络
---

Flash Builder 4.6免费使用具体步骤如下：
1. 到Adobe官网下载FlashBuilder 4.6，有简体中文版；
<!-- more -->
2. 安装时，不用序列号，直接选择安装试用版；
3. 安装完成后在安装目录下依次修改下列3个文件：
 (1)`.eclipse\plugins\com.adobe.flexbuilder.project_4.6.0.328916\META-INF`下面的`MANIFEST.MF`修改：
 		Bundle-Version: 0.0.0
 (2)`.eclipse\features\com.adobe.flexide.feature_4.6.0.328916`下面的`feature.xml`修改：
		<plugin
		 id="com.adobe.flexbuilder.project"
		 download-size="0"
		 install-size="0"
		 version="0.0.0"/>
 (3)`.eclipse\plugins\com.adobe.flexbuilder.flex_4.6.0.328916`下面，复制`config.xml`并重命名为`config_builder.xml`即可。

>以上版本号请跟据实际版本号进行替换，修改完成之后，再启动Adobe Flash Builder 4.6，就可免费使用这款RIA工具了。