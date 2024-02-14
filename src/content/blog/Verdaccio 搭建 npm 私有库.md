---
title: Verdaccio 搭建 npm 私有库
description: 需求背景平时在项目工作中可能会用到很多通用性的代码，比如，框架类、工具类以及公用的业务逻辑代码等，通过打包发布到npm中央仓库或者私有仓库，来进行维护和托管代码，方便公用代码的使用。如果涉及到不方便公开的代码组件可以发布到私有仓库。私有 npm 组件库的优势：私有 npm 包只对公司内部局域网...
pubDate: 2021-06-12T03:55:14.000Z
heroImage: https://cdn.nlark.com/yuque/0/2021/png/1105483/1624861345917-f813d834-2c8f-4aba-a86f-f0e2fd436a5f.png
---

# 需求背景

平时在项目工作中可能会用到很多通用性的代码，比如，框架类、工具类以及公用的业务逻辑代码等，通过打包发布到npm中央仓库或者私有仓库，来进行维护和托管代码，方便公用代码的使用。如果涉及到不方便公开的代码组件可以发布到私有仓库。<br />私有 npm 组件库的优势：

1. 私有 npm 包只对公司内部局域网开放
2. 速度比直接在 npm 下载包更快，也比使用淘宝镜像快。
3. 对于发布和下载 npm 包可以配置权限管理


# Verdaccio安装与部署

[Verdaccio](https://github.com/verdaccio/verdaccio) 是一个轻量级的npm包管理工具，其特点是可以托管私有模块，并且带有缓存功能，当私有仓库中找不到对应模块的时候，会去npm公服上面下载，并缓存起来。

Verdaccio 依赖 nodejs 和 npm 环境，准备材料如下：

1. nodejs
2. npm
3. verdaccio
4. 一台服务器


## 1. 在服务器中安装 nodejs 与 npm（Linux 为例）
PS：在官网下载linux系统的安装包上传到服务器进行解压安装也可以
```bash
# 下载
wget https://nodejs.org/dist/latest/node-v16.4.0-linux-x64.tar.xz
# 解压
tar xf node-v16.4.0-linux-x64.tar.xz
# 进入解压目录
cd node-v16.4.0-linux-x64
# 执行node命令 查看版本
./bin/node -v

# 创建 nodejs 和 npm 的软连接
ln -s /usr/local/node-v16.4.0-linux-x64/bin/npm /usr/local/bin/
ln -s /usr/local/node-v16.4.0-linux-x64/bin/node /usr/local/bin/

# 检查是否配置好
node -v
npm -v
```


## 2. 全局安装 verdaccio
```bash
# 全局安装verdaccio
npm i -g verdaccio
```


## 3. 配置私有库文件
```bash
# 先新建私有库目录
mkdir apu-npm
# 进入目录
cd apu-npm
# 运行verdaccio
verdaccio
```

执行结果如下：
> Verdaccio doesn't need superuser privileges. Don't run it under root. 
> warn --- config file - /root/.config/verdaccio/config.yaml 
> warn --- Plugin successfully loaded: htpasswd 
> warn --- Plugin successfully loaded: audit 
> warn --- http address - http://localhost:4873/ - verdaccio/3.10.2


从控制台的输出可以看到，verdaccio的配置文件路径在/root/.config/verdaccio/config.yaml，默认访问地址http://localhost:4873/

**修改verdaccio的配置文件**
```bash
# 已发布的包的存储位置
storage: ./storage

# 插件所在的目录
plugins: ./plugins

# 界面相关的配置
web:
  # WebUI是默认启用的，如果您想禁用它，只需取消这一行的注释
  # enable: false
  title: xx-私有库
  
# 用户相关，例如注册、鉴权插件（默认使用的是 htpasswd）
auth:
  htpasswd:
    # 账户与密码存放地址
    file: ./htpasswd
    # 允许注册的最大用户数量，默认为 "+inf".
    # 您可以将此值设置为-1以禁用注册
    max_users: 100
    
listen:
  - 0.0.0.0:4873

# 用于提供对外部包的访问，例如访问 npm、cnpm 对应的源
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
    
# 用于配置发布包、删除包、查看包的权限
# 3个关键字: "$all"-所有人, "$anonymous"-未注册用户, "$authenticated"-注册用户
packages:
  # 范围包（例如对于第一个，如果我们发布的包名是这样的 @jex/test 就会命中）
  '@*/*':
    # 控制包的访问权限
    access: $all
    # 控制包的发布权限
    publish: $authenticated
    # 控制包的删除权限
    unpublish: $authenticated
    # 如果本地没有可用的私有包，代理会请求'npmjs'仓库
    proxy: npmjs
  '*':
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs

# 私有库服务端相关的配置
server:
  keepAliveTimeout: 60

# 中间件相关配置，默认会引入 auit 中间件，来支持 npm audit 命令
middlewares:
  audit:
    enabled: true

# 终端输出的信息的配置
logs:
  - {type: stdout, format: pretty, level: http}
 
# 发布包推送钉钉群
notify:
  'dingtalk':
    method: POST
    headers: [{'Content-Type': 'application/json;charset=utf-8'}]
    # 钉钉机器人的 webhook
    endpoint: https://oapi.dingtalk.com/robot/send?access_token=****,
    # 推送内容
    content: '{"color":"green","message":"新的包发布了: *{{ name }}*","notify":true,"message_format":"text"}'

```


## 4. 服务启动

1. 远程登录/远程控制进入阿里云服务器
2. 在终端窗口中执行命令 **verdaccio --config ./config.yaml**


## 5. pm2 管理 verdaccio 进程
使用pm2启动verdaccio，保证该进程一直处于打开状态

**安装pm2**
```bash
npm install -g pm2
```


**使用pm2启动verdaccio，以保证进程一直处于打开状态**
```bash
pm2 start verdaccio
```

# <br />客户端发布npm包到私有库


## 1. 用户注册

```bash
# 添加用户（确保配置文件开启了允许注册）
# 依次按照窗口填写username、password、e-mail 回车提交数据即可
npm adduser --registry http://服务器ip:4873
```


## 2. 用户登录
```bash
# 注册后，自动默认登录，登陆后npm会自动缓存，下次无需再次登录
npm login --registry http://服务器ip:4873
```


## 3. 如何使用私有仓库npm包
```bash
# 将 npm 访问源设置为私库访问源
npm config set registry http://服务器ip:4873

# 查看本机npm访问源
npm config get registry
```


## 4. 发布npm包到私有仓库
```bash
# 设置了registry为私库访问源可省略--registry参数
npm publish --registry http://服务器ip:4873
```


# 包GUI管理窗口
浏览器打开： http://服务器ip:4873，可以查看私库的npm包<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/1105483/1624861345917-f813d834-2c8f-4aba-a86f-f0e2fd436a5f.png#clientId=uad0d2182-fa06-4&from=paste&id=u701e99e2&originHeight=386&originWidth=1280&originalType=url&ratio=1&size=126539&status=done&style=none&taskId=ub25e65f6-b8fd-4b57-af8d-ca040d4a642)
