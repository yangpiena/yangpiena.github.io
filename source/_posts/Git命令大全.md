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

## git常识
- Git专用名词
```
Workspace：    工作区
Index / Stage：暂存区
Repository：   仓库区（或本地仓库）
Remote：       远程仓库
branch:        分支
```

## git常用命令
### 添加当前目录的所有文件到暂存区
```
git add .
```
### 提交暂存区到仓库区
```
git commit - m [message]
```
### 推送本地指定分支到远程仓库
```
git push [remote] [branch]
```
> 也可以将以上命令用连接符`&&`连接起来一起执行


## git其它命令
### 强行推送当前分支到远程仓库，即使有冲突
```
git push [remote] --force
```
例如，进入分支`source`目录下，执行如下命令，推送本地`source`覆盖远程`source`：
```git
git push origin source --force
```
或者
```git
git push origin source:source -f
```

### 取回远程仓库的变化，并与本地分支合并
```
git pull [remote] [branch]
```

### 下载一个项目和它的整个代码历史
```
git clone [url]
```

### git中提交了想要忽略的文件，如何再删除
```
git rm --cached 文件
```
```
git rm --cached 文件夹 -r
```
> -f 表示强制删除  
> -r 表示递归删除

删除完成后提交修改，远程git仓库里想要忽略的文件就会成功删除。

### 从仓库中删除文件/文件夹，以及历史记录
1. 从仓库中删除文件
```
git filter-branch --force --index-filter 'git rm --cached -r --ignore-unmatch xxOffline/download' --prune-empty --tag-name-filter cat -- --all
```
> com/download 表示要删除的文件或文件夹的相对路径(相对于git仓库的跟目录)  
> -r 表示如果删除文件夹，则递归删除（子）文件夹和文件夹下的所有文件
2. 推送修改后的仓库
```
git push origin --force --all
```
3. 清理和回收空间
```
rm -rf .git/refs/original/
```
```
git reflog expire --expire=now --all
```
```
git gc --prune=now
```
```
git gc --aggressive --prune=now
```
