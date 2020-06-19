---
title: Kettle使用命令行来运行数据库job
author: 昜丿捺
copyright: true
layout: post
comments: true
date: 2016-12-28 10:48:13
categories: 技术
tags: [Kettle]
keywords:
description:
---

当您的Job是在数据库中存储，并需要通过命令行（.bat）方式运行时，如下编辑.bat文件即可：

	d:
	cd d:\data-integration
	kitchen /rep xxKettle /dir taby /user admin /pass admin /job tabyToXX_Job /level basic /logfile D:\KettleLog\kettlelog.log
	pause
<!-- more -->
> 其中，“d:\data-integration”表示kitchen命令所在路径；
		/rep 后跟资源库名称
		/dir 后跟job所在目录名称，如实际路径为：/taby/tabyToXX_Job
		/user 后跟用户名
		/pass 后跟密码
		/job 后跟job名称
		/level 后跟日志等级
		/logfile 后跟日志文件
