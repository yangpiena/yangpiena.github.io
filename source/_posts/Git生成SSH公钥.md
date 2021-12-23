---
title: Git生成SSH公钥
author: 昜丿捺
copyright: true
categories: 技术
timestamp: 1636534176
date: 2021-11-10 16:49:36
authorDesc:
tags:
description: 换了电脑后，或重装系统后，Git生成SSH公钥
---
一般情况下执行第1、3、4步即可。
1. 生成ssh-key
```
ssh-keygen -t rsa -C "your_email@example.com"
```
	新版本Git需要使用Ed25519加密：
	```
	ssh-keygen -t Ed25519 -C "your_email@example.com"
	```

2. 添加id_rsa
```
ssh-add ~/.ssh/id_rsa
```
	如果出现错误：Could not open a connection to your authentication agent
	先执行命令 `ssh-agent bash` ，再重新执行上面命令即可。

3. 查看id_rsa.pub，复制后添加公钥到Gitee或Github
```
cat ~/.ssh/id_rsa.pub
```

4. 确认并添加主机到本机SSH可信列表
```
ssh -T git@gitee.com
```
	若返回 Hi XXX! You've successfully authenticated, but Gitee.com does not provide shell access. 内容，则证明添加成功。
	若出现错误 `git@gitee.com: Permission denied (publickey)`，则先通过下面命令定位问题：
	```
	ssh -T -v git@gitee.com
	```
	找到出现错误的地方，有针对性解决。

参考文档：
https://www.jianshu.com/p/b2ff4e11568c
https://blog.csdn.net/argleary/article/details/100638560
https://blog.csdn.net/sunnypotter/article/details/18948053
https://zhuanlan.zhihu.com/p/419745598
