---
title: 【Flex】dataGrid自动生成序号
layout: post
comments: true
date: 2016-12-22 16:23:55
categories: Flex
tags: [Flex, dataGrid]
keywords: 序号
description:
---
通过LabelFunction属性实现自动生成序号。
定义方法：
```as3
/**
* 生成datagrid第一列用的序号
*/
private function formatIndexNumber(item:Object, colum:Object):String
{
    return indexNumLabelFun(item, colum.mx_internal::owner);
}
 
public static function indexNumLabelFun(value:Object, dataGrid:Object):String
{
   var arr: Array = dataGrid.dataProvider.source;
   var indexNum: int = (arr.indexOf(value) + 1);            
   return indexNum.toString();
}
```
<!-- more -->
设置界面：
```as3
------------------- Item中设置 LabelFunction 属性----------------------
<mx:DataGridColumn headerText="序号" width="50" labelFunction="formatIndexNumber" />
```