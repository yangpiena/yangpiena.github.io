---
title: HAProxy之ACL规则定义
author: 昜丿捺
copyright: true
layout: post
comments: true
date: 2017-12-20 10:03:51
categories: 技术
tags: [HAProxy]
keywords:
description:
---
HAProxy的ACL具有很强大的功能，能够定义三到七层的规则。ACL的作用，就是为了匹配一些特别的请求，然后对其进行修改或者分发到不同的服务器组中。
HAProxy的ACL用于实现基于请求报文的首部、响应报文的内容或 其它的环境状态信息来做出转发决策，这大大增强了其配置弹性。 其配置法则通常分为两步，首先去定义ACL，即定义一个测试条件 ，而后在条件得到满足时执行某特定的动作，如阻止请求或转发至 某特定的后端。

<!-- more -->

---

### ACL规则定义
格式：`acl <aclname> <criterion> [flags] [operator] [<value>]`

`<aclname>`：ACL名称，区分字符大小写，且其只能包含大小写字母、数字、-(连接线)、_(下划线)、.(点号)和:(冒号)；haproxy中，acl可以重名，这可以把多个测试条件定义为一个共同的acl；
`<criterion>`：测试标准，即对什么信息发起测试；测试方式可以由[flags]指定的标志进行调整；而有些测试标准也可以需要为其在`<value>`之前指定一个操作符[operator]；
`[flags]`：目前haproxy的acl支持的标志位有3个：
* -i：不区分中模式字符的大小写；
* -f：从指定的文件中加载模式；
* --：标志符的强制结束标记，在模式中的字符串像标记符时使用；

`<value>`：acl测试条件支持的值有以下4类：
* 整数或整数范围：如1024:65535表示从1024至65535；仅支持使用正整数(如果出现类似小数的标识，其为通常为版本测试)，且支持使用的操作符有5个，分别为eq、ge、gt、le和lt；
* 字符串：支持使用“-i”以忽略字符大小写，支持使用“\”进行转义；如果在模式首部出现了-i，可以在其之前使用“–”标志位；
* 正则表达式：其机制类同字符串匹配；
* IP地址及网络地址；
> 注意:同一个acl中可以指定多个测试条件，这些测试条件需要由逻辑操作符指定其关系。条件间的组合测试关系有三种：“与”(默认即为与操作)、“或”(使用“||”操作符)以及“非”(使用“!”操作符)。

---

###### 常用的测试标准(criteria)
- **基于七层协议（http）规则acl测试标准**
1. method `<string>`
测试HTTP请求报文中请求类型。
例如： 利用method来实现前段读写分离：
		acl  read method GET
		acl  read method HEAD
		acl write method PUT
		acl write method POST
		use_backend imgservers if read
		use_backend uploadservers if write

2. path_beg `<string>` ||url_beg
用于测试请求的URL是否以指定的模式开头;下面的例子用于测试URL是否以 /static、/images、/javascript或/stylesheets头。
例如：利用path_beg实现以/static /images开头的请求转交到 static server上：
		acl url_static path_beg -i /static /images 
		use_backend static if url_static 

3. path_end `<string>` || url_reg
用于测试请求的URL是否以<string>指定的模式结尾。例如，下面的例子用户测试URL是否以jpg、gif、png、css或js结尾
例如：利用path_end实现以.jpg .gif .png .css等结尾的格式的请求转交到 static server上：
		acl url_static path_end -i .jpg .gif .png .css .js .html
		use_backend static if url_static

4. hdr_beg `<string>`
用于测试请求报文的指定首部的开头部分是否符合<string>指定的模式。
例如：当request header中的host前缀部分匹配到lvs.test.net.:8080则将请求转给后端backend定义的 is_lvs3上
		acl is_lvs3 hdr_beg(host) -i lvs3.test.net:8080  
		use_backend lvs3 if is_lvs3 

5. hdr_end `<string>`
用于测试请求报文的指定首部的结尾部分是否符合<string>指定的模式
例如：当request header中的host后缀部分匹配到lvs3.test.net.:8080则将请求转给后端backend定义的 is_lvs2上
		acl is_lvs3 hdr_end(host) -i lvs3.test.net:8080  
		use_backend lvs3 if is_lvs2 

6. hdr `<string>`
用于测试请求报文中的所有首部或指定首部信息是否满足指定的条件；指定首部时， 其名称不区分大小写， 且在括号中“（）”不能有任何多余的空白字符。测试服务器端的响应报文时可以使用shdr()。
例如 当用户访问172.16.1.100时，重定向到http://www.afwing.com
		acl  dstipaddr  hdr(Host) 172.16.1.100
		redirect  location   http://www.afwing.com if  dstipaddr

7. hdr_reg `<string>`
如果请求的域名满足正则表达式，返回true， -i是忽略大小写
		acl denali_policy hdr_reg(host) -i ^(www.inbank.com|image.inbank.com)$

8. hdr_dom `<string>`
如果请求域名满足www.inbank.com，返回true， -i是忽略大小写
		acl tm_policy hdr_dom(host) -i www.inbank.com

9. url_sub
在请求url中包含sip_apiname=，则此控制策略返回true，否则为false
		acl invalid_req url_sub -i sip_apiname=#定义一个名为invalid_req的策略

10. url_dir
在请求url中存在timetask作为部分地址路径，则此控制策略返回true，否则返回false
		acl timetask_req url_dir -i timetask

11. hdr_cnt `<string>`
当请求的header中Content-length等于0时，返回true
		acl missing_cl hdr_cnt(Content-length) eq 0

- **基于四层协议（ip）规则acl测试标准**
1. dst和dst_port
定义访问地址为目标地址或目标端口的acl规则

2. src和src_port
定义访问地址为源地址或源端口的acl规则
例如： 允许10.0.0.0/24的用户访问，其他用户将禁止
		acl net10  src  10.0.0.0/24
		tcp-request content  accept  if  net10
		tcp-request  content  reject
		tcp-request content accept [ {if | unless} ]
		Accept a connection if/unless a content inspection condition is matched

---

### ACL规则引用
当定义好了ACL后我们可以利用“use_backend” 参数来引用acl规则，如果需要引用多个acl时，只需要依次在后面添加相关acl ，也可以 匹配多个acl，如下示例：
1. 正常写法：
		use_backend static if url_static

2. 或者写法：
		use_backend backend1 if aclA || aclB 
		use_backend backend1 if aclA || !aclC
注意上面“||”也可以使用or来表示

3. 非（不符合）写法：
		use_backend backend1 if aclA !aclB 
		use_backend backend1 if aclA !aclB !aclC

4. 与（and）写法：
		use_backend backend1 if aclA !aclB 
		use_backend backend1 if aclA !aclB !aclC

---

###### 常见应用实例
1. 当请求中header中Content-length等于0，阻止请求返回403
		block if missing_cl

2. block表示阻止请求，返回403错误，当前表示如果不满足策略invalid_req，或者满足策略timetask_req，则阻止请求。
		block if !invalid_req || timetask_req

3. 当满足denali_policy的策略时，使用denali_server的backend
		use_backend denali_server if denali_policy

4. 当满足tm_policy的策略时，使用tm_server的backend
		use_backend tm_server if tm_policy

5. reqisetbe关键字定义，根据定义的关键字选择backend
		reqisetbe ^Host:\ img dynamic
		reqisetbe ^[^\ ]\*\ /(img|css)/ dynamic
		reqisetbe ^[^\ ]\*\ /admin/stats stats

6. 以上都不满足的时候使用默认mms_server的backend
		default_backend mms

7. 利用acl实现页面动静分离;

		frontend webservs
		         bind            *:80
		         acl             url_static path_beg -i /static /images /javascript /stylesheets
		         acl             url_static path_end -i .jpg .gif .png .css .js .html
		         acl             url_php    path_end  -i .php
		         use_backend     static if url_static or host_static
		         use_backend     dynamic if url_php
		         default_backend dynamic
		backend static
		        balance roundrobin
		        server  node1 192.168.1.111:80 check maxconn 3000
		backend dynamic
		        balance roundrobin
		        server  node2 192.168.1.112:80 check maxconn 1000  