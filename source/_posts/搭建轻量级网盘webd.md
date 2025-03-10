---
title: 搭建轻量级网盘webd
author: 昜丿捺
copyright: true
categories: 技术
timestamp: 1577434580
date: 2019-12-27 16:16:20
authorDesc:
tags: [Linux, webd]
description:
---
## 搭建环境

#### 1. 网盘软件 webd
webd 轻量级(self-hosted)自建网盘软件程序仅 60 ~ 90 KB，含 server 端，无其它依赖，速度快资源占用低，纯便携软件，解压即用。支持 Windows、Linux、OpenWrt、Armbian界面简洁易用，无繁琐设置，支持移动设备。

[官网](https://webd.cf/)
[下载地址](https://webd.cf/latest/)

<!-- more -->

#### 2. 服务器环境
本次使用服务器环境为 SUSE Linux Enterprise Server 12


## 搭建步骤

#### 1. 首先设定安装包变量
```
pkg=webd-linux-x86_64.tar.gz
cd /tmp
wget http://webd.cf/latest/${pkg}
tar -xzvf ${pkg}
cp -fv webd/webd /usr/bin/
cp -fv webd/webd.conf /etc/
rm -rf /tmp/webd /tmp/${pkg} # 删除无用的残留文件
```
#### 2. 假设要把硬盘挂载目录 /fileDisk/webdRoot 当作网盘目录
```
mkdir -pv mkdir -p /fileDisk/webdRoot/.Trash # 创建回收站文件夹，否则不能删除文件
```
#### 3. 根据官网 [配置文件] 环节的说明编辑 /etc/webd.conf
设置 Webd.Root 为 /fileDisk/webdRoot 以及设置用户名密码权限等。

#### 4. 修改防火墙配置，添加端口（默认端口9212）
```
vim /etc/sysconfig/SuSEfirewall2
rcSuSEfirewall2 restart
```

#### 5. 添加开机脚本, 注意不要漏掉引号
```
echo "/usr/bin/webd &>/dev/null &" >> /etc/init.d/boot.local
```

#### 6. 重启生效
```
reboot
```


## 使用
局域网内访问 http://IP:9212 即可。