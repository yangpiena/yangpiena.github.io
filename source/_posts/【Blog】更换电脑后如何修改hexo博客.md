---
title: 【Blog】更换电脑后如何修改hexo博客
layout: post
date: 2016-11-09
comments: true
categories: Blog
tags: [Blog, hexo]
keywords: hexo,Blog
description: 生命在于折腾
---
# 当重装电脑，或者想在其它电脑上修改博客，可以使用下列步骤：
1. 使用git clone git@github.com:yangpiena/yangpiena.github.io.git拷贝仓库（默认分支为source）；
2. 在本地新拷贝的yangpiena.github.io文件夹下通过Git bash依次执行下列指令：
	npm install hexo
	npm install 
	npm install hexo-deployer-git --save
	（切记不要执行hexo init这条指令，否则会删除.git文件夹）
<!--more-->