---
title: 【Flex】设置Scroller的速度
layout: post
comments: true
date: 2016-12-22 16:38:11
categories: Flex
tags: Scroller
keywords: 速度
description:
---
Flex每个Scroller都有一个mouseWheelChanging方法,当滚动鼠标中轮的时候会调用，而后就可以在这个函数中进行判断，如下:
<!-- more -->
假设我的滚动条id = mainScroller
```as3
protected function mainScroller _mouseWheelChangingHandler(event:FlexMouseEvent):void
{
	event.preventDefault();
	var modifier:int       = 5;
	var delta:Number       = Number(event.delta) * modifier;
	var viewport:IViewport = mainScroller.verticalScrollBar.viewport;
	var vPos:Number        = viewport.verticalScrollPosition;
	var maximum:Number     = mainScroller.verticalScrollBar.maximum;
	
	if (delta < 0) 
	{
		mainScroller.verticalScrollBar.viewport.verticalScrollPosition = Math.min(vPos - delta, maximum) ;        
	}
	else
	{
		mainScroller.verticalScrollBar.viewport.verticalScrollPosition = Math.max(vPos - delta, 0);
	}
}
```