---
title: SQL常见问题
layout: post
comments: true
date: 2016-11-29 09:53:02
categories: 技术
tags: [FAQ, SQL]
keywords:
description:
---
# 关于SQL的常见问题解答

### 1. SQL语句在Access里可正常执行，但在VB程序里报“FROM子句语法错误”

例如，报错SQL:
```sql
SELECT
	gz,
	yz
FROM
	(SELECT DISTINCT gz, yz FROM dg LEFT JOIN dgdw ON dg.dg = dgdw.gz WHERE cpxh = 'abc') AS a
ORDER BY
	gz;
```
在Access里执行没问题，但放到代码里就`FROM子句语法错误`。此时，只需将from子语句用[]括起来，后面跟一个.即可。
正确SQL如下：
<!-- more -->
```sql
SELECT
	gz,
	yz
FROM
	[SELECT DISTINCT gz, yz FROM dg LEFT JOIN dgdw ON dg.dg = dgdw.gz WHERE cpxh = 'abc']. AS a
ORDER BY
	gz;
```

### 2. SQL Server安装提示暂挂项目
打开注册表编辑器，在`HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager`中找到`PendingFileRenameOperations`项目，并删除它。这样就可以清除安装暂挂项目。