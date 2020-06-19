---
title: Linux系统盘和数据盘
author: 昜丿捺
copyright: true
layout: post
comments: true
date: 2017-08-10 10:47:43
categories: 技术
tags: [Linux]
keywords:
description:
---
### 系统盘
类似于Windows的C盘，Linux的系统盘可用命令`df -l`查看，可以看到根路径 / 都是位于系统盘。而/root、/home、/usr就如同Windows的C盘下的C:\Windows、C:\usr这些目录。

<!-- more -->

### 数据盘
如果单独有数据盘，且数据盘没有分区和挂载，使用`df -l`命令是看不到的，可以使用 `fdisk -l`命令，看到有哪些硬盘，如下：

	[root@iZwe12zdi799668qfxdm5oZ /]# fdisk -l

	Disk /dev/vda: 42.9 GB, 42949672960 bytes, 83886080 sectors
	Units = sectors of 1 * 512 = 512 bytes
	Sector size (logical/physical): 512 bytes / 512 bytes
	I/O size (minimum/optimal): 512 bytes / 512 bytes
	Disk label type: dos
	Disk identifier: 0x0008fd2d

	   Device Boot      Start         End      Blocks   Id  System
	/dev/vda1   *        2048    83886079    41942016   83  Linux

	Disk /dev/vdb: 107.4 GB, 107374182400 bytes, 209715200 sectors
	Units = sectors of 1 * 512 = 512 bytes
	Sector size (logical/physical): 512 bytes / 512 bytes
	I/O size (minimum/optimal): 512 bytes / 512 bytes

可以看到，Disk /dev/vda和Disk /dev/vdb表示有两块盘，但是显然vdb没有vdb1，故表示没有分区。