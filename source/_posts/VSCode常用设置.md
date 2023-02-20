---
title: VSCode常用设置
author: 昜丿捺
copyright: true
categories: 技术
date: 2023-02-20 16:00:24
authorDesc:
tags: [VSCode]
description: VSCode常用设置
---
## 设置背景
1. 准备好背景图片 `vscode-background.jpg` ，放入安装目录 `C:\Program Files\Microsoft VS Code\resources\app\out\vs\workbench` 下。
2. 打开文件 `C:\Program Files\Microsoft VS Code\resources\app\out\vs\workbench\workbench.desktop.main.css` ，在最后面（Ctrl + End）添加以下内容并保存。
```
 body {
    pointer-events: auto !important;
    background-size: 100% !important;
    opacity: 0.9 !important;
    background-position: 0 0 !important;
    background-image: url("./vscode-background.jpg") !important;
    content: "";
    position: absolute;
    z-index: 999;
    width: 100%;
    background-repeat: no-repeat;
}
```
3. 重启VSCode后生效。