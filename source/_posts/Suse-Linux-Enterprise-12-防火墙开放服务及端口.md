---
title: Suse Linux Enterprise 12 防火墙开放服务及端口
layout: post
comments: true
date: 2018-02-01 17:06:18
categories: 技术
tags: [Linux]
keywords:
description:
---

### 一、图形化界面方式
#### 1. 使用以下命令进入防火墙
```
sudo yast2
```
然后选择Security and Users -> Firewall，或用下面命令直接进入Firewall
```
yast2 firewall
```

<!-- more -->

#### 2. 开放服务
选择Allowed Services -> Add，可以添加如ssh, http, https等服务。
#### 3. 开放端口
选择右下角的Advanced...，然后填写要开放的端口，多个端口之间用空格隔开。
#### 4. 保存设置重启防火墙使生效
选择Save Settings and Restart Firewall Now即可。

---

### 二、命令方式
#### 1. 修改防火墙配置
```
vim /etc/sysconfig/SuSEfirewall2
```
在文件中找到FW_SERVICES_EXT_TCP，在其后面加上服务名或者是服务对应的端口，如SSH,FW_SERVICES_EXT_TCP=”ssh” 或 FW_SERVICES_EXT_TCP=”22″
如果要开放多个端口则为 FW_SERVICES_EXT_TCP=”22 80 8090″
最后，保存退出。
#### 2. 重启防火墙使生效
```
rcSuSEfirewall2 restart
```
#### 3. 查看防火墙状态
```
rcSuSEfirewall2 status
```
#### 4. 关闭防火墙
```
systemctl stop SuSEfirewall2.service
```
#### 5. 取消开机启动防火墙
```
systemctl disable SuSEfirewall2.service
```
#### 6. 开启防火墙
```
systemctl start SuSEfirewall2.service
```
#### 7. 开机启动防火墙
```
systemctl enable SuSEfirewall2.service
```