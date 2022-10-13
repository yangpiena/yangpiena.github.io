---
title: Docker下载安装
author: 昜丿捺
copyright: true
categories: 技术
timestamp: 1661594120
date: 2022-08-27 17:55:20
authorDesc:
tags: [docker]
description:
---
# 环境准备
本次系统使用 CentOS8 ，因官方已停用 CentOS8 的镜像，故需先更新源。
```
cd /etc/yum.repos.d
```
```
vi CentOS-Linux-BaseOS.repo
```
```
[baseos]
name=CentOS Linux $releasever - BaseOS
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=BaseOS&infra=$infra
#baseurl=http://mirror.centos.org/$contentdir/$releasever/BaseOS/$basearch/os/
baseurl=https://vault.centos.org/centos/$releasever/BaseOS/$basearch/os/
gpgcheck=1
enabled=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial
```
```
vi CentOS-Linux-AppStream.repo
```
```
[appstream]
name=CentOS Linux $releasever - AppStream
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=AppStream&infra=$infra
#baseurl=http://mirror.centos.org/$contentdir/$releasever/AppStream/$basearch/os/
baseurl=https://vault.centos.org/centos/$releasever/AppStream/$basearch/os/
gpgcheck=1
enabled=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-centosofficial
```


# 在线安装
## 安装 docker
```
yum install -y yum-utils
```
```
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```
```
yum install https://mirrors.aliyun.com/docker-ce/linux/centos/8/x86_64/stable/Packages/containerd.io-1.6.8-3.1.el8.x86_64.rpm
```
> 更新 container.io 包, 否则可能会报 `package docker-ce-3:19.03.13-3.el7.x86_64 requires containerd.io >= 1.2.2-3, ...`的错，可在 https://mirrors.aliyun.com/docker-ce/linux/centos/8/x86_64/stable/Packages/ 下找最新版安装

``` 
yum install docker-ce -y
```
```
systemctl enable docker.service
```
```
systemctl start docker.service
```
查看 docker 版本
```
docker version
``` 
## 安装 docker-compose
方法一：使用 pip 安装
```
pip3 install docker-compose
```
方法二：直接下载安装
```
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
```
chmod +x /usr/local/bin/docker-compose
```
```
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```
查看 docker-compose 版本
```
docker-compose version
```

# 离线安装
> 待续


# 国内镜像配置
编辑 `/etc/docker/daemon.json` 加入下列配置：
> 如果有阿里云 docker hub mirror 账号的，可以将 https://registry.cn-hangzhou.aliyuncs.com/ 替换成自己的 https://<你的ID>.mirror.aliyuncs.com
```
{
  "registry-mirrors": [
    "https://registry.docker-cn.com",
    "https://registry.cn-hangzhou.aliyuncs.com/",
    "http://f1361db2.m.daocloud.io",
    "https://docker.mirrors.ustc.edu.cn",
    "https://mirror.ccs.tencentyun.com",
    "http://hub-mirror.c.163.com"
  ]
}
```
重启 docker
```
systemctl restart docker
```