---
title: SQL经典语句
author: 昜丿捺
copyright: true
layout: post
comments: true
date: 2016-11-29 15:38:32
categories: 技术
tags: [sql, 经典语句]
keywords:
description:
toc: true
---

# 一. 基础篇

## 1. 创建数据库
```sql
CREATE DATABASE database-name
```

## 2. 删除数据库
```sql
DROP database dbname
```

## 3. 备份sql server
创建 备份数据的 device
```sql
USE master
EXEC sp_addumpdevice 'disk', 'testBack', 'c:\mssql7backup\MyNwind_1.dat'
```
开始 备份
```sql
BACKUP DATABASE pubs TO testBack 
```

<!-- more -->

## 4. 创建新表
```sql
CREATE table tabname(col1 type1 [NOT null] [primary key],col2 type2 [NOT null],..)
```
根据已有的表创建新表：
```sql
CREATE table tab_new like tab_old (使用旧表创建新表)
CREATE table tab_new AS SELECT col1,col2… FROM tab_old definition only
```

## 5. 删除新表
```sql
DROP TABLE tabname
```

## 6. 增加一个列
```sql
Alter table tabname ADD column col type
```
> 注：列增加后将不能删除。DB2中列加上后数据类型也不能改变，唯一能改变的是增加varchar类型的长度。

## 7. 添加主键
```sql
ALTER TABLE tabname ADD PRIMARY KEY (col)
```
删除主键
```sql
ALTER TABLE tabname DROP PRIMARY KEY (col)
```

## 8. 创建索引
```sql
CREATE [unique] index idxname ON tabname(col….) 
```
删除索引
```sql
DROP index idxname
```
> 注：索引是不可更改的，想更改必须删除重新建。

## 9. 创建视图
```sql
CREATE view viewname AS SELECT statement 
```
删除视图
```sql
DROP view viewname
```

## 10. 几个简单的基本sql语句
选择
```sql
SELECT * FROM table1 WHERE 范围
```
插入
```sql
INSERT INTO table1(field1,field2) VALUES(value1,value2)
```
删除
```sql
DELETE FROM table1 WHERE 范围
```
更新
```sql
update table1 SET field1=value1 WHERE 范围
```
查找
```sql
SELECT * FROM table1 WHERE field1 like ’%value1%’
```
排序
```sql
SELECT * FROM table1 ORDER BY field1,field2 [DESC]
```
总数
```sql
SELECT COUNT AS totalcount FROM table1
```
求和
```sql
SELECT SUM(field1) AS sumvalue FROM table1
```
平均
```sql
SELECT avg(field1) AS avgvalue FROM table1
```
最大
```sql
SELECT MAX(field1) AS maxvalue FROM table1
```
最小
```sql
SELECT min(field1) AS minvalue FROM table1
```

## 11. 几个高级查询运算词
- A： UNION 运算符 
UNION 运算符通过组合其他两个结果表（例如 TABLE1 和 TABLE2）并消去表中任何重复行而派生出一个结果表。当 ALL 随 UNION一起使用时（即 UNION ALL），不消除重复行。两种情况下，派生表的每一行不是来自 TABLE1 就是来自 TABLE2。 
- B： EXCEPT 运算符 
EXCEPT 运算符通过包括所有在 TABLE1 中但不在 TABLE2 中的行并消除所有重复行而派生出一个结果表。当 ALL 随 EXCEPT 一起使用时 (EXCEPT ALL)，不消除重复行。 
- C： INTERSECT 运算符
INTERSECT 运算符通过只包括 TABLE1 和 TABLE2 中都有的行并消除所有重复行而派生出一个结果表。当 ALL 随 INTERSECT 一起使用时 (INTERSECT ALL)，不消除重复行。 
> 注：使用运算词的几个查询结果行必须是一致的。

## 12. 使用外连接
- A. LEFT （outer） join： 
左外连接（左连接）：结果集几包括连接表的匹配行，也包括左连接表的所有行。 
```sql
SELECT a.a, a.b, a.c, b.c, b.d, b.f FROM a LEFT OUT JOIN b ON a.a = b.c
```
- B：right （outer） join: 
右外连接(右连接)：结果集既包括连接表的匹配连接行，也包括右连接表的所有行。 
- C：full/cross （outer） join： 
全外连接：不仅包括符号连接表的匹配行，还包括两个连接表中的所有记录。

## 13. 分组:Group by
一张表，一旦分组 完成后，查询后只能得到组相关的信息。
组相关的信息：（统计信息） COUNT,SUM,MAX,min,avg 分组的标准)
在SQLServer中分组时：不能以text,ntext,image类型的字段作为分组依据
在SELECTe统计函数中的字段，不能和普通的字段放在一起；

## 14. 对数据库进行操作
分离数据库： sp_detach_db; 附加数据库：sp_attach_db 后接表明，附加需要完整的路径名

## 15. 如何修改数据库的名称
```sql
sp_renamedb 'old_name', 'new_name'
```

## 16. 查询字段ID最大值的记录
无索引
```sql
SELECT time FROM table t1 WHERE NOT exists (SELECT 1 FROM table WHERE id > t1.id) 
```
有索引
```sql
SELECT time FROM table WHERE id IN (SELECT MAX(id) FROM table)
```

## 17. 查询某一列的重复项内容
```sql
SELECT * FROM documentation AS A WHERE (SELECT COUNT(*) FROM documentation WHERE fileName=A.fileName)>1 
```

## 18. 判断表中是否存在记录
```sql
SELECT COUNT (*) FROM tableName WHERE conditions
```

---

# 二. 提升篇

## 1. 复制表(只复制结构,源表名：a 新表名：b) (Access可用)
法一：
```sql
SELECT * INTO b FROM a WHERE 1<>1（仅用于SQlServer）
```
法二：
```sql
SELECT TOP 0 * INTO b FROM a
```

## 2. 拷贝表(拷贝数据,源表名：a 目标表名：b) (Access可用)
```sql
INSERT INTO b(a, b, c) SELECT d,e,f FROM b;
```

## 3. 跨数据库之间表的拷贝(具体数据使用绝对路径) (Access可用)
```sql
INSERT INTO b(a, b, c) SELECT d,e,f FROM b IN ‘具体数据库’ WHERE 条件
```
例子：..FROM b IN '"&Server.MapPath(".")&"\data.mdb" &"' WHERE..

## 4. 子查询(表名1：a 表名2：b)
```sql
SELECT a,b,c FROM a WHERE a IN (SELECT d FROM b ) 或者: SELECT a,b,c FROM a WHERE a IN (1,2,3)
```

## 5. 显示文章、提交人和最后回复时间
```sql
SELECT a.title,a.username,b.adddate FROM table a,(SELECT MAX(adddate) adddate FROM table WHERE table.title=a.title) b
```

## 6. 外连接查询(表名1：a 表名2：b)
```sql
SELECT a.a, a.b, a.c, b.c, b.d, b.f FROM a LEFT OUT JOIN b ON a.a = b.c
```

## 7. 在线视图查询(表名1：a )
```sql
SELECT * FROM (SELECT a,b,c FROM a) T WHERE t.a > 1;
```

## 8. between的用法,between限制查询数据范围时包括了边界值,NOT between不包括
```sql
SELECT * FROM table1 WHERE time BETWEEN time1 AND time2
```
```sql
SELECT a,b,c, FROM table1 WHERE a NOT BETWEEN 数值1 AND 数值2
```

## 9. IN 的使用方法
```sql
SELECT * FROM table1 WHERE a [NOT] IN (‘值1’,’值2’,’值4’,’值6’)
```

## 10. 两张关联表，删除主表中已经在副表中没有的信息 
```sql
DELETE FROM table1 WHERE NOT exists ( SELECT * FROM table2 WHERE table1.field1=table2.field1 )
```

## 11. 四表联查问题
```sql
SELECT * FROM a LEFT INNER JOIN b ON a.a=b.b RIGHT INNER JOIN c ON a.a=c.c inner join d ON a.a=d.d WHERE .....
```

## 12. 日程安排提前五分钟提醒 
```sql
SELECT * FROM 日程安排 WHERE DATEDIFF('minute',f开始时间,GETDATE())>5
```

## 13. 一条sql语句搞定数据库分页
```sql
SELECT TOP 10 b.* FROM (SELECT TOP 20 主键字段,排序字段 FROM 表名 ORDER BY 排序字段 DESC) a,表名 b WHERE b.主键字段 = a.主键字段 ORDER BY a.排序字段
```
关于数据库分页：
```sql
DECLARE @start int,@END int
@sql NVARCHAR(600)
SET @sql=’SELECT TOP’+str(@END-@start+1)+’+FROM T WHERE rid NOT IN(SELECT TOP’+str(@str-1)+’Rid FROM T WHERE Rid>-1)’
EXEC sp_executesql @sql
```
>注意：在top后不能直接跟一个变量，所以在实际应用中只有这样的进行特殊的处理。Rid为一个标识列，如果top后还有具体的字段，这样做是非常有好处的。因为这样可以避免 top的字段如果是逻辑索引的，查询的结果后实际表中的不一致（逻辑索引中的数据有可能和数据表中的不一致，而查询时如果处在索引则首先查询索引）

## 14. 前10条记录
```sql
SELECT TOP 10 * FROM table1 WHERE 范围
```

## 15. 选择在每一组b值相同的数据中对应的a最大的记录的所有信息(类似这样的用法可以用于论坛每月排行榜,每月热销产品分析,按科目成绩排名,等等.)
```sql
SELECT a,b,c FROM tablename ta WHERE a=(SELECT MAX(a) FROM tablename tb WHERE tb.b=ta.b)
```

## 16. 包括所有在 TableA 中但不在 TableB和TableC 中的行并消除所有重复行而派生出一个结果表
```sql
(SELECT a FROM tableA ) except (SELECT a FROM tableB) except (SELECT a FROM tableC)
```

## 17. 随机取出10条数据
```sql
SELECT TOP 10 * FROM tablename ORDER BY newid()
```

## 18. 随机选择记录
```sql
SELECT newid()
```

## 19. 删除重复记录
- 方法一：
```sql
DELETE FROM tablename WHERE id NOT IN (SELECT MAX(id) FROM tablename GROUP BY col1,col2,...)
```
- 方法二：
```sql
SELECT distinct * INTO temp FROM tablename
DELETE FROM tablename
INSERT INTO tablename SELECT * FROM temp
```
>评价： 这种操作牵连大量的数据的移动，这种做法不适合大容量的数据操作

- 方法三： 例如：在一个外部表中导入数据，由于某些原因第一次只导入了一部分，但很难判断具体位置，这样只有在下一次全部导入，这样也就产生好多重复的字段，怎样删除重复字段
```sql
ALTER TABLE tablename
ADD column_b int identity(1,1)	--添加一个自增列
DELETE FROM tablename WHERE column_b NOT IN(
SELECT MAX(column_b) FROM tablename GROUP BY column1,column2,...)
ALTER TABLE tablename DROP column column_b
```

## 20. 列出数据库里所有的表名
```sql
SELECT name FROM sysobjects WHERE type='U' // U代表用户
```

## 21. 列出表里的所有的列名
```sql
SELECT name FROM syscolumns WHERE id=object_id('TableName')
```

## 22. 列示type、vender、pcs字段，以type字段排列，case可以方便地实现多重选择，类似SELECT 中的case。
```sql
SELECT type,SUM(case vender when 'A' then pcs ELSE 0 END),SUM(case vender when 'C' then pcs ELSE 0 END),SUM(case vender when 'B' then pcs ELSE 0 END) FROM tablename GROUP BY type
```
显示结果：

|type|vender|pcs|
|---|---|---|
|电脑| A| 1|
|电脑| A| 1|
|光盘| B| 2|
|光盘| A| 2|
|手机| B| 3|
|手机| C| 3|

## 23. 初始化表
```sql
TRUNCATE TABLE table1
```

## 24. 选择从10到15的记录
```sql
SELECT TOP 5 * FROM (SELECT TOP 15 * FROM table ORDER BY id ASC) table_别名 ORDER BY id DESC
```

## 25. 临时表

#### 创建临时表
- 方法一：
```sql
CREATE table #临时表名(字段1 约束条件,
                       字段2 约束条件,
                      .....)
CREATE table ##临时表名(字段1 约束条件,
                        字段2 约束条件,
                        .....)
```
    例：
    ```sql
    CREATE table #Tmp --创建临时表#Tmp
    (
        ID   int IDENTITY (1,1)     NOT null, --创建列ID,并且每次新增一条记录就会加1
        WokNo                VARCHAR(50),   
        primary key (ID)      --定义ID为临时表#Tmp的主键      
    );
    ```
- 方法二：
```sql
SELECT * INTO #临时表名 FROM 你的表;
SELECT * INTO ##临时表名 FROM 你的表;
```
>注：以上的#代表局部临时表，##代表全局临时表

#### 查询临时表
```sql
SELECT * FROM #临时表名;
SELECT * FROM ##临时表名;
```
#### 删除临时表
```sql
DROP table #临时表名;
DROP table ##临时表名;
```

## 26. 关联表更新
SQL SERVER
```sql
UPDATE A SET A.b=B.d FROM tableA A INNER JOIN tableB B ON A.a = B.a;
```
MYSQL
```sql
UPDATE tableA A INNER JOIN tableB B ON A.a = B.a SET A.b=B.d;
```

## 27. 查看表的所有外键关系
```sql
SELECT t1.*,t2.name,t3.name FROM dbo.sysforeignkeys t1 LEFT join sysobjects t2 ON t1.fkeyid=t2.id 
           LEFT join sysobjects t3 ON t1.rkeyid=t3.id WHERE t3.name='表名 '
```

## 28. 删除所有约束
```sql
DECLARE c1 cursor for
    SELECT 'ALTER TABLE ['+ object_name(parent_obj) + '] DROP constraint ['+name+']; '
    FROM sysobjects
    WHERE xtype = 'F'
OPEN c1
DECLARE @c1 VARCHAR(8000)
FETCH NEXT FROM c1 INTO @c1
WHILE(@@fetch_status=0)
    BEGIN
        EXEC(@c1)
        FETCH NEXT FROM c1 INTO @c1
    END
CLOSE c1
deallocate c1
```

## 29. 删除数据库所有表
```sql
DECLARE @tname VARCHAR(8000)
SET @tname=''
SELECT @tname=@tname + Name + ',' FROM sysobjects WHERE xtype='U'
SELECT @tname='DROP table ' + LEFT(@tname,LEN(@tname)-1)
EXEC(@tname)
```

## 30. 删除外键约束
得到某个表被哪些外键引用，并且显示出外键表的表名
```sql
SELECT
    fk.name,
    fk.object_id,
    OBJECT_NAME(fk.parent_object_id) AS referenceTableName
FROM
    sys.foreign_keys AS fk
JOIN sys.objects AS o ON fk.referenced_object_id = o.object_id
WHERE
    o.name = 'ATTACHMENTDOC';
```
通过外键表的表名和外键名称执行以下语句即可删除外键
```sql
ALTER TABLE dbo.CONTRACTINFO DROP CONSTRAINT FK_CONTRACTINFO_ATTACHMENTDOC
```

## 31. 查找指定数据库表的列名、数据类型、数据长度、注释
SQL SERVER 2000
```sql
    SELECT sysobjects.name AS 表名, syscolumns.name AS 列名, systypes.name AS 数据类型, syscolumns.length AS 数据长度, sysproperties.[value] AS 注释
      FROM sysproperties
RIGHT JOIN sysobjects
INNER JOIN syscolumns ON sysobjects.id    = syscolumns.id
INNER JOIN systypes   ON syscolumns.xtype = systypes.xtype 
                      ON sysproperties.id = syscolumns.id AND sysproperties.smallid = syscolumns.colid
     WHERE (sysobjects.xtype = 'u' OR sysobjects.xtype = 'v')
       AND (systypes.name <> 'sysname')
       AND sysproperties.[value] IS NOT NULL --查询注释不为 NULL 的记录
       AND (sysobjects.name = '指定数据库表')
  ORDER BY 1, 2;
```
SQL SERVER 2005及以上
```sql
    SELECT ta.name AS 表名, c.name AS 列名, t.name AS 数据类型, c.max_length AS 数据长度, ex.[value] AS 注释
      FROM sys.columns               AS c
INNER JOIN sys.tables                AS ta ON c.object_id = ta.object_id
 LEFT JOIN sys.extended_properties   AS ex ON ex.major_id = c.object_id AND ex.minor_id = c.column_id
INNER JOIN (SELECT name, system_type_id
              FROM sys.types
             WHERE name <> 'sysname') AS t ON c.system_type_id = t.system_type_id
     WHERE ta.name = '指定数据库表'
       AND ex.[value] IS NOT NULL
  ORDER BY 1, 2;
```

## 32. 同步表数据
```sql
INSERT 表2 
SELECT * FROM 表1 AS a WHERE NOT EXISTS(SELECT 1 FROM 表2 WHERE ID = a.ID);
```

## 33. 判断某列中是否包含中文字符或者英文字符
```sql
SELECT * FROM 表名 WHERE 某列 LIKE '%[吖-座]%'
SELECT * FROM 表名 WHERE 某列 LIKE '%[a-z]%'
```

## 34. 行转列，将多行数据合并成一行（SQL SERVER 2005以上支持）
例如，表Table1中有两列数据：

|code       |name|
|-------  	|---|
|AAA        |姓名1|
|AAA        |姓名2|
|AAA        |姓名3|
|BBB        |姓名4|
|BBB        |姓名5|

行转列，想变成如下格式：

|code       |name|
|-------  	|---|
|AAA        |姓名1,姓名2,姓名3|
|BBB        |姓名4,姓名5|

可用如下SQL实现：
```sql
  SELECT code, name = (STUFF((SELECT ',' + name 
                                FROM Table1 
                               WHERE code = a.code FOR xml PATH('')),1,1,''))
    FROM Table1 a 
GROUP BY code
```

## 35. 去除字段中空格、换行符、回车符
```sql
UPDATE xx_sjb SET sl = LTRIM(RTRIM(REPLACE(REPLACE(sl, CHAR(10), ''), CHAR (13), '')))
```

---

# 三. 技巧篇

## 1. 1=1，1=2的使用，在SQL语句组合时用的较多
    “WHERE 1=1” 表示选择全部
    “WHERE 1=2” 表示全部不选
	
## 2. 收缩数据库
- 重建索引
```sql
DBCC REINDEX
DBCC INDEXDEFRAG
```
- 收缩数据和日志
```sql
DBCC SHRINKDB
DBCC SHRINKFILE
```

## 3. 压缩数据库
```sql
dbcc shrinkdatabase(dbname)
```

## 4. 转移数据库给新用户以已存在用户权限
```sql
EXEC sp_change_users_login 'update_one','newname','oldname'
go
```

## 5. 检查备份集
```sql
RESTORE VERIFYONLY FROM disk='E:\dvbbs.bak'
```

## 6. 修复数据库
```sql
ALTER DATABASE [dvbbs] SET SINGLE_USER
GO
DBCC CHECKDB('dvbbs',repair_allow_data_loss) WITH TABLOCK
GO
ALTER DATABASE [dvbbs] SET MULTI_USER
GO
```

## 7. 日志清除
```sql
	SET NOCOUNT ON
	DECLARE @LogicalFileName sysname,
	@MaxMinutes INT,
	@NewSize INT

	USE tablename -- 要操作的数据库名
	SELECT  @LogicalFileName = 'tablename_log', -- 日志文件名
	@MaxMinutes = 10, -- Limit ON time allowed to wrap log.
	@NewSize = 1  -- 你想设定的日志文件的大小(M)
	Setup / initialize
	DECLARE @OriginalSize int
	SELECT @OriginalSize = size 
	FROM sysfiles
	WHERE name = @LogicalFileName
	SELECT 'Original Size of ' + db_name() + ' LOG is ' + 
	CONVERT(VARCHAR(30),@OriginalSize) + ' 8K pages or ' + 
	CONVERT(VARCHAR(30),(@OriginalSize*8/1024)) + 'MB'
	FROM sysfiles
	WHERE name = @LogicalFileName
	CREATE TABLE DummyTrans
	(DummyColumn char (8000) NOT null)

	DECLARE @Counter    INT,
	@StartTime DATETIME,
	@TruncLog   VARCHAR(255)
	SELECT @StartTime = GETDATE(),
	@TruncLog = 'BACKUP LOG ' + db_name() + ' WITH TRUNCATE_ONLY'
	DBCC SHRINKFILE (@LogicalFileName, @NewSize)
	EXEC (@TruncLog)
	-- Wrap the log IF necessary.
	WHILE @MaxMinutes > DATEDIFF (mi, @StartTime, GETDATE()) -- time has NOT expired
	AND @OriginalSize = (SELECT size FROM sysfiles WHERE name = @LogicalFileName)  
	AND (@OriginalSize * 8 /1024) > @NewSize  
	BEGIN -- Outer loop.
	SELECT @Counter = 0
	WHILE   ((@Counter < @OriginalSize / 16) AND (@Counter < 50000))
	BEGIN -- update
	INSERT DummyTrans VALUES ('Fill Log') DELETE DummyTrans
	SELECT @Counter = @Counter + 1
	END
	EXEC (@TruncLog)  
	END
	SELECT 'Final Size of ' + db_name() + ' LOG is ' +
	CONVERT(VARCHAR(30),size) + ' 8K pages or ' + 
	CONVERT(VARCHAR(30),(size*8/1024)) + 'MB'
	FROM sysfiles 
	WHERE name = @LogicalFileName
	DROP TABLE DummyTrans
	SET NOCOUNT OFF
```

## 8. 更改某个表
```sql
EXEC sp_changeobjectowner 'tablename','dbo'
```

## 9. 存储更改全部表
```sql
CREATE PROCEDURE dbo.User_ChangeObjectOwnerBatch
@OldOwner AS NVARCHAR(128),
@NewOwner AS NVARCHAR(128)
AS
DECLARE @Name    AS NVARCHAR(128)
DECLARE @Owner   AS NVARCHAR(128)
DECLARE @OwnerName   AS NVARCHAR(128)
DECLARE curObject CURSOR FOR 
SELECT 'Name'    = name,
   'Owner'    = user_name(uid)
FROM sysobjects
WHERE user_name(uid)=@OldOwner
ORDER BY name
OPEN   curObject
FETCH NEXT FROM curObject INTO @Name, @Owner
WHILE(@@FETCH_STATUS=0)
BEGIN     
IF @Owner=@OldOwner 
BEGIN
   SET @OwnerName = @OldOwner + '.' + rtrim(@Name)
   EXEC sp_changeobjectowner @OwnerName, @NewOwner
END
-- SELECT @name,@NewOwner,@OldOwner
FETCH NEXT FROM curObject INTO @Name, @Owner
END
CLOSE curObject
deallocate curObject
GO
```

## 10. SQL SERVER中直接循环写入数据
```sql
DECLARE @i int
SET @i=1
WHILE @i<30
BEGIN
INSERT INTO test (userid) VALUES(@i)
SET @i=@i+1
END
```
案例：有如下表，要求就表中所有沒有及格的成绩，在每次增长0.1的基础上，使他们刚好及格:

| Name 			| score |
| -------  		| ---: |
|Zhangshan		|80|
|Lishi  		|59|
|Wangwu  		|50|
|Songquan 		|69|
```sql
WHILE((SELECT min(score) FROM tb_table)<60)
BEGIN
update tb_table SET score =score*1.01
WHERE score<60
IF (SELECT min(score) FROM tb_table)>60
BREAK
ELSE
CONTINUE
END
```

## 11. 查看数据库属性
```sql
sp_helpdb 数据库名
```

## 12. 按姓氏笔画排序:
```sql
SELECT * FROM TableName ORDER BY CustomerName Collate Chinese_PRC_Stroke_ci_as //从少到多
```

## 13. 数据库加密:
```sql
SELECT encrypt('原始密码')
SELECT pwdencrypt('原始密码')
SELECT pwdcompare('原始密码','加密后密码') = 1--相同；否则不相同 encrypt('原始密码')
SELECT pwdencrypt('原始密码')
SELECT pwdcompare('原始密码','加密后密码') = 1--相同；否则不相同
```

## 14. 取回表中字段:
```sql
DECLARE @list VARCHAR(1000),
@sql NVARCHAR(1000) 
SELECT @list=@list+','+b.name FROM sysobjects a,syscolumns b WHERE a.id=b.id AND a.name='表A'
SET @sql='SELECT '+right(@list,LEN(@list)-1)+' FROM 表A' 
EXEC (@sql)
```

## 15. 查看硬盘分区:
```sql
EXEC master..xp_fixeddrives
```

## 16. 比较A,B表是否相等:
```sql
IF (SELECT checksum_agg(binary_checksum(*)) FROM A)
     =
    (SELECT checksum_agg(binary_checksum(*)) FROM B)
PRINT '相等'
ELSE
PRINT '不相等'
```

## 17. 杀掉所有的事件探察器进程:
```sql
DECLARE hcforeach CURSOR GLOBAL FOR SELECT 'kill '+RTRIM(spid) FROM master.dbo.sysprocesses
WHERE program_name IN('SQL profiler',N'SQL 事件探查器')
EXEC sp_msforeach_worker '?'
```

## 18. 记录搜索:
- 开头到N条记录
```sql
SELECT TOP N * FROM 表
```
- N到M条记录(要有主索引ID)
```sql
SELECT TOP M-N * FROM 表 WHERE ID IN (SELECT TOP M ID FROM 表) ORDER BY ID DESC
```
- N到结尾记录
```sql
SELECT TOP N * FROM 表 ORDER BY ID DESC
```

## 19. 获取当前数据库中的所有用户表
```sql
SELECT name FROM sysobjects WHERE xtype='u' AND status>=0
```

## 20. 获取某一个表的所有字段
```sql
SELECT name FROM syscolumns WHERE id=object_id('表名')
SELECT name FROM syscolumns WHERE id IN (SELECT id FROM sysobjects WHERE type = 'u' AND name = '表名')
```

## 21. 查看与某一个表相关的视图、存储过程、函数
```sql
SELECT a.* FROM sysobjects a, syscomments b WHERE a.id = b.id AND b.text like '%表名%'
```

## 22. 查看当前数据库中所有存储过程
```sql
SELECT name AS 存储过程名称 FROM sysobjects WHERE xtype='P'
```

## 23. 查询用户创建的所有数据库
```sql
SELECT * FROM master..sysdatabases D WHERE sid NOT IN(SELECT sid FROM master..syslogins WHERE name='sa')
SELECT dbid, name AS DB_NAME FROM master..sysdatabases WHERE sid <> 0x01
```

## 24. 查询某一个表的字段和数据类型
```sql
SELECT column_name,data_type FROM information_schema.columns
WHERE table_name = '表名'
```

## 25. 不同服务器数据库之间的数据操作

#### 25.1 创建链接服务器
- 创建一个链接名
```sql
EXEC sp_addlinkedserver 'LinkName ', ' ', 'SQLOLEDB ', '远程服务器名或IP地址 ' --有自定义实例名时要加上"/实例名"
```
- 创建登录信息（或叫创建链接服务器登录名映射）（只需选择一种方式即可）
    + 以windows认证的方式登录
    ```sql
    EXEC sp_addlinkedsrvlogin 'LinkName'  --或EXEC sp_addlinkedsrvlogin 'LinkName','true'
    ```
    + 以SQL认证的方式登录
    ```sql
    EXEC sp_addlinkedsrvlogin 'LinkName ', 'false ',null, '用户名 ', '密码 '
    ```
#### 25.2 链接服务器相关数据操作
- 查询示例
```sql
SELECT * FROM LinkName.数据库名.架构名.表名
```
#### 25.3 删除链接服务器
- 删除登录信息(或叫删除链接服务器登录名映射)
```sql
EXEC sp_DROPlinkedsrvlogin 'LinkName',NULL
```
- 删除链接服务器名称
```sql
EXEC sp_DROPserver 'LinkName ', 'DROPlogins' --如果指定DROPlogins，则在删除链接服务器之前要删除登录名映射
```
#### 25.4 其它连接远程/局域网数据方法：OPENROWSET/OPENQUERY/opendatasource
- ##### OPENROWSET方法（不需要用到创建好的链接名。如果连接的实例名不是默认的，需要在"sql服务器名或IP地址"后加上"/实例名"）
    + 查询示例
        * Windows认证方式查询(以下方法之一即可)
        ```sql
        SELECT * FROM OPENROWSET('SQLOLEDB', 'server=sql服务器名或IP地址;Trusted_Connection=yes',数据库名.架构名.表名)
        SELECT * FROM OPENROWSET('SQLNCLI', 'server=sql服务器名或IP地址;Trusted_Connection=yes',数据库名.架构名.表名)
        SELECT * FROM OPENROWSET('SQLOLEDB', 'server=sql服务器名或IP地址;Trusted_Connection=yes','SELECT * FROM 数据库名.架构名.表名')
        SELECT * FROM OPENROWSET('SQLNCLI', 'server=sql服务器名或IP地址;Trusted_Connection=yes','SELECT * FROM 数据库名.架构名.表名')
        ```
        * SQL认证方式查询(以下方法之一即可)
        ```sql
        SELECT * FROM OPENROWSET('SQLOLEDB', 'server=sql服务器名或IP地址;uid=用户名;pwd=密码',数据库名.架构名.表名)
        SELECT * FROM OPENROWSET('SQLNCLI', 'server=sql服务器名或IP地址;uid=用户名;pwd=密码',数据库名.架构名.表名)
        SELECT * FROM OPENROWSET('SQLOLEDB', 'server=sql服务器名或IP地址;uid=用户名;pwd=密码','SELECT * FROM 数据库名.架构名.表名')
        SELECT * FROM OPENROWSET('SQLNCLI', 'server=sql服务器名或IP地址;uid=用户名;pwd=密码','SELECT * FROM 数据库名.架构名.表名')
        SELECT * FROM OPENROWSET('SQLOLEDB', 'sql服务器名';'用户名';'密码',数据库名.架构名.表名)
        SELECT * FROM OPENROWSET('SQLNCLI', 'sql服务器名';'用户名';'密码',数据库名.架构名.表名)
        SELECT * FROM OPENROWSET('SQLOLEDB', 'sql服务器名';'用户名';'密码','SELECT * FROM 数据库名.架构名.表名')
        SELECT * FROM OPENROWSET('SQLNCLI', 'sql服务器名';'用户名'; '密码','SELECT * FROM 数据库名.架构名.表名')
        ```
    + 生成本地表
    ```sql
    SELECT * INTO 表 FROM openrowset( 'SQLOLEDB ', 'sql服务器名 '; '用户名 '; '密码 ',数据库名.dbo.表名)
    ```
    + 把本地表导入远程表
    ```sql
	INSERT OPENROWSET('SQLOLEDB', 'server=sql服务器名或IP地址;uid=用户名;pwd=密码',数据库名.架构名.表名)
    SELECT * FROM 本地表
    ```
    + 关联更新本地表
    ```sql
	UPDATE b
	   SET b.列A = a.列A
	  FROM OPENROWSET( 'SQLOLEDB ', 'sql服务器名 '; '用户名 '; '密码 ',数据库名.dbo.表名) AS a
INNER JOIN 本地表 b ON a.column1 = b.column1
    ```
- ##### OPENQUERY方法（需要先创建一个链接）
    + 查询示例
    ```sql
    SELECT * FROM OPENQUERY(LinkName,'SELECT * FROM 数据库名.架构名.表名')
    ```
    + 把本地表导入远程表
    ```sql
    INSERT OPENQUERY(LinkName, 'SELECT *  FROM 数据库名.架构名.表名') SELECT * FROM 本地表
    ```
    + 关联更新本地表
    ```sql
	UPDATE b
	   SET b.列A = a.列A
	  FROM OPENQUERY(ITSV, 'SELECT * FROM 数据库.dbo.表名 ') AS a
INNER JOIN 本地表 b ON a.column1 = b.column1
    ```
- ##### OPENDATASOURCE方法(不需要用到创建好的链接名。如果连接的实例名不是默认的，需要在"sql服务器名或IP地址"后加上"/实例名")
    + 查询示例
        * Windows认证方式查询(以下方法之一即可)
        ```sql
        SELECT * FROM OPENDATASOURCE('SQLOLEDB', 'server=sql服务器名或IP地址;Trusted_Connection=yes').数据库名.架构名.表名
        SELECT * FROM OPENDATASOURCE('SQLNCLI', 'server=sql服务器名或IP地址;Trusted_Connection=yes').数据库名.架构名.表名
        ```
        * SQL认证方式查询(以下方法之一即可)
        ```sql
        SELECT * FROM OPENDATASOURCE('SQLOLEDB', 'server=sql服务器名或IP地址;uid=用户名;pwd=密码').数据库名.架构名.表名
        SELECT * FROM OPENDATASOURCE('SQLNCLI', 'server=sql服务器名或IP地址;uid=用户名;pwd=密码').数据库名.架构名.表名
        SELECT * FROM OPENDATASOURCE('SQLOLEDB', 'Data Source=sql服务器名或IP地址;uid=用户名;pwd=密码').数据库名.架构名.表名
        SELECT * FROM OPENDATASOURCE('SQLNCLI', 'Data Source=sql服务器名或IP地址;uid=用户名;pwd=密码').数据库名.架构名.表名
        ```
    + 导入示例
    ```sql
    INSERT OPENDATASOURCE('SQLOLEDB', 'server=sql服务器名或IP地址;uid=用户名;pwd=密码').数据库名.架构名.表名
    SELECT * FROM 本地表
    ```
> 如果出现如下错误：SQL Server 阻止了对组件“Ad Hoc Distributed Queries”的STATEMENT“OpenRowset/OpenDatasource”的访问，因为此组件已作为此服务器安全配置的一部分而被关闭。系统管理员可以通过使用 sp_configure 启用“Ad Hoc Distributed Queries”。有关启用“Ad Hoc Distributed Queries”
则解决办法是参照下面命令：

1. 开启Ad Hoc Distributed Queries组件，在sql查询编辑器中执行如下语句：
```sql
EXEC sp_configure 'show advanced options',1
reconfigure
EXEC sp_configure 'Ad Hoc Distributed Queries',1
reconfigure
```
2. 关闭Ad Hoc Distributed Queries组件，在sql查询编辑器中执行如下语句：
```sql
EXEC sp_configure 'Ad Hoc Distributed Queries',0
reconfigure
EXEC sp_configure 'show advanced options',0
reconfigure
```

## 26. 删除数据库下面的所有表
```sql
use 数据库名(是要删除表的所在的那个数据库的名称)
GO
DECLARE @sql VARCHAR(8000)
WHILE (SELECT COUNT(*) FROM sysobjects WHERE type='U')>0
BEGIN
SELECT @sql='DROP table ' + name
FROM sysobjects
WHERE (type = 'U')
ORDER BY 'DROP table ' + name
EXEC(@sql) 
END
```

## 27. 查看数据库文件使用情况
```sql
SELECT  A.name                                                     AS "逻辑名称"
       ,CONVERT(FLOAT ,A.size)             * (8192.0/1024.0)/1024  AS "已用大小MB"
       ,CONVERT(FLOAT ,A.maxSize - A.size) * (8192.0/1024.0)/1024  AS "可用大小MB"
       ,CONVERT(FLOAT ,A.maxSize)          * (8192.0/1024.0)/1024  AS "分配大小MB"
       ,A.fileName                                                 AS "文件路径"
       ,(
         SELECT  SA.groupName
           FROM  SysFileGroups  SA
          WHERE  SA.groupID = A.groupID
        )                                                          AS "文件组"
       ,CASE WHEN A.status = 1081346 THEN '磁盘文件'               
             WHEN A.status = 1081410 THEN '日志设备'
             ELSE CONVERT(VARCHAR ,A.status) END                   AS "文件类型"
  FROM  SysFiles  A
```

## 28. 修改sa的密码
```sql
EXEC sp_password 'OldPassword','NewPassword','sa';
```
> 不知道OldPassword时，可用NULL代替。

## 29. 查询表的索引
```sql
  SELECT 表名 = c.name,
         索引名称 = a.name,
         索引字段名 = d.name,
         索引字段位置 = d.colid,
         c.status
    FROM sysindexes   a
    JOIN sysindexkeys b ON a.id = b.id AND a.indid = b.indid
    JOIN sysobjects   c ON b.id = c.id
    JOIN syscolumns   d ON b.id = d.id AND b.colid = d.colid
   WHERE a.indid NOT IN (0, 255)
     AND c.xtype = 'U'
  -- AND c.status > 0 --查所有用户表
     AND c.name = 'order' --查指定表
ORDER BY c.name,a.name,d.name;
```

## 30. 查询没有索引的表
```sql
  SELECT *
    FROM sysobjects
   WHERE xtype = 'U'
     AND name NOT IN (
	       SELECT c.name
	         FROM sysindexes   a
	         JOIN sysindexkeys b ON a.id = b.id AND a.indid = b.indid
	         JOIN sysobjects   c ON b.id = c.id
	         JOIN syscolumns   d ON b.id = d.id AND b.colid = d.colid
	        WHERE a.indid NOT IN (0, 255)
	          AND c.xtype = 'U'
            --AND c.status > 0 --查所有用户表
	        --AND c.name = 'order' --查指定表
         )
ORDER BY name
```

---

# 常识
- 在SQL查询中，`FROM`后最多可以跟256张表或视图
- 在SQL语句中使用`ORDER BY`查询时，先排序，后取值
- 在SQL中，一个字段的最大容量是8000

