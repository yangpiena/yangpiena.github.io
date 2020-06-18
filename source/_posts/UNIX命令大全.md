---
title: UNIX命令大全
author: 昜丿捺
categories: 技术
timestamp: 1586483535
date: 2020-04-10 09:52:15
authorDesc:
tags: [UNIX, 命令]
description:
---
### 1. root登陆
一般系统不允许root登陆 ，可以用另一个用户登陆后再用 su 切换到root用户
如：

	zhgj-dc-/tmp/108434-17> su #回车
	Password:   #输入密码 成了root登陆了

<!-- more -->

### 2. solaris补丁的安装
solaris的补丁分为两类，一类是Point补丁，另一类是Cluster补丁

	ls /var/sadm/patch #查看安装的补丁	
patchadd用来安装解压缩后的补丁程序。patchadd通过调用pkgadd 命令来安装补丁。安装补丁前，我们需要将补丁解压到/var/tmp下安装。安装补丁如下命令： 

	cd /var/tmp
	patchadd 110668-04
同样，solaris提供了另一命令来查看已安装的patch：

	showrev -p
补丁的卸载用pkgrm 命令

### 3. cp

	cp <源文件> <目的文件> 
相当于DOS的copy,和DOS的copy不一样的是,必须指定源文件名和目的文件名.cp -r <源文件> <目的文件> 相当于DOS的xcopy,带子目录的拷贝.例如:cp file1 file2 将文件 file1 复制成 file2 

	cp file1 dir1 将文件 file1 复制到目录 dir1 下,文件名仍为 file1. 
	cp -r /tmp/file1 . 将目录 /tmp 下的文件 file1 复制到当前目录下，文件名仍为 file1。 注意有个.
	cp /tmp/file1 file2 将目录 /tmp 下的文件 file1 复制到现行目录下，文件名为 file2 
	cp -r dir1 dir2 复制整个目录。若目录 dir2 已经存在，则将目录 dir1，及其所有文件和子目录，复制到目录 dir2 下，新目录名称为 dir1，即dir2/dir1。若目录 dir2 不存在，则将dir1，及其所有文件和子目录，复制为目录 dir2。 

### 4. ftp命令

	ftp ip	
输入用户名 
输入密码

	bi（改成2进制）
	get 文件名 #下载文件

### 5. 查看磁盘空间

	df -k
保证以下几个磁盘分区的使用率最多不超过60％：

	/opt，/var，/tmp
如果发现使用率过高的磁盘，在相应目录下执行命令：

	du -k
找出大的文件和目录，对无用的文件执行删除操作。

### 6. 打包、压缩、解压

.tar

	解包：tar -xvf FileName.tar
	打包：tar -cvf FileName.tar DirName（打包目录）
（注：tar是打包，不是压缩！）

.Z

	解压：uncompress FileName.Z
	压缩：compress FileName

.zip

	解压：unzip FileName.zip
	压缩：zip FileName.zip DirName

.gz

	解压1：gunzip FileName.gz
	解压2：gzip -d FileName.gz
	压缩：gzip FileName.tar.gz
	解压：tar zxvf FileName.tar.gz
	压缩：tar zcvf FileName.tar.gz DirName

.bz2

	解压1：bzip2 -d FileName.bz2
	解压2：bunzip2 FileName.bz2
	压缩： bzip2 -z FileName.tar.bz2
	解压：tar jxvf FileName.tar.bz2
	压缩：tar jcvf FileName.tar.bz2 DirName

.bz

	解压1：bzip2 -d FileName.bz
	解压2：bunzip2 FileName.bz
	压缩：未知.tar.bz
	解压：tar jxvf FileName.tar.bz
	压缩：未知

.tar.Z

	解压：tar Zxvf FileName.tar.Z
	压缩：tar Zcvf FileName.tar.Z DirName

.tgz

	解压：tar zxvf FileName.tgz
	压缩：未知.tar.tgz
	解压：tar zxvf FileName.tar.tgz
	压缩：tar zcvf FileName.tar.tgz FileName

.rar

	解压：rar a FileName.rar
	压缩：r ar e FileName.rar

### 7. 创建文件

	mkdir aa #建立aa文件夹（目录）

### 8. 进informix 数据库，查看数据库

	dbaccess 进入数据库 回车进入下一层 最底层退出点Esc 在点回车 退出 其选择exit
	dbaccess 确定将要备份的数据库名称：dbaccess回车 database 回车select 再回车可以看到所有数据库名称


