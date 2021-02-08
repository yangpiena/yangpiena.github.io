---
title: 搭建私有云同步云盘Nextcloud
author: 昜丿捺
copyright: true
categories: 技术
timestamp: 1596078585
date: 2020-07-30 11:09:45
authorDesc:
tags:
description:
---
## 环境准备
本次搭建使用`LAMP`运行环境：
- L: Open SUSE Linux 15
- A: apache2
- M: MariaDB
- P: PHP7



<!-- more -->



## 系统安装命令准备
更新命令`zypper`的源：
```
zypper ref
```
添加源，使用命令 zypper addrepo -f [URL] [Alias] （Alias是自己给这个源随便定义的英文名）添加软件源并开启自动刷新，如：
```
zypper addrepo -f http://mirrors.163.com/openSUSE/update/11.1/ main
```
```
zypper addrepo -f http://mirrors.163.com/openSUSE/distribution/11.1/repo/non-oss/ nonoss
```
```
zypper addrepo -f http://mirrors.163.com/openSUSE/distribution/11.1/repo/oss/ oss
```
删除源，使用命令 zypper rs [name]
```
zypper rs name
```



## 安装apache2
切换为root用户：
```
sudo
```
安装 apache2：
```
zypper in apache2
```
启动 apache2：
```
systemctl start apache2
```
停止 apache2：
```
systemctl stop apache2
```
重启 apache2：
```
systemctl restart apache2
```
系统重启后自动启动 apache 服务：
```
systemctl enable apache2
```
### 测试安装
为了检查你的apache2服务是否正常工作，使用`touch`命令在`/srv/www/htdocs/`文件夹下创建一个文件名为`index.html`的文件，写入以下内容:
```
<html><body><h1>Welcome to my web site!</h1></body></html>
```
之后在浏览器访问 `http://localhost` ，如果正常可以看到大字标题 Welcome to my web site!
### 启用web服务可以外部访问
需要在防火墙中开启http(80)端口，apache默认使用80端口。



## 安装PHP7
root权限下，执行下面命令安装php7：
```
zypper in php7 php7-mysql apache2-mod_php7
```
启用mod-php通过运行：
```
a2enmod php7
```
### 安装php7的扩展
```
sudo zypper in php7-bcmath php7-opcache php7-bz2 php7-calendar php7-ctype php7-curl php7-dom php7-ftp php7-gd php7-gettext php7-gmp php7-iconv php7-imap php7-ldap php7-mbstring php7-mcrypt php7-odbc php7-openssl php7-pcntl php7-pgsql php7-posix php7-shmop php7-snmp php7-soap php7-sockets php7-sqlite php7-sysvsem php7-tokenizer php7-wddx php7-xmlrpc php7-xsl php7-zlib php7-exif php7-fastcgi php7-pear php7-sysvmsg php7-sysvshm php7-zip php7-intl
```

### 重启web服务器
```
systemctl restart apache2
```
### 测试安装
为了验证php是否已经在运行,在`/srv/www/htdocs/`文件夹下创建一个`index.php`的文件，并写入以下内容:
```
<?php
phpinfo();
?>
```
使用浏览器访问 `http://localhost` ,你应该可以看到一个页面包含一个表格显示所有的PHP设置。


## 安装MariaDB
MariaDB 是一个MySQL的代替品，而且也是使用的mysql名称。
root权限下，执行下面命令安装`mariadb`和`mariadb-tools`：
```
zypper in mariadb mariadb-tools
```
mariadb-tools 是MariaDB的管理工具集。
启动MariaDB服务，运行:
```
systemctl start mysql
```
停止 mysql：
```
systemctl stop mysql
```
重启 mysql：
```
systemctl restart mysql
```
系统重启后自动启动 mysql 服务：
```
systemctl enable mysql
```
### 配置 MariaDB/MySql 服务和 Leap 42.1
通过配置 MariaDB 服务提高安全性，请使用openSUSE提供的脚本`mysql_secure_installation` ：
```
mysql_secure_installation
```
执行后显示：

	root # mysql_secure_installation
	NOTE: RUNNING ALL PARTS OF THIS SCRIPT IS RECOMMENDED FOR ALL MariaDB

	SERVERS IN PRODUCTION USE! PLEASE READ EACH STEP CAREFULLY!

	In order to log into MariaDB to secure it, we'll need the current password for the root user. If you've just installed MariaDB, and you haven't set the root password yet, the password will be blank, so you should just press enter here.
	Enter current password for root (enter for none):

按回车(Enter)键：
> 如果无法正常执行到下一步，则在 `/etc/my.cnf` 文件中加入 `skip-grant-tables` ，保存并重启mysql服务。

	root #
	... (output sequel of previous command)
	OK, successfully used password, moving on...

	Setting the root password ensures that nobody can log into the MariaDB root user without the proper authorisation.
	Set root password? [Y/n] y
	
输入y：

	root #
	... (output sequel of previous command)
	New password:
	
输入给root用户的密码：

	root #
	... (output sequel of previous command)
	Re-enter new password:
	
输入确认密码：

	root #
	... (output sequel of previous command)
	Password updated successfully!

	Reloading privilege tables.. ... Success! By default, a MariaDB installation has an anonymous user, allowing anyone to log into MariaDB without having to have a user account created for them. This is intended only for testing, and to make the installation go a bit smoother. You should remove them before moving into a production environment.
	Remove anonymous users? [Y/n]
	
输入y来移除匿名用户：

	root #
	... (output sequel of previous command)
	... Success!

	Normally, root should only be allowed to connect from 'localhost'. This ensures that someone cannot guess at the root password from the network.
	Disallow root login remotely? [Y/n]
	
输入y：

	root #
	... (output sequel of previous command)
	... Success!

	By default, MariaDB comes with a database named 'test' that anyone can access. This is also intended only for testing, and should be removed before moving into a production environment.
	Remove test database and access to it? [Y/n]
	
输入y：

	root #
	... (output sequel of previous command)
	- Dropping test database...

	... Success! - Removing privileges on test database... ... Success! Reloading the privilege tables will ensure that all changes made so far will take effect immediately.
	Reload privilege tables now? [Y/n]

输入y，最后输出下面内容，表示成功：

	... Success!

	Cleaning up...

	All done!  If you've completed all of the above steps, your MariaDB
	installation should now be secure.

	Thanks for using MariaDB!
	
### 安装 phpMyAdmin
执行下面命令安装：
```
zypper in phpMyAdmin
```
安装完成后重启apache2服务。
登录到phpMyAdmin：
```
http://localhost/phpMyAdmin
```
输入mysql服务的用户名root和root的密码，点击登录。

### 给Nextcloud创建数据库
在这里，以用户root登录phpMyAdmin后，创建一个新的数据库 'nextcloud' 即可。



## 安装 Nextcloud
从[官网](https://nextcloud.com/)下载Nextcloud，这里下载的是：https://download.nextcloud.com/server/releases/nextcloud-19.0.1.zip
上传下载好的压缩包`nextcloud-19.0.1.zip`到目录`/srv/www/htdocs/`下，并解压：
```
cd /srv/www/htdocs/
```
```
upzip nextcloud-19.0.1.zip
```
删除压缩包：
```
rm nextcloud-19.0.1.zip
```
新建一个data文件夹，用于存放文件：
```
mkdir /srv/www/htdocs/nextcloud/data
```
给nextcloud目录赋权限：
```
sudo chmod 777 nextcloud -Rf
```
### 访问Nextcloud
访问地址：
```
http://localhost/nextcloud
```
访问成功后：
- 在页面的最上面输入需要给Nextcolud创建的管理员账号和密码
- 选择数据存放的位置位刚才新建的data文件夹
- 选择数据库MySQL/MariaDB，输入数据库的账号，密码，数据库名称
- 本地搭建的最后一项一般都填localhost

最后，点击安装完成。
待安装完成后，访问 `http://localhost/nextcloud` ，输入刚刚设置的管理员账号密码登录即可使用。

### 关闭数据目录权限检查
打开配置文件：
```
vim /srv/www/htdocs/nextcloud/config/config.php
```
在最后加入：
```
'check_data_directory_permissions' => false,
```


## Nextcloud优化
### 设置后台任务，cron执行
```
crontab -e
```
追加以下内容：
```
*/15 * * * * -u wwwrun /usr/bin/php -f /srv/www/htdocs/nextcloud/cron.php
```
> 注意 cron.php 的权限：chown -R wwwrun:www cron.php

crontab命令用法：
1)设置定时器的设置文件, 文件名称为mycronset.txt(名称可自行设定)
```
cat mycronset.txt
```

      0   4   *   *   *     root    updatedb           #每天早上4:00以root用户身份执行updatedb命令
      0   4   *   *   *     root    sendmail -q        #每天早上4:00以root用户身份执行updatedb命令
     
使用自定义的crontab设置,指定使用者为tom用户
```
crontab -u tom mycronset.txt
```

2)列出当前定时器的设置
```
crontab -l
```

3)编辑用户定时器的设置文件
```
crontab -e
```

4)删除定时器设置
```
crontab -r 
```
### 配置缓存
此处利用APCu+memcache实现缓存，具体做法是在配置文件`/srv/www/htdocs/nextcloud/config/config.php`中，加入下面设置：
```
'memcache.local' => '\OC\Memcache\APCu',
'memcache.distributed' => '\OC\Memcache\Memcached',
'memcached_servers' => 
array(                 
	  array('localhost', 11211),      
),
```
如果尚未安装APCu或memcache，请参考下面内容安装：
#### 安装APCu
依次执行下面命令安装：
```
cd /tmp/
```
```
tar -zxvf apcu-5.1.18.tgz
```
```
cd apcu-5.1.18/ 
```
```
phpize
```
```
./configure --with-php-config=/usr/bin/php-config
```
```
make
```
```
make install
```
> 在执行`phpize`命令后，如果提示没有phpize命令，则执行下面命令安装所需的phpize：
```
sudo zypper in php7-devel
```
最后配置php.ini：
```
vim /etc/php7/apache2/php.ini
```
在php.ini的最后加入以下配置：
```
extension = apcu.so
apc.enabled = on
apc.shm_size = 64M
apc.ttl = 7200
apc.enable_cli = on
```
#### 安装memcache
Memcached会用到libevent这个库来进行Socket的处理，所以先安装libevent。
##### 1. 先装libevent
安装包的官网下载地址：https://libevent.org/
依次执行下面命令安装：
```
cd /tmp/
```
```
tar -zxvf libevent-2.1.12-stable.tar.gz
```
```
cd libevent-2.1.12-stable/ 
```
```
./configure -prefix=/usr
```
```
make
```
```
make install
```
> 在执行`./configure -prefix=/usr`命令后，如果报错：`configure: error: openssl is a must but can not be found`，则执行下面命令安装所需的openssl：
```
zypper in openssl-devel
```

测试libevent是否安装成功：
```
ls -al /usr/lib | grep libevent
```
##### 2. 再装memcache
```
cd /tmp/
```
```
tar -zxvf memcached-1.6.6.tar.gz
```
```
cd memcached-1.6.6/
```
```
./configure -prefix=/usr  -with-libevent=/usr
```
```
make
```
```
make install
```
测试memcache是否安装成功：
```
ls -al /usr/local/bin/mem*
```
##### 3. 启动Memcached服务
```
memcached -d -m 10 -u root -l 10.1.90.40 -p 12000 -c 256 -P /home/javadev/memcached_pid/
```
> -d选项是启动一个守护进程，
-m是分配给Memcache使用的内存数量，单位是MB，我这里是10MB，
-u是运行Memcache的用户，我这里是root，
-l是监听的服务器IP地址，如果有多个地址的话，我这里指定了服务器的IP地址192.168.1.132，
-p是设置Memcache监听的端口，我这里设置了12000，最好是1024以上的端口，
-c选项是最大运行的并发连接数，默认是1024，我这里设置了256，按照你服务器的负载量来设定，
-P是设置保存Memcache的pid文件，我这里是保存在 /home/javadev/m emcached_pid/

使用命令查看启动的memcached服务进程
```
ps -ef | grep memcached
```
启动成功后如下：

	root     26084     1  0 14:41 ?        00:00:00 memcached -d -m 10 -u root -l 10.1.90.40 -p 12000 -c 256 -P /home/javadev/memcached_pid/
	root     26095  9798  0 14:41 pts/0    00:00:00 grep --color=auto memcached
