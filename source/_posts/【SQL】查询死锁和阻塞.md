---
title: 【SQL】查询死锁和阻塞
layout: post
comments: true
date: 2016-11-29 15:13:06
categories: SQL
tags: [死锁]
keywords: 死锁，阻塞
description:
---

### 查询死锁进程
```
SELECT
	request_session_id spid,
	OBJECT_NAME(
		resource_associated_entity_id
	) tableName
FROM
	sys.dm_tran_locks
WHERE
	resource_type = 'OBJECT';
```

### 杀死死锁进程
```
KILL spid;
```

### 每秒死锁数量
```
SELECT  *
FROM    sys.dm_os_performance_counters
WHERE   counter_name LIKE 'Number of Deadlocksc%';
```

<!-- more -->
### 查询当前阻塞
```
WITH CTE_SID (BSID, SID, sql_handle) AS (
	SELECT
		blocking_session_id,
		session_id,
		sql_handle
	FROM
		sys.dm_exec_requests
	WHERE
		blocking_session_id <> 0
	UNION ALL
		SELECT
			A.blocking_session_id,
			A.session_id,
			A.sql_handle
		FROM
			sys.dm_exec_requests A
		JOIN CTE_SID B ON A.SESSION_ID = B.BSID
) SELECT
	C.BSID,
	C.SID,
	S.login_name,
	S.host_name,
	S.status,
	S.cpu_time,
	S.memory_usage,
	S.last_request_start_time,
	S.last_request_end_time,
	S.logical_reads,
	S.row_count,
	q. TEXT
FROM
	CTE_SID C
JOIN sys.dm_exec_sessions S ON C.sid = s.session_id CROSS APPLY sys.dm_exec_sql_text (C.sql_handle) Q
ORDER BY
	sid;
```