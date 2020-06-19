---
title: 数据库SQL Server与Access在写法上的区别
author: 昜丿捺
copyright: true
layout: post
comments: true
date: 2018-10-24 22:19:18
categories: 技术
tags: [sql, 数据库, Access]
description:
---

### 1. 查询语句WHERE条件带布尔类型值时
Access
```sql
AND IsA = true;
```
SQL Server
```sql
AND IsA = 1;
AND IsA = 'true';
```

<!-- more -->

### 2. 查询语句WHERE条件带日期时
```sql
SELECT * FROM 表 WHERE TimeTag = FORMAT('2016-1-6','yyyy-MM-dd hh:mm:ss');
SELECT * FROM 表 WHERE TimeTag = FORMAT("2016-1-6","yyyy-MM-dd hh:mm:ss");
```

### 3. 多分支的判断情况
Access
```sql
SELECT SWITCH(IsA = false, 0, IsA = true, 1) AS ColName FROM 表;
SELECT IIF(IsA IS NULL, 0, IsA)              AS ColName FROM 表;
```
SQL Server
```sql
SELECT CASE IsA WHEN NULL THEN 0 ELSE 1 END AS ColName AS A FROM 表;
SELECT CASE WHEN IsA IS NULL THEN 0 ELSE 1 END AS ColName AS A FROM 表;
```

### 4. 将字符类型转换成数值类型
Access
```sql
Val(str)
```
SQL Server
```sql
CONVERT(INT, str)
CAST(str AS INT)
```

### 5. 将数值类型转换成字符类型
Access
```sql
Str(num)
```
SQL Server
```sql
CONVERT(VARCHAR(20), num)
CAST(num AS VARCHAR)
```

### 6. 格式化日期
Access
```sql
FORMAT(NOW(),'yyyy-MM-dd')
FORMAT(NOW(),'yyyy-MM-dd hh:mm:ss')
```
SQL Server
```sql
CONVERT(VARCHAR(20),GETDATE(),23)
CONVERT(VARCHAR(20),GETDATE(),120)
```

### 7. 参数化更新或新增数据时，SQl 语句中的字段顺序需与参数列表的顺序保持一致
如更新SQL：  
```sql
UPDATE 表 SET Name = @Name, Age = @Age WHERE ID = @ID
```
则参数必须定义为：

      OleDbParameter[] param = new OleDbParameter
      {
          new OleDbParameter("@Name", model.Name),
          new OleDbParameter("@Age", model.Age),
          new OleDbParameter("@ID", model.ID), 
       }

### 8. Access类似于SQL Server的函数ISNULL()
```sql
IIF(IsA = '' OR IsA IS NULL, '', IsA)
```

### 9. Access创建表或添加列时，必须附带默认约束（Defualt）

### 10. Access创建新列时，如果未添加默认约束，在采用内置函数STR(A)查询时会显示null值
如下：
```sql
ALTER TABLE 表 ADD A VARCHAR(23)
SELECT IIF(STR(A) IS NULL, '空', '非空') FROM 表
```

### 11. 当表从Access数据库导入到SQL Server中时，原表中的自增长列会丢失，需要重新建立自增长标识。

### 12. 当表从Access数据库导入到SQL Server中时，Access的数据如果存在密码，则以独立的方式清空Access原设置的密码即可。

### 13. 多表关联查询
Access（可理解为始终是两表间的操作）
```sql
SELECT * FROM  (A INNER JOIN B ON A.ID = B.ID ) INNER JOIN C ON B.ID = C.ID;
SELECT * FROM ((A INNER JOIN B ON A.ID = B.ID ) INNER JOIN C ON B.ID = C.ID) INNER JOIN D ON C.ID = D.ID;
```
SQL Server
```sql
SELECT * FROM A INNER JOIN B ON A.ID = B.ID INNER JOIN C ON B.ID = C.ID;
```