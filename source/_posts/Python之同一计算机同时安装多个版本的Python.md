---
title: Python之同一计算机同时安装多个版本的Python
author: 昜丿捺
copyright: true
categories: 技术
date: 2025-08-06 17:20:06
authorDesc:
tags: [Python, pip]
description: 同一台计算机上同时安装 Python 3.7 和 Python 3.8 时的注意事项
---
# Python
假设电脑中同时安装了Python3.7.9和Python3.8.10，环境变量中可以只配一个，也可以配多个。
当多个都配置了时，Python的命令是按先后顺序（自上向下）优先执行的。

# Pip
pip命令的执行也是根据环境变量里面的先后顺序决定的，谁在前就默认执行谁。若想区分开，则跟上版本号即可。例如：

- 查看Python3.8.10安装的依赖库
```
py -3.8 -m pip list
```

- 安装Python3.8.10的依赖库
```
py -3.8 -m pip install xxx
```
```
py -3.8 -m pip install pandas -i https://pypi.tuna.tsinghua.edu.cn/simple
```

- 更新Python3.8.10的pip.exe
```
py -3.8 -m pip install --upgrade pip
```