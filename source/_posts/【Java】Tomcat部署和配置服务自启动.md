---
title: 【Java】tomcat部署和配置服务自启动
layout: post
comments: true
date: 2016-12-28 09:49:28
categories: Java
tags: [Java, tomcat]
keywords:
description:
---

#### 配置Tomcat
1. 将下载的apache-tomcat-6.0.35-windows-x86.zip压缩包解压。
2. 修改\bin\startup.bat文件，在第一行前面加入如下两行：
		SET JAVA_HOME=D:\Program Files\Java\jdk1.6.0_30   (JDK安装所在的路径)
		SET CATALINA_HOME=D:\Program Files\tomcat6.0.35   (免安装的Tomcat解压后的路径)
如果需要使用shutdown.bat关闭服务器的话，也按照上面加入两行。
3. 这样，运行startup.bat就可以启动Tomcat，跑起应用，运行shutdown.bat就可以关闭服务器了。
4. 修改\conf\tomcat-users.xml文件，在`<tomcat-users>`标签内加入
		<role rolename="manager"/>
		<role rolename="admin"/>
		<user username="admin" password="admin" roles="admin,manager"/>
这样才可以使用Tomcat的管理界面。

<!-- more -->
#### 免安装版的Tomcat做成服务，随机器启动（windows环境）：
1. 修改\bin目录中的service.bat
		rem 在第一个if语句的前面一行添加下面的行：
		SET CATALINA_HOME=D:\Program Files\tomcat6.0.35
		rem 上面这一行是设置CATALINA_HOME变量指到解压后的Tomcat目录
如果从来没有安装过Tomcat，或者保证Services.msc启动服务管理器检查没有Apache Tomcat系统服务，到此你就可以转到第2步了。否则继续往下走：
按照下面的描述修改下面的相应的几行，每行下面都附有文字说明设置的作用：
		set SERVICE_NAME=tomcat6.0
		rem 上面一行，将tomcat6.0修改成你需要的服务名，这个将是以后使用net start/stop来操作的服务名称。

		set PR_DISPLAYNAME=Apache Tomcat
		rem 上面一行，Apache Tomcat改为你需要显示的服务名，这个将显示在服务管理器中。

		set PR_DESCRIPTION=Apache Tomcat Server - http://jakarta.apache.org/tomcat
		rem 这一行改不改无所谓，是服务的描述，根据自己的喜好决定吧。

2. 运行cmd打开控制台，进入解压后的Tomat目录的/bin文件夹下，运行`service.bat install`命令：
		D:\Program Files\tomcat6.0.35\bin>service.bat install
		Installing the service  'tomcat6.0' ...
		Using CATALINA_HOME:    "D:\Program Files\tomcat6.0.35"
		Using CATALINA_BASE:    "D:\Program Files\tomcat6.0.35"
		Using JAVA_HOME:        "D:\Program Files\Java\jdk1.6.0_30"
		Using JVM:              "D:\Program Files\Java\jdk1.6.0_30\jre\bin\server\jvm.dll"
		The service 'tomcat6.0' has been installed.
程序提示：The service 'tomcat6.0（你修改以后的SERVICE_NAME）' has been installed说明服务Tomcat已经被安装成功。相应的，运行`service.bat remove`可以移除服务。

3. 到这里，服务添加成功，运行services.msc，可以看到添加的服务，默认状态下该服务是手动运行的，在它的属性中，将启动类型更改为"自动"，以后机器启动以后Tomcat就在后台启动了。