---
title: SQL收缩数据库
layout: post
comments: true
date: 2018-10-29 15:56:44
categories: 技术
tags: [sql, 数据库]
keywords: 数据库
description:
---

#### 1. 查询当前数据库的基本信息
```sql
SELECT * FROM sysfiles;
```
> 记录查询结果的fileid值，在第2、3步要使用

#### 2. 收缩数据库
```sql
DBCC SHRINKDATABASE('数据库名');
```

#### 3. 收缩日志文件，第一个参数为fileid的值，0表示收缩到初始大小
```sql
DBCC SHRINKFILE(2,0);
```

#### 4. 收缩数据文件，第一个参数为fileid的值，0表示收缩到初始大小
```sql
DBCC SHRINKFILE(1,0);
```

#### 5. 执行更新操作
```sql
DBCC UPDATEUSAGE(0);
```