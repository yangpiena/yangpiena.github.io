---
title: log4j.properties
author: 昜丿捺
copyright: true
layout: post
comments: true
date: 2016-12-22 12:26:51
categories: 技术
tags: [log4j]
keywords:
description:
---

log4j的配置方法很多，下面记录一个简单配置，以供常用：
<!-- more -->
```java
#OFF,systemOut,logFile,logDailyFile,logRollingFile,logMail,logDB,ALL
#level是日志记录的优先级，分为OFF,TRACE,DEBUG,INFO,WARN,ERROR,FATAL,ALL
log4j.rootLogger = INFO,ERROR,systemOut,logFile,logRollingFile
#
#输出到控制台 
log4j.appender.systemOut = org.apache.log4j.ConsoleAppender
log4j.appender.systemOut.layout = org.apache.log4j.PatternLayout
log4j.appender.systemOut.layout.ConversionPattern = [%-5p][%-22d{yyyy/MM/dd HH:mm:ssS}][%l]%n%m%n
log4j.appender.systemOut.Threshold = INFO
log4j.appender.systemOut.ImmediateFlush = TRUE
log4j.appender.systemOut.Target = System.out
#
#输出到文件 
log4j.appender.logFile = org.apache.log4j.FileAppender
log4j.appender.logFile.layout = org.apache.log4j.PatternLayout
log4j.appender.logFile.layout.ConversionPattern = [%-5p][%-22d{yyyy/MM/dd HH:mm:ssS}][%l]%n%m%n
log4j.appender.logFile.Threshold = ERROR
log4j.appender.logFile.ImmediateFlush = TRUE
log4j.appender.logFile.Append = TRUE
log4j.appender.logFile.File = ${catalina.home}/logs/error.log
log4j.appender.logFile.Encoding = UTF-8
#
#设定文件大小输出到文件 
log4j.appender.logRollingFile = org.apache.log4j.RollingFileAppender
log4j.appender.logRollingFile.layout = org.apache.log4j.PatternLayout
log4j.appender.logRollingFile.layout.ConversionPattern = [%-5p][%-22d{yyyy/MM/dd HH:mm:ssS}][%l]%n%m%n
log4j.appender.logRollingFile.Threshold = INFO
log4j.appender.logRollingFile.ImmediateFlush = TRUE
log4j.appender.logRollingFile.Append = TRUE
log4j.appender.logRollingFile.File = ${catalina.home}/logs/log.log
log4j.appender.logRollingFile.MaxFileSize = 10MB
log4j.appender.logRollingFile.MaxBackupIndex = 10
log4j.appender.logRollingFile.Encoding = UTF-8
#
##按DatePattern输出到文件 
#log4j.appender.logDailyFile = org.apache.log4j.DailyRollingFileAppender
#log4j.appender.logDailyFile.layout = org.apache.log4j.PatternLayout
#log4j.appender.logDailyFile.layout.ConversionPattern = [%-5p][%-22d{yyyy/MM/dd HH:mm:ssS}][%l]%n%m%n
#log4j.appender.logDailyFile.Threshold = DEBUG
#log4j.appender.logDailyFile.ImmediateFlush = TRUE
#log4j.appender.logDailyFile.Append = TRUE
#log4j.appender.logDailyFile.File = ../Struts2/WebRoot/log/DailyFile/log4j_Struts
#log4j.appender.logDailyFile.DatePattern = '.'yyyy-MM-dd-HH-mm'.log'
#log4j.appender.logDailyFile.Encoding = UTF-8
#
##用Email发送日志 
#log4j.appender.logMail = org.apache.log4j.net.SMTPAppender
#log4j.appender.logMail.layout = org.apache.log4j.HTMLLayout
#log4j.appender.logMail.layout.LocationInfo = TRUE
#log4j.appender.logMail.layout.Title = Struts2 Mail LogFile
#log4j.appender.logMail.Threshold = DEBUG
#log4j.appender.logMail.SMTPDebug = FALSE
#log4j.appender.logMail.SMTPHost = SMTP.163.com
#log4j.appender.logMail.From = xly3000@163.com
#log4j.appender.logMail.To = xly3000@gmail.com
##log4j.appender.logMail.Cc = xly3000@gmail.com
##log4j.appender.logMail.Bcc = xly3000@gmail.com
#log4j.appender.logMail.SMTPUsername = xly3000
#log4j.appender.logMail.SMTPPassword = 1234567
#log4j.appender.logMail.Subject = Log4j Log Messages
##log4j.appender.logMail.BufferSize = 1024
##log4j.appender.logMail.SMTPAuth = TRUE
#
##将日志登录到MySQL数据库 
#log4j.appender.logDB = org.apache.log4j.jdbc.JDBCAppender
#log4j.appender.logDB.layout = org.apache.log4j.PatternLayout
#log4j.appender.logDB.Driver = com.mysql.jdbc.Driver
#log4j.appender.logDB.URL = jdbc:mysql://127.0.0.1:3306/xly
#log4j.appender.logDB.User = root
#log4j.appender.logDB.Password = 123456
#log4j.appender.logDB.Sql = INSERT INTOT_log4j(project_name,create_date,level,category,file_name,thread_name,line,all_category,message)values('Struts2','%d{yyyy-MM-ddHH:mm:ss}','%p','%c','%F','%t','%L','%l','%m')
```