---
title: Windows命令大全
layout: post
comments: true
date: 2016-11-24 12:25:31
categories: 技术
tags: [Windows, 命令]
description:
---
## 系统

<!-- more -->

| 命令                       | 说明                                                                                        |
| -------------------------  | :---------------------------------                                                          |
| shutdown                   | 重启
| nbtstat -a 192.168.0.5     | 通过IP查找主机名
| ipconfig /flushdns         | 刷新DNS解析缓存（一般修改hosts后在cmd中执行下。hosts路径：C:\Windows\System32\drivers\etc）
| tskill PID                 | 找到占用端口的PID
| netstat -ab                | 杀死进程
| netstat -ano               | 查看所有的端口占用情况
| netstat -aon|findstr "9050"| 查看指定端口的占用情况|
| tasklist|findstr "2016"    | 查看PID对应的进程|
| taskkill /f /t /im tor.exe | 结束该进程tor.exe
| notepad                    | 记事本
| clipbrd                    | 剪切板
| systeminfo                 | 查看系统信息
| gpedit.msc                 | 组策略（关闭自动播放）
| odbcad32.exe               | 数据源，若系统是64bit的，则新建dsn要用64bit的ODBC，即在运行中输入：C:\Windows\SysWOW64\odbcad32.exe
| arp -a                     | 查看IP对应的MAC地址
| arp -s                     | 添加IP对应的MAC地址
| dxdiag                     | 查看系统DirectX
| psr                        | 问题步骤记录器
| gpedit.msc                 | 组策略
| sndrec32                   | 录音机
| Nslookup                   | IP地址侦测器
| explorer                   | 打开资源管理器
| logoff                     | 注销命令
| tsshutdn                   | 60秒倒计时关机命令
| lusrmgr.msc                | 本机用户和组
| services.msc               | 本地服务设置
| oobe/msoobe /a             | 检查XP是否激活
| notepad                    | 打开记事本
| cleanmgr                   | 垃圾整理
| net start messenger        | 开始信使服务
| compmgmt.msc               | 计算机管理
| net stop messenger         | 停止信使服务
| conf                       | 启动 netmeeting
| dvdplay                    | DVD播放器
| charmap                    | 启动字符映射表
| diskmgmt.msc               | 磁盘管理实用程序
| calc                       | 启动计算器
| dfrg.msc                   | 磁盘碎片整理程序
| chkdsk.exe                 | Chkdsk磁盘检查
| devmgmt.msc                | 设备管理器
| regsvr32 /u *.dll          | 停止dll文件运行
| drwtsn32                   | 系统医生
| rononce -p                 | 15秒关机
| dxdiag                     | 检查DirectX信息
| regedt32                   | 注册表编辑器
| Msconfig.exe               | 系统配置实用程序
| rsop.msc                   | 组策略结果集
| mem.exe                    | 显示内存使用情况
| regedit.exe                | 注册表
| winchat                    | XP自带局域网聊天
| progman                    | 程序管理器
| winmsd                     | 系统信息
| perfmon.msc                | 计算机性能监测程序
| winver                     | 检查Windows版本
| sfc /scannow               | 扫描错误并复原
| taskmgr                    | 任务管理器（2000／xp／2003）


## Dos命令
| 命令                      | 说明                             |
| ------------------------- | :--                              |
| dir                       | 列出当前目录下的文件以及文件夹
| del                       | 删除文件
| ren                       | 重命名,例如：ren 旧文件 新文件名
| md                        | 创建目录
| rd                        | 删除目录
| cd                        | 进入指定目录
| cd..                      | 退回到上一级目录
| cd/                       | 退回到根目录
| exit                      | 退出dos命令行
| open                      | 与ftp服务器相连接                |
| send(put)                 | 上传文件                         |
| get                       | 下载文件                         |
| mget                      | 下载多个文件                     |
| bye                       | 中断与服务器的连接               |
| tracert                   | 跟踪IP地址路由                   |


## 其他命令
| 命令                      | 说明 |
| ------------------------- | :--  |
|for /f "skip=9 tokens=1,2 delims=:" %i in ('netsh wlan show profiles') do  @echo %j | findstr -i -v echo | netsh wlan show profiles %j key=clear		|列出连接过的wifi信息、加密方式、包括密码|
| net use * /del /y                                                  | 清除共享或磁盘映射记录列表                    |
| control userpasswords2                                             | 依次点击‘高级’—‘管理密码’，删除完毕，确定即可 |
| wmic product where "Name like 'Microsoft .Net%'" get Name, Version | 使用 WMI 命令获取.NET版本信息                 |