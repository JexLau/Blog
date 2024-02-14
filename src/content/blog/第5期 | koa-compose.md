---
title: 第5期 | koa-compose
description: 【若川】koa 洋葱模型实现：https://juejin.cn/post/7005375860509245471【函数式编程指北】：https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch5.htmlhttp...
pubDate: 2021-09-30T08:31:51.000Z
---

> 【若川】koa 洋葱模型实现：[https://juejin.cn/post/7005375860509245471](https://juejin.cn/post/7005375860509245471)
> 【函数式编程指北】：[https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch5.html](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch5.html)
> [https://www.yuque.com/docs/share/0268760e-60bf-4278-871e-c1e83a68be7a](https://www.yuque.com/docs/share/0268760e-60bf-4278-871e-c1e83a68be7a)


## 1. 前言
这周看的是 koa-compose 源码，虽然没用过 koa，但是用过 egg.js 的中间件，也实现过一个简易的 redux-middleware，对 compose 是有了解的。compose 不是实现中间件的必要实现，它是函数式编程的一种思想，主要作用是将多个函数结合在一起，  产生一个新的函数，那么我们来看看 koa-compose 利用 compose 做了什么。

## 2. 学习目标
看别人笔记的时候看到一句话，“源码其实并不难读，但怎么读，读什么，是想要读源码的人，最窘迫的问题”，深有同感。单单读源码可能是比较简单的，但要理解它为什么这么写，这么写的好处是什么，是比较难的。

我这一期的学习目标：<br />1）解读 koa-compose 源码，手写一个 compose<br />2）对比 compose 和 co 的实现

## 3. koa 中间件的使用
如果我们不了解一个东西，先学习它的使用方法，在实际工作中，我们开发 koa 中间件大概是这样的：
```javascript
// middleware/logger.js
module.exports = function () {
  return async function logger(ctx, next) {
    console.log("logger中间件开始执行")
    await next()
    console.log("logger中间件执行完毕")
  }
}

// middleware/date.js
module.exports = function () {
  return async function date(ctx, next) {
    console.log("date中间件开始执行")
    await next()
    console.log("date中间件执行完毕")
  }
}

// app.js
import loggerMiddleware from "../middleware/logger.js"
import dateMiddleware from "../middleware/date.js"
app.use(loggerMiddleware())
app.use(dateMiddleware())

// 运行起来后，控制台会输出：
// logger中间件开始执行
// date中间件开始执行
// date中间件执行完毕
// logger中间件开始执行
```
看完上面的输出，是不是觉得有点疑惑呢，为什么执行 loggerMiddleware 的时候不是一次性执行完整个函数，看起来像一段一段地执行。反正我第一次开发 egg.js 中间件的时候很懵逼，不知道中间件的执行顺序，为什么要写 await next()，如何在中间件执行完成之后做一些操作，虽然后面看文档解决了，但疑惑却挥之不去。那么让我们来看看 koa 中间件是如何实现上面例子的执行顺序吧。

## 4. 解读 koa-compose 
从源码实现的结构来看，compose 是一个闭包，它接收一个中间件函数数组，返回一个函数。这个函数接收 context, next 两个参数，返回一个 Promise。<br />在这个 dispatch 函数中，中间件从数组中取出并顺次执行，后面每调用一次 dispatch，index 会加 1。函数默认会执行 dispatch(0) ，这时从中间件数组 middleware 中取出第 0 个中间件并执行，同时将 dispatch(i+1) 作为 next 传递到下一次执行。
```javascript
function compose (middleware) {
  // 校验 middleware 是数组，且校验数组中的每一项是函数
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  return function (context, next) {
    let index = -1
    function dispatch (i) {
      // 一个函数不能多次调用
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      // 获取中间件函数
      let fn = middleware[i]
      // 如果是最后一个中间件
      if (i === middleware.length) fn = next
      // 最后一个中间件已经执行完毕，fn 是没有值的，所以直接 resolve
      if (!fn) return Promise.resolve()
      try {
        // fn(context, dispatch.bind(null, i + 1))，首先执行了 fn 函数，同时将 dispatch(i+1) 作为 next 传递到下一次执行
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return dispatch(0)
  }
}

```
`fn(context, dispatch.bind(null, i + 1))` 这句代码不容易看懂，我们可以结合上面的例子一起看看：
```javascript
// 以logger和date中间件为例
fn(context, dispatch.bind(null, i + 1))
// 第一次调用dispatch执行：
// 此时 fn 是 logger：
function logger(ctx, next) {
  console.log("logger中间件开始执行")
  // 此时next是什么，是 dispatch.bind(null, i + 1)
  // 第二次调用了 dispatch 函数，并使用bind把i+1传递给dispatch函数
  // 所以await next() 相当于执行第二个中间件date
  await next()
  // date中间件执行完毕结束之后再执行这句代码
  console.log("logger中间件执行完毕")
}

// 第二次调用dispatch执行：
function date(ctx, next) {
  console.log("date中间件开始执行")
  // 此时next是什么，也是 dispatch.bind(null, i + 1)
  // 但此时i=2, 继续执行dispatch，middleware[2]是undefind, 返回了Promise.resolve()
  // 所以这句代码实际上是 await Promise.resolve()
  await next()
  // 接着执行这句代码
  console.log("date中间件执行完毕")
}

```
如果看起来比较难懂的话，我们可以把 date 中间件嵌到 logger 中间件去看：
```javascript
logger(context, function next(){
  console.log("logger中间件开始执行")
  await Promise.resolve(
    date(context, function next(){
      console.log("date中间件开始执行")
      await Promise.resolve()
      console.log("date中间件执行完毕")
    })
  )
  console.log("logger中间件执行完毕")
})
```
看到这里，我们就不难懂得，为什么在开发 koa 中间件的时候需要写 await next() 了吧，它是串行执行下一个中间件的“开关”，如果不写就无法执行到下一个中间件了。

## 5. compose 解决了什么问题
看完了 koa-compose，心里美滋滋的。但不可否认的是，我们看源码的过程中经常会有这样的疑惑：为什么要这样写？读源码，到底读到什么程度才算读懂？这也是我每次写笔记定下学习目标的原因。

我们在工作中有时候会这样调用多层函数：
```javascript
function getId(id){
  // 一些处理
  return id
}

function getData(id){
  // 一些处理
  return data
}

function formatData(data){
  // 一些处理
  return formatdata
}

const result = formatData(getData(getId(5)))
```
这种方法实现中间件的串联执行也是可以的，其实就是我们拆解 koa-compose 最后的嵌套代码。这种写法既不优雅，健壮性也不好（比如发生错误的情况，需要在每一个函数里做catch）。为了解决函数多层调用的嵌套问题，我们需要用到函数合成 compose。

那么 compose 的就是将这三个函数组合起来：
```javascript
// 函数合成
const compose = function () {
  // TODO: 写一个compose
}
```





## 6. 对比 compose 和 co 的实现
待续...




## 7. 感想
待续...
