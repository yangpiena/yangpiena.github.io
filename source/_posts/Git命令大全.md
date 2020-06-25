---
title: Git命令大全
author: 昜丿捺
copyright: true
categories: 技术
timestamp: 1593051185
date: 2020-06-25 10:13:05
authorDesc:
tags: [Git, 命令]
description:
---
![Git](/img/screenshots/Git资源库图解.jpg)
<!-- more -->
![Git常用命令速查表](/img/screenshots/Git常用命令速查表.jpg)
## 1. 添加当前目录的所有文件到暂存区
```
git add .
```
## 2. 提交暂存区到仓库区
```
git commit - m [message]
```
## 3. 推送本地指定分支到远程仓库
```
git push [remote] [branch]
```
## 4. 强行推送当前分支到远程仓库，即使有冲突
```
git push [remote] --force
```
例如，进入分支`source`目录下，执行如下命令，推送本地`source`覆盖远程`source`：
```git
git push origin source --force
```
## 5. 取回远程仓库的变化，并与本地分支合并
```
git pull [remote] [branch]
```
## 6. 下载一个项目和它的整个代码历史
```
git clone [url]
```

> Git专用名词：

```
Workspace：工作区
Index / Stage：暂存区
Repository：仓库区（或本地仓库）
Remote：远程仓库
branch: 分支
```