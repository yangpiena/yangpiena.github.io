---
title: Nginx下载和安装
author: 昜丿捺
copyright: true
categories: 技术
timestamp: 1659337962
date: 2022-08-01 15:12:42
authorDesc:
tags:
description: Nginx在不同系统环境下的安装教程
---
# Linux 下源码安装
> 在linux下安装nginx，首先需要安装 gcc-c++ 编译器，然后安装nginx依赖的 pcre 和 zlib 包，最后安装nginx即可。

## 安装依赖
> 无网络情况下，可下载安装包，上传到服务器，进行编译安装 `./configure` `make` `make install`

- 先安装gcc-c++编译器
```
yum/zypper install gcc-c++
```
    ```
    yum/zypper install -y openssl openssl-devel
    ```
- 再安装pcre包
```
yum/zypper install -y pcre pcre-devel
```
- 再安装zlib包
```
yum/zypper install -y zlib zlib-devel
```

## 安装nginx
```
tar -zxvf nginx-1.18.0.tar.gz
```
```
cd nginx-1.18.0
```
默认安装路径为 `/usr/local/nginx` ，也可使用参数prefix重新指定安装路径 ` --prefix=/usr/local/nginx`
```
./configure
```
```
make
```
```
make install
```

## 配置nginx
修改配置文件：
```
vim /usr/local/nginx/conf/nginx.conf
```
例如下面的配置，将本地端口8000向外转发为端口80，在 `server` 里增加下面配置：

        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
           #root   html;
           #index  index.html index.htm;
           proxy_pass http://127.0.0.1:8000; #gunicorn
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        location /static {
           alias /usr/local/cam/statics; # your Django project's static files - amend as required
        }

### 检查nginx配置
```
cd /usr/local/nginx/
```
```
./sbin/nginx -t
```
正常情况下输出nginx的配置文件路径，及配置校验成功提示：

    nginx: the configuration file /usr/local/nginx/conf/nginx.conf syntax is ok
    nginx: configuration file /usr/local/nginx/conf/nginx.conf test is successful

## 启动nginx
```
cd /usr/local/nginx/sbin
```
```
./nginx
```
> 启动：/usr/local/nginx/sbin/nginx
停止/重新加载：/usr/local/nginx/sbin/nginx -s stop(quit、reload)
验证配置文件是否合法：/usr/local/nginx/sbin/nginx -t
命令帮助：/usr/local/nginx/sbin/nginx -h

## 创建nginx服务
建立服务文件
```
vim /usr/lib/systemd/system/nginx.service
```
加入下面内容：
```
[Unit]
Description=nginx - high performance web server
After=network.target remote-fs.target nss-lookup.target
[Service]
Type=forking
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s stop
[Install]
WantedBy=multi-user.target
```

> 文件内容解释: [Unit]: 服务的说明
Description:描述服务
After:描述服务类别
[Service]服务运行参数的设置
Type=forking是后台运行的形式
ExecStart为服务的具体运行命令
ExecReload为重启命令
ExecStop为停止命令
PrivateTmp=True表示给服务分配独立的临时空间
注意：启动、重启、停止命令全部要求使用绝对路径
[Install]服务安装的相关设置，可设置为多用户

使服务文件生效
```
systemctl daemon-reload
```
> 如果启动服务失败，则以754的权限保存在目录：
Chmod +754 /usr/lib/systemd/system/nginx.service

启动nginx服务
```
systemctl start nginx.service
```
停止nginx服务
```
systemctl stop nginx.service
```
> [其它服务命令参考](/2016/11/22/Linux命令大全/)


---


# Open SUSE 下安装
有两种安装方法：
- 使用 YAST 工具界面安装
- 使用 zypper 命令 `zypper in nginx` 安装

## 检查nginx
```
nginx -v
```
如果输出了Nginx的版本号说明安装成功了。

## 启动nginx
```
nginx
```
或
```
systemctl start nginx
```
### 查找默认的配置文件位置
```
nginx -t
```
### 加载指定的配置文件
nginx 启动时会默认加载 `/etc/nginx/nginx.cnf` 下的配置文件进行启动，如果你想加载其他的配置文件，可以使用 -c 指令：
```
nginx -c /etc/nginx/nginx.conf
```

## 停止nginx
nginx 停止有两种方式：快速停止和平滑停止
快速停止：
```
nginx -s stop
```
平滑停止：
```
nginx -s quit
```
> 平滑停止会等待所有的工作进程处理完所有的请求后，再进行停止，不是强制停止。

## 重载配置文件
nginx 支持配置文件的热修改，无需重启服务也可重新加载配置文件，使用命令：
```
nginx -s reload
```
> 主进程接收到上述指令后，首先会检查配置文件的语法是否正确，确认无误后，会开启新的工作进程，然后向旧的工作进程发送关闭的指令，旧的工作进程收到指令后，并非立即停止，而是处理完当前的请求后再自行停止。通过这个步骤，来完成对配置文件的重新载入。

## 添加到开机自启动
```
systemctl enable nginx
```

---

# 查看 Nginx 的运行状态
```
ps -ef|grep nginx
```
如果打出多个进程信息，表示nginx 已经成功启动，包含一个主进程（master process）和几个工作进程（work process）。
如果没有进程信息，表示 nginx 未成功启动。
> 从容停止 kill -QUIT 主进程号
快速停止 kill -TERM 主进程号
强制停止 kill -9 nginx
