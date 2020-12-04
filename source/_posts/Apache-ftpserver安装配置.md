---
title: Apache ftpserver安装配置
author: 昜丿捺
copyright: true
layout: post
comments: true
date: 2018-04-10 12:11:26
categories: 技术
tags: [FTP, 安装配置]
description:
---
### apache ftpserver下载
[官网下载](http://mina.apache.org/ftpserver-project/downloads.html)

<!-- more -->

---

### apache ftpserver安装
#### 1. Linux下
##### 1.1 下载
进入下载目录，使用wget下载，如果已离线下载成功，则跳过该步，直接上传安装包到下载目录即可
```
cd /usr/download/
wget http://mirrors.shu.edu.cn/apache/mina/ftpserver/1.1.1/dist/apache-ftpserver-1.1.1.tar.gz
```

##### 1.2 解压
```
tar -zxvf apache-ftpserver-1.1.1.tar.gz
```

##### 1.3 安装
```
mv apache-ftpserver-1.1.1 /usr/local/ftpserver
```

##### 1.4 修改配置文件
```
cd /usr/local/ftpserver/res/conf/
vim users.properties
```
users.properties文件存放的是用户名及密码权限等配置信息，通过修改该文件来添加和管理用户及权限等信息。参考下面内容配置：

	#用户名为anonymous，密码为空
	tpserver.user.anonymous.userpassword=
	#主目录
	ftpserver.user.anonymous.homedirectory=./res/home
	#当前用户可用
	ftpserver.user.anonymous.enableflag=true
	#具有上传权限
	ftpserver.user.anonymous.writepermission=true
	#最大登陆用户数为20，0为不限
	ftpserver.user.anonymous.maxloginnumber=20
	#同IP登陆用户数为2，0为不限
	ftpserver.user.anonymous.maxloginperip=2 
	#空闲时间为300秒，0为不限
	ftpserver.user.anonymous.idletime=300
	#上传速率限制为48字节每秒，0为不限
	ftpserver.user.anonymous.uploadrate=4800
	#下载速率限制为48字节每秒，0为不限
	ftpserver.user.anonymous.downloadrate=4800

```
vim ftpd-typical.xml
```
修改配置文件ftpd-file.xml，增加encrypt-passwords="clear"，将密码加密方式修改为clear，默认为MD5加密方式。
	
	<?xml version="1.0" encoding="UTF-8"?>
	<server xmlns="http://mina.apache.org/ftpserver/spring/v1"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://mina.apache.org/ftpserver/spring/v1 http://mina.apache.org/ftpserver/ftpserver-1.0.xsd"
        id="myServer" max-logins="999999" max-threads="9999" anon-enabled="true" max-anon-logins="10">
		<!-- anon-enabled 表示是否开通匿名访问；max-anon-logins 表示匿名访问的数量限制-->
        <listeners>
                <nio-listener name="default" port="21">
                    <ssl>
                        <keystore file="./res/ftpserver.jks" password="password" />
                    </ssl>
					<!--设置多少时间后关闭一个闲置的链接，单位是秒-->
					<data-connection idle-timeout="1">
						<!--设置主动链接配置，端口号“2120”-->
						<!--<active local-port="2120"/>-->
						
						<!--设置被动链接配置，端口设置为“2120”，或者开通更多端口“2120-3120”，扩展地址为“0.0.0.0”。当客户端连接时，服务器使用 0.0.0.0:2120-3120 为客户端提供数据传输服务。-->
						<passive ports="2120-3120" address="0.0.0.0" external-address=""/>
					</data-connection>
                </nio-listener>
        </listeners>
        <file-user-manager file="./res/conf/users.properties" encrypt-passwords="clear" />
	</server>


##### 1.5 启动
在ftpserver目录下，执行命令：
* 方式一：
```
sh  bin/ftpd.sh  /res/conf/ftpd-typical.xml
```
此方式有局限，当命令窗口退出时，FTP服务停止。
* 方式二：
```
nohup ./bin/ftpd.sh res/conf/ftpd-typical.xml &
```
此方式为后台启动FTP服务，服务一直启动，不管窗口是否退出。
* 方式三：
```
nohup sh   apache-ftpserver-1.0.6/bin/ftpd.sh   /res/conf/ftpd-typical.xml > ftplog/`date '+%Y%m%d'`ftp.log  > /dev/null   2>&1  &
```
方式一、二无法启动时，可用此种方式。

##### 1.5 测试
在浏览器输入ftp://IP:21后，输入用户名，密码，可以登录ftp目录。

---

### Suse Linux Enterprise 12下实现脚本启动和关闭
#### 1. 在~目录下，执行下面命令
```
vim .profile
```

#### 2. 在.profile文件中定义FTPSERVER_HOME变量，并将变量追加到PATH后面，效果如下：
	export RC_LANG=zh_CN.UTF-8
	export FTPSERVER_HOME=/usr/local/ftpserver
	export PATH=$PATH:$FTPSERVER_HOME
保存并退出。

#### 3. 执行下面命令，使立即生效
```
source ~/.profile
```

#### 4. 执行下面命令，在FTPSERVER_HOME目录下创建脚本文件，
```
vim /usr/local/ftpserver/ftpserver
```
在文件中写入如下代码，保存并退出。

	#!/bin/bash
	# /usr/local/ftpserver
	# YPN 2018-04-11 Create

	if [ "$1"x = "start"x ]; then
	  nohup /usr/local/ftpserver/bin/ftpd.sh res/conf/ftpd-typical.xml 1>/usr/local/ftpserver/res/log/ftpd.log 2>&1 &
	fi
	if [ "$1"x = "stop"x ]; then
	  kill $(ps aux|grep "ftpserver" | grep -v grep |awk '{print $2}')
	fi
	if [ "$1"x = "check"x ]; then
	  ps -aux|grep "ftpserver" | grep -v grep
	fi
	if [ "$1"x = "log"x ]; then
	  tail -f /usr/local/ftpserver/res/log/ftpd.log -n 1000
	fi

#### 5. 给文件添加权限，使脚本文件可以执行，命令为
```
chmod 755 /usr/local/ftpserver/ftpserver
```

#### 6. 最后，执行下面命令可启动、关闭ftpserver或查看日志
启动：
```
ftpserver start
```
关闭：
```
ftpserver stop
```
查看日志：
```
ftpserver log
```
检查ftpserver进程：
```
ftpserver check
```

#### 7. 随系统自启动
打开linux设置开启启动的文件，将下面的配置写入此文件的最后：
```
vim /etc/rc.d/after.local
```
配置：
```
# 启动ftpserver服务
nohup /usr/local/ftpserver/bin/ftpd.sh res/conf/ftpd-typical.xml 1>/usr/local/ftpserver/res/log/ftpd.log 2>&1 &
```