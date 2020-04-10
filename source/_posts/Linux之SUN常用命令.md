---
title: Linux之SUN常用命令
author: 昜丿捺
categories: 技术
timestamp: 1586481303
date: 2020-04-10 09:15:03
authorDesc: 
tags: [Linux]
description: 
---

SUN系统管理员常用概念/命令

### 1. Solaris 操作系统 
操作系统的版本：Solaris 1.x(sunos4.1.x)，Solaris 2.x(sunos 5.x)，Solaris 7，Solaris 8
特点：多用户，多任务(or 多进程，多线程)，分布式计算(处理)
应用：Client-Server方式中的服务器
- NFS Server，
- Name services Server，
- mail Server，
- Operating system Server，
- Database Server
- Application Server 

### 2. SUN 服务器体系结构
硬件(Hardware) --> Solaris 系统内核(Kernel)-->指令 Shell-->应用软件(Applications)
- SUN 服务器的体系结构发展(Kernel and Application Architecture):
	[1] SPARC-->[2] SuperSPARC-->[3] UltraSPARC-->[4] sun4c-->[5] sun4m-->[6] sun4u
- 常见硬件组成
	[1] 处理器 CUP，
	[2] 内存 Memory，
	[3] 系统总线 bus，
	[4] 硬盘 disk，
	[5] 显示器 monitor，
	[6] 键盘 keyboard，
	[7] 光驱 cdrom，
	[8] 磁带机 tape，
	[9] 网卡 net
	......  

### 3. Openboot(Prom) 常用命令 及 Solaris 操作系统的安装
Openboot(Prom) 常用命令：

	ok> help             (帮助命令)
	ok> banner           (显示系统hostid，memory，mac addr等nvrom配置信息)
	ok> .version         (显示prom版本信息)
	ok> devalias         (系统设备别名)
	例如：devalias cdrom1 /sbus/SUNW，fas@e8800000/sd@5，0 
	ok> nvalias          (prom命令/信息别名)
	ok> probe-scsi-all   (显示所有scsi设备)
	ok> printenv         (显示prom系统环境变量)
	ok> setenv           (设置prom系统环境变量)
	例如：setenv auto-boot false
		  setenv boot-device disk net cdrom 
	ok> set-defaults     (设置prom系统环境变量为缺省值)
	ok> reset

Solaris 操作系统的安装:
- 从光盘启动，并安装操作系统命令:
		ok> boot cdrom
- 终止系统安装/启动：
		stop+a--> sync--> reset
- 继续安装/启动
		ok> go，
- 安装过程中须提供主要信息
	[1]主机名host name，
	[2]网络network，ip地址，
	[3]网络服务器类型nis+/other/none/standlone，
	[4]子网掩码netmask，
	[5]时区time zone，
	[6]日期/时间date/time
	[7]安装方式:升级/初始安装upgrade/initial，
	[8]硬盘分区信息
		例如: partition:0 /，
						1 swap，
						2 backup，
						3，
						4，
						5，
						6 /usr，
						7 /export/home				   
- Solaris操作系统常见分区功能
	[1] /			操作系统根目录
	[2] Swap		内存交换区
	[3] /usr        存放系统应用软件及命令
	[4] /opt        安装用户应用软件
	[5] /var        系统信息存放区
	[6] /export/home用户目录区
系统安装信息日志：/var/sadm/install/contents，install_log 

### 4. 应用软件常用安装/删除命令(add/delete software)
   
   图形工具命令
    # admintool&        
   命令行工具
    # pkginfo，       例如：# pkginfo | grep ab 
    # pkgadd，  例如：# pkgadd -d . SUNWsprot SUNWabc 
    # pkgrm，   例如：# pkgrm SUNWsport SUNWabc
    # pkgchk    例如：# pkgchk SUNWsport SUNWabc
	
### 5. 补丁管理命令Patch 
   查看patch：# showrev -p，
   安装patch：# ./installpatch .
   备份patch：# ./backoutpatch 102972-01 
   patch安装目录：/var/sadm/patch 
   patch信息网站：http://sunsolve.sun.com/ 
   
### 6. 操作系统启动过程及运行级别
操作系统启动过程
[1] prom         (系统自检selftest) ，
[2] bootblk，    (系统引导盘启动扇区)，
[3] ufsboot      (/platform/'uname -i'/ufsboot)，
[4] kernel       (initself，/kernel/genunix，/etc/system)，
[5] init         (/sbin/init， /etc/inittab，/sbin/rc*.d，/etc/rc*.d，/etc/init.d) 

操作系统自动配置过程
[1] 内核上载入内存(kernel module are load to memory)
   o 静态内核static core:
	   /kernel/genunix，/platform/.../kernel/unix，
   o 动态内核dynamically loaded module:
		driver module，streams，ufs module，nfs module 
		/kernel/，/platform/.../kernel/unix，/usr/kernel
   o /etc/system内容：
		moddir，
		exclude rootdev，
		set pt_cnt=100
		...............
[2] 设备配置(device configration )
   o device tree：/devices，/dev 
   o /etc/path_to_install 
   
查看操作系统配置
      # dmesg，
      # printconf，
      # sysdef 
      # /usr/platform/sun4u/sbin/prtdiag
      # /usr/platform/sun43u/sbin/prtdiag

重新配置系统硬件
      # touch /reconfigure 
      # init 0 
      ok boot -r (重新启动/配置系统硬件)
      ok boot -ar 

在系统运行情况下，如果不想重新启动系统，
安装硬盘/磁带等热插拔硬件，则:
	  # drvconfig 
	  # devlinks 
	  # disks 
	  # tapes 
  
查看配置情况:
	  # dmesg 
	  # printconf 
	  # sysdef 

操作系统运行级别
   系统启动时，进入/etc/inittab中initdefault所定义的运行级别(deafult 3)
   各运行级别的定义：
     run level:0，       (halt，shotdown，stop+a，sync，go )
               1，       (single user，boot -s，init  s )
               2，       (multiuser，unshare net)
               3，       (multiuser，deafult)
               5，       (halt，power off )
               6，       (reboot to level 3 )
               S         (init 1， boot -s)

   改变系统运行级别命令
       # init 0，halt，shotdown，stop+a，sync，go 
       # init 1，single user，boot -s，init  s 
       # init 2，multiuser，unshare net 
       # init 3，multiuser，deafult 
       # init 5，halt，power off 
       # init 6，reboot to level 3 
       # init s，init 1， boot -s 
       # init *，shotdown，halt，poweroff，reboot -- -r，reboot -- -s 

       ok> boot -s，boot -sra 

   启动、关闭Solaris 操作系统
       ok> boot -r (一般在安装新设备如硬盘等后，重起机器，重建系统内核)。
       ok> boot cdrom - brower (从CDROM启动机器，重新安装系统，界面为浏览器方式)。

       # sync (将内存中的内容写入硬盘)。
       # halt (或 /etc/init 0) (关闭系统)。
       # reboot
	   
### 7. 操作系统启动/关闭时运行的脚本命令
   Solaris操作系统会在系统启动或关闭时自动运行脚本命令
   例如：有一个启动/关闭数据库的命令脚本/etc/init.d/rdbms，
         想在系统启动/停止时自动启动/关闭数据库:
       # vi /etc/init.d/rdbms 
       # cd /etc/init3.d 
       # ln /etc/init.d/rdbms S22rdbms (在系统启动时，运行命令脚本)
       # cd /etc/init0.d 
       # ln /etc/init.d/rdbms K8822rdbms (在系统关闭时，运行命令脚本)
   也可手动执行：
       # /etc/init.d/rdbms stop 
       # /etc/init.d/rdbms start 
    要定时运行一个程序

    在/var/spool/cron/crontabs/root中加入

      分_时_日_月_年   /运用程序
	  
### 8. 硬盘分区及格式化(disk partition and format )
	# foramt (可显示硬盘类型，大小，分区情况. 可重新分区，格式化等) 
     0 >partition>p>0>1>3>4>5>6>7>print>label>format>quit>quit 
        0       root    wm       0 - 3514        3.62GB    (3515/0/0) 7592400 
        1       swap    wu    3515 - 3757      256.29MB    (243/0/0)   524880 
        2     backup    wm       0 - 3879        4.00GB    (3880/0/0) 8380800 
        3 unassigned    wm    3758 - 3879      128.67MB    (122/0/0)   263520 
        4 unassigned    wm       0               0         (0/0/0)          0 
        5 unassigned    wm       0               0         (0/0/0)          0 
        6 unassigned    wm       0               0         (0/0/0)          0 
        7 unassigned    wm       0               0         (0/0/0)          0 


	#foramt 
     1>type 
       <SUN4.2G cyl 3880 alt 2 hd 16 sec 135> 
       >partition>print>0 
        root    wm    0  1940c 
     >7 
        root    wm    0  1940c 
     >p 
        0       root    wm       0 -1939        2.00GB    (1940/0/0) 4190400 
        2     backup    wm       0 - 3879        4.00GB    (3880/0/0) 8380800 
        7     home    wm       1940-3879        2.00GB  (1940/0/0) 4190400 
     >label>quit>quit
	 
### 9. Solaris 文件系统管理(unix file system )

   常见文件系统类型

    [1]ufs，
    [2]hsfs，
    [3]pcfs，
    [4]vxfs
     ....
   
   设备名描述(硬盘)

    /dev/rdsk/c0t0d0s0，(裸设备/字符设备raw disk) 
    /dev/dsk/c0t0d0s0，(逻辑设备/块设备logicl disk ，block device)

   存储设备上建立文件系统

      # newfs /dev/rdsk/c0t1d0s7 

   系统文件系统记录

     # vi /etc/vfstab 
          fd - /dev/fd fd - no - 
          /proc - /proc proc - no - 
          /dev/dsk/c0t0d0s1 - - swap - no - 
          /dev/dsk/c0t0d0s0 /dev/rdsk/c0t0d0s0 / ufs 1 no - 
          /dev/dsk/c0t0d0s3 /dev/rdsk/c0t0d0s3 /cache ufs 2 yes - 
          /dev/dsk/c0t0d0s7 /dev/rdsk/c0t0d0s7 /export/home ufs 2 yes - 
          /dev/dsk/c0t1d0s7 /dev/rdsk/c0t1d0s7 /export/home1 ufs 2 yes - 
          swap - /tmp tmpfs - yes - 

   常用文件系统的操作命令

     示例:
     # umount /export/home1                                 
     # mount /dev/dsk/c0t1d0s7 /export/home1         
     # umount /dev/dsk/c0t1d0s7 
     # mount -F pcfs /dev/diskette /floppy                 (mount 软盘)
     # mount -F hsfs -o ro /dev/rdsk/c0t6d0s0 /cdrom         (mount 光驱)
     # mountall -l 
     # umountall -l 
     # volcheck 
     # fdformat                                         (软盘格式化)
     # eject cdrom                                         (弹出光驱)
     # eject floppy                                         (弹出软盘)
   wap区文件系统的管理

    # swap -l，-a，-d，-s 
    
    增加Swap区示例
       # mkfile 20m /export/home1/swap 
       # swap -a /export/home1/swap 
       # swap -l 
       # swap -d /export/home1/swap 
       # vi /etc/vfstab 
            /dev/dsk/c0t0d0s1 - - swap - no - 
            /export/home1/swap - - swap - no - 
            swap - /tmp tmpfs - yes - 

  文件系统的维护/管理(maintain file system )
      [1] fsck，sync，fslush deamon( 30 second) 
          stop+a 
          sync 
      [2] # umount /dev/dsk/c0t0d0s7 
          # fsck /dev/rdsk/c0t0d0s7 
          # fsck /export/home 
          # mount /dev/dsk/c0t0d0s7 /export/home 
          # ls /export/home/lost+found 

### 10. 系统备份/恢复(backup and restore )
    系统备份级别

     [1] 共10级 level，
     [2] 0 级为全备份full，
     [3] 2-9 级为增量备份inc，
     [4] /etc/dumpdates，

    备份设备一般为磁带

     [1]tape，
     [2]设备名 /dev/rmt/0lbn (l，m，h density; b BSD behavior，n no rewind) 

     系统系统备份/恢复命令

     [1] ufsdump，
     [2] ufsrestore，
      例如：
          # ufsdump 0uf /dev/rmt/0 /export/home 
          # cd /var/tmp 
          # ufsrestore tvf /dev/rmt/0 
          # ufsrestore xvf /dev/rmt/0 /export/home 

       恢复系统根目录操作举例(restore / file system )
          ok> boot cdrom -s 
          系统启动后，不进行安装，打开一个命令窗口:
          # newfs /dev/rdsk/c0t3d0s0 
          # fsck /dev/rdsk/c0t3d0s0 
          # mount /dev/dsk/c0t3d0s0 /a 
          # cd /a 
          # ufsdump rvf /dev/rmt/0 
          # rm restoresymtable 
          # cd /usr/platform/'uname -i'/libfs/ufs 
          # installboot bootblk /dev/rdsk/c0t3d0s0 
          # umount /a 
          # init 6 

    常用备份/恢复命令(dditional backup command )

      [1] mt，
      [2] tar，
      [3] dd，
      [4] cpio 

     软盘操作

      # volcheck
      # fdformat -U (unix格式化软盘)，fdformat -d (dos 系统格式化)
      # newfs /vol/dev/aliases/floppy0(在软盘上建UFS文件系统)
      # mount -t  pcfs /dev/fd0 /pcfs
      # eject floppy

      光驱操作

      # mount -F hsfs /dev/dsk/c0t6d0s0 /mnt/cdrom
      # fuser -k /mnt/cdrom
      # eject 

      磁带机操作

      # mt -f /dev/rmt/0 rew (到带)
      # mt -f /dev/rmt/0n status{eof | rewind | erase | offline | bsf n | fsf n} 
        (0n        表示磁带操作完后不到带，
         status    表示查看磁带状态，
         eof       表示到磁带最后一个文件，
         rewind    表示到带到磁带最前，
         erase     摸掉，
         offline   弹出磁带，
         bsf n     磁带往回退n个文件，
         fsf n     磁带往前n个文件)
      # tar xvf /dev/rmt/0 
        (从磁带到硬盘，解开归档文件)
      # tar tvf /dev/rmt/0 
        (查看磁带内容，查看归档文件内容)
      # tar cvf /dev/rmt/0 文件系统
        (将文件系统考入磁带，将多个文件、目录建成归档文件)
### 11. 网络管理(network) 

    相关配置文件

     [1] /etc/nodename 
     [2] /etc/hosts 
     [3] /etc/hostname.hme0 
          (qe0，le0，hme1，hme2，...，hme0:1，hme0:2，... ) 
     [4] /etc/netmasks 
     [5] /etc/networks 
     [6] /etc/defaultrouter 
     [7] /etc/notrouter 
     [8] /etc/inetd.conf 
     [9] /etc/rpc 
     [10] /etc/services 

    相关进程deamon:

     [1] in.tcpipd
     [2] in.routed 
     [3] in.rdisc
      ......
     常用网络管理命令command：
     =
      [1] ifconfig -a 
      [2] netstat -rn 
      [3] snoop -d hme0 
      [4] route 
      [5] arp -a 
      [6] /usr/sbin/ping 
      [7] /usr/bin/telnet 
      [8] /usr/bin/rlogin 
      [9] /usr/bin/ftp 
      [10] /usr/openwin/bin/xhost 
   配制网络端口

     # ifconfig
     示例:
     # ifconfig qe0 inet 10.10.10.1 netmask 255.255.255.0 broadcast 10.10.10.255 plumb 
     # ifconfig qe0 inet 10.10.10.1 netmask 255.255.255.0 broadcast 10.10.10.255 up 
     # ifconfig qe0 inet 10.10.10.1 netmask 255.255.255.0 broadcast 10.10.10.255 down 

   修改路由表

     # netstat -r 
     # route add net 10.10.10.0 10.10.10.1 1 
     # route add default 10.10.10.1 1 

     o 增加静态路由:
       # vi /etc/defaultrouter 
            10.10.10.1 i1 
       # sync;sync;reboot 

     o 查看路由进程
       # ps -ef |grep routed 

   重新关闭/启动tcp/ip协议进程

     #sh /etc/init.d/inetinit stop 
     #sh /etc/init.d/inetinit start 
### 12. 路由服务器:

    系统有两个/或两个以上的网口，可作为路由器或防火墙
    
      禁止两个网口间路由ip

      # cd /etc 
      # touch notrouter 
      # sync
      # sync
      # reboot
      
      查看路由进程

      # ps -ef |grep routed 
      # ps -ef |grep in.rdisc
### 13. 域名服务器(dns)

    相应配置文件

    [1] /etc/named.boot 
    [2] /etc/named.conf (only for solaris 2.7) 
    [3] /var/named/db.*; 
    [4] /etc/nsswitch.conf 
    [5] /etc/resolv.conf 

    相应系统进程

    [1] in.named; 
    [2] bind 

    相关命令

    [1] /etc/init.d/inetsvc; 
        # /etc/init.d/inetsvc stop 
        # /etc/init.d/inetsvc start 

    [2] nslookup 
    域名服务client端配置示例
    =

     # vi /etc/nsswitch.conf 
           hosts：     files dns 

     # vi /etc/resolv.conf 
          domain leadcom.com
          search leadcom.com
          nameserver 192.168.0.100     
     # nslookup 
 
### 14. NIS 服务器
    相应配置文件

    [1] /var/yp，
    [2] /var/yp/Makefile 
    [3] /etc/defaultdomain 
    [4] /etc/nsswitch.conf 
    [5] /etc/hosts，
    [6] /etc/networks，... 
    相应系统进程

    [1] ypserv;     
    [2] ypbind 
    相关命令

    [1] domainname 
    [2] /etc/init.d/rpc  (start/stop ypserv，ypbind) 
    [3] ypinit -m;    ypinit -c 
    [4] yppush; 
    [5] ypcat 
    NIS 配置示例
    =
     # vi /etc/defaultdomain 
         YP.sun.com 

     # domainname YP.sun.com 
     # cd /var/yp 
     # cp /etc/nsswitch.nis /etc/nsswitch.conf 
     # vi Makefile 
          #B=-b nis no dns 
           B= 
           B=-b  nis also dns 
          #B= 

     # vi resolv.conf 
     # /usr/ccs/bin/make 
     # ypinit -m 
     # /etc/init.d/rpc start 
     # yppush 
     # ypcat hosts 
     # ypinit -c 

     client端配置

     # vi /etc/defaultdomain 
          YP.sun.com 
     # domainname YP.sun.com 
     # cp /etc/nsswitch.nis /etc/nsswitch.conf 
     # ypinit -c 
     # /etc/init.d/rpc start 
     # ypcat hosts 

### 15. NFS 文件系统(nfs file system )

    相应配置文件

    [1] /etc/dfs/dfstab;(nfs server)
    例如:
       # vi /etc/dfs/dfstab 
            share  -F nfs  -o rw=engineering -d "home dirs"  /export/home 
            share  -F nfs  -o ro -d "app dirs"  /export/app 
            share  -F nfs  -o ro -d "man dirs"  /usr/share/man 
   [2] /etc/vfstab;(nfs client)
      # vi /etc/vfstab 
            i2:/export/home - /export/home nfs - yes soft，bg 
            i2:/export/app - /export/app nfs - yes soft，bg 
            i2:/usr/share/man - /usr/share/man nfs - yes soft，bg 
               rw|ro，bg|fg，soft|hard，intr|nointr，suid|nosuid，timeo=n
               default=11x.1sec，retry=n 1k. 
   相应系统进程

    [1] mountd
    [2] nfsd
    [3] statd
    [4] lockd   
    相关命令

    [1] share，
    例如:
       # share -F nfs /export/home 
       # share -F nfs -o ro /usr/share/man 
    [2] unshare，
    [3] shareall，
    [4] unshareall; 
    [5] mount
    例如:
       # mount nfsserver:/export/home /export/home 
       # mount nfsserver:/export/app /export/app 
       # mount nfsserver:/usr/share/man /usr/share/man 
    [6] umount，
    [7] mountall，
    [8] umountall，
    [9] dfshares host，
    [10] dfmounts 
    [11] /etc/init.d/nfs.server;   /etc/init.d/nfs.client 
    例如:
       # /etc/init.d/nfs.server start 
### 16. 并行打印机管理(Parallel Port Printer )
    并行打印机driver

        /dev/bpp0-> /devices/.../...:bpp0   (打印server：i2)    
        /dev/ecpp0->/devices/.../...:ecpp0  (打印client：i1)
    图形管理工具

    # admintool & 
      Menu:Browse-->printers 
      Menu:Edit-->add-->Local Printer... 
      Printer Name：bpp0 
      Print Server：i2 
      Description：bpp on i2 
      Print Port：/dev/bpp0 
      Printer Type：PostScript 
      File Content：PostScript 
      Fault Notification：None 
      Option：Accept Print Requests，Process Print Requests 
      User Access List：all 
      press OK 
    # admintool & 

      Menu:Browse-->printers 
      Menu:Edit-->add-->Access to Printer... 
      Print Client：i1 
      Printer Name：bpp0 
      Print Server：i2 
      Description：bpp0 on i2 
      Option：Default Printer 
      Press OK 
   # xetops 
     convert chinese text file to PostScript file 
### 17. 用户管理user account 
    图形管理工具

    # admintool & 
    相关文件

    [1] /etc/passwd 
    例如:
      # vi /etc/passwd 
           max::1001:10:max li:/home/max:/bin/csh 
           frank::1002:10:frank lau:/export/home/frank:/sbin/sh 
    [2] /etc/shaddow 
    [3] /etc/group 
    [4] /export/home/user 
    [5] .cshrc 
        C shell 
        # vi .cshrc 
             umask 022 
             set path = ( /bin /usr/bin /usr/sbin /usr/bin /usr/ucb \ 
                         /usr/lib /etc/init.d \ 
                         /usr/lib/netsvc/yp /usr/lib/nis \ 
                         /usr/ccs/bin \ 
                          /usr/openwin/bin ) 
             setenv TERM sun-cmd 
             setenv EDITOR /usr/bin/vi 
        # source .cshrc 
        # setenv PATH "/bin:/usr/bin:/usr/sbin:/usr/ucb/bin" 
        
    [6] .login 
    [7] .profile 
        B shell 
        # vi .profile 
             umask 022 
             PATH=/usr/sbin:/sbin:/usr/bin:/usr/ucb:/usr/lib:/etc/init.d：
             PATH=$PATH:/usr/lib/netsvc/yp:/usr/lib/nis:/usr/ccs/bin:/usr/openwin/bin 
             TERM=vt100 
             DISPLAY=i2:0.0 
             export PATH TERM DISPLAY 
        #.  /.profile 
        #set 
    [8] .Xdefaults 
    [9] .dt 
   用户管理常用命令

    [1] chmod 
    例如:
       #chmod -R 755 /export/home/frank 
    [2] chown 
    例如:
       #chown -R frank:staff /export/home/frank 
    [3] chgrp 
### 18. 常用UNIX命令集锦(Commonly used UNIX commands )

    [1] cat
    [2] ls -al
    [3] cd
    [4] pwd
    [5] mv
    [6] cp
    [7] rm  -r 
    [8] rmdir
    [9] mkdir
    [10] find  (find /etc -name host )
    [11] lp 
    [12] set; setenv; export;
    [13] df -k 
    [14] du -k (du .)
    [15] grep  (ps -ef|grep root)
    [16] ps -ef
    [17] kill id (kill -9 pid)
    [18] du
    [19] ln 
    [20] man(  man -k keyword)
    [21] catman
