---
title: Oracle之删除和创建表空间及用户
layout: post
comments: true
date: 2016-11-29 10:23:08
categories: Oracle
tags: 创建表空间
keywords:
description:
---
### 1. 删除表空间和用户
```
DROP USER XCBA CASCADE;

DROP tablespace XCBA_temp including contents AND datafiles;

DROP tablespace XCBA including contents AND datafiles;
```
<!-- more -->
### 2. 创建临时表空间
```
CREATE TEMPORARY tablespace XCBA_TEMP 
tempfile 'E:\oracle\product\10.2.0\oradata\XCBA\XCBA_TEMP.dbf' 
SIZE 32m 
autoextend ON 
NEXT 32m maxsize 2048m 
extent management LOCAL;
```

### 3. 创建数据表空间
```
CREATE tablespace XCBA 
logging datafile 'E:\oracle\product\10.2.0\oradata\XCBA\XCBA.dbf' 
SIZE 32m 
autoextend ON 
NEXT 32m maxsize 2048m 
extent management LOCAL;
```

### 4. 创建用户并指定表空间
```
CREATE USER XCBA identified BY XCBA 
DEFAULT tablespace XCBA 
TEMPORARY tablespace XCBA_TEMP;
```

### 5. 给用户授予权限
```
GRANT CONNECT, resource TO XCBA;

ALTER USER XCBA ACCOUNT UNLOCK;

GRANT dba TO XCBA;

ALTER USER XCBA DEFAULT role DBA
```