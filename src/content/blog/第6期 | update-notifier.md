---
title: 第6期 | update-notifier
description: 1. 源码简介update-notifier 作用：Update notifications for your CLI app （检测 npm 包是否有更新）。本质就是开了 child_process 运行在后台，如果检查到有可用更新版，会将结果保存在 .update 属性中。简单例子： co...
pubDate: 2022-03-15T06:58:02.000Z
heroImage: https://cdn.nlark.com/yuque/0/2021/png/1105483/1633590376912-83ac009a-cd36-4bce-ba7b-9f022c878cdd.png
---

## 1. 源码简介
update-notifier 作用：Update notifications for your CLI app （检测 npm 包是否有更新）。<br />本质就是开了 child_process 运行在后台，如果检查到有可用更新版，会将结果保存在 .update 属性中。

**简单例子：**
```javascript

const updateNotifier = require('update-notifier');
updateNotifier({
	pkg: {
		name: 'public-ip',
		version: '0.9.2'
	},
	updateCheckInterval: 24 * 60 * 60
}).notify();

```


**学习目标：**<br />1）学习 update-notifier 源码，输出记录文档。

**源码地址：**<br />[https://github.com/yeoman/update-notifier](https://github.com/yeoman/update-notifier)

## 2. update-notifier 源码
源码其实就一个 200 行不到的 index.js 文件，乍一看用到了很多包，但核心是 UpdateNotifier 构造函数。它接收一个 options 对象，输出一个 UpdateNotifier 实例。这个实例有一个属性 update，是用来标记是否有可用更新版，如果有，就输出更新信息，运行上面简单例子结果如下（存在可用更新版）：<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/1105483/1633590376912-83ac009a-cd36-4bce-ba7b-9f022c878cdd.png#clientId=u03df44c8-a30b-4&from=paste&height=200&id=u012ddbeb&originHeight=200&originWidth=612&originalType=binary&ratio=1&rotation=0&showTitle=false&size=11137&status=done&style=none&taskId=ue3b05f63-6e2e-4cb1-8384-ec67a3b5395&title=&width=612)<br />UpdateNotifier 构造函数有三个函数：check() 检查，fetchInfo() 拉取信息，notify() 通知。

以上面的简单例子结合源码为例：
```javascript
// 初始化 UpdateNotifier 实例
const updateNotifier = require('update-notifier');
// 对应源码中 UpdateNotifier constructor 部分的代码 + check函数
constructor(options = {}) {
  this.options = options;
  // ... 省略了部分源码，主要是容错处理和字段检测
}
check() {
  // 当存在以下情况时停止检查
  if (!this.config || this.config.get('optOut') || this.disabled) {
    return;
  }

  // 获取相关包的更新信息 第一次检查时是 undefined
  this.update = this.config.get('update');
  if (this.update) {
    // 如果有更新，赋值
    this.update.current = this.packageVersion;
    // 删除缓存的数据
    this.config.delete('update');
  }
  if (Date.now() - this.config.get('lastUpdateCheck') < this.updateCheckInterval) {
    return;
  }
  // 子进程
  spawn(process.execPath, [path.join(__dirname, 'check.js'), JSON.stringify(this.options)], {
    detached: true, 
    stdio: 'ignore'
  }).unref();
}


// 调用实例的 notify 函数
updateNotifier({
	pkg: {
		name: 'public-ip',
		version: '0.9.2'
	},
	updateCheckInterval: 24 * 60 * 60
}).notify();
// 对应源码中的 notify 函数
notify(options) {
  // 满足以下情况时不需要通知（比如没有更新的时候不需要通知）
  const suppressForNpm = !this.shouldNotifyInNpmScript && isNpm().isNpmOrYarn;
  if (!process.stdout.isTTY || suppressForNpm || !this.update || !semver().gt(this.update.latest, this.update.current)) {
    return this;
  }

  // 需要通知的情况，控制台输出更新信息
  // 省略部分描写UI的源码...

  // 此处return的this，option配置已改变
  return this;
}
```

## 3. 总结
总体流程引用【凌晨三点半】的笔记：

- const updateNotifier = new UpdateNotifier({})
   - 初始化 constuctor
   - updateNotifier.check()
- 判断是否执行 check.js，如果执行：
   - updateNotifier.fetchInfo()
   - set('lastUpdateCheck')
   - set('update')
- notify()

[【凌晨三点半】的笔记](https://www.yuque.com/ruochuan12/group3/gug2c7)很详细，细节满满的，感谢~
