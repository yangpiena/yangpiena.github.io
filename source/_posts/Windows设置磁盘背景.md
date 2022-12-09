---
title: Windows设置磁盘背景
author: 昜丿捺
copyright: true
layout: post
comments: true
date: 2017-05-15 15:06:55
categories: 技术
tags: [Windows, 美化]
description:
---
如何将磁盘背景设置为自己喜欢的图片，具体操作步骤如下：
1. 首先，准备一张自己喜欢的图片。例如：D:\图片\其它\1741962.jpeg 
2. 在要设置背景的盘符或文件夹下，新建一个文本文档，将下面代码粘贴到文本中，替换自己的图片路径。
   ```
   [ExtShellFolderViews] 
   {BE098140-A513-11D0-A3A4-00C04FD706EC}=    {BE098140-A513-11D0-A3A4-00C04FD706EC} 
   [{BE098140-A513-11D0-A3A4-00C04FD706EC}] 
   Attributes=1 
   IconArea_Image=D:\图片\其它\1741962.jpeg
   IconArea_Text=0x00000000 
   [.ShellClassInfo] 
   ConfirmFileOp=0 
   [Ctrl+A Select All] 
   ```
3. 最后，将文档另存为`desktop.ini`即可。
<!-- more -->