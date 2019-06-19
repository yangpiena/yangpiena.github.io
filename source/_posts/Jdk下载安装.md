---
title: Jdk下载安装
layout: post
comments: true
date: 2016-12-28 09:29:53
categories: 技术
tags: [JDK相关]
keywords:
description:
---
## JDK[官网下载](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
<!-- more -->

## JDK安装
### 1. Windows下
#### 1.1 安装
安装目录建议自定义为C:\Java下，其它按默认安装即可。
#### 1.2 配置环境变量
在系统变量里，
新建变量名：`JAVA_HOME`   	变量值：C:\Java\jdk1.7.0_80
编辑变量名：`Path`  		追加值：;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin
新建变量名：`CLASSPATH` 	变量值：.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar
>注意：在设置变量的末尾不要加上“；”）

#### 1.3 测试
设置完成之后我们需要测试，打开`运行`，输入`CMD`，在命令行上执行以下命令：

    java -version
如果出现以下内容，那么JDK配置成功，否则就需要检查环境变量的配置。

	java version "1.7.0_80"
	Java(TM) SE Runtime Environment (build 1.7.0_80-b15)
	Java HotSpot(TM) Client VM (build 24.80-b11, mixed mode, sharing)
### 2. Linux下
#### 2.1 在/usr/目录下创建java目录

    [root@izwe12zdi799668qfxdm5oz ~]# mkdir /usr/java
    [root@izwe12zdi799668qfxdm5oz ~]# cd /usr/java
    [root@izwe12zdi799668qfxdm5oz java]# 
#### 2.2 下载或拷贝jdk到java目录下，然后解压

    [root@izwe12zdi799668qfxdm5oz java]# ls
    jdk-7u80-linux-x64.gz
    [root@izwe12zdi799668qfxdm5oz java]# tar -zxvf jdk-7u80-linux-x64.gz 
    jdk1.7.0_80/
    jdk1.7.0_80/LICENSE
    jdk1.7.0_80/release
    jdk1.7.0_80/jre/
    .
    .
    .
    jdk1.7.0_80/db/NOTICE
    jdk1.7.0_80/README.html
    jdk1.7.0_80/THIRDPARTYLICENSEREADME.txt
    [root@izwe12zdi799668qfxdm5oz java]# ls
    jdk1.7.0_80  jdk-7u80-linux-x64.gz
    [root@izwe12zdi799668qfxdm5oz java]# 
> 安装包也可以使用命令`curl -O http://download.Oracle.com/otn-pub/java/jdk/7u80-b15/jdk-7u80-linux-x64.tar.gz `下载，这里我直接拷贝了已下载好的。

#### 2.3 设置环境变量

    [root@izwe12zdi799668qfxdm5oz java]# vi /etc/profile
在profile中最后的`done`和`unset i`之间添加如下内容:

	#set java environment
	JAVA_HOME=/usr/java/jdk1.7.0_80
	JRE_HOME=/usr/java/jdk1.7.0_80/jre
	CLASS_PATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib
	PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin
	export JAVA_HOME JRE_HOME CLASS_PATH PATH
添加后如下：

	[root@izwe12zdi799668qfxdm5oz java]# cat /etc/profile 
	.
	.
	.
	for i in /etc/profile.d/*.sh ; do
	    if [ -r "$i" ]; then
	        if [ "${-#*i}" != "$-" ]; then 
	            . "$i"
	        else
	            . "$i" >/dev/null
	        fi
	    fi
	done

	#set java environment
	JAVA_HOME=/usr/java/jdk1.7.0_80
	JRE_HOME=/usr/java/jdk1.7.0_80/jre
	CLASS_PATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib
	PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin
	export JAVA_HOME JRE_HOME CLASS_PATH PATH

	unset i
	unset -f pathmunge
	[root@izwe12zdi799668qfxdm5oz java]# 
再执行以下命令，使修改生效：

    [root@izwe12zdi799668qfxdm5oz java]# source /etc/profile
> 如果出现错误`-bash: TMOUT: readonly variable`，解决办法是编辑`vi /etc/profile`，然后修改TMOUT的值，或直接注释掉`#TMOUT=1800`

#### 2.4 测试
执行命令：

    java -version
出现如下，表示安装成功。

	java version "1.7.0_80"
	Java(TM) SE Runtime Environment (build 1.7.0_80-b15)
	Java HotSpot(TM) 64-Bit Server VM (build 24.80-b11, mixed mode)

### 3. 可能出现的错误信息
#### 3.1 `bash: ./java: cannot execute binary file`
出现这个错误的原因可能是在32位的操作系统上安装了64位的jdk，请检查jdk版本和Linux版本位数是否一致。
查看linux是32位还是64位系统用如下命令

    sudo uname --m
i686   //表示是32位
x86_64 // 表示是64位
#### 3.2 linux安装jdk后发现系统带有openjdk的处理
如下，java -version和javac -version会出现不一样版本：

    [root@ecs-d93d-0415186 java]# java -version 
    java version "1.7.0_151"
    OpenJDK Runtime Environment (rhel-2.6.11.0.el6_9-x86_64 u151-b00)
    OpenJDK 64-Bit Server VM (build 24.151-b00, mixed mode)
    
    [root@ecs-d93d-0415186 java]# javac -version
    javac 1.7.0_80
**解决办法：**切勿直接删除openjdk，这样会导致依赖于openjdk的软件出现异常。最好的解决办法是修改默认的jdk，把默认的openjdk改成刚新装的jdk：

    [root@ecs-d93d-0415186 java]# cd /usr/bin/
    [root@ecs-d93d-0415186 bin]# ln -s -f /usr/java/jdk1.7.0_80/jre/bin/java
    [root@ecs-d93d-0415186 bin]# ln -s -f /usr/java/jdk1.7.0_80/bin/javac