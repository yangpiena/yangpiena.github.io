---
title: 【C++】在VS2017中使用C++创建和使用DLL
layout: post
comments: true
date: 2018-07-03 13:28:27
categories: C++
tags: [C++]
keywords: DLL
description:
---

#### 创建DLL
1、打开Visual Studio 2017，创建如下图的工程：
![](http://ogoh2gimk.bkt.clouddn.com/newProject.png)
![](http://ogoh2gimk.bkt.clouddn.com/newProject2.png)

2、右键项目》添加》新建项》头文件(.h)
![](http://ogoh2gimk.bkt.clouddn.com/newh.png)
在头文件中输入以下代码：
``` C++
extern "C"
{
	__declspec(dllexport) int __stdcall add(int a, int b);
}
```

3、右键项目》添加》新建项》C++文件(.cpp)
![](http://ogoh2gimk.bkt.clouddn.com/newcpp.png)
在C++文件中输入以下代码：
``` C++
#include "DWGNoEnDe.h"
extern "C"
{
	int __stdcall add(int a, int b)
	{
		int c;
		c = a + b;
		return c;
	}
}
```

4、右键项目》添加》新建项》模块定义文件(.def)
![](http://ogoh2gimk.bkt.clouddn.com/newdef.png)
在模块定义文件中输入以下代码：
``` C++
LIBRARY
EXPORTS
add
```
> add为方法名

5、右键项目》属性》配置属性》C/C++》代码生成，设置运行库为：多线程 DLL（/MD）
![](http://ogoh2gimk.bkt.clouddn.com/%E5%A4%9A%E7%BA%BF%E7%A8%8BDLL.png)

6、编译项目，生成Release版的DLL
![](http://ogoh2gimk.bkt.clouddn.com/buildDLL.png)
可编译为x86或x64。


#### 使用DLL
##### 一、C++调用
1、新建项目
![](http://ogoh2gimk.bkt.clouddn.com/newWin32.png)

2、拷贝编译生成的dll和头文件，到测试项目下面
![](http://ogoh2gimk.bkt.clouddn.com/copyDLLAndH.png)

3、右键项目》添加》新建项》C++文件(.cpp)
![](http://ogoh2gimk.bkt.clouddn.com/newcpp2.png)
在C++文件中输入以下代码：
``` C++
#include <stdio.h>
#include "DWGNoEnDe.h"
void main()
{
	int a = 10;
	int b = 23;
	int c = add(a, b);
	printf("输出：%d\n",c);
	getchar();
}
```

4、点击“本地Windows调试器”运行项目，调用成功
![](http://ogoh2gimk.bkt.clouddn.com/excuteEXE.png)


##### 二、VB调用
1、拷贝C++DLL到exe程序同一目录下

2、在exe程序中引用C++DLL
```
Public Declare Function add Lib "DWGNoEnDe.dll" (ByVal a As Long, ByVal b As Long) As Long
```

3、调用C++DLL的方法
```
Private Sub Command1_Click()
    Text3.Text = add(CInt(Text1.Text), CInt(Text2.Text))
End Sub
```

##### 三、C#调用
1、新建控制台应用项目

2、拷贝C++DLL到`项目名称\bin\Debug`下，与exe处于同一目录

3、在`Program.cs`中输入如下代码：
![](http://ogoh2gimk.bkt.clouddn.com/Programe.cs)

4、点击启动运行项目，调用成功