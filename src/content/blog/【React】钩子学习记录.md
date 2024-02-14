---
title: 【React】钩子学习记录
description: 【React Hooks 入门教程系列】：http://ourjs.com/wiki/view/react-hooksReact 函数组件本身不包含状态和生命周期，因此需要使用一些 Hooks （钩子）函数来实现状态保持、状态共享和状态传递。1. useState可以通过 useState 为...
pubDate: 2021-08-16T16:24:13.000Z
---

> 【React Hooks 入门教程系列】：[http://ourjs.com/wiki/view/react-hooks](http://ourjs.com/wiki/view/react-hooks)

React 函数组件本身不包含状态和生命周期，因此需要使用一些 Hooks （钩子）函数来实现**状态保持、状态共享和状态传递**。

## 1. useState
可以通过 useState 为函数组件添加内部状态，组件会侦听 state 的状态变化并**重新** render 组件
```typescript
// 代表 count 初始值为 0， 通过 setCount 改变 count 的值
const [count, setCount] = useState(0); 
```

## 2. useEffect
useEffect 可以用来**侦听状态变化**，并执行相应逻辑。如果需要在组件卸载时清理这些副效应，它允许 return 返回一个函数，在函数内做一些处理。实际使用中，由于副效应函数默认是每次渲染都会执行，所以清理函数不仅会在组件卸载时执行一次，每次副效应函数重新执行之前，也会执行一次，用来清理上一次渲染的副效应。

它的常见用途有下面几种：

- 获取数据（data fetching）
- 事件监听或订阅（setting up a subscription）
- 改变 DOM（changing the DOM）
- 输出日志（logging）

### 2.1 无参数
当 useEffect 无参数使用时，会侦听当前组件所有状态的变化，因此不带参数的 useEffect 函数中不能使用useState方法来改变state，否则会触发无限循环
```typescript
useEffect(() => { }) 
```

### 2.2 带参数
当 useEffect 带参数时，参数的变化才会触发 useEffect 的执行。此时可使用 useState
```typescript
useEffect(()=>{ setCount(count + 1) }, [isUpdate])
```

### 2.3 空参数
当 useEffect 传入空参数 [] 时，只有当第一次时执行。
```typescript
useEffect(()=>{ setCount(count + 1) }, []) 
```

## 3. useContext 和 createContext 使用，父子组件传递状态数据
createContext 能够创建组件间共享的上下文状态。然后通过 useContext 在组件中使用这些状态

### 3.1 createContext 用法
```typescript
// 只需要一个defaultValue默认值参数，可不填
const MyContext = React.createContext(defaultValue) 
```

### 3.2 useContext 示例
1） 创建一个全局 CountContext 共享计数器<br />2） 通过 CountContext.Provider 向子组件传递状态
```typescript
import { useState, createContext, useContext } from "react";

// 1. 创建一个全局 CountContext 共享计数器
const CountContext = createContext(0);

export function ExampleContext() {
  const [count, setCount] = useState(0);
  // 2. 通过 CountContext.Provider 向子组件传递状态
  return (
    <div>
      <h1>useContext </h1>
      <CountContext.Provider value={count}>
        <ExampleChild />
      </CountContext.Provider>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click me in Parent
      </button>
    </div>
  );
}

// 样例代码
function ExampleChild() {
  let count = useContext(CountContext);
  return (
    <div style={{ backgroundColor: "#ff0", padding: "24px" }}>
      <h3>ExampleChild: count in child {count}</h3>
    </div>
  );
}
```

## 4. useReducer使用说明
结合useContext 实现 Redux 组件间共享状态管理，React Hooks 的 useReducer + useContext 已经基本可以实现类似 Redux 的状态管理。<br />useReducer 是 useState 的替代方案。它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法。机制与 Redux 类似。

### 4.1 基本用法
在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。并且，使用 useReducer 还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递 dispatch 而不是回调函数 。
```typescript
const [state, dispatch] = useReducer(reducer, initialArg, init); 
```

### 4.2 useReducer 简单示例
下面这个示例，我们在一个对象中定义了两个计数器，通过传递不同的参数改变相应的值。当点击 :"Add IP" 时，countInfo 中的 IP/PV 值都加1，当点击 "Add PV"时，只有 pv 值加1。
```typescript
import { useReducer } from "react";

// 定义一个CountReducer
function CountReducer(state: { pv: number; ip: number; }, action: "pv" | "ip") {
  switch (action) {
    case "pv":
      return { ...state, ip: state.pv + 1 };
    case "ip":
      return { ...state, ip: state.ip + 1, pv: state.pv + 1 };
  }
  return state;
}

// 样例代码
export function ExampleReducer() {
  const [countInfo, dispatch] = useReducer(CountReducer, { ip: 0, pv: 0 });
  return (
    <div>
      <h1>useReducer: countInfo {JSON.stringify(countInfo)}</h1>
      <button onClick={() => dispatch("ip")}>Add IP</button>
      <button onClick={() => dispatch("pv")}>Add PV</button>
    </div>
  );
}
```

## 5. useReducer 结合useContext 实现 Redux 组件间共享状态管理
使用 useContext 创建的对象负责数据的管理，也即是数据的共享。而使用 useReducer 负责共享数据的更新，每一次数据更新会导致页面重新渲染。

限于篇幅就不放这部分代码了，思路如下：<br />1） 创建一个全局 UserContext 共享数据上下文<br />2） 通过 UserContext.Provider 向子组件传递状态<br />3） 使用 UserContext 获得 value 传入的对象，子组件获得带有数据的 store 和 dispatch

## 6. useMemo/useCallback使用，useEffect渲染生命周期执行顺序区别
useMemo ，【创建】一个依赖函数。当其中一个依赖项更改时， useMemo 重新计算记忆的值。而不需要在每个渲染进行昂贵的计算。

### 6.1 useMemo 


**useMemo作用**<br />useMemo 其实创建了一种数据缓存机制。比如登录页面需要向后台发送含用户名&密码的 ajax 请求，获取用户登录信息。useMemo 可以设置成只有当用户名密码改变后才向后台重新发送 ajax，而在组件重新渲染时使用缓存的用户信息。

**useMemo 与 useEffect 生命周期**<br />useMemo 与 useEffect 作用类似，都会在依赖值改变时重新执行，但 useMemo 有一个缓存的返回值。因此在组织渲染生命周期中，很自然地会把 useMemo 放到渲染 DOM 之前执行。<br />useMemo 在 DOM 渲染之前执行的，而 useEffect 则在 DOM 渲染之后执行： `useMemo => 渲染DOM => useEffect `

**useMemo 用法**
```typescript
import { useMemo } from "react";

let memoIp = useMemo(() => {
    return "useMemo ip here:" + Date.now();
  }, [ip]);

  return (
    <div>
      <h1>
        useMemoEffect: IP:{ip}, PV:{pv}
      </h1>
      <p>{memoIp}</p>
      <button
        onClick={() => {
          setIP(ip + 1);
        }}
      >
        Add IP
      </button>
      <button
        onClick={() => {
          setPV(pv + 1);
        }}
      >
        Add PV
      </button>
    </div>
  );
```

### 6.2 useCallback
useMemo 和 useCallback 接收的参数都是一样，都是在其依赖项发生变化后才执行，都是返回缓存的值，区别在于useMemo 返回的是函数运行的结果，useCallback 返回的是函数。

useCallback(fn, deps) 与 useMemo(() => fn, deps) 是等价的，相当于反函数存起来，由用户决定何时使用。

## 7. useRef 使用与 createRef 的区别
useRef：引用当前组件的DOM对象，返回一个引用了DOM的对象，返回的对象将在组件的整个生存期内持续存在。

**useRef 使用**
```typescript
import React, { useRef } from "react";

export function ExampleRef() {
  let inputRef = useRef();
  let setInputValue = function () {
    if(inputRef.current && inputRef.current.value ) {
      inputRef.current.value = "OurJS:" + Date.now();
    }
  };
  return (
    <div>
      <h1>useRef</h1> <input type="text" ref={inputRef} />
      <button onClick={setInputValue}>Set Value:useRef</button>
    </div>
  );
}
```


**与 createRef 区别**<br />createRef 每次渲染都会返回一个新的引用，而 useRef 每次都会返回相同的引用，因此你可以在 useRef 对象上存放缓存的值。

