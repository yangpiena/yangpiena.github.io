---
title: 【Oracle】imp和exp语句
layout: post
comments: true
date: 2016-11-29 10:33:32
categories: Oracle
tags: 导入导出
keywords: 备份
description:
---
## exp/imp命令详解
exp		导出命令
imp		导入命令

**exp导出模式**
full模式：导出整个数据库
user模式：导出指定的用户
table模式：导出指定的表
tablespace模式：导出表空间

**exp导出参数**
owner：指定要导出的用户列表
full=y：表示要导出整个数据库
tables：指定要导出的表
tablepaces：指定要导出的表空间
rows=y：表示导出表数据,否则只导出表的结构.
help=y：表示要获取帮助
indexs：指定是否导出索引
grants：表示是否导出授权
query：定查询条件,允许用户导出表的一部分数据
triggers：指定是否导出触发器
<!-- more -->
## exp/imp使用方法
```
imp username/password@connect_string param=value …
exp username/password@connect_string param=value …
```
例如：
```
exp xcba/xcba@orcl file=C:\xcba.dmp log=C:\xcba.log owner=(xcba)
imp xcba/xcba@orcl file=C:\xcba.dmp log=C:\xcba.log full=y ignore=y
```
> 导出备份为dmp时，需要将Oracle在注册表里的编码设置为UTF8，否则会出现中文乱码。
具体作法：将“HKEY_LOCAL_MACHINE\SOFTWARE\ORACLE\KEY_OraDb10g_home1”下的“NLS_LANG”设置为“SIMPLIFIED CHINESE_CHINA.UTF8”

## exp/imp导入导出方式

### 1. 表方式，将指定表的数据导出/导入。
**导出：**
导出一张或几张表：
```
$ exp user/pwd file=/dir/xxx.dmp log=xxx.log tables=table1,table2 
$ exp user/pwd file=/dir/xxx.dmp log=xxx.log tables=table1,table2
```

如果是分区表
```
$ exp user/pwd file=/dir/xxx.dmp log=xxx.log tables=table1:tablespaces1,table2:tablespaces2 
$ exp user/pwd file=/dir/xxx.dmp log=xxx.log tables=table1:tablespaces1,table2:tablespaces2
```

导出某张表的部分数据
```
$ exp user/pwd file=/dir/xxx.dmp log=xxx.log tables=table1 query=\”where col1=\’…\’ and col2 \<…\” 
$ exp user/pwd file=/dir/xxx.dmp log=xxx.log tables=table1 query=\”where col1=\’…\’ and col2 \<…\”
```

**导入：**
导入一张或几张表
```
$  imp  user/pwd  file=/dir/xxx.dmp  log=xxx.log  tables=table1,table2  fromuser=dbuser touser=dbuser2 commit=y ignore=y 
$  imp  user/pwd  file=/dir/xxx.dmp  log=xxx.log  tables=table1,table2  fromuser=dbuser touser=dbuser2 commit=y ignore=y
```

如果是分区表
```
$  imp  user/pwd  file=/dir/xxx.dmp  log=xxx.log  tables=table1:tablespaces1,table2:tablespaces2  fromuser=dbuser touser=dbuser2 commit=y ignore=y 
$  imp  user/pwd  file=/dir/xxx.dmp  log=xxx.log  tables=table1:tablespaces1,table2:tablespaces2  fromuser=dbuser touser=dbuser2 commit=y ignore=y
```

### 2. 用户方式，将指定用户的所有对象及数据导出/导入。
**导出：**
```
$ exp user/pwd file=/dir/xxx.dmp log=xxx.log owner=(xx, yy) 
$ exp user/pwd file=/dir/xxx.dmp log=xxx.log owner=(xx, yy)
```

只导出数据对象，不导出数据  (rows=n )
```
$ exp user/pwd file=/dir/xxx.dmp log=xxx.log owner=user rows=n
```

**导入：**
```
imp  user/pwd  file=/dir/xxx.dmp  log=xxx.log  fromuser=dbuser  touser=dbuser2  mmit=y     ignore=y 
imp  user/pwd  file=/dir/xxx.dmp  log=xxx.log  fromuser=dbuser  touser=dbuser2  commit=y  ignore=y
```

### 3. 全库方式，将数据库中的所有对象导出/导入
**导出：**
```
$ exp user/pwd file=/dir/xxx.dmp log=xxx.log full=y commit=y ignore=y 
$ exp user/pwd file=/dir/xxx.dmp log=xxx.log full=y commit=y ignore=y
```

**导入：**
```
$ imp user/pwd file=/dir/xxx.dmp log=xxx.log fromuser=dbuser touser=dbuser2
```