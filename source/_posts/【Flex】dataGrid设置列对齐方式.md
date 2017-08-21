---
title: 【Flex】dataGrid设置列对齐方式
layout: post
comments: true
date: 2016-12-22 16:23:25
categories: Flex
tags: [Flex, dataGrid]
keywords: 列对齐
description:
---
可参照以下实例设置：
<!-- more -->
```as3
<s:GridColumn dataField="sex" headerText="Sex">
	<s:headerRenderer>
		<fx:Component>
			<s:DefaultGridHeaderRenderer>
				<s:labelDisplay>
					<s:Label left="0" right="0" top="0" bottom="0"
							 fontWeight="bold" maxDisplayedLines="1"
							 textAlign="center" verticalAlign="middle"/>
				</s:labelDisplay>
			</s:DefaultGridHeaderRenderer>
		</fx:Component>
	</s:headerRenderer>
	<s:itemRenderer>
		<fx:Component>
			<s:DefaultGridItemRenderer textAlign="center"/>
		</fx:Component>
	</s:itemRenderer>
</s:GridColumn>
```