---
title: 【FAQ】Flash Builder
layout: post
comments: true
date: 2016-12-27 15:54:04
categories: FAQ
tags: [Flash Builder, FAQ]
keywords:
description: 整理自YPN
---

以下记录Flash Builder在使用过程中出现的问题和解决方法：
#### 1. 重新连接“数据/服务”时，出现错误，如“数据类型重复”等问题
此时，只需将数据服务彻底删除干净后再重新连接即可。删除方法：
- 删除文件夹services和valueObjects；
- 删除xx.fml文件中的数据/服务内容。保留model标签和annotation标签内容，其它全删除。
		<model xmlns="http://ns.adobe.com/Fiber/1.0">
				<annotation name="ActionScriptGeneration">
				<item name="FullyQualifyReferences">true</item>
				</annotation>
			...
		</model>