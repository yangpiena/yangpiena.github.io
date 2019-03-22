---
title: FPSpread之fpComboAdo的初始化
layout: post
comments: true
date: 2016-12-22 11:53:28
categories: 技术
tags: [FPSpread]
keywords: 初始化
description:
---
初始化具有2列内容的下拉框，如下实例：
<!-- more -->
``` vb
With fpCbodis_cd
    .Clear
    .Columns = 2
    .ColumnEdit = 0
    .Col = 0
    .ColWidth = 5
    .Col = 1
    .ColWidth = 25
    .ListWidth = 3000
    .AutoSearchFill = True
    .LineStyle = LineStyleFlat
    
    Call CloseMrec
    Mrec.Open "select dis_cd,name from ord_d_sites ", Mconn, 1, 3
    Do While Not Mrec.EOF
        .AddItem Trim(Mrec!dis_cd) & Chr(9) & Trim(Mrec!name)

        Mrec.MoveNext
    Loop
End With
```