---
title: 【Vite】spawn esbuild.exe ENOENT 报错
description: 对应的 GitHub issue：https://github.com/vitejs/vite/issues/1361在搭建过程中运行得好好的，突然安装了vuex之后，再重新运行 yarn dev 就报错了，整得我一脸懵逼，风中凌乱。于是我去找 Vite 的官方文档：https://githu...
pubDate: 2021-10-02T17:13:00.000Z
heroImage: https://cdn.nlark.com/yuque/0/2021/png/1105483/1633195437985-056ec0b3-8385-4f8b-a471-b063bb1e7888.png
---

> 对应的 GitHub issue：[https://github.com/vitejs/vite/issues/1361](https://github.com/vitejs/vite/issues/1361)

在搭建过程中运行得好好的，突然安装了vuex之后，再重新运行 yarn dev 就报错了，整得我一脸懵逼，风中凌乱。<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/1105483/1633195437985-056ec0b3-8385-4f8b-a471-b063bb1e7888.png#clientId=uecc6a7de-0cc1-4&from=paste&height=409&id=u4ff73f4a&originHeight=409&originWidth=799&originalType=binary&ratio=1&size=54951&status=done&style=none&taskId=u85c061fa-f115-4d53-bb76-b7f7880ec63&width=799)<br />于是我去找 Vite 的官方文档：[https://github.com/vitejs/vite](https://github.com/vitejs/vite)，去 issue 中搜索关键词 **spawn esbuild.exe，**果然有对应的 issue。

尤雨溪的回复：
> Check npm config get ignore-scripts. Your npm config seems to ignore esbuild's postinstall hook.
> If that's not the problem, try installing esbuild directly in a fresh project - if that doesn't work also, then it's a esbuild bug and should be reported to esbuild instead.

大意是，先检查npm的配置，npm config get ignore-scripts，如果还是不行，就重新安装 esbuild：node ./node_modules/esbuild/install.js。

Abiel的回复：
> It turns out npm v7 has a bug that corrupts package-lock.json files: [npm/cli#2606](https://github.com/npm/cli/issues/2606). When this happens, packages like esbuild with post install scripts can break. You may be experiencing this bug. A workaround is to delete and recreate your package-lock.json file.

大意是，应该删除 package-lock.json 文件，重新安装。

我的解决步骤如下：

1. 重置npm ignore-scripts配置： npm config set ignore-scripts false，无效；
2. 重新安装： node ./node_modules/esbuild/install.js，有效；
3. 顺便把 yarn.lock 文件删了，重新安装。

