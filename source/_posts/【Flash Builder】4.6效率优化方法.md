---
title: 【Flash Builder】4.6效率优化方法
layout: post
comments: true
date: 2016-12-27 15:42:09
categories: Flash Builder
tags: [Flash Builder, 优化]
keywords: 优化
description: 整理自网络
---

Flash Builder 4.6编译慢、报java heap space堆空间异常错误的优化方法：

1. 在安装路径下找到`FlexBuilder.ini`文件，进行编辑，加入以下参数：
		-vmargs
		-Xms128m
		-Xmx512m
		-XX:MaxPermSize=256m
		-XX:PermSize=64m    				#不要设置太高，否则会更加慢
		-Djava.net.preferIPv4Stack=true
加入后可以明显加快编译速度数倍，第3条可以明显减低FB挂掉的几率。
<!-- more -->
2. 由于Flex Builder compiler shell有memory leak的问题，而SDK默认的的 JVM heap size 只有312M，当compile比较大的project时内存容易不够，所以只要修改SDK的JVM参数就可以。即编辑`{Flex SDK}`安装路径`/bin/jvm.config`文件如下：
		java.args=-Xmx512m -Dsun.io.useCanonCaches=false
如果还是有Error，可以增加到1024或者更多试试。
>我的flex4.6安装路径中的sdk位置：D:\Adobe\Adobe Flash Builder 4\sdks\4.0.0\bin\jvm.config，只需在这里调整即可！