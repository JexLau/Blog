---
title: nvm use报错exit status 1解决方法
description: nvm use 版本报错，出现exit status 1后面跟一堆乱码此时是因为无权限，cmd以管理员身份打开，再次使用nvm use 版本报错命令，成功切换。PS：因为遇到过太多次了！！每次都忘记！！特地记录一下！！
pubDate: 2022-09-13T06:20:37.000Z
heroImage: https://cdn.nlark.com/yuque/0/2022/png/1105483/1663050097527-c972199b-0811-4177-ae62-62dd55f3b943.png
---

### nvm use 版本报错，出现exit status 1后面跟一堆乱码
此时是因为**无权限**，cmd以管理员身份打开，再次使用nvm use 版本报错命令，成功切换。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663050097527-c972199b-0811-4177-ae62-62dd55f3b943.png#clientId=u5ec7bf52-58a9-4&errorMessage=unknown%20error&from=paste&height=133&id=u4827e640&originHeight=133&originWidth=321&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2823&status=error&style=none&taskId=ua5ab5a59-8953-4445-a22d-d0b1311ca95&title=&width=321)

PS：因为遇到过太多次了！！每次都忘记！！特地记录一下！！---


### node : 无法将“node”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。
**解决办法：**下载Nodejs，安装完之后，重启VScode，会自动配置，运行即可在终端看到结果。---


### 找不到npm版本问题

安装node（**重要，仔细看，很容易失败**）<br />安装node需要注意，有两种安装方式，分别为:<br />(1) 使用命令安装，nvm install 版本号（如：v13.0.1）<br />(2) 下载安装包，放到nvm问价下，改名为vx.x.x(如v13.0.1)即可<br />那怎么选择用那种安装，取决于你想安装的版本，**如果安装的版本低于8.11可使用第一种命令的方式安装，简单快捷**<br />**如果高于8.11版本要使用第二种下载安装包方式安装，因为高于8.11使用命令安装时将不自动安装npm，这就是安装node后npm找不到的原因**<br />第二种安装方式：<br />首先，搜索node历史版本，找到想安装版本，点击“下载”。然后，下载zip文件，将文件解压，复制到nvm文件夹下，然后改名为如v13.0.1的形式。
