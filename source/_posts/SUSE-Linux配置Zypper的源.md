---
title: SUSE Linux配置Zypper的源
author: 昜丿捺
copyright: true
categories: 技术
timestamp: 1659408986
date: 2022-08-02 10:56:26
authorDesc:
tags:
description: SUSE Linux配置Zypper的源
---
### zypper的配置流程
1. 将ISO文件上传至云服务器内部。
2. ISO入源:
```
sudo zypper addrepo iso:/?iso=/opt/iso/SLE-12-Server-DVD-x86_64-GM-DVD1.iso DVDISO
```
    > 其中:
    - “/opt/iso/SLE-12-Server-DVD-x86_64-GM-DVD1.iso”为ISO文件所在位置。
    - “DVDISO”是这个源的别名。

3. 查看源是否添加成功。
```
zypper repos
```
4. 刷新源。
```
zypper refresh
```