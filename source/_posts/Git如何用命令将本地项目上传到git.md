---
title: Git如何用命令将本地项目上传到git
author: 昜丿捺
copyright: true
layout: post
comments: true
date: 2017-06-20 10:31:07
categories: 技术
tags: [Git]
keywords:
description:
---
### 先在GitHub网站上New一个资源库，如：demo
<!-- more -->

### 进入本地项目文件夹，通过命令 `git init` 把这个目录变成Git可以管理的仓库，默认分支为`master`
```
git init
```
### 把文件添加到版本库中，使用命令 `git add .` 添加到暂存区里面去，不要忘记后面的小数点“.”，意为添加文件夹下的所有文件
```
git add .
```
### 用命令 `git commit` 告诉Git，把文件提交到仓库。引号内为提交说明
```
git commit -m 'first commit'
```
### 关联到远程库
```
git remote add origin 你的远程库地址
```

> 例如：`git remote add origin https://github.com/yangpiena/demo.git`
  或者：`git remote add origin git@github.com:yangpiena/demo.git`

### 此时有两种推送情况：与远程库合并、强制推送到远程库
#### 与远程库合并
- 获取远程库分支`main`与本地同步合并（如果远程库不为空必须做这一步，否则后面的提交会失败）
```
git pull --rebase origin main
```
- 把本地库的内容推送到远程，使用 `git push` 命令，实际上是把当前分支master推送到远程。执行此命令后会要求输入用户名、密码，验证通过后即开始上传。
```
git push -u origin main
```
> GitHub将master改为main后，如果本地分支为master，则会报错 `error: src refspec main does not match any.` ，可执行下面命令将本地创建分支的信息推送到github上，最后在GitHub上修改master为默认即可。
    ```
    git push origin HEAD -u
    ```

#### 强制推送到远程（可能会覆盖远程上已有的分支或文件）
```
git push -u origin master -f
```

##### 状态查询命令
```
git status
```