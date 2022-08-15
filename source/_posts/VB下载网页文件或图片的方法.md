---
title: VB下载网页文件或图片的方法
author: 昜丿捺
copyright: true
layout: post
comments: true
date: 2018-04-26 17:21:46
categories: 技术
tags: [VB]
keywords: 下载
description: 
---

# 一、使用API函数URLDownloadToFile，下载网页、图片等其它文件到本地
引入API：

	Private Declare Function URLDownloadToFile Lib "urlmon" Alias "URLDownloadToFileA" (ByVal pCaller As Long, ByVal szURL As String, ByVal szFileName As String, ByVal dwReserved As Long, ByVal lpfnCB As Long) As Long
用法：
```
Private Sub test()
    Dim v_URL As String, v_FileName As String, v_Result As Long
    v_URL = "http://www.baidu.com/img/baidu_logo.gif"
    v_FileName = App.Path & "\Baidu.bmp"  '下载百度Logo图片
    v_Result = URLDownloadToFile(0, v_URL, v_FileName, 0, 0)     '下载文件，返回 0 表示成功
    v_URL = "http://www.baidu.com"
    v_FileName = App.Path & "\Baidu.html" '下载百度首页的网页
    v_Result = URLDownloadToFile(0, v_URL, v_FileName, 0, 0)     '下载文件，返回 0 表示成功
End Sub
```

<!-- more -->

# 二、使用API函数OleLoadPicturePath，下载图片文件到变量，注意要勾选引用：OLE Automation
引入API：

	Private Declare Function OleLoadPicturePath Lib "oleaut32.dll" (ByVal szURLorPath As Long, ByVal punkCaller As Long, ByVal dwReserved As Long, ByVal clrReserved As OLE_COLOR, ByRef riid As TGUID, ByRef ppvRet As IPicture) As Long
	Private Type TGUID
		Data1 As Long
		Data2 As Integer
		Data3 As Integer
		Data4(0 To 7) As Byte
	End Type
用法：
```
Public Function LoadNetPicture(ByVal i_ImgUrl As String) As Picture
    Dim riid As TGUID
    riid.Data1    = &H7BF80980
    riid.Data2    = &HBF32
    riid.Data3    = &H101A
    riid.Data4(0) = &H8B
    riid.Data4(1) = &HBB
    riid.Data4(2) = &H0
    riid.Data4(3) = &HAA
    riid.Data4(4) = &H0
    riid.Data4(5) = &H30
    riid.Data4(6) = &HC
    riid.Data4(7) = &HAB
    OleLoadPicturePath StrPtr(i_ImgUrl), 0&, 0&, 0&, riid, LoadNetPicture
End Function
Private Sub test()
    Dim v_ImgUrl As String, v_Picture As Picture
    v_ImgUrl = "http://www.baidu.com/img/baidu_logo.gif"
    Set v_Picture = LoadNetPicture(v_ImgUrl)          '将图片下载到变量
    SavePicture v_Picture, App.Path & "\MyImg.bmp"    '保存到硬盘
    Picture1.Picture = v_Picture
    '如果要将图片装载到控件
    Picture1.Picture = LoadNetPicture(v_ImgUrl)
End Sub
```

# 三、使用Microsoft.XMLHTTP对象，下载网页、图片等其它文件到本地
定义公用下载过程：
```
Public Sub DownNetFile(ByVal i_Url As String, ByVal i_File As String)
    Dim XmlHttp, B() As Byte
    Set XmlHttp = CreateObject("Microsoft.XMLHTTP")
    XmlHttp.Open "GET", i_Url, False
    XmlHttp.Send
    If XmlHttp.ReadyState = 4 Then
        B() = XmlHttp.ResponseBody
        Open i_File For Binary As #1
        Put #1, , B()
        Close #1
    End If
    Set XmlHttp = Nothing
End Sub
```
用法:

	DownNetFile "http://www.baidu.com/img/baidu_logo.gif", App.Path & "\My-1.bmp" '下载百度图片
	DownNetFile "http://www.baidu.com", App.Path & "\Baidu.html"                  '下载百度首页的网页

# 四、使用WebBrowser的Document对象，保存网页的所有图片
先用 WebBrowser1 显示一个网页，如：
	
	WebBrowser1.Navigate "http://www.baidu.com"

待网页加载完毕后，再执行以下语句：
```
Dim v_Path As String, I As Long, E, v_Range
v_Path = App.Path & "\Tu\"
WebBrowser1.Silent = True '关闭交互，禁止脚本错误
For Each E In WebBrowser1.Document.All
    If E.tagName = "IMG" Then
        Set v_Range = WebBrowser1.Document.body.createControlRange()
        v_Range.Add E
        v_Range.execCommand "Copy" '复制到剪贴板
        I = I + 1
        SavePicture Clipboard.GetData, v_Path & I & ".bmp" '保存到硬盘
    End If
Next
```

# 五、用API调用系统的另存为下载对话框，进行文件下载
引入API:

	Private Declare Function DoFileDownload Lib "shdocvw.dll" (ByVal lpszFile As String) As Long

用法：
```
Dim v_Url As String
v_Url = StrConv("http://www.baidu.com", vbUnicode)
Call DoFileDownload(v_Url)
```

# 六、用WebBrowser1的ExecWB方法调用网页另存为对话框下载
	WebBrowser1.ExecWB OLECMDID_SAVEAS, OLECMDEXECOPT_DODEFAULT

---

以上方法各有优缺点。
Microsoft.XMLHTTP 对于大文件有利，支持断点续传，但需调用 getResponseHeader 进行数据检查。
对于谷歌地图图片，图片链接形如：http://mt1.google.cn/vt/lyrs=s@63&gl=cn&x=51694&s=&y=26884&z=16&s=Galile ，仅第四种方法有效。

> 本文根据[rztyfx的专栏](https://blog.csdn.net/rztyfx/article/details/7605624)整理发表。