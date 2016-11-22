---
title: Linux命令学习
date: 2016-11-22 15:02:51
tags: [Linux]
categories: Linux
---
## 基础命令
### 系统
|命令						|说明|
| ------------------------- |:--|
|reboot						|重启系统|
|shutdown -r now			|重启系统|
|shutdown -c				|取消重启|
|halt						|立刻关机|
|poweroff					|立刻关机|
|shutdown -h now			|立刻关机（root用户使用）|
|shutdown -h 10				|10分钟后自动关机|
|||
|cat /proc/version			|查看Linux内核版本|
|uname -a					|查看Linux内核版本|
|lsb_release -a				|查看Linux系统版本|
|cat /etc/issue				|查看Linux系统版本|
|cat /etc/redhat-release	|查看Linux系统版本（只适合Redhat系）|
|||
|yum update					|升级Linux，升级所有包同时也升级软件和系统内核|
|yum upgrade				|升级Linux，只升级所有包，不升级软件和系统内核|
<!-- more -->
### 文件
|命令						|说明|
| ------------------------- |:--|
|cd							|改变目录到|
|cd ~						|回到家目录|
|pwd						|查看当前路径|
|mkdir						|创建文件夹|
|touch						|创建文件|
|rm							|删除文件|
|rm -r						|删除文件夹|
|rm -fr						|直接删除，无需确认|
|cp							|复制|
|mv							|移动|
|find						|查找|
|which						|查找|
|cat						|查看文本内容|
|head						|查看文本前十行|
|tail						|查看文本后十行|
|more						|让文件内容一屏一屏的显示|
|cat XXX &#124; more		|管道：将cat显示出来的内容重新输出给more命令|
|>							|重定向：将文件内容输出到指定的文件或位置。如cat /etc/services > a.txt|
