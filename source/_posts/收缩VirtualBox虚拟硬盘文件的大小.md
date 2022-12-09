---
title: 收缩VirtualBox虚拟硬盘文件的大小
author: 昜丿捺
copyright: true
categories: 技术
timestamp: 1596699544
date: 2020-08-06 15:39:04
authorDesc:
tags:
description:
---
VirtualBox的虚拟硬盘文件大小随着使用时间越来越大，可按如下步骤收缩：


<!-- more -->


## 释放空闲空间
进入虚拟机，执行下面的命令释放。
Linux下：
```
sudo dd if=/dev/zero of=/EMPTY bs=1M
```
```
sudo rm -f /EMPTY
```
Windows下，需要先下载安装 [Sysinternals Suite](https://docs.microsoft.com/zh-cn/sysinternals/downloads/sysinternals-suite) 后执行下面命令：
```
sdelete –z d:
```
> 必需先进入sdelete所在目录下再执行命令，其中d为要释放的盘符。

## 收缩虚拟硬盘
先关闭虚拟机，再进入VBoxManage命令所在目录下，如：`cd C:\Program Files\Oracle\VirtualBox`
如果要收缩的虚拟硬盘是VirtualBox自己的VDI格式，找到你的虚拟硬盘文件，如：`D:\YPN.VirtualOS\Win7EN\Win7EN.vdi`，执行命令：
```
VBoxManage modifyhd D:\YPN.VirtualOS\Win7EN\Win7EN.vdi --compact
```
如果虚拟硬盘是Vmware的VMDK格式，因为VirtualBox不支持直接压缩VMDK格式，可以先转换成VDI后再收缩，最后转回VMDK。执行命令：
```
VBoxManage clonehd "old.vmdk" "new.vdi" --format vdi
```
```
VBoxManage modifyhd new.vdi --compact
```
```
VBoxManage clonehd "new.vdi" "old.vmdk" --format vmdk
```