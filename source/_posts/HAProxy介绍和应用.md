---
title: HAProxy介绍和应用
author: 昜丿捺
copyright: true
layout: post
comments: true
date: 2017-12-22 15:15:53
categories: 技术
tags: [HAProxy]
keywords:
description:
---
### HAProxy简介
HAProxy是一个使用C语言编写的自由及开放源代码软件，其提供高可用性、负载均衡，以及基于TCP和HTTP的应用程序代理。

<!-- more -->

HAProxy特别适用于那些负载特大的web站点，这些站点通常又需要会话保持或七层处理。HAProxy运行在当前的硬件上，完全可以支持数以万计的并发连接。并且它的运行模式使得它可以很简单安全的整合进您当前的架构中， 同时可以保护你的web服务器不被暴露到网络上。

HAProxy实现了一种事件驱动, 单一进程模型，此模型支持非常大的并发连接数。多进程或多线程模型受内存限制 、系统调度器限制以及无处不在的锁限制，很少能处理数千并发连接。事件驱动模型因为在有更好的资源和时间管理的用户空间(User-Space) 实现所有这些任务，所以没有这些问题。此模型的弊端是，在多核系统上，这些程序通常扩展性较差。这就是为什么他们必须进行优化以 使每个CPU时间片(Cycle)做更多的工作。

包括 GitHub、Bitbucket、Stack Overflow、Reddit、Tumblr、Twitter和 Tuenti在内的知名网站，及亚马逊网络服务系统都使用了HAProxy。

HAProxy是法国人Willy Tarreau开发的一个开源软件，是一款应对客户端10000以上的同时连接的高性能的TCP和 HTTP负载均衡器。其功能是用来提供基于cookie的持久性， 基于内容的交换，过载保护的高级流量管制，自动故障切换 ，以正则表达式为基础的标题控制运行时间，基于Web的报表，高级日志记录以帮助排除故障的应用或网络及其他功能。

---

### HAProxy基础概念
代理的作用
* 正向代理，反向代理
* 代理服务器，可以提供缓存功能加速客户端访问，同时可以对缓存数据进行有效性检查
* 内容路由：根据流量以及内容类型将请求转发至特定的服务器
* 转码器：支持压缩功能，将数据以压缩形式发送给客户端

缓存的作用
* 减少访冗余内容传输
* 节省带宽，缓解网络瓶颈
* 降低了对原始服务器的请求压力
* 降低了传输延迟

负载均衡集群
* 四层代理：lvs, nginx(stream)，HAProxy(mode tcp)
通过分析IP层及TCP/UDP层的流量实现的基于“IP+端口”的负载均衡。

* 七层代理：http: nginx(http, ngx_http_upstream_module), HAProxy(mode http), httpd, ats, perlbal, pound...
可以根据内容，再配合负载均衡算法来选择后端服务器，不但可以根据 “ip+端口”方式进行负载分流，还可以根据网站的URL，访问域名，浏览 器类别，语言等决定负载均衡的策略。

七层负载均衡模式下，负载均衡与客户端及后端的服务器会分别建立一次 TCP连接，而在四层负载均衡模式下(DR)，仅建立一次TCP连接；七层负载均衡对负载均衡设备的要求更高，处理能力也低于四层负载均衡。

**HAProxy与lvs的负载均衡很大一点不同的是，lvs仅仅是基于内核的简单调度，而HAProxy则是当请求到达反向代理端时，代理端帮前端去请求相应内容**

---

### HAProxy功能
* HAProxy是TCP/HTTP反向代理服务器，尤其适合于高可用性环境
* 可以针对HTTP请求添加cookie，进行路由后端服务器
* 可平衡负载至后端服务器，并支持持久连接
* 支持基于cookie进行调度
* 支持所有主服务器故障切换至备用服务器
* 支持专用端口实现监控服务
* 支持不影响现有连接情况下停止接受新连接请求
* 可以在双向添加，修改或删除HTTP报文首部
* 支持基于pattern实现连接请求的访问控制
* 通过特定的URI为授权用户提供详细的状态信息
* 支持http反向代理
* 支持动态程序的反向代理
* 支持基于数据库的反向代理
版本：1.4 1.5 1.6 1.7 1.8

---

### HAProxy应用
##### HAProxy进行安全加固
用于测试指定的backend上会话创建的速率(即每秒创建的会话数)是否满足指定的条件；常用于在指定 backend上的会话速率过高时将用户请求转发至另外的backend，或用于阻止攻击行为。例如

	backend dynamic
	    mode http
	    acl being_scanned be_sess_rate gt 100
	    redirect location /denied.html if being_scanned

##### 通过ACL指定可访问的用户
阻断来自非指定IP的访问80端口的请求

	acl myhost src 172.16.100.1
	acl myport dst_port 80
	tcp-request connection reject if !myhost myport　　
还可以用block

	block if ! myhost myport

##### 根据用户访问内容实现动静分离

	frontend http-in
	    bind            *:80
	    mode            http
	    log             global
	    option          httpclose
	    acl             url_static path_beg -i /static /images /javascript /stylesheets
	    acl             url_static path_end -i .jpg .jpeg .gif .png .css .js
	    use_backend     static_servers if url_static
	    default_backend dynamic_servers
	backend static_servers
	    balance roundrobin
	    server  imgsrv1 172.18.64.7:80 check maxconn 6000
	    server  imgsrv2 172.18.64.107:80 check maxconn 6000
	backend dynamic_servers
	    balance source
	    server  websrv1 172.18.64.17:80 check maxconn 1000
	    server  websrv2 172.18.64.106:80 check maxconn 1000

##### HAProxy实现浏览器控制
阻断火狐浏览器发送的请求  

	acl firefox hdr_reg(User-Agent) -i .*firefox.*
	block if firefox
将IE用户请求分配到静态服务器

	acl ie_useragent hdr_reg(User-Agent) -i .*ie.*
	use_backend static_servers if ie_useragent

##### HAProxy实现真实日志记录
option forwardfor [ except ] [ header ] [ if-none ] 允许在发往服务器的请求首部中插入“X-Forwarded-For”首部。
HAProxy工作于反向代理模式，其发往服务器的请求中的客户端IP均为HAProxy主机的地址而非真正客户端的地址，这会使得服务器端的日志信息记录不了真正的请求来源，“X-Forwarded-For”首部则可用于解决此问题。HAProxy可以 向每个发往服务器的请求上添加此首部，并以客户端IP为其value。 需要注意的是，HAProxy工作于隧道模式，其仅检查每一个连接的第一个请求，因此，仅第一个请求报文被附加此首部。 下面是一个例子。

	frontend www
	mode http
	option forwardfor except 127.0.0.1

##### HAProxy实现会话保持
1. 源地址hash（用户IP识别）Haroxy 将用户IP经过hash计算后 指定到固定的真实服务器上（类似于nginx的IP hash 指令）。
缺点：当后端一台服务器挂了以后会造成部分session丢失

	backend SOURCE_srv
	        mode    http
	        balance source
	        server  app-node1 10.31.1.179:80 check port 80 inter 3000 rise 3 fall 3
	        server  app-node2 10.31.1.191:80 check port 80 inter 3000 rise 3 fall 3
	        server  app-node3 10.31.0.35:80 check port 80 inter 3000 rise 3 fall 3
2. cookie 识别 HAProxy 将WEB服务端返回给客户端的cookie中插入HAProxy中特定的字符串(或添加前缀)在后端的服务器COOKIE ID。

	backend COOKIE_srv
	        mode   http
	        cookie SERVERID insert indirect nocache
	        server app-node1 10.31.1.179:80 check port 80 cookie a inter 3000 rise 3 fall 3
	        server app-node2 10.31.1.191:80 check port 80 cookie b inter 3000 rise 3 fall 3
	        server app-node3 10.31.0.251:80 check port 80 cookie c inter 3000 rise 3 fall 3
在LB1上配置好HAProxy后，LB1将接受用户的所有请求。如果一个用户请求不包含任何cookie，那这个请求将被HAProxy转发到一台可用的WEB服务器。可能是webA,webB，webC。然后HAProxy将把处理这个请求的WEB服务器的cookie值插入到请求响应中。如SERVERID=A。当这个客户端再次访问 并在HTTP请求头中带有SERVERID=A,HAProxy将会把它的请求直接转发给webA处理。在请求到达 webA之前，cookie将被移除，webA将不会看到这个cookie。如果webA不可用，对应的请求将被转发到其他可用的WEB服务器，相应的cookie值也将被重新设置。

##### HAProxy性能优化参数
option redispatch：当server对应的服务器挂掉后，强制定向到其他健康的服务器
option dontlognull ：保证HAProxy不记录上级负载均衡发送过来 的用于检测状态没有数据的心跳包
retries 3 : 3次连接失败就认为服务器不可用，主要通过后面的check检查
maxconn 30000 : 代理时所能接受的最大并发连接数， 应该要比后端主机的并发总和要小
