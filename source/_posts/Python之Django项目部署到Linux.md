---
title: Python之Django项目部署到Linux
author: 昜丿捺
copyright: true
categories: 技术
timestamp: 1614668259
date: 2021-03-02 14:57:39
authorDesc:
tags:
description: 本教程主要记录在Linux上如何部署Django项目
---
# 部署方式
- ** Python 3.7.9 + Django 3.1.7 + Gunicorn + Nginx + CentOS8 **


# 安装Python3
1. 下载和解压
下载安装包到路径：`/user/local/download`
```
tar -zxvf Python-3.7.9.tgz
```
	```
	cd Python-3.7.9
	```

1. 配置
安装到路径：`/usr/local/python3`
```
./configure --prefix=/usr/local/python3 --with-ssl
```
	> 如果缺少c或gcc，则按此[链接](https://blog.csdn.net/weixin_40861358/article/details/83960692)安装。
1. 编译
```
make
```
1. 安装
```
make install
```

## 创建软链接
```
ln -s /usr/local/python3/bin/python3 /usr/bin/python
```
```
ln -s /usr/local/python3/bin/pip3 /usr/bin/pip
```
或删除已有链接
```
rm -rf /usr/bin/python3
rm -rf /usr/bin/pip3
```

## 测试
```
python --version
```


------------


# 安装pip3
有时安装完python后，缺少pip，可用以下方法尝试安装。
## 方法一：安装setuptools
1. 下载
```
wget --no-check-certificate  https://pypi.python.org/packages/source/s/setuptools/setuptools-19.6.tar.gz#md5=c607dd118eae682c44ed146367a17e26
```
1. 解压
```
tar -zxvf setuptools-19.6.tar.gz
```
1. 进入
```
cd setuptools-19.6/
```
1. 编译
```
python3 setup.py build
```
1. 安装
```
python3 setup.py install
```
1. 创建软连接
```
ln -s /usr/local/python3/bin/pip3 /usr/bin/pip3
```
1. 查看pip3版本
```
pip3 -V
```

## 方法二：get-pip.py
1. 下载get-pip.py 文件
https://pip.pypa.io/en/stable/installing/
1. python get-pip.py
1. 重新安装python3
> 如果缺少zlib，安装方法：
curl -O http://www.zlib.net/zlib-1.2.11.tar.gz
tar xvfz zlib-1.2.11.tar.gz
./configure
sudo make && sudo make install


------------


 # 安装Django
```python
pip install django==3.1.7
```
安装mysqlclient依赖
```python
pip install mysqlclient
```
>  报错解决：从No match for argument: gcc-devel 到centos8 的dnf
 https://blog.csdn.net/zw3413/article/details/105152826


------------


# 安装MySQL5.7
>  [Linux安装MySQL5.7完整版流程](https://www.suibibk.com/topic/721421244804628480)

1. 解压安装包
```
tar -zxvf mysql-5.7.32-linux-glibc2.12-x86_64.tar.gz
```
	```
	mv mysql-5.7.32-linux-glibc2.12-x86_64 /usr/local/mysql
	```
1. 创建mysql用户组和用户
```
groupadd mysql
```
	```
	useradd -r -g mysql mysql
	```
1. 创建数据目录并赋予权限
创建目录
```
mkdir -p  /data/mysql
```
	赋予权限
	```
	chown mysql:mysql -R /data/mysql
	```
	> 通常都会将数据存放目录外置到别的目录，这样子升级mysql不会影响历历史数据。

1. 修改配置文件
```
vim /etc/my.cnf
```
	把默认的内容删掉，改为下面的内容即可。
```
[mysqld]
bind-address=0.0.0.0
port=3306
user=mysql
basedir=/usr/local/mysql
datadir=/data/mysql
socket=/tmp/mysql.sock
log-error=/data/mysql/mysql.err
pid-file=/data/mysql/mysql.pid
#character config
character_set_server=utf8mb4
symbolic-links=0
explicit_defaults_for_timestamp=true
[client]
default-character-set=utf8
[mysql]
default-character-set=utf8
```

1. 初始化数据库
```
cd /usr/local/mysql/bin/
```
	```
	./mysqld --defaults-file=/etc/my.cnf --basedir=/usr/local/mysql/ --datadir=/data/mysql/ --user=mysql --initialize
	```
1. 查看root用户密码
```
cat /data/mysql/mysql.err
```
	初始化完成后，默认会生成一个root用户的密码，在最后位置。这里要记住，后面登录的时候需要使用。

## 启动
使用systemd管理mysql，先创建服务文件`mysql.service`
```
vi /usr/lib/systemd/system/mysql.service
```
输入以下内容：

    [Unit]
    Description=MySQL Server
    Documentation=man:mysqld(8)
    After=network.target
    After=syslog.target
    [Install]
    WantedBy=multi-user.target
    [Service]
    User=mysql
    Group=mysql
    ExecStart=/usr/local/mysql/bin/mysqld --defaults-file=/etc/my.cnf
    LimitNOFILE = 5000

使文件生效
```
systemctl daemon-reload
```
## 登录mysql，修改root用户的密码
bin目录下
```
./mysql -u root -p
```
密码为初始化的时候生成的随机密码串。
```
SET PASSWORD = PASSWORD('123456');
```
```
ALTER USER 'root'@'localhost' PASSWORD EXPIRE NEVER;
```
```
FLUSH PRIVILEGES;
```
依次执行上面三条命令，这里密码设置为123456。

## 远程连接
如果报没权限，因为我们的root用户默认只能够本机访问，这里要开放下，登录mysql，执行如下三条命令即可.
- 访问mysql库
```
use mysql
```
- 使root能再任何host访问
```
update user set host = '%' where user = 'root';
```
	```
	FLUSH PRIVILEGES;
	```


------------


# 安装gunicorn
```python
 pip install gunicorn
```
## 设置gunicorn的软连接
```
ln -s /usr/local/python3/bin/gunicorn /usr/bin/gunicorn
```
## 启动
- 命令行启动gunicorn
进入项目根目录下执行：
```python
gunicorn cam.wsgi:application -w 2 -b 0.0.0.0:8000
```
	> cam.wsgi:application cam是你django工程的名称，后面不用改
	-w --workers 意思是要启动的进程数量
	-b --bind 绑定的IP地址和端口
	-k --worker-class 启动的worker类型（gthread,sync,eventlet,gevent,tornado）,默认是同步阻塞方式启动

	访问：0.0.0.0:8000

- 配置文件启动
在项目根目录下创建配置文件 `gunicorn-config.py`（与setting.py同级目录）
```
import multiprocessing
bind = "0.0.0.0:8888" # 与nginx配置的端口一致
chdir = "/usr/local/cam"
timeout = 30
workers = 2
errorlog = ' ~/cam/log/error.log'
accesslog = ' ~/cam/log/access.log'
#loglevel = 'info'
loglevel = 'error'
proc_name = 'cam'      # 工程名
keepalive = 6
timeout = 65
graceful_timeout = 10
worker_connections = 100
```

	启动可在任意路径下执行：
```
gunicorn cam.wsgi:application -k gthread -c /usr/local/cam/gunicorn-config.py
```

## 配置系统服务 systemctl 启动方式
建立服务文件
```
vi /usr/lib/systemd/system/gunicorn.service
```
    [Unit]
    After=syslog.target network.target remote-fs.target nss-lookup.target
    [Service]
    User=root
    WorkingDirectory=/usr/local/cam
    ExecStart=gunicorn cam.wsgi:application -k gthread -c /usr/local/cam/gunicorn-config.py
    Restart=on-failure
    [Install]
    WantedBy=multi-user.target

使文件生效
```
systemctl daemon-reload
```


------------


# 安装Nginx
```
tar -zxvf nginx-1.18.0.tar.gz
```
```
cd nginx-1.18.0
```
```
./configure --prefix=/usr/local/nginx
```
```
make
```
```
make install
```
## 测试是否安装成功
```
cd /usr/local/nginx/
```
```
./sbin/nginx -t
```
正常情况信息输出：

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

## 配置系统服务 systemctl 启动方式
建立服务文件
```
vi /usr/lib/systemd/system/nginx.service
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

> 文件内容解释 [Unit]: 服务的说明
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

使文件生效
```
systemctl daemon-reload
```
如果启动服务失败，则以754的权限保存在目录：
```
Chmod +754 /usr/lib/systemd/system/nginx.service
```
设置开机自启动
systemctl enable nginx.service
启动nginx服务
systemctl start nginx.service
停止开机自启动
systemctl disable nginx.service
查看服务当前状态
systemctl status nginx.service
重新启动服务
systemctl restart nginx.service
查看所有已启动的服务
systemctl list-units --type=service

> 命令集合
systemctl is-enabled servicename.service #查询服务是否开机启动
systemctl enable *.service #开机运行服务
systemctl disable *.service #取消开机运行
systemctl start *.service #启动服务
systemctl stop *.service #停止服务
systemctl restart *.service #重启服务
systemctl reload *.service #重新加载服务配置文件
systemctl status *.service #查询服务运行状态
systemctl --failed #显示启动失败的服务
注：*代表某个服务的名字，如http的服务名为httpd

查询nginx主进程号
```
ps -ef | grep nginx
```
从容停止 kill -QUIT 主进程号
快速停止 kill -TERM 主进程号
强制停止 kill -9 nginx


# 参考
- [Django 搭建个人博客教程](https://www.dusaiphoto.com/article/71/)
