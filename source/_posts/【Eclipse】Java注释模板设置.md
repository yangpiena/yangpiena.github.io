---
title: 【Eclipse】Java注释模板设置
layout: post
comments: true
date: 2016-12-27 10:27:15
categories: Eclipse
tags: [Eclipse,Java]
keywords: 注释
description:
---

设置注释模板的入口： Window->Preference->Java->Code Style->Code Template  ，然后展开Comments节点就是所有需设置注释的元素。现就每一元素逐一介绍：

#### 文件(Files)注释标签：
	/**
	 * @Title       : ${file_name}
	 * @Package     : ${package_name}
	 * @Description : ${todo}
	 * @author      : YPN
	 * @date        : ${date} ${time}
	 * @version     : V1.0
	 */

<!-- more -->

#### 类型(Types)注释标签（类的注释）：
	/**
	 * @ClassName   : ${type_name}
	 * @Description : ${todo}
	 * @author      : YPN
	 * @date        : ${date} ${time}
	 * 
	 * ${tags}
	 */

#### 字段(Fields)注释标签：
	/**
	 * @Fields ${field} : ${todo}
	 */

#### 构造函数标签：
	/**
	 * <p>Title       : </p>
	 * <p>Description : </p>
	 * ${tags}
	 */

#### 方法(Constructor & Methods)标签：
	/**
	 * @Title       : ${enclosing_method}
	 * @Description : ${todo}
	 * @author      : YPN
	 * @date        : ${date} ${time}
	 * @param       : ${tags}
	 * @return      : ${return_type}
	 * @throws
	 */

#### 覆盖方法(Overriding Methods)标签：
	/*
	 * <p>Title       : ${enclosing_method}</p>
	 * <p>Description : </p>
	 * ${tags}
	 * ${see_to_overridden}
	 */

#### 代表方法(Delegate Methods)标签：
	/**
	 * ${tags}
	 * ${see_to_target}
	 */

#### getter方法标签：
	/**
	 * @return ${bare_field_name}
	 */

#### setter方法标签：
	/**
	 * @param ${param} 要设置的 ${bare_field_name}
	 */