---
title: 第28期 | message component
description: 学习目标模仿学习组件库的 message 组件，知道组件原理主要是学习函数式调用 message (动态挂载) ，单例调用。源码浅解vue3 message源码地址知识点定时清除功能函数实现，如果 props.duration > 0，说明需要定时清除，duration毫秒过后，且visibl...
pubDate: 2022-05-10T10:56:24.000Z
heroImage: https://cdn.nlark.com/yuque/0/2022/png/1105483/1652184275142-d6cdfd31-4b11-48ba-a3bb-b857056308e5.png
---

## 学习目标
- 模仿学习组件库的 message 组件，知道组件原理

主要是学习函数式调用 message (动态挂载) ，单例调用。

## 源码浅解
[vue3 message源码地址](https://github1s.com/element-plus/element-plus/blob/dev/packages/components/message/src/message.vue)<br />知识点

- 定时清除功能函数实现，如果 props.duration > 0，说明需要定时清除，duration毫秒过后，且visible 为true，关闭实例。
```javascript
function startTimer() {
  if (props.duration > 0) {
    ;({ stop: stopTimer } = useTimeoutFn(() => {
      if (visible.value) close()
    }, props.duration))
  }
}

function clearTimer() {
  stopTimer?.()
}

```

- 销毁全部实例，创建的时候保存instances，closeAll()的时候就遍历这个数据，将其close()
```javascript
const instances: MessageQueue = []
export function closeAll(): void {
  for (let i = instances.length - 1; i >= 0; i--) {
    const instance = instances[i].vm.component
    ;(instance?.proxy as any)?.close()
  }
}
```

- 函数式调用：[https://github1s.com/element-plus/element-plus/blob/dev/packages/components/message/src/message-method.ts](https://github1s.com/element-plus/element-plus/blob/dev/packages/components/message/src/message-method.ts)

结构如下图，它有一个全局对象message，这个message是个函数，它接收两个参数 option 和 context。

1. 处理异常边界情况；
2. 处理options，生成props；
3. 获取 document.body 节点，准备把message节点插入，确认插入节点和插入的内容。
4. 使用createVNode生成虚拟DOM，render(vm, container)，然后把container挂在在body上。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1652184275142-d6cdfd31-4b11-48ba-a3bb-b857056308e5.png#clientId=u4c1d17f1-01d6-4&from=paste&height=468&id=u75328c65&originHeight=468&originWidth=1101&originalType=binary&ratio=1&rotation=0&showTitle=false&size=49093&status=done&style=none&taskId=ub6cb5061-f141-48bb-a9ab-fb413d31b1d&title=&width=1101)


## 总结
时间比较匆忙，挑了一些感兴趣的内容看。函数式调用组件使用起来比较舒服，核心思路是将生成的DOM动态挂载到document.body上，可以用在项目里。
