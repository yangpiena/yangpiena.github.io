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
### HAProxy简介
HAProxy是一个使用C语言编写的自由及开放源代码软件，其提供高可用性、负载均衡，以及基于TCP和HTTP的应用程序代理。
HAProxy特别适用于那些负载特大的web站点，这些站点通常又需要会话保持或七层处理。HAProxy运行在当前的硬件上，完全可以支持数以万计的并发连接。并且它的运行模式使得它可以很简单安全的整合进您当前的架构中， 同时可以保护你的web服务器不被暴露到网络上。
HAProxy实现了一种事件驱动, 单一进程模型，此模型支持非常大的并发连接数。多进程或多线程模型受内存限制 、系统调度器限制以及无处不在的锁限制，很少能处理数千并发连接。事件驱动模型因为在有更好的资源和时间管理的用户空间(User-Space) 实现所有这些任务，所以没有这些问题。此模型的弊端是，在多核系统上，这些程序通常扩展性较差。这就是为什么他们必须进行优化以 使每个CPU时间片(Cycle)做更多的工作。
包括 GitHub、Bitbucket、Stack Overflow、Reddit、Tumblr、Twitter和 Tuenti在内的知名网站，及亚马逊网络服务系统都使用了HAProxy。

<!-- more -->

---

### HAProxy下载
[官网下载](https://www.haproxy.org/)
[Fossies下载](https://fossies.org/linux/misc/)

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
make TARGET=linux2628 ARCH=x86_64 PREFIX=/usr/local/haproxy
make install PREFIX=/usr/local/haproxy
```
参数说明:
**TARGET=linux2628**          #内核版本，使用`uname -r`可查看内核，如：2.6.32-642.11.1.el6.x86_64，此时该参数就为linux2628；kernel 小于2.6.28的用：TARGET=linux26
**ARCH=x86_64**               #系统位数
**PREFIX=/usr/local/haprpxy** #/usr/local/haprpxy为haprpxy的安装路径

> CentOS中无法使用make、make install命令，提示：make: command not found，此时需在线安装make和gcc。
> * 安装make
yum -y install gcc automake autoconf libtool make
> * 安装gcc
yum install gcc gcc-c++

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
	      log            127.0.0.1 local0                       # 日志输出配置，所有日志都记录在本机，通过local0输出
	    # log            127.0.0.1 local1 notice                # 定义haproxy 日志级别[error warring info debug]
	    # log            loghost local0 info
	      maxconn        1500                                   # 默认最大连接数,需考虑ulimit-n限制
	      chroot         /usr/local/haproxy                     # 改变当前工作目录
	      uid            haproxy                                # 运行haproxy的用户
	      gid            haproxy                                # 运行haproxy的用户所在的组
	      daemon                                                # 以后台形式运行harpoxy
	    # nbproc         2                                      # 设置进程数量
	      pidfile        /usr/local/haproxy/logs/haproxy.pid    #将所有进程的pid写入文件，启动进程的用户必须有权限访问此文件
	    # debug                                                 # haproxy 调试级别，建议只在开启单进程的时候调试
	    # quiet

	###################### 默认配置 ######################
	defaults
	        log             global
	        mode            http              # 默认的模式mode { tcp|http|health }，tcp是4层，http是7层，health只会返回OK
	        option          httpclose         # 每次请求完毕后主动关闭http通道,haproxy不支持keep-alive,只能模拟这种模式的实现
	      # option          dontlognull       # 不记录健康检查日志信息
	        option          forwardfor        # 如果后端服务器需要获得客户端真实ip需要配置的参数，可以从Http Header中获得客户端ip
	        option          redispatch        # 当serverId对应的服务器挂掉后，强制定向到其他健康的服务器，以后将不支持
	      # option          abortonclose      # 当服务器负载很高的时候，自动结束掉当前队列处理比较久的链接
	        retries         2                 # 两次连接失败就认为是服务器不可用，也可以通过后面设置
	        balance         static-rr         # 支持static-rr，leastconn,first,uri等参数
	      # balance         roundrobin        # 设置默认负载均衡方式，轮询方式
	      # balance         source            # 设置默认负载均衡方式，保存session值，类似于nginx的ip_hash
	      # balnace         leastconn         # 设置默认负载均衡方式，最小连接数
	        stats           enable
	      # stats uri       /ha?stats         # haproxy运行状态查看 自定义uri
	        stats uri       /haproxy-stats    # haproxy运行状态查看 自定义uri
	        stats refresh   30s               # 统计页面自动刷新时间
	        timeout connect 3000              # 连接超时
	        timeout client  50000             # 客户端超时
	        timeout server  50000             # 服务器超时
	      # timeout check   2000              # 心跳检测超时
	      # timeout http-keep-alive 10s       # 默认持久连接超时时间
	      # timeout http-request    10s       # 默认http请求超时时间
	      # timeout queue   1m                # 默认队列超时时间

	###################### 统计页面配置 ######################
	listen stats
	       bind          0.0.0.0:1080         # 设置Frontend和Backend的组合体，监控组的名称，按需要自定义名称
	       mode          http                 # http的7层模式
	       option        httplog              # 采用http日志格式
	     # log           127.0.0.1 local0 err # 错误日志记录
	       maxconn       10                   # 默认的最大连接数
	       stats refresh 30s                  # 统计页面自动刷新时间
	       stats uri     /stats               # 统计页面url
	       stats realm   YANGPIENA\ Haproxy   # 统计页面密码框上提示文本
	       stats auth    admin:admin          # 设置监控页面的用户和密码:admin,可以设置多个用户名
	       stats auth    Frank:Frank          # 设置监控页面的用户和密码：Frank
	       stats hide-version                 # 隐藏统计页面上HAProxy的版本信息
	       stats admin if TRUE                # 设置手工启动/禁用，后端服务器(haproxy-1.4.9以后版本)

	###################### 业务配置 ######################
	listen xx              0.0.0.0:80
	       balance         source                                 # 使用JSESSIONID时，此负载均衡方式必须为source 
	     # cookie SERVERID insert                                 # 允许插入serverid到cookie中，serverid后面可以定义
	     # option httpchk GET /root/index.jsp HTTP/1.0            # 健康检测 检测server web根目录有无此文件
	       appsession JSESSIONID len 64 timeout 5h request-learn
	       server  10.1.50.41:80 10.1.50.41:80 weight 3 check
	       server  10.1.50.42:80 10.1.50.42:80 weight 3 check

	     # 此类方法，即使用cookie模式时，balance需设为roundrobin，且需要cookie SERVERID insert
	     # server server_151 86.2.1.151:80 cookie server_151 check
	     # server server_152 86.2.1.152:80 cookie server_152 check

	     # server server_151 86.2.1.151:80 cookie server_151 check inter 1500 rise 3 fall 3 weight 1
	     # 服务器定义，cookie 1表示serverid为web1，check inter 1500是检测心跳频率rise 3是3次正确认为服务器可用，fall 3是3次失败认为服务器不可用，weight代表权重
	     # server server_152 86.2.1.152:80 cookie server_152 check inter 1500 rise 3 fall 3 weight 2
	     # 服务器定义，cookie 1表示serverid为web2，check inter 1500是检测心跳频率rise 3是3次正确认为服务器可用， fall 3是3次失败认为服务器不可用，weight代表权重


	# # 原资料
	# ###################### 设置haproxy 错误页面 ######################
	# #errorfile 403 /home/haproxy/haproxy/errorfiles/403.http
	# #errorfile 500 /home/haproxy/haproxy/errorfiles/500.http
	# #errorfile 502 /home/haproxy/haproxy/errorfiles/502.http
	# #errorfile 503 /home/haproxy/haproxy/errorfiles/503.http
	# #errorfile 504 /home/haproxy/haproxy/errorfiles/504.http
	# 
	# ###################### frontend前端配置 ######################
	# frontend main
	# 　　bind *:80 #这里建议使用bind *:80的方式，要不然做集群高可用的时候有问题，vip切换到其他机器就不能访问了。
	# 　　acl web hdr(host) -i www.abc.com  #acl后面是规则名称，-i为忽略大小写，后面跟的是要访问的域名，如果访问www.abc.com这个域名，就触发web规则，。
	# 　　acl img hdr(host) -i img.abc.com  #如果访问img.abc.com这个域名，就触发img规则。
	# 　　use_backend webserver if web   #如果上面定义的web规则被触发，即访问www.abc.com，就将请求分发到webserver这个作用域。
	# 　　use_backend imgserver if img   #如果上面定义的img规则被触发，即访问img.abc.com，就将请求分发到imgserver这个作用域。
	# 　　default_backend dynamic #不满足则响应backend的默认页面
	# 
	# ###################### backend后端配置 ######################
	# backend webserver #webserver作用域
	# 　　mode http
	# 　　balance roundrobin #balance roundrobin 负载轮询，balance source 保存session值，支持static-rr，leastconn，first，uri等参数
	# 　　option httpchk /index.html HTTP/1.0 #健康检查, 检测文件，如果分发到后台index.html访问不到就不再分发给它
	# 　　server web1 10.16.0.9:8085 cookie 1 weight 5 check inter 2000 rise 2 fall 3
	# 　　server web2 10.16.0.10:8085 cookie 2 weight 3 check inter 2000 rise 2 fall 3
	# 　　#cookie 1表示serverid为1，check inter 1500 是检测心跳频率 
	# 　　#rise 2是2次正确认为服务器可用，fall 3是3次失败认为服务器不可用，weight代表权重
	# 
	# backend imgserver
	# 　　mode http
	# 　　option httpchk /index.php
	# 　　balance roundrobin 
	# 　　server img01 192.168.137.101:80 check inter 2000 fall 3
	# 　　server img02 192.168.137.102:80 check inter 2000 fall 3
	# 
	# backend dynamic 
	# 　　balance roundrobin 
	# 　　server test1 192.168.1.23:80 check maxconn 2000 
	# 　　server test2 192.168.1.24:80 check maxconn 2000
	# 
	# listen tcptest 
	# 　　bind 0.0.0.0:5222 
	# 　　mode tcp 
	# 　　option tcplog #采用tcp日志格式 
	# 　　balance source 
	# 　　#log 127.0.0.1 local0 debug 
	# 　　server s1 192.168.100.204:7222 weight 1 
	# 　　server s2 192.168.100.208:7222 weight 1

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
http://localhost:1080/stats
```
参数说明：
**1080**  即haproxy配置文件中的监听端口
**stats** 即haproxy配置文件中的监听名称

如果无法访问，请查看防火墙中端口是否开启。
> Centos查看80端口占用情况，使用命令：`lsof -i tcp:80`
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

---

### HAProxy脚本启动和关闭
#### 1. 编写启动脚本
```
vi /etc/rc.d/init.d/haproxy
```
本身不存在此文件，使用以上命令，进入vi编辑器，再使用命令保存退出即可。
打开文件haproxy，贴入如下内容：
	#!/bin/bash
	BASE_DIR="/usr/local/haproxy"
	ARGV="$@"  

	start()
	{
	echo "START HAPoxy SERVERS"
	$BASE_DIR/sbin/haproxy -f $BASE_DIR/haproxy.cfg
	}

	stop()
	{
	echo "STOP HAPoxy Listen"
	kill -TTOU $(cat $BASE_DIR/logs/haproxy.pid)
	echo "STOP HAPoxy process"
	kill -USR1 $(cat $BASE_DIR/logs/haproxy.pid)
	}
	case $ARGV in

	start)
	start
	ERROR=$?
	;;

	stop)
	stop
	ERROR=$?
	;;

	restart)
	stop
	start
	ERROR=$?
	;;

	*)
	echo "hactl.sh [start|restart|stop]"
	esac
	exit $ERROR

#### 2. 脚本随系统自启动
```
chmod +x /etc/rc.d/init.d/haproxy
chkconfig --add haproxy
chkconfig  haproxy on
```
如果出现结果： *service haproxy does not support chkconfig* 
解决办法是在 **/etc/rc.d/init.d/haproxy** 中添加下面两句到 **#!/bin/bash** 之后:
	#chkconfig: 2345 10 90
	#description:haproxy
----其中2345是默认启动级别，级别有0-6共7个级别。
----等级0表示：表示关机
----等级1表示：单用户模式
----等级2表示：无网络连接的多用户命令行模式
----等级3表示：有网络连接的多用户命令行模式
----等级4表示：不可用
----等级5表示：带图形界面的多用户模式
----等级6表示：重新启动
----10是启动优先级，90是停机优先级，优先级范围是0-100，数字越大，优先级越低。

>添加后效果如下：
	[root@Linux-xx ~]# cat /etc/rc.d/init.d/haproxy
	#!/bin/bash
	#chkconfig: 2345 10 90
	#description:haproxy
	BASE_DIR="/usr/local/haproxy"
	ARGV="$@"  
	start()
	...
	...

#### 3. 启动与关闭
```
service haproxy start
service haproxy stop
```