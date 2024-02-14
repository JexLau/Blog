---
title: 【Django】学习记录(一)
description: 概念Django 是一个轻量级的 Python Web 框架MTV架构Django 的 MTV 架构设计如下，它跟常见的 MVC 架构是不太一样的。M-Model  跟数据库交互T-Template  动态HTML文件里不变的部分，静态内容V-View  实际上包含了业务的逻辑，相当于是用户请...
pubDate: 2021-09-30T08:33:18.000Z
heroImage: https://cdn.nlark.com/yuque/0/2021/png/1105483/1637186697830-37d4279a-4bfa-4ea1-865a-a57b2808b819.png
---

## 概念
Django 是一个轻量级的 Python Web 框架


## MTV架构
Django 的 MTV 架构设计如下，它跟常见的 MVC 架构是不太一样的。

- M-Model  跟数据库交互
- T-Template  动态HTML文件里不变的部分，静态内容
- V-View  实际上包含了业务的逻辑，相当于是用户请求的处理层

还有一个 Controller 层通过正则表达式去分发URL请求到不同视图。<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/1105483/1637186697830-37d4279a-4bfa-4ea1-865a-a57b2808b819.png#clientId=uafa5b723-8984-4&from=paste&height=270&id=u81c908b5&originHeight=539&originWidth=1124&originalType=binary&ratio=1&size=204139&status=done&style=none&taskId=u83f72449-6446-4f22-8973-e05faec1548&width=562)

## 设计思想

- DRY 不重复造轮子
- MVT 架构
- 快速开发
- 灵活易于扩展
- 松耦合
- 显示优于隐式


## 环境依赖与安装
> 文档：[https://docs.djangoproject.com/zh-hans/3.2/intro/install/](https://docs.djangoproject.com/zh-hans/3.2/intro/install/)


1. 依赖 python，检查是否安装 python 
2. 安装 Django (Windows环境)
```shell
python -m pip install Django
```
在正式安装 pip 之前，可在控制台输入以下命令，用于检测当前Windows环境中是否已经安装 pip，如果能够成功输入pip版本号，则说明，当前系统中已经安装pip，否则，需要进行安装。
```shell
python -m pip --version
```
> PS：如果挂了梯子，安装的时候报错，可以关掉梯子重启一下再安装

验证 Django 是否安装成功<br />在 shell 中输入 python。 然后在 Python 提示符下，尝试导入 Django：
```shell
>>> import django
>>> print(django.get_version())
3.2.7
```

## 编写第一个 Django 应用
> 文档：[https://docs.djangoproject.com/zh-hans/3.2/intro/tutorial01](https://docs.djangoproject.com/zh-hans/3.2/intro/tutorial01)

创建目录，这行代码将会在当前目录下创建一个 mysite 目录
```
django-admin startproject mysite
```

启动项目
```shell
python manage.py runserver
```
浏览器访问 https://127.0.0.1:8000/，会看到一个页面，服务器已经成功运行了
