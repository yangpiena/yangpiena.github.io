---
title: Tomcat启动jvm内存设置
author: 昜丿捺
copyright: true
layout: post
comments: true
date: 2016-12-28 10:06:29
categories: 技术
tags: [tomcat]
keywords:
description:
---

# Linux
在/usr/local/apache-tomcat-7.0.57/bin目录下的catalina.sh中添加：

	JAVA_OPTS='-Xms512m -Xmx1024m'
> -Xms：初始值
  -Xmx：最大值
  -Xmn：最小值

<!-- more -->
# Windows
- 若使用startup.bat启动tomcat，则在C:\apache-tomcat-7.0.57\bin\catalina.bat最前面加入：

      set JAVA_OPTS=-Xms512m -Xmx1024m

- 而如果利用windows的系统服务启动tomcat服务，那上面的设置就不生效了，windows服务执行的是bin/tomcat.exe。他读取注册表中的值，而不是catalina.bat的设置。

  **解决办法：**
修改注册表HKEY_LOCAL_MACHINE/SOFTWARE/Apache Software Foundation/Tomcat Service Manager/Tomcat5/Parameters/JavaOptions

  原值为
  
  		-Dcatalina.home="C:/ApacheGroup/Tomcat 5.0"
  		-Djava.endorsed.dirs="C:/ApacheGroup/Tomcat 5.0/common/  endorsed"
  		-Xrs
  在最后加入
  
  		-Xms300m -Xmx350m  
  退出注册表，重起tomcat服务，设置生效。