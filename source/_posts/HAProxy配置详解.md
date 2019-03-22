---
title: HAProxy配置详解
layout: post
comments: true
date: 2017-12-22 09:10:25
categories: 技术
tags: [HAProxy]
keywords:
description:
---
### 配置文件
haproxy.cfg主要有两部分组成：global和proxies配置段

##### global：全局配置段
进程及安全配置相关的参数
性能调整相关参数
Debug参数

##### proxies：代理配置段
* defaults：为frontend, backend, listen提供默认配置
* fronted：接收请求的前端虚拟节点，frontend可以增加规则直接指定具体使用后端的backend
* backend：后端服务集群的配置，真实服务器，一个backend对应一个或者多个实体服务器
* listen：同时拥有前端和后端,适用于一对一环境。fronted和backend的组合体，比如haproxy实例状态监控部分配置

<!-- more -->

> 所有代理的名称只能使用大写字母、小写字母、数字、-(中线)、\_(下划线)、.(点号)和:(冒号)。此外，ACL名称会区分字母大小写。

> 时间格式配置说明：默认以毫秒为单位，但也可以使用其它的时间单位后缀。
 us: 微秒(microseconds)，即1/1000000秒；
 ms: 毫秒(milliseconds)，即1/1000秒；
 s: 秒(seconds)；
 m: 分钟(minutes)；
 h：小时(hours)；
 d: 天(days)；

---

### 配置参数
##### 全局配置
通常主要用于定义全局参数，属于进程级的配置，通常和操作系统配置有关。

	###################### 全局配置 ######################
	global
	      log     127.0.0.1 local0                    # 日志输出配置，日志都记录在本机，通过local0输出
	    # log     127.0.0.1 local0 info
	      maxconn 1500                                # 默认最大连接数,需考虑ulimit-n限制
	      chroot  /usr/local/haproxy                  # 改变当前工作目录
	      uid     5040                                # 运行haproxy的用户（自定义）
	      gid     5040                                # 运行haproxy的用户所在的组（自定义）
	      daemon                                      # 以后台形式运行harpoxy
	    # nbproc  2                                   # 设置进程数量
	      pidfile /usr/local/haproxy/logs/haproxy.pid # 将所有进程的pid写入文件
	    # debug                                       # haproxy 调试级别，建议只在开启单进程的时候调试
	    # quiet

* log
全局的日志配置，local0是日志输出设置，info表示日志级别（err，waning，info，debug）；
* maxconn
设定每个HAProxy进程可接受的最大并发连接数，此选项等同于linux命令选项”ulimit -n”
* chroot 
修改haproxy的工作目录至指定的目录并在放弃权限之前执行chroot()操作,可以提升haproxy的安全级别，不过需要注意的是要确保指定的目录为空目录且任何用户均不能有写权限；
* daemon
让haproxy以守护进程的方式工作于后台，其等同于“-D”选项的功能，当然，也可以在命令行中以“-db”选项将其禁用；
* nbproc 
指定启动的haproxy进程个数，只能用于守护进程模式的haproxy；默认只启动一个进程，鉴于调试困难等多方面的原因，一般只在单进程仅能打开少数文件描述符的场景中才使用多进程模式；
* pidfile
将haproxy的进程写入pid文件。
* ulimit-n
设定每进程所能够打开的最大文件描述符数目，默认情况下其会自动进行计算，因此不推荐修改此选项。
* stats
可开启一个unix socket管理接口。
* gid
以指定的GID运行haproxy，建议使用专用于运行haproxy的GID， 以免因权限问题带来风险。
* group
同gid，不过指定的组名。

##### 默认配置
在此部分中设置的参数值，默认会自动引用到下面的frontend、backend、listen部分中，因此，某些参数属于公用的配置，只需要在defaults部分添加一次即可。而如果frontend、backend、listen部分也配置了与defaults部分一样的参数，Defaults部分参数对应的值自动被覆盖。

	###################### 默认配置 ######################
	defaults
	      log             global
	      mode            http         # 模式：tcp|http|health，tcp是4层，http是7层，health只会返回OK
	      option          httpclose    # 每次请求完毕后主动关闭http通道
	    # option          dontlognull  # 不记录健康检查日志信息
	      option          forwardfor   # 如果后端服务器需要获得客户端真实ip，可从Http Header中获得客户端ip
	      option          redispatch   # 当serverId对应的服务器挂掉后，强制定向到其他健康的服务器
	    # option          abortonclose # 当服务器负载很高的时候，自动结束掉当前队列处理比较久的链接
	      retries         2            # 两次连接失败就认为是服务器不可用，也可以通过后面设置
	      balance         static-rr    # 支持static-rr，leastconn,first,uri等参数
	    # balance         roundrobin   # 设置默认负载均衡方式，轮询方式
	    # balance         source       # 设置默认负载均衡方式，保存session值，类似于nginx的ip_hash
	    # balnace         leastconn    # 设置默认负载均衡方式，最小连接数
	      timeout connect 3000         # 连接超时
	      timeout client  50000        # 客户端超时
	      timeout server  50000        # 服务器超时
	    # timeout check   2000         # 心跳检测超时
	    # timeout http-keep-alive 10s  # 默认持久连接超时时间
	    # timeout http-request    10s  # 默认http请求超时时间
	    # timeout queue   1m           # 默认队列超时时间

* mode { tcp|http|health }
设定实例的运行模式或协议。当实现内容交换时，前端和后端必须工作于同一种模式(一般 说来都是HTTP模式)，否则将无法启动实例。
	* tcp
	实例运行于纯TCP模式，在客户端和服务器端之间将建立一个全双工的连接，且不会对7层报文做任何类型的检查；此为默认模式，通常用于SSL、SSH、SMTP等应用；
	* http
	实例运行于HTTP模式，客户端请求在转发至后端服务器之前将被深度分析，所有不与RFC格式兼容的请求都会被拒绝；
	* health
	实例工作于health模式，其对入站请求仅响应“OK”信息并关闭连接，且不会记录任何日志信息；此模式将用于响应外部组件的健康状态检查请求；目前来讲，此模式已经废弃，因为tcp或http模式中的monitor关键字可完成类似功能
* log   global
设置日志继承全局配置段的设置。
* option httplog
表示开始打开记录http请求的日志功能。
* option dontlognull
如果产生了一个空连接，那这个空连接的日志将不会记录。
* option http-server-close
打开http协议中服务器端关闭功能，使得支持长连接，使得会话可以被重用，使得每一个日志记录都会被记录。
* option forwardfor except 127.0.0.0/8
如果上游服务器上的应用程序想记录客户端的真实IP地址，haproxy会把客户端的IP信息发送给上游服务器，在HTTP请求中添加”X-Forwarded-For”字段,但当是haproxy自身的健康检测机制去访问上游服务器时是不应该把这样的访问日志记录到日志中的，所以用except来排除127.0.0.0，即haproxy身。
* option redispatch
当与上游服务器的会话失败(服务器故障或其他原因)时，把会话重新分发到其他健康的服务器上,当原来故障的服务器恢复时，会话又被定向到已恢复的服务器上。还可以用”retries”关键字来设定在判定会话失败时的尝试连接的次数。
* retries 3
向上游服务器尝试连接的最大次数，超过此值就认为后端服务器不可用。
* option abortonclose
当haproxy负载很高时，自动结束掉当前队列处理比较久的链接。
* timout http-request 10s
客户端发送http请求的超时时间。
* timeout queue 1m
当上游服务器在高负载响应haproxy时，会把haproxy发送来的请求放进一个队列中，timeout queue定义放入这个队列的超时时间。
* timeout connect 5s
haproxy与后端服务器连接超时时间，如果在同一个局域网可设置较小的时间。
* timeout client 1m
定义客户端与haproxy连接后，数据传输完毕，不再有数据传输，即非活动连接的超时时间。
* timeout server 1m
定义haproxy与上游服务器非活动连接的超时时间。
* timeout http-keep-alive 10s
设置新的http请求连接建立的最大超时时间，时间较短时可以尽快释放出资源，节约资源。
* timeout check 10s
健康检测的时间的最大超时时间。
* maxconn 3000
最大并发连接数。
* contimeout 5000
设置成功连接到一台服务器的最长等待时间，默认单位是毫秒，新版本的haproxy使用timeout connect替代，该参数向后兼容。
* clitimeout 3000
设置连接客户端发送数据时的成功连接最长等待时间，默认单位是毫秒，新版本haproxy使用timeout client替代。该参数向后兼容。
* srvtimeout 3000
设置服务器端回应客户度数据发送的最长等待时间，默认单位是毫秒，新版本haproxy使用timeout server替代。该参数向后兼容。
* balance roundrobin
设置负载算法为：轮询算法

##### frontend前端配置
frontend是在haproxy 1.3版本以后才引入的一个组件，同时引入的还有backend组件。通过引入这些组件，在很大程度上简化了haproxy配置文件的复杂性。forntend可以根据ACL规则直接指定要使用的后端backend。

	###################### frontend前端配置 ######################
	frontend main
	   bind *:80                        # 这里建议使用该方式，要不然做集群高可用的时候有问题，vip切换到其他机器就不能访问了。
	   acl web hdr(host) -i www.abc.com # acl后面是规则名称，\-i为忽略大小写，后面跟的是要访问的域名，如果访问这个(域名，就触发web规则。
	   acl img hdr(host) -i img.abc.com # 如果访问img.abc.com这个域名，就触发img规则。
	   use_backend webserver if web     # 如果上面定义的web规则被触发，就将请求分发到webserver这个作用域。
	   use_backend imgserver if img     # 如果上面定义的img规则被触发，就将请求分发到imgserver这个作用域。
	   default_backend dynamic          # 不满足则响应backend的默认页面

* frontend http_80_in
定义一个名为http_80_in的frontend。
* bind 0.0.0.0:80
定义haproxy前端部分监听的端口。
* mode http
定义为http模式。
* log global
继承global中log的定义。
* option forwardfor
使后端server获取到客户端的真实IP。
* default_backend
default_backend 在没有匹配的"use_backend"规则时为实例指定使用的默认后端，因此，其不可应用于backend区段。在"frontend"和"backend"之间进行内容交换时，通常使用"use- backend"定义其匹配规则；而没有被规则匹配到的请求将由此参数指定的后端接收。
使用案例：
	use_backend dynamic  if  url_dyn
	use_backend static  if url_css url_img extension_img
	default_backend dynamic

##### backend后端配置
在HAProxy1.3版本之前，HAProxy的所有配置选项都在这个部分中设置。为了保持兼容性，haproxy新的版本依然保留了listen组件配置试。两种配置方式任选一中。

	###################### backend后端配置 ######################
	backend webserver
	        mode    http
	        balance roundrobin                   # 负载轮询
	        option  httpchk /index.html HTTP/1.0 # 健康检查, 检测文件，如果分发到后台index.html访问不到就不再分发给它
	        server  web1 10.16.0.9:8085  cookie 1 weight 5 check inter 2000 rise 2 fall 3
	        server  web2 10.16.0.10:8085 cookie 2 weight 3 check inter 2000 rise 2 fall 3
	        # cookie 1表示serverid为1，check inter 1500 是检测心跳频率 
	        # rise 2是2次正确认为服务器可用，fall 3是3次失败认为服务器不可用，weight代表权重
	
	backend imgserver
	        mode    http
	        option  httpchk /index.php
	        balance roundrobin 
	        server  img01 192.168.137.101:80 check inter 2000 fall 3
	        server  img02 192.168.137.102:80 check inter 2000 fall 3
	
	backend dynamic 
	        balance roundrobin 
	        server  test1 192.168.1.23:80 check maxconn 2000 
	        server  test2 192.168.1.24:80 check maxconn 2000

* cookie
表示充许向cookie插入SERVERID,每台服务器的SERVERID可以下面的server关键字中使用cookie关键字定义。
* option httpchk
此选项表示启用HTTP的服务状态检测功能。 HAProxy作为一个专业的负载均衡器，并且它支持对backend部分指定的后端服务节点的 健康检查，以保证在后端的backend中某个节点不能服务时，把从frontend端进来的客户端请求分配至backend中其他健康节点上，从而保证 整体服务的可用性。
option httpchk用法：
	* method
	表示HTTP请求的方式，常用的有OPTIONS、GET、HEAD几种方式。
	一般健康检查可以采用HEAD方式进行，而不是采用GET方式，这是因为HEAD方式没有数据返回，仅检查Response的HEAD是不是状态码200。因此，相对于GET，HEAD方式更快，更简单。
	* uri
	表示要检测的URL地址，通过执行此URL，可以获取后端服务器的运行状态，在正常情况下返回状态码200，返回其他状态码均为异常状态。
	* version
	指定心跳检测时的HTTP的版本号。
* server
用来定义多台后端真实服务器,不能用于defaults和frontend部分,格式为:server name address:port param*
	* name
	为后端真实服务器指定一个内部名称，随便这下义一个即可。
	* address
	后端真实服务器的iP地址或主机名。
	* port
	指定连接请求发往真实服务器时的目标端口，在未设定时，将使用客户端请求时的同一端口。
	* param
	为后端服务器设定的一系列参数，可用参数非常多，
* check
表示启用对此后端服务器执行健康检查。
* inter
设置健康状态检查的时间间隔，单位为毫秒。
* rise
设置人故障状态转换至正常状态需要成功检查的次数，如 rise 2：表示2次检查正确就认为此服务器可用。
* fall
设置后端服务器从正常状态转换为不可用状态需要检查的次数，如 fall 3表示3 次检查失败就认为此服务器不可用。
* cookie
为指定的后端服务器设定cookie值，此外指定的值将在请求入站时被检查，第一次为此值挑选的后端服务器将在后续的请求中一直被选中，其目的在于实现持久连接的功能。
* cookie server1
表示web1的serverid为server1。
* weigth
设置后端真实服务器的权重，默认为1，最大值为256，设置为0表示不参与负载均衡。
* maxconn
设定每个backend中server进程可接受的最大并发连接数，此选项等同于linux命令选项”ulimit -n”
* backup
设置后端真实服务器的备份服器，仅仅在后端所有真实服务器均不可用的情况下才启用。

##### listen配置
常常用于状态页面监控，以及后端server检查，是Fronted和backend的组合体

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
	       stats auth    admin1:admin1        # 设置监控页面的用户和密码：admin1
	       stats hide-version                 # 隐藏统计页面上HAProxy的版本信息
	       stats admin if TRUE                # 设置手工启动/禁用，后端服务器(haproxy-1.4.9以后版本)

##### errorfile配置
格式为: errorfile  错误代码code  错误代码文件路径
errorfile错误页面配置，在用户请求不存在的页面时，返回一个页面文件给客户端，而非由haproxy生成的错误代码；可用于所有段中。例如：

	###################### 错误页面配置 ######################
	errorfile 403 /usr/local/haproxy/errorfiles/403.http
	errorfile 500 /usr/local/haproxy/errorfiles/500.http
	errorfile 502 /usr/local/haproxy/errorfiles/502.http
	errorfile 503 /usr/local/haproxy/errorfiles/503.http
	errorfile 504 /usr/local/haproxy/errorfiles/504.http

---

### 一份完整的haproxy配置文件实例：

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
