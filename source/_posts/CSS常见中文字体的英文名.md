---
title: CSS常见中文字体的英文名
author: 昜丿捺
copyright: true
layout: post
comments: true
date: 2016-11-28 17:15:38
categories: 技术
tags: [CSS样式, 字体]
keywords:
description:
---

考虑到文件编码问题，在CSS中推荐使用中文字体的英文表示法，以下附常见中文字体的英文名：
### Mac OS
华文细黑：STHeiti Light [STXihei]
华文黑体：STHeiti
华文楷体：STKaiti
华文宋体：STSong
华文仿宋：STFangsong
儷黑 Pro：LiHei Pro Medium
儷宋 Pro：LiSong Pro Light
標楷體：BiauKai
蘋果儷中黑：Apple LiGothic Medium
蘋果儷細宋：Apple LiSung Light

<!-- more -->

### Windows
新細明體：PMingLiU
細明體：MingLiU
標楷體：DFKai-SB
黑体：SimHei
宋体：SimSun
新宋体：NSimSun
仿宋：FangSong
楷体：KaiTi
仿宋_GB2312：FangSong_GB2312
楷体_GB2312：KaiTi_GB2312
微軟正黑體：Microsoft JhengHei
微软雅黑体：Microsoft YaHei
### Office
隶书：LiSu
幼圆：YouYuan
华文细黑：STXihei
华文楷体：STKaiti
华文宋体：STSong
华文中宋：STZhongsong
华文仿宋：STFangsong
方正舒体：FZShuTi
方正姚体：FZYaoti
华文彩云：STCaiyun
华文琥珀：STHupo
华文隶书：STLiti
华文行楷：STXingkai
华文新魏：STXinwei

#### 例：CSS中正确设置微软雅黑字体
.selector{ font-family:"Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu }
> 说明：加上中文名“微软雅黑”是为了兼容opera。MicrosoftJhengHei为微软正黑体，STHeiti为华文黑体，MingLiu在11px下的中文效果不凡。
注意：如果字体的名称是一个单词的，不需要加引号，否则在ie6，7里面会失效，并且后面的样式也会不生效！