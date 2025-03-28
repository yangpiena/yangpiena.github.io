---
title: MySQL安装配置
author: 昜丿捺
copyright: true
categories: 技术
timestamp: 1604826334
date: 2020-11-08 17:05:34
authorDesc:
tags: [MySQL, 安装配置]
description: 本教程主要记录MySQL如何安装使用
---
# 下载
官网下载：https://dev.mysql.com/downloads/mysql/
进入下载页面后，默认显示最新版，我们一般选择的是 MySQL Community Server 社区版本，是官方免费提供使用的。也可点击右侧的`Looking for previous GA versions?`选择下载其它版本。

# 安装

## 安装版
1. 本教程选择的是64位版本：`mysql-installer-community-5.7.32.0.msi`
2. 选择 'Custom' 安装
3. 根据操作系统的版本选择32位或64位，且后续软件也必须保持统一。
4. 选中你要安装的数据库版本，点击右下角显示出来的 `Advanced Options` ，在弹出窗口设置软件安装位置和数据目录，建议放到D盘。
5. 此时会检查MySQL运行需要的一些基础支持，如：`Microsoft Visual C++ 2013 Redistributable(x64)`
6. 后面的步骤按默认安装即可。

## 绿色版
### 选择版本
本教程选择版本为：`mysql-5.7.32-winx64.zip`
### 解压缩
解压缩下载的zip包到指定安装目录，如：`C:\YPN\mysql-5.7.32-winx64`
### 配置环境变量
1. 在系统变量中新建变量`MYSQL_HOME`，输入 MySQL 解压缩后文件夹的目录，如：
变量名：
```
MYSQL_HOME
```
	变量值：
```
C:\YPN\mysql-5.7.32-winx64
```
2. 在系统变量中找到`Path`变量，点击编辑，在最后加上：
```
;%MYSQL_HOME%\bin
```
### 配置my.ini文件
1. 进入安装目录 `C:\YPN\mysql-5.7.32-winx64`，新建 `my.ini` 文件。
2. 打开 `my.ini` 文件，输入以下配置内容：
```
[mysql]  
# 设置 mysql 客户端默认字符集  
default-character-set=utf8 
 
[mysqld]  
#设置 3306 端口  
port = 3306  

# 设置 mysql 的安装目录  
basedir=C:\YPN\mysql-5.7.32-winx64

# 设置 mysql 数据库的数据的存放目录  
datadir=C:\YPN\mysql-5.7.32-winx64\data 

# 允许最大连接数  
max_connections=200  

# 服务端使用的字符集默认为 8 比特编码的 latin1 字符集  
character-set-server=utf8  

# 创建新表时将使用的默认存储引擎  
default-storage-engine=INNODB
```
	其中内容中的 `basedir` 和 `datadir` 是解压缩后的指定安装目录，注意 `datadir` 后面要增加 **`data`**。

### 建立默认数据库
1. 以管理员方式打开cmd，进入安装目录：
```
cd C:\YPN\mysql-5.7.32-winx64\bin
```
2. 执行下面命令新建 `data` 文件夹：
```
mysqld --initialize-insecure --user=mysql
```
	执行完成之后会在指定目录下生成一个 data 文件夹，此时 MySQL 建立了默认的数据库，用户名为 `root`，密码为空。

### 安装服务
在安装目录下，执行下面语句安装：
```mysql
mysqld -install
```
第一次安装的话会显示 "Service successfully installed."
如果已经安装过了，会显示"The service already exists!"
如果需要移除服务，执行下面命令：
```
mysqld -remove
```

### 配置MySQL
1. 启动服务
通过系统服务启动，或执行下面命令执行：
```
net start mysql
```
2. 登录MySQL
执行下面命令登录：
```
mysql -u root -p
```
	-u 指的是登录的用户名，-p 是密码，因为是默认安装的数据库，此时密码为空，提示输入密码时直接回车即可。
3. 设置密码
```
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
```
	其中 `new_password` 为新密码，注意结尾必须有分号：`;` 。设置完成后即可使用了。
4. 退出MySQL
```
quit
```
5. 停止服务
```
net stop mysql
```

# 使用
查看所有数据库：
```
show databases;
```
新建数据库：
```
CREATE DATABASE new_database;
```
使用数据库：
```
use new_database;
```
查看当前数据库下所有表：
```
show tables;
```
新建表：
```
CREATE TABLE new_table()
```
> 如：`CREATE TABLE book(name char(20),author char(20));`

查看表：直接写 select 语句即可。
删除表：
```
DROP TABLE new_table
```

# 备份
## Windows下
1. 编写bat脚本
```
@echo off
set "Ymd=%date:~,4%%date:~5,2%%date:~8,2%"
cd C:\Program Files\MySQL\MySQL Server 5.7\bin\
mysqldump --opt -u root --password=root --host=127.0.0.1 --port=3306 --default-character-set=utf8 new_database > C:\YPN\MYSQLDATAAUTOBACKUP\new_database_backup_%Ymd%.sql
@echo on
```
	其中，先进入MySQL安装目录bin下，执行`mysqldump`命令即可，具体参数如下：
	
		--user      用户名                   
		--password  密码                     
		--host      地址                      
		--port      端口                      
		--default-character-set  字符编码              
		--all-databases          备份整个数据库        
		--databases new_database 备份指定数据库            
		new_database new_table   备份指定数据库的指定表    
		new_database new_table1 new_table2  备份指定数据库的多个指定表
	
2. 设置Windows定时任务


## Linux下

1. 新建目录
```
mkdir -p /data/mysqlbak/data
mkdir -p /data/mysqlbak/scripts
mkdir -p /data/mysqlbak/logs
```
2. 创建备份脚本
```
cd /data/mysqlbak/scripts
```
	```
	vim backup.sh
	```
	```
	#!/bin/bash

	#备份目录
	BACKUP_ROOT=/data/mysqlbak
	BACKUP_FILEDIR=$BACKUP_ROOT/data

	#当前日期
	DATE=$(date +%Y%m%d)

	######备份######

	#查询所有数据库
	#-uroot -p123456表示使用root账号执行命令，且root账号的密码为:123456
	DATABASES=$(mysql -uroot -p123456 -e "show databases" | grep -Ev "Database|sys|information_schema|performance_schema|mysql")
	#循环数据库进行备份
	for db in $DATABASES
	do
	echo
	echo ----------$BACKUP_FILEDIR/${db}_$DATE.sql.gz BEGIN----------
	mysqldump -uroot -p123456 --default-character-set=utf8 -q --lock-all-tables --flush-logs -E -R --triggers -B ${db} | gzip > $BACKUP_FILEDIR/${db}_$DATE.sql.gz
	echo ----------$BACKUP_FILEDIR/${db}_$DATE.sql.gz COMPLETE----------
	echo
	done

	echo "done"
	```
3. 设置脚本的执行权限
```
chmod 777 backup.sh
```
4. 将备份操作加入到定时任务(每天凌晨2点定时执行)
```
crontab -e
```
	```
	00 2 * * * /data/mysqlbak/scripts/backup.sh > /data/mysqlbak/logs/backup.log 2>&1
	```
	> 如果执行脚本出现异常：`/data/mysqlbak/scripts/backup.sh: line 14: mysql: command not found`
	解决办法：
		1、查找mysql安装路径
		find / -name mysql
		通常mysql安装路径在:/usr/local/mysql/bin/mysql
		2、mysql:command not found 建立软连接
		ln -s  /usr/local/mysql/bin/mysql  /usr/bin
		3、mysqldump:command not found 建立软连接
		ln -s  /usr/local/mysql/bin/mysqldump  /usr/bin
5. 创建删除脚本(定时删除7天前的备份数据)
```
vim backup_clean.sh
```
	```
	#!/bin/bash
	echo ----------CLEAN BEGIN----------
	find /data/mysqlbak/data -mtime +7 -name "*.gz" -exec rm -rf {} \;
	echo ----------CLEAN COMPLETE----------
	```
6. 设置脚本的执行权限
```
chmod 777 backup_clean.sh
```
7. 将删除操作加入到定时任务(每天凌晨1点定时执行)
```
00 1 * * * /data/mysqlbak/scripts/backup_clean.sh > /data/mysqlbak/logs/backup_full_clean.log 2>&1
```
8. 最后查看定时任务
```
crontab -l
```
	> 如果需要备份到另外一台机器，可以备份完scp到另外一台机器，具体内容参考[Linux下Mysql每天自动备份](https://www.cnblogs.com/blazeZzz/p/10881297.html)


# 恢复
1. 以管理员方式打开cmd，进入MySQL安装目录bin下：
```
cd C:\Program Files\MySQL\MySQL Server 5.7\bin\
```
2. 进入MySQL
```
mysql -u root -p
```
	按照提示输入密码。
3. 查看数据库列表
```
show databases;
```
	注意命令后面的分号。
4. 选择要恢复的数据库
```
use xxx;
```
5. 执行恢复命令
```
source C:\YPN\MYSQLDATAAUTOBACKUP\new_database_backup_20201109.sql
```
	路径中不能有空格。