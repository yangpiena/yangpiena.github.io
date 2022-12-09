---
title: Windows10的秘密
author: 昜丿捺
copyright: true
categories: 技术
timestamp: 1595379656
date: 2020-07-22 09:00:56
authorDesc:
tags: [Windows]
description:
---
# 如何获取锁屏动态壁纸？
Win10的锁屏动态壁纸每天都会更新，更新后是缓存在如下位置：
```
C:\Users\YANGPIENA\AppData\Local\Packages\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\LocalState\Assets
```
其中，`YANGPIENA` 是你的用户名。打开后重命名里面的文件，增加后缀名`.jpg`，即可看见你刚刚钟意的壁纸。

# 设置任务栏透明效果
1. 设置 -> 颜色 -> 打开“透明效果”开关
2. 打开注册表，找到路径：
    ```
    计算机\HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced
    ```
3. 右侧找到名称 TaskbarAcrylicOpacity，如果没有，就右键新建一个DWORD（32位）值D
4. 将值修改为十进制 0 就是全透明，也可以是十进制0-10之间的效果
5. 不用重启电脑，在任务管理器重启“windows资源管理器”就生效