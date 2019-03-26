---
title: 【HAProxy】负载均衡算法
layout: post
comments: true
date: 2017-12-20 10:03:35
categories: HAProxy
tags: [HAProxy]
keywords:
description:
---
使用balance定义负载均衡算法，可用于“defaults”、“listen”和“backend”。用于在负载均衡场景中挑选一个server，其仅应用于用户新请求或需要将一个连接重新派发至另一个服务器时。常用的算法有：undrobin、source和lestconn。

<!-- more -->

1. roundrobin
表示简单的轮询，每个服务器根据权重轮流使用，在在服务器的处理时间保持均匀分布时，这是最平衡、最公平的算法。此算法是动态的，这表示其权重可以在运行时进行调整，不过，在设计上 ，每个后端服务器仅能最多接受4128个连接。
例如：
192.168.109.5  It is work!
192.168.109.3 It is work!
192.168.109.5  It is work!
192.168.109.3 It is work!
192.168.109.3 It is work!
192.168.109.3 It is work!
192.168.109.3 It is work!
192.168.109.3 It is work!
192.168.109.5  It is work!
192.168.109.3 It is work!

2. static-rr
基于权重进行轮叫，与roundrobin类似，但是为静态方法，在运行时调整其服务器权重不会生效；不过，其在后端服务器连接数上没有限制。
例如：
server APP03 192.168.109.5:81 cookie app1inst3 check inter 2000 rise 2 fall 5  weight 1
server APP04 192.168.109.3:80 cookie app1inst4 check inter 2000 rise 2 fall 5  weight 5
192.168.109.5  It is work!
192.168.109.3 It is work!
192.168.109.3 It is work!
192.168.109.3 It is work!
192.168.109.3 It is work!
192.168.109.3 It is work!
192.168.109.5  It is work!
192.168.109.3 It is work!
192.168.109.3 It is work!
192.168.109.3 It is work!

3. leastconn
新的连接请求被派发至具有最少连接数目的后端服务器；在有着较长时间会 话的场景中推荐使用此算法，如LDAP、SQL等，其并不太适用于较短会话的应用层协议。该算法是动态的，对于实例启动慢的服务器权重会在运行中调整。
例如：
192.168.109.5  It is work!
192.168.109.3 It is work!
192.168.109.5  It is work!
192.168.109.3 It is work!
192.168.109.5  It is work!
192.168.109.3 It is work!
192.168.109.5  It is work!
192.168.109.3 It is work!
192.168.109.5  It is work!
192.168.109.3 It is work!

4. source
将请求的源地址进行hash运算，并由后端服务器的权重总数相除后派发至某匹 配的服务器；这可以使得同一个客户端IP的请求始终被派发至某特定的服务器；不过，当服务器权重总数发生变化时，如某服务器宕机或添加了新的服务器，许多客户端的请求可能会被派发至与此前请求不同的服务器；常用于负载均衡无cookie功能的基于TCP的协议 ；其默认为静态，不过也可以使用hash-type修改此特性。
例如：
192.168.109.5  It is work!
192.168.109.5  It is work!
192.168.109.5  It is work!
192.168.109.5  It is work!
192.168.109.5  It is work!
192.168.109.5  It is work!
192.168.109.5  It is work!
192.168.109.5  It is work!
192.168.109.5  It is work!
192.168.109.5  It is work!

5. uri
对URI的左半部分(“问题”标记之前的部分)或整个URI进行hash运算，并由服务 器的总权重相除后派发至某匹配的服务器；这可以使得对同一个URI的请求总是被派发至某特定的服务器，除非服务器的权重总数发生了变化；此算法常用于代理缓存或反病毒代理以提高缓存的命中率；需要注意的是，此算法仅应用于HTTP后端服务器场景；其默认为静态算法。
例如：
192.168.109.3 It is work!
192.168.109.3 It is work!
192.168.109.3 It is work!
192.168.109.3 It is work!
192.168.109.3 It is work!
192.168.109.3 It is work!
192.168.109.3 It is work!
192.168.109.3 It is work!
192.168.109.3 It is work!
192.168.109.3 It is work!

6. url_param
表示根据请求的URl参数'balance url_param' requires an URL parameter name，在HTTP GET请求的查询串中查找<param>中指定的URL参数，基本上可以锁定使用特制的URL到特定的负载均衡器节点的要求；
该算法一般用于将同一个用户的信息发送到同一个后端服务器；
该算法默认是静态的，所以运行时修改服务器的权重是无效的，但是算法会根据“hash-type”的变化做调整。
例如：
balance url_param www.blog.51cto.com
192.168.109.5  It is work!
192.168.109.3 It is work!
192.168.109.5  It is work!
192.168.109.3 It is work!
192.168.109.5  It is work!
192.168.109.3 It is work!
192.168.109.5  It is work!
192.168.109.3 It is work!
192.168.109.5  It is work!
192.168.109.3 It is work!

7. hdr(name)
表示根据HTTP请求头来锁定每一次HTTP请求；在每个HTTP请求中查找HTTP头<name>，HTTP头<name>将被看作在每个HTTP请求，并针对特定的节点；
如果缺少头或者头没有任何值，则用roundrobin代替；
该算法默认是静态的，所以运行时修改服务器的权重是无效的，但是算法会根据“hash-type”的变化做调整。
例如：
192.168.109.5  It is work!
192.168.109.3 It is work!
192.168.109.5  It is work!
192.168.109.3 It is work!
192.168.109.5  It is work!
192.168.109.3 It is work!
192.168.109.5  It is work!
192.168.109.5  It is work!
192.168.109.3 It is work!
192.168.109.3 It is work!

8. rdp-cookie(name)
表示根据据cookie(name)来锁定并哈希每一次TCP请求。为每个进来的TCP请求查询并哈希RDP cookie<name>；
该机制用于退化的持久模式，可以使同一个用户或者同一个会话ID总是发送给同一台服务器。
如果没有cookie，则使用roundrobin算法代替；
该算法默认是静态的，所以运行时修改服务器的权重是无效的，但是算法会根据“hash-type”的变化做调整。
例如：
192.168.109.5  It is work!
192.168.109.5  It is work!
192.168.109.3 It is work!
192.168.109.3 It is work!
192.168.109.5  It is work!
192.168.109.3 It is work!
192.168.109.5  It is work!
192.168.109.3 It is work!
192.168.109.5  It is work!
192.168.109.3 It is work!

9. first
根据服务器在列表中的位置，自上而下进行调度；前面服务器的连接数达到上限， 新请求才会分配给下一台服务。