---
title: Tomcat下载和安装
author: 昜丿捺
copyright: true
layout: post
comments: true
date: 2016-12-28 09:49:28
categories: 技术
tags: [tomcat]
keywords:
description:
---
### Tomcat[官网下载](https://tomcat.apache.org/)

---

### Tomcat安装

#### 1. Windows下
##### 1.1 将下载的apache-tomcat-6.0.35-windows-x86.zip压缩包解压。

##### 1.2 修改\bin\startup.bat文件，在第一行前面加入以下内容：

	REM JDK安装所在的路径
	SET JAVA_HOME=D:\Program Files\Java\jdk1.6.0_30
	REM 免安装的Tomcat解压后的路径
	SET CATALINA_HOME=D:\Program Files\tomcat6.0.35
如果需要使用shutdown.bat关闭服务器的话，也按照上面加入。

##### 1.3 这样，运行startup.bat就可以启动Tomcat，运行shutdown.bat就可以关闭服务器了。

##### 1.4 修改\conf\tomcat-users.xml文件，在`<tomcat-users>`标签内加入

	<role rolename="manager"/>
	<role rolename="admin"/>
	<user username="admin" password="admin" roles="admin,manager"/>
这样才可以使用Tomcat的管理界面。

<!-- more -->

---

#### 2. Linux下
##### 2.1 下载或拷贝tomcat安装包到user目录下，然后解压
```
[root@iZwe13xjwyedbm0tjgmez1Z usr]# ls
apache-tomcat-7.0.65.tar.gz  bin  etc  games  include  java  lib  lib64  libexec  local  sbin  share  src  tmp
[root@iZwe13xjwyedbm0tjgmez1Z usr]#  tar -zxvf apache-tomcat-7.0.65.tar.gz
apache-tomcat-7.0.65/bin/catalina.sh
apache-tomcat-7.0.65/bin/configtest.sh
apache-tomcat-7.0.65/bin/daemon.sh
.
.
.
apache-tomcat-7.0.65/webapps/manager/index.jsp
apache-tomcat-7.0.65/webapps/manager/status.xsd
apache-tomcat-7.0.65/webapps/manager/xform.xsl
[root@iZwe13xjwyedbm0tjgmez1Z usr]# ls
apache-tomcat-7.0.65  apache-tomcat-7.0.65.tar.gz  bin  etc  games  include  java  lib  lib64  libexec  local  sbin  share  src  tmp
[root@iZwe13xjwyedbm0tjgmez1Z usr]# 
```

##### 2.2 删除安装包，并重命名解压后的文件夹为tomcat
```
[root@iZwe13xjwyedbm0tjgmez1Z usr]# rm -fr apache-tomcat-7.0.65.tar.gz 
[root@iZwe13xjwyedbm0tjgmez1Z usr]# mv apache-tomcat-7.0.65/ tomcat
[root@iZwe13xjwyedbm0tjgmez1Z usr]# ls
bin  etc  games  include  java  lib  lib64  libexec  local  sbin  share  src  tmp  tomcat
[root@iZwe13xjwyedbm0tjgmez1Z usr]# 
```

##### 2.3 启动tomcat
执行startup.sh启动tomcat，如下表示启动成功：
```
[root@izwe12zdi799668qfxdm5oz tomcat]# bin/startup.sh 
Using CATALINA_BASE:   /usr/tomcat
Using CATALINA_HOME:   /usr/tomcat
Using CATALINA_TMPDIR: /usr/tomcat/temp
Using JRE_HOME:        /usr/java/jdk1.7.0_80/jre
Using CLASSPATH:       /usr/tomcat/bin/bootstrap.jar:/usr/tomcat/bin/tomcat-juli.jar
Tomcat started.
[root@izwe12zdi799668qfxdm5oz tomcat]# 
```

##### 2.4 查看log信息
```
[root@izwe12zdi799668qfxdm5oz tomcat]# tail -f logs/catalina.out
Aug 11, 2017 12:29:19 PM org.apache.catalina.startup.HostConfig deployDirectory
INFO: Deploying web application directory /usr/tomcat/webapps/ROOT
Aug 11, 2017 12:29:19 PM org.apache.catalina.startup.HostConfig deployDirectory
INFO: Deployment of web application directory /usr/tomcat/webapps/ROOT has finished in 39 ms
Aug 11, 2017 12:29:19 PM org.apache.coyote.AbstractProtocol start
INFO: Starting ProtocolHandler ["http-bio-8080"]
Aug 11, 2017 12:29:19 PM org.apache.coyote.AbstractProtocol start
INFO: Starting ProtocolHandler ["ajp-bio-8009"]
Aug 11, 2017 12:29:19 PM org.apache.catalina.startup.Catalina start
INFO: Server startup in 77809 ms
```

##### 2.5 防火墙开放8080端口
打开防火墙配置文件：
```
[root@izwe12zdi799668qfxdm5oz tomcat]# vi /etc/sysconfig/iptables
```
> 部分系统没有iptables文件，请参考[CentOS使用iptables](http://yangpiena.coding.me/2017/08/11/%E3%80%90Linux%E3%80%91CentOS%E4%BD%BF%E7%94%A8iptables/)

增加以下代码：

	-A INPUT -m state --state NEW -m tcp -p tcp --dport 8080 -j ACCEPT
重启防火墙
```
[root@izwe12zdi799668qfxdm5oz tomcat]# service iptables restart
```

##### 2.6 访问tomcat
在浏览器访问地址：http://IP:8080

##### 2.7 停止tomcat
```
[root@izwe12zdi799668qfxdm5oz tomcat]# bin/shutdown.sh 
Using CATALINA_BASE:   /usr/tomcat
Using CATALINA_HOME:   /usr/tomcat
Using CATALINA_TMPDIR: /usr/tomcat/temp
Using JRE_HOME:        /usr/java/jdk1.7.0_80/jre
Using CLASSPATH:       /usr/tomcat/bin/bootstrap.jar:/usr/tomcat/bin/tomcat-juli.jar
[root@izwe12zdi799668qfxdm5oz tomcat]# 
```

---

### Tomcat设置服务

#### 1. Windows下
##### 1.1 修改\bin目录中的service.bat

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

##### 1.2 运行cmd打开控制台，进入解压后的Tomat的/bin目录下，运行`service.bat install`命令
```
D:\Program Files\tomcat6.0.35\bin>service.bat install
Installing the service  'tomcat6.0' ...
Using CATALINA_HOME:    "D:\Program Files\tomcat6.0.35"
Using CATALINA_BASE:    "D:\Program Files\tomcat6.0.35"
Using JAVA_HOME:        "D:\Program Files\Java\jdk1.6.0_30"
Using JVM:              "D:\Program Files\Java\jdk1.6.0_30\jre\bin\server\jvm.dll"
The service 'tomcat6.0' has been installed.
```
程序提示：The service 'tomcat6.0（你修改以后的SERVICE_NAME）' has been installed说明服务Tomcat已经被安装成功。相应的，运行`service.bat remove`可以移除服务。

##### 1.3 到这里，服务添加成功，运行services.msc，可以看到添加的服务，默认状态下该服务是手动运行的，在它的属性中，将启动类型更改为"自动"，以后机器启动以后Tomcat就在后台启动了。

---

#### 2. Linux下
##### 2.1 在~目录下，执行下面命令
```
vim .bash_profile
```

##### 2.2 在.bash_profile文件中定义TOMCAT_HOME变量，并将变量追加到PATH后面，效果如下：
		# .bash_profile

		# Get the aliases and functions
		if [ -f ~/.bashrc ]; then
		        . ~/.bashrc
		fi

		# User specific environment and startup programs

		TOMCAT_HOME=/usr/tomcat
		PATH=$PATH:$HOME/bin:$TOMCAT_HOME/bin

		export TOMCAT_HOME
		export PATH
保存并退出。

##### 2.3 执行下面命令，使立即生效
```
source ./.bash_profile
```

##### 2.4 执行下面命令，在tomcat的bin目录下创建脚本文件，
```
vim /usr/tomcat/bin/tomcat
```
在文件中写入如下代码，保存并退出。
		#!/bin/bash
		# /usr/tomcat/bin
		# YPN 2017-08-21 Create

		if [ "$1"x = "start"x ]; then
		  exec $TOMCAT_HOME/bin/startup.sh
		fi
		if [ "$1"x = "stop"x ]; then
		  exec $TOMCAT_HOME/bin/shutdown.sh
		fi
		if [ "$1"x = "log"x ]; then
		  tail -f $TOMCAT_HOME/logs/catalina.out -n 1000
		fi

##### 2.5 给文件添加权限，使脚本文件可以执行，命令为
```
chmod 755 /usr/tomcat/bin/tomcat
```

##### 2.6 最后，执行下面命令可启动、关闭tomcat，或查看日志
启动：
```
tomcat start
```
关闭：
```
tomcat stop
```
查看日志：
```
tomcat log
```

---

### Tomcat设置开机启动（Linux）
打开linux设置开启启动的文件，将下面的配置文件写入此文件的最后
```
vim /etc/rc.d/rc.local
```
配置文件：

	export JAVA_HOME=/usr/java/jdk1.7.0_80
	export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
	export PATH=$PATH:$JAVA_HOME/bin
	export CATALINA_HOME=/usr/tomcat/
	#tomcat自启动
	/usr/tomcat/bin/startup.
tomcat依赖于java的jdk，所以设置的时将jdk也同步导入。至此配置完成。