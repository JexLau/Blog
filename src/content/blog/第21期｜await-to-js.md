---
title: 第21期｜await-to-js
description: 1. 源码简介await-to-js 可谓久仰大名了，但没有用过。官方简介其功能为：Async await wrapper for easy error handing，我大概理解为 async await 的一个错误包装器。相信不少人面试被问到过，怎么捕获async await的错误吧，我第...
pubDate: 2022-04-27T17:33:08.000Z
---

## 1. 源码简介
await-to-js 可谓久仰大名了，但没有用过。官方简介其功能为：Async await wrapper for easy error handing，我大概理解为 async await 的一个错误包装器。相信不少人面试被问到过，怎么捕获async await的错误吧，我第一反应就是catch。让我们来看看await-to-js是怎么做的吧。


## 2. 查看测试用例，理解其用法
这里不贴代码了，减少一点篇幅：[https://github.com/scopsy/await-to-js/blob/master/test/await-to-js.test.ts](https://github.com/scopsy/await-to-js/blob/master/test/await-to-js.test.ts)

官方给出了四个测试用例：

- should return a value when resolved

正常resolved时err应该为null，data正常返回。

- should return an error when promise is rejected'

正常rejected时err应该有返回，data应该为undefined

- should add external properties to the error object

可以给error添加额外的返回值

- should receive the type of the parent if no type was passed

一开始看不懂，看了源码后发现指的是类型。如果没有给to<T>指定类型，默认返回值类型。


## 3. 源码
```javascript
/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export function to<T, U = Error> (
  promise: Promise<T>,
  errorExt?: object
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [parsedError, undefined];
      }

      return [err, undefined];
    });
}

```
它的用法是：<br />const [err, data] = await to(promise);

原来的用法是：<br />const data = await promise().catch(err => console.log(err))

我的感受就是将catch后面那段小尾巴，放到前面来了，使得语法更简单，更容易明白。技巧方面值得学习，虽然目前在大部分业务中可能用不到这个库(一般在请求函数catch了)，但在写小工具的时候感觉还是非常nice的。

类型也值得学习，这个方法适合新手练习TS语法。

终于写完了，感谢年年又让我水了一篇。
