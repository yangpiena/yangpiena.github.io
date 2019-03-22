---
title: Linux共享目录和远程挂载
layout: post
comments: true
date: 2018-04-11 22:31:31
categories: 技术
tags:
keywords:
description:
---
## 共享目录
### 1. 编辑并添加共享目录配置 
```
vi /etc/samba/smb.conf
```
添加内容格式如下：

	[xxFileServer]
	        path = /filedisk/xxFileServer
	        guest ok = yes
	        writable = yes
	        read only = No
	        create mask = 0777
	        directory mask = 0777

### 2. 给共享目录设置相应的权限 
```
chmod -R 777 /filedisk/xxFileServer
```

### 3. 重启共享服务
```
service smb restart
```

### 4. 设置开机启动共享服务 
```
chkconfig --level 5 smb on
```

<!-- more -->

---

## 远程挂载
### 1. 创建本地目录
```
mkdir /var/xxFileServer
```

### 2. 挂载远程目录
```
mount //IP/xxFileServer /var/xxFileServer -o username=用户名,password=密码
```
