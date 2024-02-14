---
title: 第9期 | create-vue
description: 川哥的源码解读文章：https://juejin.cn/post/70183448668117401731. 源码简介create-vue使用npm init vue@next一行命令，就能快如闪电般初始化好基于vite的Vue3项目。简单来说，create-vue就是一个脚手架。本次源码解读...
pubDate: 2022-03-15T07:09:35.000Z
---

> 川哥的源码解读文章：[https://juejin.cn/post/7018344866811740173](https://juejin.cn/post/7018344866811740173)


## 1. 源码简介
[create-vue](https://github.com/vuejs/create-vue)使用npm init vue@next一行命令，就能快如闪电般初始化好基于vite的Vue3项目。简单来说，create-vue就是一个脚手架。

本次源码解读就是看它是如何实现这个功能的。

2.解析过程
```shell
npm init vue@next
```
看到这条命令，是不是对 npm init 有点疑问？然后去查npm的官方文档：[https://docs.npmjs.com/cli/v6/commands/npm-init](https://docs.npmjs.com/cli/v6/commands/npm-init)


