---
title: CentOS网络连接system eth0不可用解决办法
layout: post
comments: true
date: 2018-02-13 10:41:43
categories: 技术
tags: [Linux]
keywords:
description:
---
### CentOS 6.x
VMware克隆CentOS 6导致网络连接system eth0不可用的解决办法

<!-- more -->

###### 1. 打开下面文件，注释掉原eth0，将eth1改为eth0

		vim /etc/udev/rules.d/70-persistent-net.rules

一般能看到eth0、eth1两个配置规则，注释掉NAME="eth0"的配置规则，将另一个配置规则的NAME="eth1"改成NAME="eth0"。

###### 2. 将改后eth0的ATTR{address}=="00:50:56:a9:4c:f9"中的网卡地址修改到下面文件

	vim /etc/sysconfig/network-scripts/ifcfg-eth0

保存到HWADDR="00:50:56:a9:4c:f9"处。