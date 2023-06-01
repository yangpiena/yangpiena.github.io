---
title: Docker命令大全
author: 昜丿捺
copyright: true
categories: 技术
timestamp: 1670308028
date: 2022-12-06 14:27:08
authorDesc:
tags: [docker]
description: 记录docker常用的命令
---
# docker
## docker 镜像命令
### 查看自己服务器中docker 镜像列表
```
docker images
```
### 搜索镜像
```
docker search 镜像名
```
### 拉取镜像
不加tag(版本号) 即拉取docker仓库中该镜像的最新版本latest，加:tag 则是拉取指定版本
```
docker pull 镜像名
docker pull 镜像名:tag
```
### 删除镜像
```
# 删除一个
docker rmi -f 镜像名/镜像ID

# 删除多个 其镜像ID或镜像用用空格隔开即可 
docker rmi -f 镜像名/镜像ID 镜像名/镜像ID 镜像名/镜像ID

# 删除全部镜像  -a 意思为显示全部, -q 意思为只显示ID
docker rmi -f $(docker images -aq)
```
### 强制删除镜像
```
docker image rm 镜像名称/镜像ID
```
### 保存镜像
将我们的镜像保存为tar压缩文件，这样方便镜像转移和保存,然后可以在任何一台安装了docker的服务器上加载这个镜像
```
docker save 镜像名/镜像ID -o 镜像保存在哪个位置与名字
```
### 加载镜像
任何装docker的服务器加载镜像保存文件,使其恢复为一个镜像
```
docker load -i 镜像保存文件位置
```
### 镜像标签
```
docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]

# 如果省略TAG 则会为镜像默认打上标签latest
```

## docker 容器命令
### 查看正在运行容器列表
```
docker ps
```
### 查看所有容器
包含正在运行和已停止的
```
docker ps -a
```
### 运行一个容器
```
docker run -it -d --name 要取的别名 镜像名:Tag /bin/bash

# -it        表示与容器进行交互式启动
# -d         表示可后台运行容器（守护式运行）
# --name     给要运行的容器起的名字
# /bin/bash  交互路径
```
### 停止容器
```
docker stop 容器名/容器ID
```
### 删除容器
```
# 删除一个容器
docker rm -f 容器名/容器ID

# 删除多个容器 空格隔开要删除的容器名或容器ID
docker rm -f 容器名/容器ID 容器名/容器ID 容器名/容器ID

# 删除全部容器
docker rm -f $(docker ps -aq)
```
### 容器端口与服务器端口映射
在运行命令docker run后面跟以下参数：
```
-p 宿主机端口:容器端口
```
### 进入容器
```
docker exec -it 容器名/容器ID /bin/bash
```
### 从容器内退出到自己服务器中
```
# 直接退出  未添加 -d(持久化运行容器) 时，执行此参数容器会被关闭  
exit
# 优雅退出 --- 无论是否添加-d 参数，执行此命令容器都不会被关闭
Ctrl + p + q
```
### 重启容器
```
docker restart 容器ID/容器名
```
### 启动容器
```
docker start 容器ID/容器名
```
### kill 容器
```
docker kill 容器ID/容器名
```
### 容器文件拷贝
无论容器是否开启 都可以进行拷贝
```
# 从容器内拷出
docker cp 容器ID/名称: 容器内路径  容器外路径

# 从外部拷贝文件到容器内
docker cp 容器外路径 容器ID/名称: 容器内路径
```
### 查看容器日志
```
docker logs -f --tail=要查看末尾多少行（默认all） 容器ID
```
### 数据挂载
```
-v 宿主机文件存储位置:容器内文件位置
```
-v命令可以多次使用，即一个容器可以同时挂载多个文件
```
-v 宿主机文件存储位置:容器内文件位置 -v 宿主机文件存储位置:容器内文件位置 -v 宿主机文件存储位置:容器内文件位置
```
### 不删容器，设置容器开机自启动
```
docker update --restart=always 容器Id 或者 容器名
或
docker container update --restart=always 容器Id 或者 容器名
```
### 更换容器名
```
docker rename 容器ID/容器名 新容器名
```

## docker 网卡命令
### 查看docker网卡
```
docker network ls
```
### 删除docker网卡
```
docker network rm 网卡id
```
### 查看docker网卡的相关详细信息
```
docker network inspect 网卡id
```

---

## 自己提交一个镜像
```
docker commit -m="提交信息" -a="作者信息" 容器名/容器ID 提交后的镜像名:Tag
```

## docker 修改默认根目录
```
systemctl status docker
systemctl stop docker
mkdir -p /newdisk/docker
mv /var/lib/docker /newdisk/docker
ln -s /newdisk/docker /var/lib/docker
systemctl start docker
systemctl status docker
docker info
```

---


# docker-compose
## 查看版本
```
​docker-compose version
```
## 使用docker-compose启动容器，根据yml创建service
```
docker-compose up
```
## 使用docker-compose后台启动
```
docker-compose up -d
```
## ​指定yaml启动
```
docker-compose up -f xxx.yaml
```
## 查看启动成功的service
```
​docker-compose ps
```
## 查看images
```
docker-compose images
```
## 停止/启动service
```
docker-compose stop/start
```
## 删除service[同时会删除掉network和volume]
```
​docker-compose down
```
## 进入到某个service
```
​docker-compose exec ypn-web sh
```
## 如果前端代码有更新,可以使用此命令重新打包镜像
```
docker-compose build ypn-web
```
## 服务都启动成功后,使用此命令行可清除none镜像
```
docker system prune
```
## 查询容器运行日志
```
docker logs ypn-web -f --tail 100
```