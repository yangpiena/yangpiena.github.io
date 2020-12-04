---
title: 更换电脑后如何修改hexo博客
author: 昜丿捺
copyright: true
layout: post
date: 2016-11-09
comments: true
categories: 技术
tags: [hexo]
description: 生命在于折腾
---
当重装电脑，或者想在其它电脑上修改博客，可以使用下列步骤：
1. 使用下面命令拷贝个人仓库（默认分支为source）到本地
```
git clone git@github.com:yangpiena/yangpiena.github.io.git
```
2. 在本地新拷贝的yangpiena.github.io文件夹下通过Git bash依次执行下列命令：
```
cnpm install -g hexo
```
	```
	cnpm install 
	```
	```
	cnpm install hexo-deployer-git --save
	```
> 切记不要执行 hexo init 这条指令，否则会删除.git文件夹

遇到安装失败时，可更换npm的源再尝试：
- 国内优秀npm镜像
**淘宝npm镜像**
搜索地址：http://npm.taobao.org/
registry地址：http://registry.npm.taobao.org/
**cnpmjs镜像**
搜索地址：http://cnpmjs.org/
registry地址：http://r.cnpmjs.org/
- 临时使用
```
npm --registry https://registry.npm.taobao.org install express
```
- 持久使用
```
npm config set registry https://registry.npm.taobao.org
```
	配置后可通过下面方式来验证是否成功
	```
	npm config get registry
	```
- 通过 `cnpm` 命令
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
	安装完后，使用cnpm命令安装：`cnpm install expresstall express`

如果还有错误：
1. cmd进入博客当前文件夹路径
2. 执行 npm install
3. 执行 hexo server
4. 执行成功后，再到博客下的git中执行 hexo d /hexo g 发现可以执行成功。
