---
title: Mac环境使用软链 npm link
description: 在开发本地npm包时，经常需要改动东西，但又不知道改动是否正确，这时候大部分人可能会打包一版到项目测试，这显得既不优雅也很繁琐。其实npm官方已经提供了npm link这种软链调试方法。1. 软链熟悉linux应该比较清楚，也很好理解，其实就是一个跳转的映射。比如访问a，a存的是b的路径，那访...
pubDate: 2023-01-16T02:51:46.000Z
heroImage: https://cdn.nlark.com/yuque/0/2023/png/1105483/1673838273738-c094bd21-318a-440f-a857-00d503552dd4.png
---

在开发本地npm包时，经常需要改动东西，但又不知道改动是否正确，这时候大部分人可能会打包一版到项目测试，这显得既不优雅也很繁琐。其实npm官方已经提供了npm link这种软链调试方法。

### 1. 软链
熟悉linux应该比较清楚，也很好理解，其实就是一个跳转的映射。比如访问a，a存的是b的路径，那访问a的时候实际上是b的路径。


### 2. 如何创建软链
2.1 先在npm包的路径下执行 npm link，创建一个全局链接。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1105483/1673838273738-c094bd21-318a-440f-a857-00d503552dd4.png#averageHue=%231c373f&clientId=u1f2a2fe3-3e20-4&from=paste&height=174&id=ud0509b61&originHeight=174&originWidth=714&originalType=binary&ratio=1&rotation=0&showTitle=false&size=60611&status=done&style=none&taskId=u9acb854e-f2ac-4ab7-be42-b72680a3a4e&title=&width=714)<br />2.2 在项目包里使用<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1105483/1673838591106-004f7ca7-8d63-4edd-a7d9-f0ee9f33723a.png#averageHue=%23344c4e&clientId=u1f2a2fe3-3e20-4&from=paste&height=20&id=u51541950&originHeight=20&originWidth=357&originalType=binary&ratio=1&rotation=0&showTitle=false&size=15845&status=done&style=none&taskId=ucee2fd10-6ed2-4274-98fe-0c505986ca7&title=&width=357)<br />这时候就可以在项目里使用本地的npm包了，再也不用修一下打一次包了。<br />⚠️注意：<br />1) npm link packageName，这里的packageName是本地包里的package.json中的name。<br />2) 如果执行第一步后执行第二步出现 Command "packageName" not found，可能需要重启一下命令行。


### 3. 如何解除软链接
3.1 先在项目中解除 npm unlink packageName<br />3.2 再在npm包中解除 npm unlink


### 4. 其他
查看所有创建的全局链接名称：<br />npm ls --global --depth 0

强制解除创建的某个特定全局链接：<br />sudo npm rm --global packageName
