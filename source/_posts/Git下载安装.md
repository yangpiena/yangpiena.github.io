---
title: Git下载安装
layout: post
comments: true
date: 2018-12-19 15:49:38
categories: 技术
authorDesc: 
tags: [Git]
top: 
description: 
---
## Windows平台
### Git[官网下载](https://www.git-scm.com/download/)


<!-- more -->


---


## Linux平台
### 一. 源码安装（以SUSE Linux 12为例）
#### 1. [源码下载](https://github.com/git/git/releases)

#### 2. 编译安装
```
tar -zxf git-2.20.1.tar.gz 
cd git-2.20.1/
make configure
./configure --prefix=/usr/local
make all doc info
sudo make install install-doc install-html install-info
```
执行命令：`make all doc info` 报如下错误：

		* new build flags
		CC fuzz-pack-headers.o
	In file included from packfile.h:4:0,
					 from fuzz-pack-headers.c:1:
	cache.h:20:18: fatal error: zlib.h: No such file or directory
	 #include <zlib.h>
					  ^
	compilation terminated.
	Makefile:2302: recipe for target 'fuzz-pack-headers.o' failed
	make: *** [fuzz-pack-headers.o] Error 1
原因是需要安装依赖包：[zlib-devel](http://rpm.pbone.net/index.php3/stat/4/idpl/30389149/dir/opensuse/com/zlib-devel-1.2.8-5.22.x86_64.rpm.html)
```
rpm -ivh zlib-devel-1.2.8-5.22.x86_64.rpm
```
之后便可继续安装了。

#### 3. 执行命令：`git --version`，得到如下结果表示安装成功。

	git version 2.20.1