---
title: 【React】Hooks 核心 API 使用注意事项
description: 来源：【徐小夕】https://juejin.cn/post/6844904074433789959在使用 hooks 和函数组件编写组件时，第一个要考虑的就是渲染性能。比如，在函数组件中使用 setState 都会导致组件内部重新渲染： 当在容器组件手动更新了任何 state 时，容器内部的...
pubDate: 2021-08-17T08:28:08.000Z
heroImage: https://cdn.nlark.com/yuque/0/2021/webp/1105483/1629188947550-530e2a84-ec82-44cd-bb4a-7f95394e02f5.webp
---

> 来源：【徐小夕】[https://juejin.cn/post/6844904074433789959](https://juejin.cn/post/6844904074433789959#heading-3)

在使用 hooks 和函数组件编写组件时，第一个要考虑的就是**渲染性能**。<br />比如，在函数组件中使用 setState 都会导致组件内部重新渲染： <br />![](https://cdn.nlark.com/yuque/0/2021/webp/1105483/1629188947550-530e2a84-ec82-44cd-bb4a-7f95394e02f5.webp#clientId=ubd9e1403-425a-4&from=paste&id=ufca170c2&originHeight=606&originWidth=1030&originalType=url&ratio=1&status=done&style=none&taskId=u3433079b-d73c-426f-9f79-c8222fad165)<br />当在容器组件手动更新了任何 state 时，容器内部的各个子组件都会重新渲染，为了避免这种情况出现，一般会使用 memo 将函数组件包裹，来达到 class 组件的 pureComponent 的效果：
```typescript
import React, { memo, useState, useEffect } from 'react'

const A = (props) => {
  console.log('A1')
  useEffect(() => {
    console.log('A2')
  })
  return <div>A</div>
}

const B = memo((props) => {
  console.log('B1')
  useEffect(() => {
    console.log('B2')
  })
  return <div>B</div>
})

const Home = (props) => {
  const [a, setA] = useState(0)
  useEffect(() => {
    console.log('start')
    setA(1)
  }, [])
  return <div><A n={a} /><B /></div>
}
```
当我们将 B 组件用 memo 包裹后，状态 a 的更新将不会导致 B 组件重新渲染。

其实仅仅优化这一点还远远不够的，比如：<br />**子组件用到了容器组件的某个引用类型的变量或者函数，那么当容器内部的 state 更新之后，这些变量和函数都会重新赋值，这样就会导致即使子组件使用了 memo 包裹也还是会重新渲染**，这个时候我们就需要使用**useMemo **和 **useCallback**了。

**useMemo **可以帮我们将变量缓存起来，**useCallback **可以缓存回调函数，它们的第二个参数和 useEffect 一样，是一个依赖项数组，通过配置依赖项数组来决定是否更新。
```typescript
import React, { memo, useState, useEffect, useMemo } from 'react'

const Home = (props) => {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  useEffect(() => {
    setA(1)
  }, [])

  const add = useCallback(() => {
    console.log('b', b)
  }, [b])

  const name = useMemo(() => {
    return b + 'xuxi'
  }, [b])
  
  const A = (props) => {
    console.log('A1')
    useEffect(() => {
      console.log('A2')
    })
    return <div>A</div>
  }

  const B = memo((props) => {
    console.log('B1')
    useEffect(() => {
      console.log('B2')
    })
    return <div>B</div>
  })
  
  return <div><A n={a} /><B add={add} name={name} /></div>
}
```
此时 a 更新后 B 组件不会再重新渲染。

以上几个优化步骤主要是用来优化组件的渲染性能，我们平时还会涉及到获取组件 dom 和使用内部闭包变量的情景，这个时候我们就可以使用 **useRef**。

**useRef **返回一个可变的 ref 对象，其 current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。
```typescript
function AutoFocusIpt() {
  const inputEl = useRef(null);
  
  const useEffect(() => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  }, []);
  
  return <input ref={inputEl} type="text" />
}
```
