---
title: 【Linux】CentOS使用iptables
layout: post
comments: true
date: 2017-08-11 14:35:35
categories: OS
tags: [Linux]
keywords:
description:
---
### CentOS 6.x
##### 1. 任意运行一条iptables防火墙规则配置命令
```
iptables -P OUTPUT ACCEPT
```
##### 2. 对iptables服务进行保存
```
service iptables save
```
##### 3. 重启iptables服务
```
service iptables restart
```
<!--more-->

---

### CentOS 7.x
##### 1. 关闭firewall
停止firewall服务：
```
systemctl stop firewalld.service
```
禁止firewall开机启动：
```
systemctl disable firewalld.service
```

##### 2. 安装iptables防火墙
执行yum命令安装：
```
yum install iptables-services
```
编辑防火墙配置文件：
```
vi /etc/sysconfig/iptables
```
在配置文件加入以下内容后，保存并退出：

	# sample configuration for iptables service
	# you can edit this manually or use system-config-firewall
	# please do not ask us to add additional ports/services to this default configuration
	*filter
	:INPUT ACCEPT [0:0]
	:FORWARD ACCEPT [0:0]
	:OUTPUT ACCEPT [0:0]
	-A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
	-A INPUT -p icmp -j ACCEPT
	-A INPUT -i lo -j ACCEPT

	-A INPUT -p tcp -m state --state NEW -m tcp --dport 22 -j ACCEPT
	-A INPUT -p tcp -m state --state NEW -m tcp --dport 21 -j ACCEPT
	-A INPUT -p tcp -m state --state NEW -m tcp --dport 20 -j ACCEPT
	-A INPUT -m state --state NEW -m tcp -p tcp --dport 80  -j ACCEPT
	-A INPUT -m state --state NEW -m tcp -p tcp --dport 3306 -j ACCEPT

	-A INPUT -j REJECT --reject-with icmp-host-prohibited
	-A FORWARD -j REJECT --reject-with icmp-host-prohibited
	COMMIT
最后重启防火墙使配置生效
```
systemctl restart iptables.service
```

##### 3. 设置防火墙开机启动
```
systemctl enable iptables.service
```

##### 4. 关闭SELinux
编辑SELinux的配置文件：
```
vi /etc/selinux/config
```
如下图，注释掉`SELINUX=enforcing`和`SELINUXTYPE=targeted`。

	# This file controls the state of SELinux on the system.
	# SELINUX= can take one of these three values:
	#     enforcing - SELinux security policy is enforced.
	#     permissive - SELinux prints warnings instead of enforcing.
	#     disabled - No SELinux policy is loaded.
	SELINUX=disabled
	# SELINUXTYPE= can take one of three two values:
	#     targeted - Targeted processes are protected,
	#     minimum - Modification of targeted policy. Only selected processes are protected.
	#     mls - Multi Level Security protection.
	#SELINUXTYPE=targeted
最后执行以下命令，使配置立即生效
```
setenforce 0
```