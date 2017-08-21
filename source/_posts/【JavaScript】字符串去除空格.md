---
title: 【JavaScript】字符串去除空格
layout: post
comments: true
date: 2016-11-28 16:50:37
categories: JavaScript
tags: [JavaScript, 字符串]
keywords:
description:
---

- 去除所有空格:   
str   =   str.replace(/\s+/g,"");       
- 去除两边空格:   
str   =   str.replace(/^\s+|\s+$/g,"");
- 去除左空格：
str=str.replace( /^\s*/, '');
- 去除右空格：
str=str.replace(/(\s*$)/g, "");

<!-- more -->