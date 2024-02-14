---
title: 第25期 | underscore/debounce
description: 参考文章：【NewName】https://juejin.cn/post/7091455593340207134这一期源码跟着underscore学防抖。debounce防抖函数 debounce 指的是某个函数在某段时间内，无论触发了多少次回调，都只执行最后一次。实现原理防抖的处理可以通过s...
pubDate: 2022-05-11T12:33:49.000Z
---

> 参考文章：【NewName】[https://juejin.cn/post/7091455593340207134](https://juejin.cn/post/7091455593340207134)

这一期源码跟着underscore学防抖。

## debounce
防抖函数 debounce 指的是某个函数在某段时间内，无论触发了多少次回调，都只执行最后一次。

## 实现原理
防抖的处理可以通过setTimeout来指定一定时间后执行处理函数，如果在这之前事件再次触发，则清空计时器，重新计时，计时结束后触发函数执行。<br />基础版本的实现：
```javascript
debounce(fn, delay = 300) {
  let timer;
  return function () {
    const args = arguments;
    if (timer) {
      // 清空计时器，重新计时
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // 改变this指向为调用debounce所指的对象
      fn.apply(this, args);
    }, delay);
  };
}
```
使用：
```javascript
window.addEventListener(
  "scroll",
  debounce(() => {
    console.log(111);
  }, 1000)
);
```

## underscore 源码实现
写的功能比较全面，在实现的基础上，还包含了立刻执行，立刻执行时有返回值，取消防抖的功能。

1. 先定位入口函数「debounced」，如果不存在定时器timeout，开始计时，调用later计算计时；
2. 判断是否需要立刻执行，是 -> 立刻调用
3. 计时流程：计算经过的时间，与wait比较，如果延时未结束，继续延时，且修改延时的时间；如果延时结束，执行函数（非立刻调用情况），释放 args 和 context 变量（防止内存泄漏）。
```javascript
export default function debounce(func, wait, immediate) {
  // timeout定时器 previous当前时间
  var timeout, previous, args, result, context;
  // later的作用类似于 if (timer) clearTimeout(timer);
  var later = function() {
    var passed = now() - previous;
    // 当需要等待的时间 > 经过的时间，延时未结束，继续延时。
    if (wait > passed) {
      // 递归地重新计时，但延时的时长改为 wait - passed，也就是剩余需要等待的时间
      timeout = setTimeout(later, wait - passed);
    } else {
      timeout = null;
      // 执行函数（非立刻执行的情况下）
      if (!immediate) result = func.apply(context, args);
      // This check is needed because `func` can recursively invoke `debounced`.
      if (!timeout) args = context = null;
    }
  };
  // restArguments 类似于 es6的「...rest」
  var debounced = restArguments(function(_args) {
    context = this;
    args = _args;
    previous = now();
    if (!timeout) {
      // 开始计时
      timeout = setTimeout(later, wait);
      // 判断是否立刻调用
      if (immediate) result = func.apply(context, args);
    }
    return result;
  });
  // 取消防抖，清除定时器
  debounced.cancel = function() {
    clearTimeout(timeout);
    timeout = args = context = null;
  };

  return debounced;
}
```

## 总结
underscore实现的功能很完善，可以多学习，手写多几遍，把功能实现都掌握的话，面试很加分。

使用闭包要注意内存泄漏问题。
