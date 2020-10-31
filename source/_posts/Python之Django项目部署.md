---
title: Python之Django项目部署
author: 昜丿捺
copyright: true
categories: 技术
timestamp: 1604072242
date: 2020-10-30 23:37:22
authorDesc:
tags: [Python, Django]
description: 本教程主要记录在Windows上如何部署Django项目
---
# 安装Mysql
官网下载：https://dev.mysql.com/downloads/mysql/
选择自定义安装，并根据操作系统的版本选择32位或64位，且后续软件也必须保持统一。本教程安装64位版本：mysql-installer-community-5.7.32.0.msi

# 安装Python
官网下载：https://www.python.org/getit/
默认安装即可，本教程安装版本为：python-3.7.3-amd64.exe

# 安装Django
## 在线安装
```python
pip install Django==2.1.15
```
## 离线安装
1. 下载
官网下载：https://www.djangoproject.com/download/
下载时注意与Python版本的兼容性，本教程下载安装版本为：Django 2.1.15
2. 安装
解压下载的Django-2.1.15.tar，可自定义目录放置，本教程放到了Python的根目录下：`C:\Program Files\Python37\Django-2.1.15`
接着用管理员方式打开cmd命令窗口，进入Django解压目录下面，执行安装命令：
```python
python setup.py install
```
	Django将被安装到Python的Lib下site-packages里。
3. 检查是否安装成功
在cmd下进入到Django-*下，进入Python工作环境，导入Django，查看是否安装成功
```python
C:\Program Files\Python37\Django-2.1.15>python
Python 3.7.3 (v3.7.3:ef4ec6ed12, Mar 25 2019, 22:22:05) [MSC v.1916 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> import django
>>> django.get_version()
'2.1.15'
>>>
```
	出现版本号，表示安装成功！

# 配置Django项目（基于admin管理工具）
1. 创建数据库
create database xxgl; 
2. 修改settings.py中DATABASES配置
3. 如果没有`requirements.txt`文件，则执行下面命令生成：
```python
pip freeze > requirements.txt
```
4. 如果存在，则执行下面命令安装相关包：
```python
pip install -r requirements.txt
```
	> 如果执行上面命令有报错或安装失败，可尝试下面命令：
pip --default-timeout=100 install -r requirements.txt
也可指定资源镜像：
pip --default-timeout=100 install requirements.txt -i http://pypi.douban.com/simple/ --trusted-host pypi.douban.com
如果上面那个豆瓣依然不快（虽然还没出现过这种情况），可以换成下面的国内镜像网站。
清华：https://pypi.tuna.tsinghua.edu.cn/simple 阿里云：http://mirrors.aliyun.com/pypi/simple/
中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple/ 华中科技大学：http://pypi.hustunique.com/
山东理工大学：http://pypi.sdutlinux.org/ 豆瓣：http://pypi.douban.com/simple/

5. 重新编译，记录改动到迁移文件
```python
python manage.py makemigrations 
```
6. 通过迁移文件更新数据库
```python
python manage.py migrate  
```
7. 为admin管理平台创建超级用户
```python
python manage.py createsuperuser  
```
8. 在开发环境下启动项目
```python
python manage.py runserver 0.0.0.0:8000  
```
	> 如果提示错误，不存在表 django_admin_log 和 django_session ，可依次执行下面命令生成：
	`migrate admin`
	`migrate sessions`


# 部署Django项目到Windows（Apache+mod_wsgi）
1. 下载Apache
官网下载：http://httpd.apache.org/ 
本教程下载版本为：httpd-2.4.46-o111h-x64-vc15.zip
2. 安装Apache
下载后是一个压缩文件，直接解压缩，获取文件夹里的Apache24文件夹，这个文件夹就是apache服务器文件了，不需要安装，直接将Apache24文件夹移动到你想放的位置。如：`C:\Apache24`
3. 配置Apache
进入`C:\Apache24\conf`目录，找到httpd.conf文件，这个就是apache服务器的配置文件。用Notepad打开，找到如下代码行进行修改:
```
...
Define SRVROOT "C:\Apache24"  #Apache24文件的路径，其余不用改。
...
Listen 127.0.0.1:80 #此处为你要发布的网站ip地址
...
ServerName 127.0.0.1:80
...
```
4. 创建Apache服务
打开命令行（管理员），cd进入`C:\Apache24\bin`文件夹，输入如下代码创建服务：
```
httpd.exe -k install -n "apache2.4"  
```
	其中apache2.4是所创建服务器名称，可更改。如果出现successfully installed说明服务创建成功。同时后面可能会跟一些其他信息，说明你的配置是否正确。
5. 测试Apache
在浏览器地址栏输入在配置文件中配置的地址，如：http://127.0.0.1:80
6. 下载mod_wsgi
进入下载地址：http://www.lfd.uci.edu/~gohlke/pythonlibs/#mod_wsgi ，下载相应版本的mod_wsgi，其中ap24代表Apache的版本2.4，cp367代表Python的版本为3.7。这个插件的作用其实是一个python与apache的接口。本教程下载的版本为：mod_wsgi-4.7.1+ap24vc15-cp37-cp37m-win_amd64.whl
7. 安装mod_wsgi
将下载的`mod_wsgi-4.7.1+ap24vc15-cp37-cp37m-win_amd64.whl`，后缀名改为.zip进行解压，解压后找mod_wsgi.so文件,如果存在该文件，则根据教程http://www.cnblogs.com/fnng/p/4119712.html 找到安装mod_wsgi步骤那里操作即可。
如果不存在该文件，直接将该whl文件复制到python路径下的script文件夹下，cd进入该路径，命令行输入：
```
pip3 install "mod_wsgi-4.7.1+ap24vc15-cp37-cp37m-win_amd64.whl"
```
	安装成功后再输入:
```
mod_wsgi-express module-config
```
	出现以下三行提示，这三行一定要记下来，后面配置最重要的就是它了：
```
LoadFile "c:/program files/python37/python37.dll"
LoadModule wsgi_module "c:/program files/python37/lib/site-packages/mod_wsgi/server/mod_wsgi.cp37-win_amd64.pyd"
WSGIPythonHome "c:/program files/python37"
```
	至此，mod_wsgi安装成功。
8. 部署Django项目到Apache
再次打开httpd.conf文件，在最末尾添加如下代码：
```
#安装wsgi模块后，出来的三行字符，直接复制过来
LoadFile "c:/program files/python37/python37.dll"
LoadModule wsgi_module "c:/program files/python37/lib/site-packages/mod_wsgi/server/mod_wsgi.cp37-win_amd64.pyd"
WSGIPythonHome "c:/program files/python37"
#设置工程中的wsgi路径
WSGIScriptAlias / C:\xxgl\xxgl\wsgi.py
#设置工程路径
WSGIPythonPath C:\xxgl
#设置wsgi路径
<Directory C:\xxgl\xxgl>
    <Files wsgi.py>
        Require all granted
    </Files>
</Directory>
#设置静态文件路径
Alias /static C:\xxgl\static
<Directory C:\xxgl\static>  
    AllowOverride None  
    Options None  
    Require all granted  
</Directory>
```
	其中xxgl为我的工程文件夹。编辑完成后保存文件，回到服务器管理器，找到apache2.4服务，重启服务。
	如果之前配置都没问题，浏览器输入http://127.0.0.1:80 ，就会见到Django页面了。