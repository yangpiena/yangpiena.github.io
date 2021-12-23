---
title: Linux命令大全
author: 昜丿捺
copyright: true
date: 2016-11-22 15:02:51
categories: 技术
tags: [Linux, 命令]
---
## 基础命令
### 系统
| 命令                                         | 说明                                                                       |
| ---------------                              | :---------------                                                           |
| reboot                                       | 重启系统                                                                   |
| shutdown -r now                              | 重启系统                                                                   |
| shutdown -c                                  | 取消重启                                                                   |
| halt                                         | 立刻关机                                                                   |
| poweroff                                     | 立刻关机                                                                   |
| shutdown -h now                              | 立刻关机（root用户使用）                                                   |
| shutdown -h 10                               | 10分钟后自动关机                                                           |
| yum update                                   | 升级Linux，升级所有包同时也升级软件和系统内核                              |
| yum upgrade                                  | 升级Linux，只升级所有包，不升级软件和系统内核                              |
| cat /proc/version                            | 查看内核版本                                                               |
| uname -a                                     | 查看内核版本                                                               |
| lsb_release -a                               | 查看系统版本                                                               |
| cat /etc/issue                               | 查看系统版本                                                               |
| cat /etc/redhat-release                      | 查看系统版本（适合Redhat系）                                               |
| cat /etc/*-release                           | 查看系统版本（适合SUSE系）                                                 |
| getconf LONG_BIT                             | 查看系统位数                                                               |
| cat /proc/cpuinfo                            | 查看CPU型号                                                                |
| top                                          | 查看实时CPU使用率                                                          |
| ps aux&#124;head -1;ps aux&#124;grep -v PID&#124;sort -rn -k +3&#124;head | 查看占用CPU最多的10个进程。head默认取前10行，自定义K行时，在后面跟-K即可 |
| free -m                                      | 查看内存                                                                   |
| ps aux&#124;head -1;ps aux&#124;grep -v PID&#124;sort -rn -k +4&#124;head | 查看占用内存最多的10个进程。head默认取前10行，自定义K行时，在后面跟-K即可 |
| fdisk -l                                     | 查看硬盘，可查看未分区和格式化的数据盘                                     |
| df -h                                        | 查看硬盘空间情况                                                           |
| du -sh ./*                                   | 查看当前目录下各文件/文件夹的大小                                          |
| jps                                          | 查看当前所有Java进程pid的命令                                              |
| kill                                         | 删除执行中的程序或工作                                                     |
| kill -9                                      | 强制终止执行中的程序或工作                                                 |
| passwd                                       | 修改用户密码，命令后跟用户名即可                                           |
| vim /etc/HOSTNAME                            | 修改主机名字                                                               |
| hostname -F /etc/HOSTNAME                    | 使修改立刻生效                                                             |

<!-- more -->

---

### 文件
| 命令                                         | 说明                                                                       |
| ---------------                              | :---------------                                                           |
| cd                                           | 改变目录到                                                                 |
| cd ~                                         | 回到家目录                                                                 |
| pwd                                          | 查看当前路径                                                               |
| mkdir                                        | 创建文件夹                                                                 |
| touch                                        | 创建文件                                                                   |
| rm                                           | 删除文件                                                                   |
| rm -r                                        | 删除文件夹                                                                 |
| rm -fr                                       | 直接删除，无需确认                                                         |
| cp                                           | 复制                                                                       |
| mv                                           | 移动、重命名文件或文件夹                                                   |
| find                                         | 查找                                                                       |
| which                                        | 查找                                                                       |
| cat                                          | 查看文本内容                                                               |
| head                                         | 查看文本前十行                                                             |
| tail                                         | 查看文本后十行                                                             |
| more                                         | 让文件内容一屏一屏的显示                                                   |
| cat XXX &#124; more                          | 管道：将cat显示出来的内容重新输出给more命令                                |
| >                                            | 重定向：将文件内容输出到指定的文件或位置。如cat /etc/services > a.txt      |
| ls -i                                        | 使用ls -i命令找到文件或文件夹的节点编号                                    |
| find -inum 2243223 -delete                   | 使用find命令查询并且删除乱码文件或文件夹                                   |
| rm -rf fileA                                 | 删除文件或文件夹fileA的软链接                                              |
| ln -s fileB fileA                            | 设置软链接用快捷方式fileB代替fileA                                         |
| ln fileB fileA                               | 建立硬链接，相当于一个文件存储在两个位置，可以有效防止误删                 |
| **删除指定文件夹下后缀名相同的文件：**               |                                                                    |
| find 目录 -name '*.abc' &#124; xargs rm                | 命令危险，可先执行前半段进行查看, 确认后再整条执行                 |
| find . -name '*.exe' -type f -print -exec rm -rf {} \; | 1) "."表示从当前目录开始递归查找                                   |
|                                                        | 2) “-name '*.exe'"根据名称来查找所有以.exe结尾的文件夹或者文件     |
|                                                        | 3) "-type f"查找的类型为文件                                       |
|                                                        | 4) "-print"输出查找的文件目录名                                    |
|                                                        | 5) "-exec"后边跟要执行的命令，表示将find出来的文件或目录执行该命令 |
|                                                        | 最后是一对{}，一个空格和一个\，一个分号                            |

### 网络
| 命令                                         | 说明                                                                       |
| ---------------                              | :---------------                                                           |
| netstat -apn                                 | 查看所有的进程和端口使用情况                                               |
| netstat -nptl                                | 查看端口使用情况                                                           |
| lsof                                         | 查看端口使用情况（openSUSE Leap 15.0），如lsof -i:80                       |

### systemctl命令的使用
| 命令                                         | 说明                                                                       |
| ---------------                              | :---------------                                                           |
| systemctl list-units                         | 列出当前系统服务的状态                                                     |
| systemctl list-units --type=service          | 查看所有已启动的服务                                                       |
| systemctl list-unit-files                    | 列出服务的开机状态                                                         |
| systemctl status sshd                        | 查看指定服务的状态                                                         |
| systemctl stop sshd                          | 关闭指定服务                                                               |
| systemctl start sshd                         | 开启指定服务                                                               |
| systemctl restart sshd                       | 从新启动服务                                                               |
| systemctl is-enabled servicename.service     | 查询服务是否开机启动                                                       |
| systemctl enable sshd                        | 设定指定服务开机开启                                                       |
| systemctl disable sshd                       | 设定指定服务开机关闭                                                       |
| systemctl reload sshd                        | 使指定服务从新加载配置                                                     |
| systemctl list-dependencies sshd             | 查看指定服务的倚赖关系                                                     |
| systemctl mask  sshd                         | 冻结指定服务                                                               |
| systemctl unmask sshd                        | 启用服务                                                                   |
| systemctl set-default multi-user.target      | 开机不开启图形                                                             |
| systemctl set-default graphical.target       | 开机启动图形                                                               |
| systemctl —failed                            | 显示启动失败的服务                                                         |
| setterm                                      | 文本界面设定color                                                          |
| 服务状态                                     | 状态说明                                                                   |
| ---------------                              | :---------------                                                           |
| loaded                                       | 系统服务已经初始化完成，加载过配置                                         |
| active（running）                            | 正有一个或多个程序正在系统中执行， vsftpd就是这种模式                      |
| atcive（exited）                             | 仅执行一次就正常結束的服務， 目前並沒有任何程序在系統中執行                |
| atcive（waiting）                            | 正在執行當中，不過還再等待其他的事件才能继续处理                           |
| inactive                                     | 服务关闭                                                                   |
| enbaled                                      | 服务开机启动                                                               |
| disabled                                     | 服务开机不自启                                                             |
| static                                       | 服务开机启动项不可被管理                                                   |
| failed                                       | 系统配置错误                                                               |

### 防火墙（SUSE Linux Enterprise Server 12）
| 命令                                         | 说明                                                                       |
| ---------------                              | :---------------                                                           |
| vim /etc/sysconfig/SuSEfirewall2             | 编辑防火墙设置，FW_SERVICES_EXT_TCP="22"                                   |
| rcSuSEfirewall2 restart                      | 重启防火墙使生效                                                           |
| rcSuSEfirewall2 status                       | 查看防火墙状态                                                             |
| systemctl stop SuSEfirewall2.service         | 关闭防火墙                                                                 |
| systemctl start SuSEfirewall2.service        | 开启防火墙                                                                 |
| systemctl enable SuSEfirewall2.service       | 开机启动防火墙                                                             |
| systemctl disable SuSEfirewall2.service      | 取消开机启动防火墙                                                         |

### 防火墙（openSUSE Leap 15.0）
| 命令                                         						| 说明                                               	|
| ---------------                              						| :---------------                                      |
| `firewall-cmd --permanent --zone=public --add-service=ssh`		| 添加永久的服务                                        |
| `firewall-cmd --permanent --zone=public --add-port=8080-8081/tcp`	| 添加永久的端口                                        |
| `firewall-cmd --permanent --zone=public --remove-port=80/tcp`     | 删除端口                                              |
| `firewall-cmd --zone=public --add-port=8080-8081/tcp`             | 添加临时的端口                                        |
| `firewall-cmd --permanent --zone=public --list-ports`             | 查看开启的端口                                        |
| `firewall-cmd --permanent --zone=public --list-services`          | 查看开启的服务                                        |
| `firewall-cmd --reload`  											| 重新加载配置（重启加载后才能生效）                    |
| `firewall-cmd --state`   											| 查看防火墙运行状态                                    |
| `firewall-cmd --query-service ssh`								|                                                       |
| `firewall-cmd --query-service ftp`								|                                                       |
| `firewall-cmd --query-service http`								|                                                       |
| `firewall-cmd --query-service https`				         	    |                                                       |
| `firewall-cmd --list-all`      									| 显示当前区域的网卡配置参数、资源、端口以及服务等信息  |
| service firewalld stop       										| 关闭防火墙                                            |
| service firewalld start      										| 开户防火墙                                            |

### 防火墙（CentOS8）
| 命令                                         	| 说明                                             |
| ---------------                              	| :---------------                                 |
| systemctl status firewalld.service			| 查看服务状态                                     |
| systemctl start firewalld.service				| 打开防火墙                                       |
| systemctl stop  firewalld.service				| 关闭防火墙                                       |
| systemctl enable  firewalld.service			| 开启防火墙                                       |
| systemctl disable firewalld.service			| 禁用防火墙                                       |
| ---------------                               | :---------------                                 |
| firewall-cmd --list-all                       | 查看已经开放的端口                               |
| firewall-cmd --add-port=8848/tcp --permanent  | 增加目标端口                                     |
| firewall-cmd --reload                         | 重启防火墙                                       |