---
title: HAProxy脚本启动和关闭
author: 昜丿捺
copyright: true
layout: post
comments: true
date: 2018-02-01 16:11:00
categories: 技术
tags: [HAProxy]
keywords:
description:
---

### CentOS下实现脚本启动和关闭
#### 1. 编写启动脚本
```
vi /etc/rc.d/init.d/haproxy
```

<!-- more -->

本身不存在此文件，使用以上命令，进入vi编辑器，再使用命令保存退出即可新建此文件。
打开文件haproxy，贴入如下内容：

	#!/bin/sh
	#chkconfig: 2345 10 90
	#description:haproxy
	#
	# chkconfig: - 85 15
	# description: HA-Proxy is a TCP/HTTP reverse proxy which is particularly suited \
	#              for high availability environments.
	# processname: haproxy
	# config: /etc/haproxy/haproxy.cfg
	# pidfile: /var/run/haproxy.pid

	# Script Author: Simon Matter <simon.matter@invoca.ch>
	# Version: 2004060600

	# Source function library.
	if [ -f /etc/init.d/functions ]; then
	  . /etc/init.d/functions
	elif [ -f /etc/rc.d/init.d/functions ] ; then
	  . /etc/rc.d/init.d/functions
	else
	  exit 0
	fi

	# Source networking configuration.
	. /etc/sysconfig/network

	# Check that networking is up.
	[ ${NETWORKING} = "no" ] && exit 0

	# This is our service name
	BASENAME=`basename $0`
	if [ -L $0 ]; then
	  BASENAME=`find $0 -name $BASENAME -printf %l`
	  BASENAME=`basename $BASENAME`
	fi

	BIN=/usr/local/haproxy/sbin/haproxy

	CFG=/usr/local/haproxy/haproxy.cfg
	[ -f $CFG ] || exit 1

	PIDFILE=/var/run/$BASENAME.pid
	LOCKFILE=/var/lock/subsys/$BASENAME

	RETVAL=0

	start() {
	  quiet_check
	  if [ $? -ne 0 ]; then
	    echo "Errors found in configuration file, check it with '$BASENAME check'."
	    return 1
	  fi

	  echo -n "Starting $BASENAME: "
	  daemon $BIN -D -f $CFG -p $PIDFILE
	  RETVAL=$?
	  echo
	  [ $RETVAL -eq 0 ] && touch $LOCKFILE
	  return $RETVAL
	}

	stop() {
	  echo -n "Shutting down $BASENAME: "
	  killproc $BASENAME -USR1
	  RETVAL=$?
	  echo
	  [ $RETVAL -eq 0 ] && rm -f $LOCKFILE
	  [ $RETVAL -eq 0 ] && rm -f $PIDFILE
	  return $RETVAL
	}

	restart() {
	  quiet_check
	  if [ $? -ne 0 ]; then
	    echo "Errors found in configuration file, check it with '$BASENAME check'."
	    return 1
	  fi
	  stop
	  start
	}

	reload() {
	  if ! [ -s $PIDFILE ]; then
	    return 0
	  fi

	  quiet_check
	  if [ $? -ne 0 ]; then
	    echo "Errors found in configuration file, check it with '$BASENAME check'."
	    return 1
	  fi
	  $BIN -D -f $CFG -p $PIDFILE -sf $(cat $PIDFILE)
	}

	check() {
	  $BIN -c -q -V -f $CFG
	}

	quiet_check() {
	  $BIN -c -q -f $CFG
	}

	rhstatus() {
	  status $BASENAME
	}

	condrestart() {
	  [ -e $LOCKFILE ] && restart || :
	}

	# See how we were called.
	case "$1" in
	  start)
	    start
	    ;;
	  stop)
	    stop
	    ;;
	  restart)
	    restart
	    ;;
	  reload)
	    reload
	    ;;
	  condrestart)
	    condrestart
	    ;;
	  status)
	    rhstatus
	    ;;
	  check)
	    check
	    ;;
	  *)
	    echo $"Usage: $BASENAME {start|stop|restart|reload|condrestart|status|check}"
	    exit 1
	esac
	 
	exit $?
如果安装路径有变动，则只需修改上面的`BIN=/usr/local/haproxy/sbin/haproxy`和`CFG=/usr/local/haproxy/haproxy.cfg`即可。

#### 2. 脚本随系统自启动
```
chmod 755 /etc/rc.d/init.d/haproxy  # 添加执行属性
chkconfig --add haproxy            # 添加服务
chkconfig haproxy on
```
如果出现结果： *service haproxy does not support chkconfig* 
解决办法是在 **/etc/rc.d/init.d/haproxy** 中添加下面两句到 **#!/bin/bash** 之后:
	#chkconfig: 2345 10 90
	#description:haproxy
----其中2345是默认启动级别，级别有0-6共7个级别。
----等级0表示：表示关机
----等级1表示：单用户模式
----等级2表示：无网络连接的多用户命令行模式
----等级3表示：有网络连接的多用户命令行模式
----等级4表示：不可用
----等级5表示：带图形界面的多用户模式
----等级6表示：重新启动
----10是启动优先级，90是停机优先级，优先级范围是0-100，数字越大，优先级越低。

>添加后效果如下：
	[root@Linux-xx ~]# cat /etc/rc.d/init.d/haproxy
	#!/bin/bash
	#chkconfig: 2345 10 90
	#description:haproxy
	BASE_DIR="/usr/local/haproxy"
	ARGV="$@"  
	start()
	...
	...

#### 3. 启动与关闭
```
service haproxy start
service haproxy stop
```

---

### Suse Linux Enterprise 12下实现脚本启动和关闭
#### 1. 在~目录下，执行下面命令
```
vim .profile
```

#### 2. 在.profile文件中定义HAPROXY_HOME变量，并将变量追加到PATH后面，效果如下：
		# .profile

		# Get the aliases and functions
		if [ -f ~/.bashrc ]; then
		        . ~/.bashrc
		fi

		# User specific environment and startup programs

		HAPROXY_HOME=/usr/local/haproxy
		PATH=$PATH:$HOME/bin:$HAPROXY_HOME

		export HAPROXY_HOME
		export PATH
保存并退出。

#### 3. 执行下面命令，使立即生效
```
source ~/.profile
```

#### 4. 执行下面命令，在HAPROXY_HOME目录下创建脚本文件，
```
vim /usr/local/haproxy/haproxy
```
在文件中写入如下代码，保存并退出。

	#!/bin/bash
	# /usr/local/haproxy
	# YPN 2018-02-01 Create

	if [ "$1"x = "start"x ]; then
	  /usr/local/haproxy/sbin/haproxy -f /usr/local/haproxy/haproxy.cfg
	fi
	if [ "$1"x = "stop"x ]; then
	  killall haproxy
	fi
	if [ "$1"x = "check"x ]; then
	  ps -e|grep haproxy
	fi
	if [ "$1"x = "log"x ]; then
	  tail -f /usr/local/haproxy/logs/haproxy.pid -n 1000
	fi

#### 5. 给文件添加权限，使脚本文件可以执行，命令为
```
chmod 755 /usr/local/haproxy/haproxy
```

#### 6. 最后，执行下面命令可启动、关闭haproxy或查看日志
启动：
```
haproxy start
```
关闭：
```
haproxy stop
```
查看日志：
```
haproxy log
```
检查haprxy进程：
```
haproxy check
```

#### 7. 随系统自启动
```
vim /etc/init.d/boot.local
```
加入以下内容，保存退出后生效。

	/usr/local/haproxy/sbin/haproxy -f /usr/local/haproxy/haproxy.cfg
