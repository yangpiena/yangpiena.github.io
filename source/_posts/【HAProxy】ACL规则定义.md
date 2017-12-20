---
title: 【HAProxy】ACL规则定义
layout: post
comments: true
date: 2017-12-20 10:03:51
categories: HAProxy
tags: [HAProxy]
keywords:
description:
---
### ACL规则定义
1. 如果请求的域名满足正则表达式，返回true， -i是忽略大小写
acl denali_policy hdr_reg(host) -i ^(www.inbank.com|image.inbank.com)$

2. 如果请求域名满足www.inbank.com，返回true， -i是忽略大小写
acl tm_policy hdr_dom(host) -i www.inbank.com

3. 在请求url中包含sip_apiname=，则此控制策略返回true，否则为false
acl invalid_req url_sub -i sip_apiname=#定义一个名为invalid_req的策略

4. 在请求url中存在timetask作为部分地址路径，则此控制策略返回true，否则返回false
acl timetask_req url_dir -i timetask

5. 当请求的header中Content-length等于0时，返回true
acl missing_cl hdr_cnt(Content-length) eq 0

<!-- more -->

### ACL规则匹配相应
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