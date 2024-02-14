---
title: 【Docker】打包项目配置文档
description: 概述Docker 作为轻量级虚拟化技术，拥有持续集成、版本控制、可移植性、隔离性和安全性等优势。项目使用 Docker 来部署，它的实现过程主要由以下几个步骤组成：创建项目，打包构建项目静态资源 (yarn build)基于 nginx docker 镜像构建成一个前端工程镜像基于这个前端工程...
pubDate: 2021-10-11T03:40:49.000Z
---

### 概述

Docker 作为轻量级虚拟化技术，拥有持续集成、版本控制、可移植性、隔离性和安全性等优势。项目使用 Docker 来部署，它的实现过程主要由以下几个步骤组成：

- 创建项目，打包构建项目静态资源 (yarn build)
- 基于 nginx docker 镜像构建成一个前端工程镜像
- 基于这个前端工程镜像，启动 docker 容器


### 下载并安装docker

> 参考文档：[https://yeasy.gitbook.io/docker_practice/install/centos](https://yeasy.gitbook.io/docker_practice/install/centos)


安装环境：CentOS 8

以下是安装过程：

-  使用 yum 安装<br />执行以下命令安装依赖包： <br />执行下面的命令添加 yum 软件源：  
```bash
$ sudo yum install -y yum-utils
```
```bash
# 这个是国内源
$ sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

$ sudo sed -i 's/download.docker.com/mirrors.aliyun.com\/docker-ce/g' /etc/yum.repos.d/docker-ce.repo
```

-  安装Docker  
```bash
$ sudo yum install docker-ce docker-ce-cli containerd.io
```

-  CentOS 8 额外设置<br />由于 CentOS8 防火墙使用了 nftables，但 Docker 尚未支持 nftables， 我们可以使用如下设置使用 iptables：更改 `/etc/firewalld/firewalld.conf`  
```bash
# FirewallBackend=nftables
FirewallBackend=iptables
```


### 打包项目

项目打包命令如下：

```bash
yarn run build
```

此时工程根目录下多出一个 dist 文件夹。传统的部署流程基本如下：

1. 服务器环境配置及安装 nginx
2. 将项目 dist 目录上传到服务器的指定位置
3. 修改 nginx 安装目录 /conf/nginx.conf 文件，配置 dist 目录及后端项目的代理地址
4. 启动 nginx 即可访问到静态资源网站

接下来用 Docker 来构建一个这样的静态资源站点。


### 使用 nginx 镜像构建项目

这种方式和服务器部署方式 基本类似。基本流程如下：

1. 将项目 dist 目录上传到服务器的指定位置（eg: /home/dist）
2. 拉取 nginx 镜像
3. 创建 nginx config 配置文件，通过挂载数据卷将 dist 目录以及事先准备好的 nginx.conf 挂在到 nginx 容器中
4. 创建 Dockerfile 文件
5. 构建项目镜像

详细配置操作如下：


#### 1. 获取 nginx 镜像

```bash
docker pull nginx
```


#### 2. 创建 nginx config配置文件

在项目根目录下创建 nginx 文件夹，该文件夹下新建文件 default.conf，该配置文件定义了首页的指向为 `/usr/share/nginx/html/index.html`，所以可以把构建出来的 index.html 文件和相关的静态资源放到`/usr/share/nginx/html`目录下。

```bash
server {
    listen       80;
    server_name  localhost;

    #charset koi8-r;
    access_log  /var/log/nginx/host.access.log  main;
    error_log  /var/log/nginx/error.log  error;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```


#### 3.  创建 Dockerfile 文件

```dockerfile
# 该镜像是基于 nginx:latest 镜像而构建的
FROM nginx
# 将项目根目录下dist文件夹下的所有文件复制到镜像中 /usr/share/nginx/html/ 目录下
COPY dist/ /usr/share/nginx/html/
# 将nginx目录下的default.conf 复制到 etc/nginx/conf.d/default.conf
# 作用是用本地的 default.conf 配置来替换nginx镜像里的默认配置
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
```


#### 4. 基于该 Dockerfile 构建项目镜像

在项目根目录运行以下代码：

> -t 是给镜像命名， . 是基于当前目录的Dockerfile来构建镜像


```bas
docker build -t vuecontainer .
```

查看本地镜像，运行命令：

```bash
docker image ls | grep vuecontainer
```

到此时项目镜像 vuecontainer 已经成功创建。

接下来，基于该镜像启动一个 docker 容器。


### 启动 docker 容器

> Docker 容器 Container： 镜像运行时的实体。镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和实例一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等 。


基于 vuecontainer 镜像启动容器，运行命令：

```bash
# docker run 基于镜像启动一个容器
# -p 3000:80 端口映射，将宿主的3000端口映射到容器的80端口
# -d 后台方式运行
# --name 容器名，可以用来查看 docker 进程
docker run -p 3000:80 -d --name front-app vuecontainer
```

查看当前 docker 进程：

```bash
docker ps
```

可以发现名为 front-app 的容器已经运行起来。此时访问 [http://localhost:3000](http://localhost:3000)  就能访问到该网站。
