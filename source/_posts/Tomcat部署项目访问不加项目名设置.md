---
title: Tomcat部署项目访问不加项目名设置
layout: post
comments: true
date: 2017-08-17 10:19:48
categories: 技术
tags: [Java, Tomcat]
keywords:
description:
---
1. 打开conf目录下server.xml；

2. 在Host内添加如下Context，其中docBase改为自己的项目路径即可。
		<Context path="" docBase="/usr/tomcat/webapps/xxExpert" reloadable="false" />
<!--more-->

3. 添加后效果如下：
		<Host name="localhost"  appBase="webapps"
		    unpackWARs="true" autoDeploy="true">

			<!-- SingleSignOn valve, share authentication between web applications
			     Documentation at: /docs/config/valve.html -->
			<!--
			<Valve className="org.apache.catalina.authenticator.SingleSignOn" />
			-->

			<!-- Access log processes all example.
			     Documentation at: /docs/config/valve.html
			     Note: The pattern used is equivalent to using pattern="common" -->
			<Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs"
			       prefix="localhost_access_log." suffix=".txt"
			       pattern="%h %l %u %t &quot;%r&quot; %s %b" />

			<Context path="" docBase="/usr/tomcat/webapps/xxExpert" reloadable="false" />

		</Host>