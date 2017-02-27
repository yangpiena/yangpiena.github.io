---
title: 【Java】jdk下载安装
layout: post
comments: true
date: 2016-12-28 09:29:53
categories: Java
tags: [Java, jdk]
keywords:
description:
---

#### JDK[官网下载](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
<!-- more -->
#### 配置环境变量
新建变量名：`JAVA_HOME`   	变量值：C:\Java\jdk1.7.0_80
编辑变量名：`Path`  		追加值：%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin
新建变量名：`CLASSPATH` 	变量值：.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar
>注意：在设置变量的末尾不要加上“；”）

设置完成之后我们需要测试，打开`运行`，输入`CMD`，在命令行上输入`java -version`，然后回车，如果出现以下内容，那么JDK配置成功，否则就需要检查环境变量的配置。

	java version "1.7.0_80"
	Java(TM) SE Runtime Environment (build 1.7.0_80-b15)
	Java HotSpot(TM) Client VM (build 24.80-b11, mixed mode, sharing)