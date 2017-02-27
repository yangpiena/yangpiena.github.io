---
title: 【Windows】命令学习
layout: post
comments: true
date: 2016-11-24 12:25:31
categories: Windows
tags: [Windows, 命令]
keywords:
description:
---
## 系统
|命令						|说明|
| ------------------------- |:--|
|shutdown					|重启
|nbtstat -a 192.168.0.5 	|通过IP查找主机名
|ipconfig /flushdns			|刷新DNS解析缓存（一般修改hosts后在cmd中执行下。hosts路径：C:\Windows\System32\drivers\etc）
|tskill PID					|找到占用端口的PID
|netstat -ab				|杀死进程
|netstat -ano				|查看所有的端口占用情况
|netstat -aon|findstr "9050"|查看指定端口的占用情况
|tasklist|findstr "2016" 	|查看PID对应的进程
|taskkill /f /t /im tor.exe	|结束该进程tor.exe

<!-- more -->

### Dos命令
|命令						|说明|
| ------------------------- |:--|
|dir						|列出当前目录下的文件以及文件夹
|del						|删除文件
|ren						|重命名,例如：ren 旧文件 新文件名
|md							|创建目录
|rd							|删除目录
|cd							|进入指定目录
|cd..						|退回到上一级目录
|cd/						|退回到根目录
|exit						|退出dos命令行

### 快捷键
|命令						|说明|
| ------------------------- |:--|
|notepad					|记事本
|clipbrd 					|剪切板
|systeminfo 				|查看系统信息
|gpedit.msc 				|组策略（关闭自动播放）
|odbcad32.exe 				|数据源，若系统是64bit的，则新建dsn要用64bit的ODBC，即在运行中输入：C:\Windows\SysWOW64\odbcad32.exe
|arp -a 					|查看IP对应的MAC地址
|arp -s 					|添加IP对应的MAC地址
|dxdiag 					|查看系统DirectX
|psr						|问题步骤记录器