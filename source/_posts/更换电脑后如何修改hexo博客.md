---
title: 更换电脑后如何修改hexo博客
layout: post
date: 2016-11-09
comments: true
categories: 技术
tags: [hexo]
description: 生命在于折腾
---
# 当重装电脑，或者想在其它电脑上修改博客，可以使用下列步骤：
1. 使用git clone git@github.com:yangpiena/yangpiena.github.io.git拷贝仓库（默认分支为source）；
2. 在本地新拷贝的yangpiena.github.io文件夹下通过Git bash依次执行下列指令：

		npm install hexo
		npm install 
		npm install hexo-deployer-git --save
（切记不要执行hexo init这条指令，否则会删除.git文件夹）
	
> 遇到错误时：
1. 更新npm的源：npm config set registry https://registry.npm.taobao.org
2. cmd进入博客当前文件夹路径
3. 执行 npm install
4. 执行 hexo server
5. 执行成功后,再到博客下的git中执行 hexo d /hexo g 发现可以执行成功。

<!--more-->