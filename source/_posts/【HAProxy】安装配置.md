---
title: 【HAProxy】安装配置
layout: post
comments: true
date: 2017-12-19 15:34:42
categories: HAProxy
tags: [HAProxy]
keywords:
description:
---
### HAProxy下载
[官网下载](https://www.haproxy.org/)
[Fossies下载](https://fossies.org/linux/misc/)
[官方文档](http://cbonte.github.io/haproxy-dconv/)

<!-- more -->

---

### HAProxy安装
#### 1. Linux下
##### 1.1 下载
进入下载目录，使用wget下载，如果已离线下载成功，则跳过该步，直接上传安装包到下载目录即可
```
cd /usr/download/
wget http://fossies.org/linux/misc/haproxy-1.8.1.tar.gz
```

##### 1.2 解压
```
tar -zxvf haproxy-1.8.1.tar.gz
```
##### 1.3 安装
```
cd haproxy-1.8.1
make TARGET=linux26 ARCH=x86_64 PREFIX=/usr/local/haproxy
make install PREFIX=/usr/local/haproxy
```
参数说明:
**TARGET=linux26**            # 指定对目标操作系统在编译的时候进行优化，可选择如下值之一：Generic, linux22, linux24, linux24e, linux26, solaris, freebsd, openbsd, Cygwin, custom。如果不确定目标系统，可以保留默认值generic。使用`uname -r`可查看内核，如：2.6.32-642.11.1.el6.x86_64，此时该参数就为linux26。
**ARCH=x86_64**               # 系统位数。指定ARCH值可强制编译生成针对一个特定系统架构的程序。通常用于在一个系统架构的平台上生成针对另一个不同架构平台的程序，比如在一个64位架构的目标系统上编译生成一个32位的程序。当前可选的值有：x86_64, i386, i486, i586, i686。
注：若选择上述其中的一个值，”-m32”或”-m64”会被添加到CFLAGS和LDFLAGS选项中。
**PREFIX=/usr/local/haprpxy** # 指定安装目录，默认为/usr/local，其他诸如文档之类的文件将会在PREFIX指定的相应目录下。例如/usr/local/haprpxy为haprpxy的安装路径。

> CentOS中无法使用make、make install命令，提示：make: command not found，此时需在线安装make和gcc。
> * 安装make
yum -y install gcc automake autoconf libtool make
> * 安装gcc
yum install gcc gcc-c++
>
> SUSE Linux Enterprise Server 12安装gcc
> 安装命令：zypper install gcc
> 如果出现如下错误：
> Failed to mount cd:///?devices=/dev/disk/by-id/ata-VMware_Virtual_IDE_CDROM_Drive_10000000000000000001 on /var/adm/mount/AP_0x63by2U: Mounting media failed (mount: no medium found on /dev/sr0)
> 意思就是要插入DVD，此时，如果是虚拟机，则选择编辑设置，指定系统的ISO镜像，然后勾选已连接，问题就解决了。

#### 2. Windows下
*暂无*

---

### HAProxy配置
安装完毕后，进入安装目录修改配置文件，默认情况下安装目录里是没有.cfg配置文件的，可以回到安装文件目录下，将examples下的haproxy.cfg拷贝到usr/local/haproxy下。
```
vi /usr/local/haproxy/haproxy.cfg
```
粘贴如下内容至haproxy.cfg

	###################### 全局配置 ######################
	global
	       log     127.0.0.1 local0                    # 日志输出配置，所有日志记录在本机，通过local0输出
	       maxconn 3000                                # 默认最大连接数,需考虑ulimit-n限制
	       daemon                                      # 以后台形式运行harpoxy
	       uid     5040                                # 运行haproxy的用户
	       gid     5040                                # 运行haproxy的用户所在的组
	       chroot  /usr/local/haproxy                  # 改变当前工作目录
	       pidfile /usr/local/haproxy/logs/haproxy.pid # 当前进程的pid文件

	###################### 默认配置 ######################
	defaults
	       log             global
	       mode            http       # 模式：tcp|http|health，tcp是4层，http是7层，health只会返回OK
	       option          httpclose  # 每次请求完毕后主动关闭http通道
	       option          forwardfor # 如果后端服务器需要获得客户端真实ip，可从Http Header中获得客户端ip
	       option          redispatch # 当serverId对应的服务器挂掉后，强制定向到其他健康的服务器
	       retries         3          # 3次连接失败就认为是服务器不可用
	       timeout connect 300000     # 连接超时
	       timeout client  500000     # 客户端超时
	       timeout server  500000     # 服务器超时

	###################### 统计页面配置 ######################
	listen stats                      # 设置Frontend和Backend的组合体，监控组的名称，按需要自定义名称
	       bind          0.0.0.0:8888 # 监听端口
	       maxconn       1            # 默认的最大连接数
	       option        httplog      # 采用http日志格式
	       stats         enable       # 启用状态监控
	       stats refresh 30s          # 统计页面自动刷新时间
	       stats uri     /stats       # 统计页面url
	       stats realm   YANGPIENA    # 统计页面密码框上提示文本
	       stats auth    admin:admin  # 设置监控页面的用户和密码:admin,可以设置多个用户名（再增加一行即可）
	       stats admin   if TRUE      # 设置手工启动/禁用，后端服务器(haproxy-1.4.9以后版本)

	###################### 业务前端配置 ######################
	frontend xx
	         bind            0.0.0.0:80
	         default_backend xxServers

	###################### 业务后端配置 ######################
	backend xxServers
	        balance source
	        server  50.41:80          10.1.50.41:80     weight 1 check inter 1500 rise 2 fall 3
	        server  50.42:80          10.1.50.42:80     weight 1 check inter 1500 rise 2 fall 3
	        server  108.6:8080        10.1.108.6:8080   weight 1 check inter 1500 rise 2 fall 3
	        server  218.95.162.130:88 218.95.162.130:88 weight 1 check inter 1500 rise 2 fall 3

	###################### 错误页面配置 ######################
	errorfile 403 /usr/local/haproxy/errorfiles/403.http
	errorfile 500 /usr/local/haproxy/errorfiles/500.http
	errorfile 502 /usr/local/haproxy/errorfiles/502.http
	errorfile 503 /usr/local/haproxy/errorfiles/503.http
	errorfile 504 /usr/local/haproxy/errorfiles/504.http

###### 实现日志记录
haproxy配置文件中默认定义了log 127.0.0.1 local0，说明日志将被记录在本机的local0设施中。
修改rsyslog配置文件：`vim /etc/rsyslog.conf`

	# Provides UDP syslog reception
	$ModLoad imudp      #取消注释
	$UDPServerRun 514   #取消注释
	local0.*            /usr/local/haproxy/logs/haproxy.log
	# 指定设备local0日志存放位置
修改rsyslog配置文件：`vim /etc/sysconfig/rsyslog`

	SYSLOGD_OPTIONS="-r -m 0"
	service syslog restart
haproxy的日志信息也可以设置存放在专门的日志服务器中。

---

### HAProxy启动
```
/usr/local/haproxy/sbin/haproxy -f /usr/local/haproxy/haproxy.cfg
```
检查是否启动：

	[root@Linux-xx ~]# ps -e|grep haproxy
	 1221 ?        00:01:32 haproxy
看到上面结果，表明haproxy已经正常启动了。

---

### HAProxy查看状态
```
http://localhost:8888/stats
```
参数说明：
**8888**  即haproxy配置文件中的监听端口
**stats** 即haproxy配置文件中的监听名称

如果无法访问，请查看防火墙中端口是否开启。
> Centos查看8888端口占用情况，使用命令：`lsof -i tcp:8888`
Centos列出所有使用的端口，使用命令：`netstat -ntlp`

如果端口未开启，请设置防火墙开放端口。
#### 1. 开启端口（以80端口为例） 
* 方法一：
```
/sbin/iptables -I INPUT -p tcp --dport 80 -j ACCEPT   ## 写入修改 
/etc/init.d/iptables save                             ## 保存修改 
service iptables restart                              ## 重启防火墙，使修改生效
```
* 方法二：
	先打开配置文件
```
vi /etc/sysconfig/iptables
```
	再加入下面内容
		-A INPUT -p tcp -m state --state NEW -m tcp --dport 80 -j ACCEPT
	最后，重启防火墙或重启计算机，修改完成。
>修改防火墙时注意最好留下VNC和SSH的管理端口。

#### 2. 关闭端口
* 方法一：
```
/sbin/iptables -I INPUT -p tcp --dport 80 -j DROP   ## 写入修改 
/etc/init.d/iptables save                           ## 保存修改 
service iptables restart                            ## 重启防火墙，使修改生效
```
* 方法二：
	先打开配置文件
```
vi /etc/sysconfig/iptables
```
	再加入下面内容
		-A INPUT -p tcp -m state --state NEW -m tcp --dport 80 -j DROP
	最后重启防火墙或重启计算机，修改完成。

#### 3. 查看端口状态
```
/etc/init.d/iptables status
```

#### 4. 临时性完全关闭防火墙，可以不重启计算机
```
#/etc/init.d/iptables status                ## 查看防火墙状态
#/etc/init.d/iptable stop                   ## 本次关闭防火墙
#/etc/init.d/iptable restart                ## 重启防火墙
```

#### 5. 永久性关闭防火墙
```
#chkconfig --level 35 iptables off          ## 注意中间的是两个英式小短线；重启
```

#### 6. CentOS的iptables示例
	# Firewall configuration written by system-config-securitylevel
	# Manual customization of this file is not recommended.*filter
	:INPUT ACCEPT [0:0]
	:FORWARD ACCEPT [0:0]
	:OUTPUT ACCEPT [0:0]
	:RH-Firewall-1-INPUT - [0:0]
	-A INPUT -j RH-Firewall-1-INPUT
	-A FORWARD -j RH-Firewall-1-INPUT
	-A RH-Firewall-1-INPUT -i lo -j ACCEPT
	-A RH-Firewall-1-INPUT -p icmp –icmp-type any -j ACCEPT
	-A RH-Firewall-1-INPUT -p 50 -j ACCEPT
	-A RH-Firewall-1-INPUT -p 51 -j ACCEPT
	-A RH-Firewall-1-INPUT -m state –state ESTABLISHED,RELATED -j ACCEPT
	-A RH-Firewall-1-INPUT -m state –state NEW -m tcp -p tcp –dport 53 -j ACCEPT
	-A RH-Firewall-1-INPUT -m state –state NEW -m udp -p udp –dport 53 -j ACCEPT
	-A RH-Firewall-1-INPUT -m state –state NEW -m tcp -p tcp –dport 22 -j ACCEPT
	-A RH-Firewall-1-INPUT -m state –state NEW -m tcp -p tcp –dport 25 -j ACCEPT
	-A RH-Firewall-1-INPUT -m state –state NEW -m tcp -p tcp –dport 80 -j ACCEPT
	-A RH-Firewall-1-INPUT -m state –state NEW -m tcp -p tcp –dport 443 -j ACCEPT
	-A RH-Firewall-1-INPUT -j REJECT –reject-with icmp-host-prohibited
	COMMIT
要根据具体需求修改此文件，如不希望开放80端口提供web服务，那么应相应地删除80所在一行即可。全部修改完后重启iptables，之后使用命令`iptables -L`可验证一下是否规则都已经生效，至此完成防火墙设置修改。

---

### HAProxy关闭
直接kill pid即可。


### [HAProxy脚本启动和关闭](http://yangpiena.coding.me/2018/02/01/%E3%80%90HAProxy%E3%80%91%E8%84%9A%E6%9C%AC%E5%90%AF%E5%8A%A8%E5%92%8C%E5%85%B3%E9%97%AD/)
