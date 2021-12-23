---
title: Python之Django项目部署到Linux
author: 昜丿捺
copyright: true
categories: 技术
timestamp: 1614668259
date: 2021-03-02 14:57:39
authorDesc:
tags: [Python, Django]
description: 本教程主要记录在Linux上如何部署Django项目
---
# 部署环境
- ** Python 3.7.9 + Django 3.1.7 + Gunicorn + Nginx + CentOS8 **


------------


# 准备CentOS8
root用户下安装相应的编译工具
```
yum -y groupinstall "Development tools"
```
```
yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel
```
```
yum install -y libffi-devel zlib1g-dev
```
```
yum install zlib* -y
```
```
yum install gcc
```
```
yum install -y pcre-devel
```
[如果需要磁盘分区和格式化参考](/2017/08/10/Linux数据盘分区以及格式化/)


------------


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
指定安装路径：`/usr/local/python3`
```
./configure --prefix=/usr/local/python3 --enable-optimizations --with-ssl
```
	参数解释：
	- 第一个指定安装的路径,不指定的话,安装过程中可能软件所需要的文件复制到其他不同目录,删除软件很不方便,复制软件也不方便.
	- 第二个可以提高python10%-20%代码运行速度.
	- 第三个是为了安装pip需要用到ssl,后面报错会有提到.

  > Suse Linux无网络情况下如果缺少c或gcc，则按此[链接](https://blog.csdn.net/weixin_40861358/article/details/83960692)安装。

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
如果链接已存在，可删除已有链接
```
rm -rf /usr/bin/python3
rm -rf /usr/bin/pip3
```

## 测试
```
python --version
```
或
```
python -V
```
如果出现下面错误：

	localhost:/usr/local/download/Python-3.7.9 # python --version
	Could not find platform dependent libraries <exec_prefix>
	Consider setting $PYTHONHOME to <prefix>[:<exec_prefix>]
	Python 3.7.9
则在文件系统的etc目录下的profile文件中加入下面的语句：
```
vi /etc/profile 
```
```
export PYTHONHOME=/usr/local/python3/lib/python3.7
export PYTHONPATH=.:$PYTHONHOME:$PYTHONHOME/site-packages
export PATH=$PATH:$PYTHONHOME:$PYTHONPATH
```
如果出现下面错误：

	Python 3.7.9 (default, Mar  8 2021, 14:58:53) 
	[GCC 7.5.0] on linux
	Type "help", "copyright", "credits" or "license" for more information.
	Traceback (most recent call last):
	  File "/etc/pythonstart", line 7, in <module>
		import readline
	ModuleNotFoundError: No module named 'readline'

则执行下面命令安装：

	zypper in zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel libffi-devel

## 测试和安装pip3
```
pip --version
```
或
```
pip -V
```
有时安装完python后，缺少pip，可用以下方法尝试安装。
### 方法一：安装setuptools
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

### 方法二：get-pip.py
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
> 其它Django配置参考[Python之Django项目部署到Windows](/2020/10/30/Python之Django项目部署到Windows/)

## 配置MySQL
安装mysqlclient依赖
```python
pip install mysqlclient
```
>  报错解决：
[OSError: mysql_config not found](https://blog.csdn.net/weixin_30416871/article/details/98711474)
[从No match for argument: gcc-devel 到centos8 的dnf](https://blog.csdn.net/zw3413/article/details/105152826)
安装时报错ModuleNotFoundError: No module named '_ctypes'的解决办法：
```
yum install libffi-devel
```
然后重新编译安装python

## 配置Oracle
必需组件：cx_Oracle、Oracle Instant Client
### cx_Oracle 使用 `pip install cx-Oracle==8.0.1` 安装即可。

### Oracle Instant Client（Oracle提供的一个简单访问Oracle的组件）
1. 从[官网下载](http://www.oracle.com/technetwork/database/database-technologies/instant-client/)
下载时检查Oracle数据库的版本以及系统类型，下载相应的文件，如Oracle11.2，centos7.9下载 `instantclient-basic-linux.x64-11.2.0.4.0.zip` 和 `instantclient-sdk-linux.x64-11.2.0.4.0.zip`。
2. 解压两个压缩包到同一目录 `instantclient_11_2` 下
3. 拷贝 `instantclient_11_2` 到CentOS7目录 `/usr/local/oracle` 下
4. 配置环境变量 `./bash_profile` 文件
```
vi /root/.bash_profile
```
 添加内容：
```
export ORACLE_HOME=/usr/local/oracle/instantclient_11_2
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$ORACLE_HOME
```
 使配置生效:
```
source /root/.bash_profile
```
4. 创建快捷键
```
cd $ORACLE_HOME
ln -s  libclntsh.so.11.2  libclntsh.so
ln -s /usr/local/oracle/instantclient_11_2 /usr/local/oracle/instantclient_11_2/lib
```
5. 添加共享目录
打开配置文件：
```
vi /etc/ld.so.conf
```
 添加下面内容：
```
/usr/local/oracle/instantclient_11_2
```
 执行命令使生效：
```
ldconfig
```
最后，测试是否正常，或重启服务器后再测试。

## 配置SQL Server
必需组件：unixODBC、Microsoft ODBC Driver 11 for linux
### ODBC驱动安装
用于数据库连接的驱动：
```
yum -y install unixODBC* 
```
### 微软ODBC for linux驱动安装
1. [官网下载地址](http://download.microsoft.com/download/6/A/B/6AB27E13-46AE-4CE9-AFFD-406367CADC1D/Linux6/sqlncli-11.0.1790.0.tar.gz)
如果你需要更高版本的驱动程序请转到官网下载，附[官网地址](https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-2017
)(建议旧版安装成功后再选择性升级)
2. 解压并验证安装条件
```
cd /usr/local/download
tar -zxvf sqlncli-11.0.1790.0.tar.gz
cd sqlncli-11.0.1790.0
./install.sh verify
```
 以下为验证信息
```
Microsoft SQL Server ODBC Driver V1.0 for Linux Installation Script
Copyright Microsoft Corp.
Starting install for Microsoft SQL Server ODBC Driver V1.0 for Linux
Checking for 64 bit Linux compatible OS ..................................... OK
Checking required libs are installed ........................................ OK
unixODBC utilities (odbc_config and odbcinst) installed ..................... OK
unixODBC Driver Manager version 2.3.0 installed ......................... FAILED
unixODBC Driver Manager configuration correct ...................... NOT CHECKED
Microsoft SQL Server ODBC Driver V1.0 for Linux already installed .. NOT CHECKED
See /tmp/sqlncli.10874.17476.965/install.log for more information about installation failures.
```
 查看依赖包
```
ldd lib64/libsqlncli*
```
	```
	linux-vdso.so.1 =>  (0x00007fff973fe000)
	libcrypto.so.10 => /lib64/libcrypto.so.10 (0x00007f2deb899000)
	libdl.so.2 => /lib64/libdl.so.2 (0x00007f2deb695000)
	librt.so.1 => /lib64/librt.so.1 (0x00007f2deb48c000)
	libssl.so.10 => /lib64/libssl.so.10 (0x00007f2deb21a000)
	libuuid.so.1 => /lib64/libuuid.so.1 (0x00007f2deb015000)
	libodbcinst.so.1 => /lib64/libodbcinst.so.1 (0x00007f2deae02000)
	libkrb5.so.3 => /lib64/libkrb5.so.3 (0x00007f2deab1a000)
	libgssapi_krb5.so.2 => /lib64/libgssapi_krb5.so.2 (0x00007f2dea8cd000)
	libstdc++.so.6 => /lib64/libstdc++.so.6 (0x00007f2dea5c4000)
	libm.so.6 => /lib64/libm.so.6 (0x00007f2dea2c2000)
	libgcc_s.so.1 => /lib64/libgcc_s.so.1 (0x00007f2dea0ac000)
	libpthread.so.0 => /lib64/libpthread.so.0 (0x00007f2de9e8f000)
	libc.so.6 => /lib64/libc.so.6 (0x00007f2de9acc000)
	libz.so.1 => /lib64/libz.so.1 (0x00007f2de98b6000)
	/lib64/ld-linux-x86-64.so.2 (0x00007f2dec053000)
	libcom_err.so.2 => /lib64/libcom_err.so.2 (0x00007f2de96b1000)
	libk5crypto.so.3 => /lib64/libk5crypto.so.3 (0x00007f2de947e000)
	libltdl.so.7 => /lib64/libltdl.so.7 (0x00007f2de9274000)
	libkrb5support.so.0 => /lib64/libkrb5support.so.0 (0x00007f2de9065000)
	libkeyutils.so.1 => /lib64/libkeyutils.so.1 (0x00007f2de8e61000)
	libresolv.so.2 => /lib64/libresolv.so.2 (0x00007f2de8c47000)
	libselinux.so.1 => /lib64/libselinux.so.1 (0x00007f2de8a1f000)
	libpcre.so.1 => /usr/local/lib/libpcre.so.1 (0x00007f2de8802000)
	```
 如果遇到没有找到的依赖环境组件，如 `libodbcinst.so.1 => not found` ，可以建立个此缺少环境组件名称的软连接并指向此环境组件的高版本，如：
```
cd /usr/lib64
ln -s libodbcinst.so.2.0.0 libodbcinst.so.1
```
 完成后可以使用ldd再次验证，确认全部可行后再进行下一步:
```
ldd lib64/libsqlncli*
```
3. 正式安装
使用install安装命令进行安装:
```
./install.sh install --force
```
 声明文件敲空格阅读，最后输入 `YES` 同意安装（注意YES必须使大写）：
```
Enter YES to accept the license or anything else to terminate the installation: YES
 
Checking for 64 bit Linux compatible OS ..................................... OK
Checking required libs are installed ........................................ OK
unixODBC utilities (odbc_config and odbcinst) installed ..................... OK
unixODBC Driver Manager version 2.3.0 installed ......................... FAILED
unixODBC Driver Manager configuration correct ...................... NOT CHECKED
Microsoft SQL Server ODBC Driver V1.0 for Linux already installed .. NOT CHECKED
Microsoft SQL Server ODBC Driver V1.0 for Linux files copied ................ OK
Symbolic links for bcp and sqlcmd created ................................... OK
Microsoft SQL Server ODBC Driver V1.0 for Linux registered ........... INSTALLED
 
Install log created at /tmp/sqlncli.2486.13833.4245/install.log.
 
One or more steps may have an *. See README for more information regarding
these steps.
 
```
 如果出现目录 `/opt/microsoft/sqlncli/lib64/libsqlncli-11.0.so.1790.0`，表示驱动安装完成。
4. 配置unixOBDC
```
vi /etc/odbcinst.ini
```
	```
	[SQL Server Native Client 11.0]
	Description=Microsoft SQL Server ODBC Driver V1.0 for Linux
	Driver=/opt/microsoft/sqlncli/lib64/libsqlncli-11.0.so.1790.0
	Threading=1
	UsageCount=1
	```
### django 配置
进入Django项目目录，修改配置文件 `vi setting.py`，在数据库配置项中配置以下信息（基本和Windows配置一样）
```
DATABASES = {
  'default': {
    'ENGINE': 'sql_server.pyodbc',      # odbc连接固定写法
    'NAME': 'Mydata',                   # 需要连接的数据库名称
    'USER': 'sa',                       # 数据库连接账户
    'PASSWORD': '123456',               # 数据库连接密码
    'HOST': '192.168.88.81',            # 数据库服务地址
    'PORT': '1433',                     # 数据库连接端口
    'OPTIONS':{
        'driver':'SQL Server Native Client 11.0',
        'MARS_Connection': True,
    }
  }
}
```
配置完成后需要重启uwsgi服务才生效。


------------


# 安装MySQL5.7

> 可参考[Linux安装MySQL5.7完整版流程](https://www.suibibk.com/topic/721421244804628480)

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
最后，启动mysql服务
```
service mysql start
```
> [其它服务命令参考](/2016/11/22/Linux命令大全/)


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

## 自动备份
[MySQL自动备份参考](/2020/11/08/MySQL安装配置/)


## 创建数据库
```
CREATE DATABASE `database_name` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
```


------------


# 安装Gunicorn
Gunicorn 绿色独角兽'是一个Python WSGI UNIX的HTTP服务器。这是一个pre-fork worker的模型，从Ruby的独角兽（Unicorn ）项目移植。该Gunicorn服务器大致与各种Web框架兼容，只需非常简单的执行，轻量级的资源消耗，以及相当迅速。
Gunicorn 服务器作为wsgi app的容器，能够与各种Web框架兼容（flask，django等）,得益于gevent等技术，使用Gunicorn能够在基本不改变wsgi app代码的前提下，大幅度提高wsgi app的性能。


执行安装命令
```python
 pip install gunicorn
```
创建软连接
```
ln -s /usr/local/python3/bin/gunicorn /usr/bin/gunicorn
```
## 启动
Gunicorn可以以三种方式读取配置信息。
第一种方式:从framework定义的配置信息中读取,目前只对 Paster 框架有效。本方式较少用到。
第二种方式:在命令行中定义,命令行中定义的配置信息将会覆盖掉框架中定义的相同的参数名的值。
第三种方式:将所有的参数信息,放到一个python文件中,只要是在命令行中可以定义的参数中,在配置文件中都可以定义。

### 命令行启动
命令行有哪些参数可以通过gunicorn -h 查到。
常用的有:

参数	短参数	说明	默认值
–bind	-b	绑定服务的IP和端口号。	
–workers INT	-w	工作线程数量	1
–backlog		服务器中在pending状态的最大连接数，即client处于waiting的数目。超过这个数目， client连接会得到一个error。建议值64-2048。	
–worker_connections		客户端最大同时连接数。只适用于eventlet， gevent工作方式。	
–pidfile		pid存储文件路径。	
–access-logfile FILE		访问日志文件	
–error-logfile FILE	–log-file	错误日志文件	
**–daemon	-D	后台运行	False**
–worker-class	-k	有 sync, eventlet(并发), gevent, tornado, gthread选项	sync(同步)
–reload		当代码有修改时，自动重启workers。适用于开发环境。	
–reload_extra_files		扩展reload配置，增加templates，configurations等文件修改监控。	
–check_config		检查配置

**进入项目根目录下执行**：
```python
gunicorn cam.wsgi:application -w 2 -b 127.0.0.1:8000
```
> cam.wsgi:application cam是你django工程的名称，后面不用改
-w --workers 意思是要启动的进程数量
-b --bind 绑定的IP地址和端口
-k --worker-class 启动的worker类型（gthread,sync,eventlet,gevent,tornado）,默认是同步阻塞方式启动

### 配置文件启动
在项目根目录下创建配置文件 `gunicorn-config.py`（与setting.py同级目录）
```
# 配置详解地址：https://blog.csdn.net/wenboyu/article/details/103083395?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_v2~rank_aggregation-1-103083395.pc_agg_rank_aggregation&utm_term=gunicorn+%E5%8F%82%E6%95%B0%E9%85%8D%E7%BD%AE&spm=1000.2123.3001.4430
# 服务访问地址：http://192.168.56.101/

import multiprocessing
import os

# 监听地址和端口
bind = "127.0.0.1:8000"  # 与nginx配置的端口一致

# 进程
workers = multiprocessing.cpu_count() * 2 + 1  # 进程数量
# 工作模式：
# worker_class = 'gevent'  # 使用gevent模式，还可以使用sync模式（默认模式）
# 同步Worker：sync 默认模式，也就是一次只处理一个请求
# 异步Worker：通过 Eventlet、Gevent 实现的异步模式
# 异步IO Worker：目前支持 gthread 和 gaiohttp 两种类型
worker_connections = 100  # 客户端最大同时连接数，使用于 gevent 和 eventlet 工作模式时
# 线程数：
# threads = 2 # 指定每个进程开启的线程数
# 工作进程中线程的数，建议值2-4 x CPU核心数
# 此配置只适用于 gthread 进程工作方式， 因为gevent这种使用的是协程工作方式。
timeout = 30  # worker超时时间，超时重启
graceful_timeout = 10  # 接收到restart信号后，worker可以在graceful_timeout时间内，继续处理完当前requests
keepalive = 5  # 连接上等待请求的秒数，默认情况下值为2。一般设定在1~5秒之间。

# 调试
reload = True  # 当代码有修改时，自动重启workers。适用于开发环境。
# reload_extra_files = []  # 扩展reload配置，增加templates，configurations等文件修改监控。

# server 机制
path_of_current_file = os.path.abspath(__file__)
path_of_current_dir = os.path.split(path_of_current_file)[0]
chdir = path_of_current_dir  # 在app加载之前，进入到此目录
# pidfile = ''               # 存储pid的文件路径

# 日志
loglevel = 'info'  # 日志等级：debug, info, warning, error, critical. 指的是错误日志的级别，而访问日志的级别无法设置
# capture_output   # 重定向stdout/stderr到error log file
accesslog = '/usr/local/tps/logs/access.log'  # 接收访问日志文件路径
access_log_format = '%(t)s %(p)s %(h)s "%(r)s" %(s)s %(L)s %(b)s %(f)s" "%(a)s"'  # 设置gunicorn生成的访问日志格式，错误日志无法设置
"""
其每个选项的含义如下：
h          remote address
l          '-'
u          currently '-', may be user name in future releases
t          date of the request
r          status line (e.g. ``GET / HTTP/1.1``)
s          status
b          response length or '-'
f          referer
a          user agent
T          request time in seconds
D          request time in microseconds
L          request time in decimal seconds
p          process ID
"""
errorlog = '/usr/local/tps/logs/error.log'  # 错误日志文件路径

# 进程名
# proc_name
# 设置进程名(setproctitle)，在ps，top等命令中会看到. 缺省值为default_proc_name配置。
```
启动可在任意路径下执行：
```
gunicorn cam.wsgi:application -k gthread -c /usr/local/cam/gunicorn-config.py
```

#### 开机启动
编辑启动文件
```
vi /etc/rc.d/rc.local
```
加入以下内容
```
gunicorn cam.wsgi:application -k gthread -c /usr/local/cam/gunicorn-config.py
```

### 服务启动
建立服务文件
```
vi /usr/lib/systemd/system/gunicorn.service
```
粘入下面内容：
```
[Unit]
After=syslog.target network.target remote-fs.target nss-lookup.target
[Service]
User=root
WorkingDirectory=/usr/local/cam
ExecStart=/bin/bash -c 'gunicorn cam.wsgi:application -k gthread -c /usr/local/cam/gunicorn-config.py'
Restart=on-failure
[Install]
WantedBy=multi-user.target
```
> 注意：systemd 不接受非绝对路径执行命令，需要依赖bush-ism，如：`/bin/bash -c 'gunicorn cam.wsgi:application -k gthread -c /usr/local/cam/gunicorn-config.py'`，否则会出现 Executable path is not absolute 的问题 (systemctl status gunicorn.service 中)

使服务文件生效
```
systemctl daemon-reload
```

启动服务
```
systemctl start gunicorn.service
```
> [其它服务命令参考](/2016/11/22/Linux命令大全/)

## 访问
http://127.0.0.1:8000


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

## 配置
修改配置文件：
```
vi /usr/local/nginx/conf/nginx.conf
```
在 `server` 里增加下面配置：

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

## 测试
```
cd /usr/local/nginx/
```
```
./sbin/nginx -t
```
正常情况信息输出：

    nginx: the configuration file /usr/local/nginx/conf/nginx.conf syntax is ok
    nginx: configuration file /usr/local/nginx/conf/nginx.conf test is successful

## 启动
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

## 创建服务
建立服务文件
```
vi /usr/lib/systemd/system/nginx.service
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

启动服务
```
systemctl start nginx.service
```
> [其它服务命令参考](/2016/11/22/Linux命令大全/)

## 查询nginx主进程号
```
ps -ef | grep nginx
```
从容停止 kill -QUIT 主进程号
快速停止 kill -TERM 主进程号
强制停止 kill -9 nginx


------------


# 开启防火墙
为了安全，建议开启防火墙，只允许指定端口。
> [防火墙服务命令参考](/2016/11/22/Linux命令大全/)


------------


# 参考

- [Django 搭建个人博客教程](https://www.dusaiphoto.com/article/71/)
- [Django2.1连接使用SQL Server(linux版)](https://blog.csdn.net/weixin_34004750/article/details/92541378)
