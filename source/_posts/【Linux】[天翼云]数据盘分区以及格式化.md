---
title: '【Linux】[天翼云]数据盘分区以及格式化'
layout: post
comments: true
date: 2017-08-10 11:41:01
categories: Linux
tags: [Linux]
keywords:
description:
---
#### 1. 首先切换到root账户下
```
sudo -i
```

<!-- more -->

#### 2. 查看数据盘信息
登录Linux云主机后，使用命令`fdisk -l`查看数据盘相关信息。
> 使用命令`df -h`是无法查看到未分区和格式化的数据盘的。

	[root@iZwe12zdi799668qfxdm5oZ ~]# df -h
	Filesystem      Size  Used Avail Use% Mounted on
	/dev/vda1        40G  1.5G   36G   4% /
	devtmpfs        3.9G     0  3.9G   0% /dev
	tmpfs           3.9G     0  3.9G   0% /dev/shm
	tmpfs           3.9G  392K  3.9G   1% /run
	tmpfs           3.9G     0  3.9G   0% /sys/fs/cgroup
	tmpfs           783M     0  783M   0% /run/user/0
	[root@iZwe12zdi799668qfxdm5oZ ~]# fdisk -l

	Disk /dev/vda: 42.9 GB, 42949672960 bytes, 83886080 sectors
	Units = sectors of 1 * 512 = 512 bytes
	Sector size (logical/physical): 512 bytes / 512 bytes
	I/O size (minimum/optimal): 512 bytes / 512 bytes
	Disk label type: dos
	Disk identifier: 0x0008fd2d

	   Device Boot      Start         End      Blocks   Id  System
	/dev/vda1   *        2048    83886079    41942016   83  Linux

	Disk /dev/vdb: 107.4 GB, 107374182400 bytes, 209715200 sectors
	Units = sectors of 1 * 512 = 512 bytes
	Sector size (logical/physical): 512 bytes / 512 bytes
	I/O size (minimum/optimal): 512 bytes / 512 bytes

	[root@iZwe12zdi799668qfxdm5oZ ~]# 

#### 3. 数据盘分区
执行以下命令，对数据盘进行分区。
```
fdisk /dev/vdb
```
按照界面的提示，依次输入“n”(新建分区)、“p”(新建扩展分区)、“1”(使用第1个主分区)，两次回车(使用默认配置)，输入“w”(保存分区表)，开始分区。

	[root@iZwe12zdi799668qfxdm5oZ ~]# fdisk /dev/vdb
	Welcome to fdisk (util-linux 2.23.2).

	Changes will remain in memory only, until you decide to write them.
	Be careful before using the write command.

	Device does not contain a recognized partition table
	Building a new DOS disklabel with disk identifier 0x6ea9e5ce.

	Command (m for help): n
	Partition type:
	   p   primary (0 primary, 0 extended, 4 free)
	   e   extended
	Select (default p): p
	Partition number (1-4, default 1): 1
	First sector (2048-209715199, default 2048): 
	Using default value 2048
	Last sector, +sectors or +size{K,M,G} (2048-209715199, default 209715199): 
	Using default value 209715199
	Partition 1 of type Linux and of size 100 GiB is set

	Command (m for help): w
	The partition table has been altered!

	Calling ioctl() to re-read partition table.
	Syncing disks.
	[root@iZwe12zdi799668qfxdm5oZ ~]# 

#### 4. 查看新分区
使用命令`fdisk -l`，即可查看到，新的分区vdb1已经创建完成。

	[root@iZwe12zdi799668qfxdm5oZ ~]# fdisk -l

	Disk /dev/vda: 42.9 GB, 42949672960 bytes, 83886080 sectors
	Units = sectors of 1 * 512 = 512 bytes
	Sector size (logical/physical): 512 bytes / 512 bytes
	I/O size (minimum/optimal): 512 bytes / 512 bytes
	Disk label type: dos
	Disk identifier: 0x0008fd2d

	   Device Boot      Start         End      Blocks   Id  System
	/dev/vda1   *        2048    83886079    41942016   83  Linux

	Disk /dev/vdb: 107.4 GB, 107374182400 bytes, 209715200 sectors
	Units = sectors of 1 * 512 = 512 bytes
	Sector size (logical/physical): 512 bytes / 512 bytes
	I/O size (minimum/optimal): 512 bytes / 512 bytes
	Disk label type: dos
	Disk identifier: 0x6ea9e5ce

	   Device Boot      Start         End      Blocks   Id  System
	/dev/vdb1            2048   209715199   104856576   83  Linux
	[root@iZwe12zdi799668qfxdm5oZ ~]# 

#### 5. 格式化新分区
使用下面的命令对新分区进行格式化：
```
mkfs.ext3 /dev/vdb1
```
> 在进行分区格式化时，开发者可自行决定文件系统的格式，如ext2、ext3等，这里我们选择ext3。

格式化完成后如下：

	[root@iZwe12zdi799668qfxdm5oZ ~]# mkfs.ext3 /dev/vdb1
	mke2fs 1.42.9 (28-Dec-2013)
	Filesystem label=
	OS type: Linux
	Block size=4096 (log=2)
	Fragment size=4096 (log=2)
	Stride=0 blocks, Stripe width=0 blocks
	6553600 inodes, 26214144 blocks
	1310707 blocks (5.00%) reserved for the super user
	First data block=0
	Maximum filesystem blocks=4294967296
	800 block groups
	32768 blocks per group, 32768 fragments per group
	8192 inodes per group
	Superblock backups stored on blocks: 
	        32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208, 
	        4096000, 7962624, 11239424, 20480000, 23887872

	Allocating group tables: done                            
	Writing inode tables: done                            
	Creating journal (32768 blocks): done
	Writing superblocks and filesystem accounting information: done   

	[root@iZwe12zdi799668qfxdm5oZ ~]# 

#### 6. 挂载新分区
使用下面的命令，先创建fimeson目录（目录名可自定义），再手动挂载新分区，最后查看挂载结果。
```
mkdir /fimeson
mount /dev/vdb1 /fimeson
df -h
```
出现以下信息说明挂载成功，即可以查看到数据盘了。

	[root@iZwe12zdi799668qfxdm5oZ ~]# mkdir /fimeson
	[root@iZwe12zdi799668qfxdm5oZ ~]# mount /dev/vdb1 /fimeson
	[root@iZwe12zdi799668qfxdm5oZ ~]# df -h
	Filesystem      Size  Used Avail Use% Mounted on
	/dev/vda1        40G  1.5G   36G   4% /
	devtmpfs        3.9G     0  3.9G   0% /dev
	tmpfs           3.9G     0  3.9G   0% /dev/shm
	tmpfs           3.9G  368K  3.9G   1% /run
	tmpfs           3.9G     0  3.9G   0% /sys/fs/cgroup
	tmpfs           783M     0  783M   0% /run/user/0
	/dev/vdb1        99G   60M   94G   1% /fimeson
	[root@iZwe12zdi799668qfxdm5oZ ~]# 

#### 7. 添加分区信息
如果希望云主机在重启或开机时能自动挂载数据盘，必须将分区信息添加到/etc/fstab中。如果没有添加，则云主机重启或开机后，都不能自动挂载数据盘。
> 注意：请确认分区路径是否为 “/dev/vdb1”，若路径错误，将会造成云主机重启失败

使用下面的命令添加分区信息，最后查看添加结果：
```
echo '/dev/vdb1 /fimeson ext3 defaults 0 0' >> /etc/fstab
cat /etc/fstab
```
出现以下信息表示添加分区信息成功。

	[root@iZwe12zdi799668qfxdm5oZ ~]# echo '/dev/vdb1 /fimeson ext3 defaults 0 0' >> /etc/fstab
	[root@iZwe12zdi799668qfxdm5oZ ~]# cat /etc/fstab

	#
	# /etc/fstab
	# Created by anaconda on Fri Jun  2 07:36:28 2017
	#
	# Accessible filesystems, by reference, are maintained under '/dev/disk'
	# See man pages fstab(5), findfs(8), mount(8) and/or blkid(8) for more info
	#
	UUID=83e59f2d-45ce-4124-939a-3302e6cc6afa /                       ext4    defaults        1 1
	/dev/vdb1 /fimeson ext3 defaults 0 0
	[root@iZwe12zdi799668qfxdm5oZ ~]# 