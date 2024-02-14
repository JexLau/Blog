---
title: 箭头函数没有自己的arguments
description: 来源：https://segmentfault.com/q/1010000022457622箭头函数不是没有 arguments ，而是没有自己的 arguments ，自己的这个限定语很重要。function foo() {    setTimeout(() => {       conso...
pubDate: 2022-05-25T02:49:53.000Z
---

> 来源：[https://segmentfault.com/q/1010000022457622](https://segmentfault.com/q/1010000022457622)

箭头函数不是没有 arguments ，而是没有自己的 arguments ，自己的这个限定语很重要。
```javascript
function foo() {
   setTimeout(() => {
      console.log("args:", arguments);
   }, 1);
}

foo(1, 2, 3, 4);
```
你会在箭头函数里得到 args: [1, 2, 3, 4]，它来自于其父作用域。并且连 this、super、new.target 都没有自己的，全都来自父作用域。
