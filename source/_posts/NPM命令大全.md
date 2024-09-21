---
title: NPM命令大全
author: 昜丿捺
copyright: true
categories: 技术
date: 2024-09-21 14:20:39
authorDesc:
tags:
description:
---

# 查看当前的npm镜像设置
```
npm config list
```

<!-- more -->

# cnpm的卸载和重新安装
1. 卸载旧版本
```
npm uninstall -g cnpm --registry=https://registry.npmmirror.com
```
2. 配置镜像源（淘宝镜像）
```
npm config set registry https://registry.npmmirror.com
```
3. 确保node-gyp编译依赖的node源码镜像同步
```
npm config set disturl https://registry.npmmirror.com/dist
```
4. 清除缓存
```
npm cache clean --force
```
5. 安装新的cnpm版本
```
npm install -g cnpm --registry=https://registry.npmmirror.com
```

# npm升级
- 升级到指定版本
```
npm install npm@6.14.17
```
- 升级到最新版本
```
npm install npm@latest -g
```