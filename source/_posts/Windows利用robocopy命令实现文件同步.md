---
title: Windows利用robocopy命令实现文件同步
author: 昜丿捺
copyright: true
categories: 技术
timestamp: 1560763053
date: 2019-06-17 17:17:33
authorDesc:
tags: [Windows, 命令]
description:
---
Robocopy是Microsoft在Windows Server 2003 Resource Kit Tools提供的复制工具。

<!-- more -->

### 1. [下载rktools.exe](http://download.microsoft.com/download/8/e/c/8ec3a7d8-05b4-440a-a71e-ca3ee25fe057/rktools.exe)
使用默认选项安装即可。一般情况下Windows Server 2003不带robocopy，所以需要安装。

### 2. 使用命令robocopy，实现镜像同步，且输出日志到log.txt
    robocpy C:\源文件夹\ D:\目标文件夹\ /LOG+:C:\log.txt /MIR
    
robocopy提供了很多xcopy不具备的功能：
- 可选择多种文件类型复制到目标文件夹
- 可指定在复制时不复制的文件类型
- 可指定复制目录的级次，如只复制两级目录
- 可按文件的修改时间或访问时间进行复制，如只复制三天内修改的文件
- 按文件大小，如只复制大于100K小于1M的文件
- 镜像模式，拷贝时删除在目标文件夹里存在但源文件夹里并没有的文件
- 支持文件移动
- 监控文件夹，一旦文件夹内文件发生变化，自动复制变化的文件

更多参数使用请参照[robocopy的用法](https://www.cnblogs.com/zhanglei1371/p/6724167.html)