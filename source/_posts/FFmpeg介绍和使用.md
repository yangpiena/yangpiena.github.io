---
title: FFmpeg介绍和使用
author: 昜丿捺
copyright: true
categories: 技术
date: 2023-02-15 20:28:47
authorDesc:
tags: [FFmpeg]
description: FFmpeg实现视频或音频的转换
---
# 介绍
FFmpeg是一款开源软件，用于生成处理多媒体数据的各类库和程序。FFmpeg可以转码、处理视频和图片（调整视频、图片大小，去噪等）、打包、传输及播放视频。作为最受欢迎的视频和图像处理软件，它被来自各行各业的不同公司所广泛使用。  
[Windows版官方下载地址](https://ottverse.com/ffmpeg-builds/)

# 使用
视频压缩用到的参数主要为以下几个：
- 文件路径：-i 输入文件的路径
- 码率：-b:v 输出文件的码率
- 分辨率：-s 输出文件的分辨率；
- 帧率：-r 输出文件的帧率值

常用压缩命令：
```
ffmpeg.exe -i test.mp4 -b:v 500k -r 25 -s 720x480 output.mkv
```
分辨率可以根据目标视频的尺寸等比进行设置。

> Xabe.FFmpeg是一个ffmpeg第三方封装，它提供了ffmpeg的下载、管理以及ffmpeg.exe的详细封装操作，使ffmpeg的操作更加简洁。
通过Nuget包引用后（只支持.net 4.6.1及以上），调用await FFmpeg.GetLatestVersion(FFmpegVersion.Full); 即可获取相应的版本。