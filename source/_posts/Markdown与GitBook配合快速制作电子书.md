---
title: Markdown与GitBook配合快速制作电子书
author: 昜丿捺
copyright: true
categories: 技术
timestamp: 1653983445
date: 2022-05-31 15:50:45
authorDesc:
tags:
description: 制作电子书、在线帮助文档等。
---

## 安装Nodejs
> 注意Nodejs的版本和GitBook的版本要兼容匹配。

## 安装GitBook
```
npm install gitbook-cli -g
```
> 如果npm命令安装较慢，可更换淘宝的源再试。

安装完成后，通过下面命令检查是否安装成功，检查时间较长。
```
gitbook -V
```

## GitBook基本使用

### GitBook文档目录结构
```
|- book.json    //电子书的配置文件
|- README.md    //电子书的主要说明文件
|- SUMMARY.md   //电子书的目录
|- chapter-1/   //电子书的章节1文件夹(chapter-1是文件夹名称，可以自定义)
    |- README.md    //章节1的说明文件
    |- 文档1.md     //章节下面的小节1
    |- 文档2.md     //章节下面的小节2
|- chapter-2/   //电子书的章节2文件夹
    |- README.md    //章节2的说明文件
    |- 文档1.md     //章节下面的小节1
    |- 文档2.md     //章节下面的小节2
```

### GitBook初始化
新建一个文件夹如gitbook_test，使用cd命令进入到该文件夹下，在该文件夹下进行初始化。
```
$ gitbook init
```
初始化完成后，会自动在目录下生成两个文件，一个是主要说明文件，一个是目录文件。

### 接下来编写目录
打开SUMMARY.md文件编写目录，格式如下:
```
# Summary
* [引言](README.md)
* [目录1](chapter-1/README.md)
    * [页面1](chapter-1/1.md)
    * [页面2](chapter-1/2.md)
    * [页面3](chapter-1/3.md)
    * [页面4](chapter-1/4.md)
* [目录2](chapter-2/README.md)
    * [页面1](chapter-2/1.md)
    * [页面2](chapter-2/2.md)
    * [页面3](chapter-2/3.md)
    * [页面4](chapter-2/4.md)
```
> 建议目录文件夹和页面文件名称全部使用英文或数字，保证在发布到服务器时能正常使用。

### 生成各小节md文件
编写好目录之后，在gitbook_test文件夹下，再次使用gitbook init命令生成目录及目录下的各小节md文件。
```
$ gitbook init
```

### 编译生成静态网页
```
$ gitbook build
```
将会在gitbook_test目录下生成一个_book文件夹，这就是我们的一个静态站点。

### 编译并预览静态网页
使用下面命令启动预览服务，在浏览器中访问localhost:4000进行预览。
```
$ gitbook serve
```

## Gitbook配置文件
Gitbook有一个配置文件book.json（一定要放在根目录gitbook_test下），在该配置文件中可以配置各种插件，来美化页面的显示和交互效果。下面是一个常用配置和插件，可直接粘贴使用。
```
{
    "title": "帮助手册",
    "description": "遇到问题，先冷静思考！",
    "author": "昜丿捺",
    "gitbook": "3.2.3",
    "language": "zh-hans",
    "output.name": "site",
    "root": ".",
    "plugins": [
        "-lunr","-search",
        "-sharing",
        "-default-theme",
        "search-pro",
        "theme-comscore",
        "splitter",
        "tbfed-pagefooter",
        "expandable-chapters",
        "hide-element",
        "custom-favicon",
        "-highlight","prism","prism-themes",
        "code",
        "sectionx",
        "flexible-alerts",
        "ancre-navigation"
    ],
    
    "pluginsConfig": {
        "tbfed-pagefooter": {
            "copyright":"Copyright©2022 昜丿捺",
            "modify_label": "该页面修订时间：",
            "modify_format": "YYYY-MM-DD HH:mm:ss"
        },
        
        "hide-element": {
            "elements": [".gitbook-link"]
        },
                
        "favicon": "favicon.ico",
        
        "pdf": {
            "pageNumbers": true,
            "fontFamily": "Arial",
            "fontSize": 12,
            "paperSize": "a4",
            "margin": {
                "right": 62,
                "left": 62,
                "top": 56,
                "bottom": 56
            }
        },
        "page-toc-button": {
            "maxTocDepth": 2,
            "minTocSize": 2
           },
       "prism":{
            "css":[
                "prism-themes/themes/prism-darcula.css"
            ]
       },
       "sectionx": {
          "tag": "b"
        }
    },

    "styles": {
        "website": "styles/website.css",
        "ebook": "styles/ebook.css",
        "pdf": "styles/pdf.css",
        "mobi": "styles/mobi.css",
        "epub": "styles/epub.css"
    }
}
```

写好配置文件之后，需要执行下面命令来安装插件，所需时间较长。
```
$ gitbook install
```