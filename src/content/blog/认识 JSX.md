---
title: 认识 JSX
description: 我们写的 JSX 终将变成什么首先了解 React.createElement 做了什么：第一个参数：如果是组件类型，会传入组件对应的类或函数；如果是 dom 元素类型，传入 div 或者 span 之类的字符串。第二个参数：一个对象，在 dom 类型中为标签属性，在组件类型中为 props ...
pubDate: 2021-07-13T00:37:03.000Z
---

**我们写的 JSX 终将变成什么**

首先了解 React.createElement 做了什么：<br />第一个参数：如果是组件类型，会传入组件对应的类或函数；如果是 dom 元素类型，传入 div 或者 span 之类的字符串。<br />第二个参数：一个对象，在 dom 类型中为标签属性，在组件类型中为 props 。<br />其他参数：依次为 children，根据顺序排列。
```javascript
React.createElement(
  type,
  [props],
  [...children]
)
```
举个例子：
```javascript
<div style={{ marginTop:'100px' }}>
   <TextComponent />
   <div>hello, world</div>
   let us learn React!
</div>
```
上面的代码会被 babel 先编译成：
```javascript
React.createElement("div", {style: {marginTop:'100px'}}, 
  React.createElement(TextComponent, null),
  React.createElement("div", null, "hello, world"),
  "let us learn React!"
)
```
