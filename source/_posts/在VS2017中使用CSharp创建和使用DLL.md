---
title: '在VS2017中使用C#创建和使用DLL'
author: 昜丿捺
copyright: true
layout: post
comments: true
date: 2018-07-03 15:05:32
categories: 技术
tags: [C#]
keywords: DLL
description:
---


#### 创建DLL
1、打开Visual Studio 2017，创建如下图的工程：
![](https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/newProject3.png)

<!-- more -->

2、在类中定义接口类和接口实现类
![](https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/newCSharp.png)
输入以下代码：
```C#
[Guid("710CA75B-1193-4BBF-ADA6-C92763616B85")]
public interface IDWGNoEnde
{
    string Encode(string i_DWGNo);
    string Decode(string i_DWGNo);
}
[Guid("F212F390-FB5C-4AF6-94CD-ED72B5ADEEC5")]
public class DWGNoEnDe : IDWGNoEnde
{
    public string Encode(string i_DWGNo)
    {
        string o_EncodeDWGNo;
        o_EncodeDWGNo = i_DWGNo + "_YPN";
        return o_EncodeDWGNo;
    }
    public string Decode(string i_DWGNo)
    {
        string o_DecodeDWGNo;
        o_DecodeDWGNo = i_DWGNo.Substring(0, i_DWGNo.Length - 4);
        return o_DecodeDWGNo;
    }
}
```
其中，GUID通过点击VS工具》创建GUID，复制得到
![](https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/createGUID.png)

3、右键项目》属性》应用程序》程序集信息，勾选使程序集COM可见
![](https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E7%A8%8B%E5%BA%8F%E9%9B%86%E4%BF%A1%E6%81%AF.png)

4、右键项目》属性》生成，勾选为COM互操作注册
![](https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/CSharpDLL%E7%94%9F%E6%88%90.png)

5、打开VS2017的开发人员命令提示符，输入`sn -k c:\myKey.snk`，生成密钥文件
![](https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/vs2017CMD.png)

6、右键项目》属性》签名》选择强名称密钥文件，点击浏览，选择刚刚生成的snk文件
![](https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E7%AD%BE%E5%90%8D.png)

7、点击生成》重新生成解决方案，生成DLL


#### 使用DLL
##### VB调用
1、生成tlb文件
> 一般VS生成dll的同时，会自动生成tlb文件。如果VB和VS在同一台机器，则直接用该tlb即可，如果不是同一台机器，则需要将dll拷贝到VS所在机器上重新生成tlb文件。

在vb所在机器上，以管理员身份打开cmd，进入.netFramework所在目录`C:\WINDOWS\Microsoft.NET\Framework\v4.0.30319>`，执行以下命令生成tlb文件：

	regasm F:\TestC#DLL\DWGNoEnDe.dll /tlb:DWGNoEnde.tlb /codebase
![](https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/cmdtlb.png)

2、打开VB工程，引用tlb文件
点击浏览，选择刚刚生成的tlb文件，确定即可。
![](https://picturebed-1258146968.cos.ap-beijing.myqcloud.com/%E5%BC%95%E7%94%A8tlb.png)

3、在代码中定义和使用DLL
```VB
Dim v_dwgnoEnde As New DWGNoEnDe.DWGNoEnDe
Private Sub Command1_Click()
    Text2.Text = v_dwgnoEnde.Encode(Text1.Text)
End Sub
```