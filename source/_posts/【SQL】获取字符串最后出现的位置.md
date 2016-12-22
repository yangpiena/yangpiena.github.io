---
title: 【SQL】获取字符串最后出现的位置
layout: post
comments: true
date: 2016-11-29 15:24:58
categories: SQL
tags: 字符串
keywords: 截取
description:
---

#### 1. 如：'6.7.8.2.3.4.x'得到最后一个'.'在字符串的位置：
```sql
DECLARE @str3 VARCHAR (50)
SET @str3 = '6.7.8.2.3.4.x' 
SELECT LEN(@str3) - CHARINDEX('.', REVERSE(@str3)) + 1
```
	Integer:12

<!-- more -->

### 2. 如：'6.7.8.2.3.4.x'得到最后一个'.'前面的字符串：
```sql
DECLARE @str2 VARCHAR (50)
SET @str2 = '6.7.8.2.3.4.x' 
SELECT SUBSTRING (@str2, 1, (LEN(@str2) - CHARINDEX('.', REVERSE(@str2)) ) )
```
	string:'6.7.8.2.3.4'

### 3. 如：'6.7.8.2.3.4.x'得到最后一个'.'后面的字符串：
```sql
DECLARE @str1 VARCHAR (50)
SET @str1 = '6.7.8.2.3.4.x' 
SELECT REVERSE(SUBSTRING (REVERSE(@str1), 1, CHARINDEX('.', REVERSE(@str1)) - 1) )
```
	string:'x'