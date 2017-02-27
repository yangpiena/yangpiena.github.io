---
title: 【FPSpread】属性说明
layout: post
comments: true
date: 2016-12-22 11:06:35
categories: FPSpread
tags: [FPSpread, 属性]
keywords:
description:
---
以下记录一些常用的fpSpread控件属性，按字母排序：
<!-- more -->

|**属性**										|**说明**|
| ---------------------------------------------	|:-------|
|`ActiveRow` 									|获取当前活动行号
|`AddCellSpan` 3, 4, 2, 1						|从第3列第4行起合并单元格，跨度为2列1行
|`Backcolor`									|设置指定范围（行和列）的背景颜色
|`CellType` = CellTypeNumber					|设置为数字类型
|`Col` = 2										|定位到第2列
|`ColHeaderRows` = 2							|表头（列标题）行数为2
|`ColHeadersShow` = False						|隐藏列标题
|`ColWidth(`1`)` = 16							|设置第1列的列宽为16
|`ColsFrozen` = 3 								|冻结前三列
|`DataSource` = Rs								|设置Spread的数据源为Rs记录集
|`DeleteCols` 2, 1								|在第2列前删除1列
|`DeleteRows` 2, 1	|在第2行前删除1行（如果Spread是通过设置数据源取得数据的话，则必须设置.DataSource = Nothing才能删除
|`FontSize` = 10								|设置当前栏位的字体大小为10（如果.Row = -1，则设置整列，下同
|`Formula = "SUM(A1:A" & MaxRows & ")"`			|合计：对第1列从第1行到最大行求和
|`GetText` 2, 3, MyText							|将第2列第3行的值赋给变量MyText
|`InsertCols` 2, 1								|在第2列前插入1列
|`InsertRows` 2, 1								|在第2行前插入1行
|`MaxCols` = 5									|设置总列数为5列
|`MaxRows` = 10									|设置总行数为10行
|`OperationMode` = OperationModeRow				|设置Spread的操作模式为行定位（共有6种模式）
|`PrintMarginLeft` = 1000						|打印时左边距=1000（包括预览）
|`PrintMarginTop` = 1000						|打印时上边距=1000（包括预览）
|`Row` = SpreadHeader							|定位到表头（列标题）
|`Row` = -1										|定位到行头（在设置列格式时使用）
|`Row` = 3										|定位到第3行
|`RowHeadersShow` = False						|隐藏行标题
|`RowHeight(`1`)` = 12							|设置第1行的行高为12
|`RowsFrozen` = 2								|冻结前两行
|`SetActiveCell` 1,2							|设置第1列第2行单元格为焦点
|`SetEnhancedColumnHeaderColors` vbRed, vbYellow, vbBlue, vbGreen, vbBlack, vbWhite, vbMagenta, &H80FF&, vbBlue, vbRed													|设置列头颜色
|`SetOddEvenRowColor` vbWhite, &H80000008, &HF7ECE4, &H80000008							|设置奇偶行背景色
|`SetText` 2, 3, "test"							|设置第2列第3行的文本为"test"
|`Text` = "test"								|设置当前栏位的文本为"test"
|`TypeHAlign` = TypeHAlignRight					|设置文字水平对齐方式为右对齐
|`TypeVAlign` = TypeVAlignCenter				|设置文字垂直对齐方式为居中
|`TypeNumberDecPlaces` = 2						|设置小数位数
|`TypeNumberShowSep` = True						|设置千位分隔
|`/n`											|打印属性：换行
|`/fn`											|打印属性：font name字体
|`/fz`											|打印属性：font size大小
|`/fb1`											|打印属性：font bold粗体
|`/fb0`											|打印属性：非粗体
|`/fi1`											|打印属性：font italic斜体
|`/fi0`											|打印属性：非斜体
|`/fu1`											|打印属性：font underline有下划线
|`/fu0`											|打印属性：无下划线
|`/fk1`											|打印属性：font strikethru有删除线
|`/fk0`											|打印属性：无删除线
|`/l`											|打印属性：居左
|`/c`											|打印属性：居中
|`/r`											|打印属性：居右
|`/p`											|打印属性：页码
|`/date`										|打印属性：日期
|`/time`										|打印属性：时间
打印实例
```vb
With Sg2
    Sg2.MaxRows = Mrec.RecordCount
    Set Sg2.DataSource = Mrec
    .ColWidth(1) = 9
    .ColWidth(2) = 8
    .ColWidth(3) = 8
    .ColWidth(4) = 33
    .ColWidth(5) = 33
End With

Private Sub fpSpreadPrint()
    Dim Tsbj, Txbj, Tzbj, Tybj, Ti As Long
    Dim tableHead, tableBodyRow1, tableBodyRow2, tableFoot As String
    
    With Sg2
        Dim customerName, f_orderNo, code, operator, operatDate, repealReason
        Sg1.GetText 1, Sg1.activeRow, code
        Sg1.GetText 2, Sg1.activeRow, f_orderNo
        Sg1.GetText 3, Sg1.activeRow, customerName
        Sg1.GetText 4, Sg1.activeRow, operator
        Sg1.GetText 5, Sg1.activeRow, operatDate
        Sg1.GetText 6, Sg1.activeRow, repealReason
        
        .MaxRows = .MaxRows + 1
        .SetText 2, .MaxRows, "撤销依据"
        .TypeHAlign = TypeHAlignCenter
        .AddCellSpan 3, .MaxRows, 4, 1
        .RowHeight(.MaxRows) = 30
        .SetText 3, .MaxRows, repealReason
        
        .Col = 2
        .Col2 = 5
        .Row = 1
        .PrintType = PrintTypeCellRange
        
        Tsbj = 9
        Txbj = 5
        Tzbj = 8
        Tybj = 6
        Ti = 56.7
        .PrintMarginTop = Tsbj * Ti
        .PrintMarginBottom = Txbj * Ti
        .PrintMarginLeft = Tzbj * Ti
        .PrintMarginRight = Tybj * Ti
        
        tableHead = "合同撤销通知单/n/n"
        tableBodyRow1 = "单据编号：" & code & "      " & "份合同号：" & f_orderNo & "      " & "订货单位名称：" & customerName & "" & "/n/n"
        tableBodyRow2 = "部门领导：" & "                " & "经办人：" & operator & "            " & "撤销日期：" & operatDate & "/n"
        
        .PrintHeader = "/c/fb1/fz""20""" & tableHead & "/l/fb0/fz""10""" & tableBodyRow1 & tableBodyRow2
        .PrintFooter = "/n/c/p//" & .PrintPageCount
                
        FormPrint.PrintState = False
        FormPrint.PrintCount = 0
        FormPrint.SSP.hWndSpread = .hwnd
        FormPrint.PrintCount = .PrintPageCount
        FormPrint.Show 1
        
        If FormPrint.PrintState = True Then
            .PrintSheet
            FormPrint.PrintState = False
        End If
    End With
    Call SG1_Click(Sg1.Col, Sg1.activeRow)
End Sub
```
