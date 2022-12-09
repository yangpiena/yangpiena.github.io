---
title: Java与actionScript类型对应表
author: 昜丿捺
copyright: true
layout: post
comments: true
date: 2016-12-22 15:55:28
categories: 技术
tags: [flex, actionscript]
keywords: 
description:
---
采用Java+Flex架构，通过BlazeDS中间件技术，使服务端Java数据和客户端Flex数据进行互通时，底层数据类型是不一致的，BlazeDS对其进行了映射，具体映射关系如下：
<!-- more -->
## Java -> ActionScript
| Java                       | ActionScript                  |
| -------------------        | :----------------------       |
| java.lang.String           | string
| java.lang.Boolean, boolean | Boolean
| java.lang.Integar          | int
| java.lang.Short            | int
| java.lang.Byte             | int
| java.lang.Byte[]           | Flash.utils.ByteArray
| java.lang.Double           | Number
| java.lang.Float            | Number
| java.lang.Long             | Number
| java.lang.Character        | String
| java.lang.Character[]      | String
| java.util.Calendar         | Date
| java.util.Date             | Date
| java.util.Collection       | mx.collection.ArrayCollection
| java.lang.Object[]         | Array
| java.util.Map              | Array (sparse)
| java.util.Dictionary       | Object (untyped)
| org.w3c.dom.Document       | XML object

## ActionScript -> Java
| ActionScript                | Java                    |
| -------------------         | :---------------------- |
| Array (dense)               | java.util.List
| Array (sparse)              | java.util.Map
| flash.utils.ByteArray       | byte[]
| flash.utils.IExternalizable | java.io.Externalizable
| Date                        | java.util.Date
| int/uint                    | java.lang.Integer
| null                        | null
| Number                      | java.lang.Double
| String                      | java.lang.String
| XML                         | org.w3c.dom.Document
| XMLDocument                 | org.w3c.dom.Document
>Java里的List、Arraylist对应到Flex里可以用常用ArrayCollection来接收。
例如：通过调用java端某方法返回一个arraylist，该arraylist里放的一般是用户自定义类型。Flex端接收到的肯定是个Object，这个时候可以强制转换成ArrayCollection:event.result as ArrayCollection。然后通过遍历该ArrayCollection，来取得存每条数据的Object。 当as这边定义了与自定义类型定义的类型对应的类时，也可以强制转换成该类型。