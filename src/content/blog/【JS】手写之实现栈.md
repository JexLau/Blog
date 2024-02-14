---
title: 【JS】手写之实现栈
description: /**  * 栈模型  * 栈（stack）是限制插入和删除只能在一个位置上进行的表  * 该位置是表的末端叫做栈的顶（top）  * 对栈的基本操作有 push 进栈和 pop 出栈，前者相当于插入，后者则是删除最后插入的元素  */ class Stack {   constructor(...
pubDate: 2021-07-23T06:59:24.000Z
---

```javascript
/**
 * 栈模型
 * 栈（stack）是限制插入和删除只能在一个位置上进行的表
 * 该位置是表的末端叫做栈的顶（top）
 * 对栈的基本操作有 push 进栈和 pop 出栈，前者相当于插入，后者则是删除最后插入的元素
 */
class Stack {
  constructor() {
    /** 栈数据 */
    this.items = [];
    /** 记录栈顶位置 */
    this.top = 0;
  }

  /** 进栈 */
  push(element) {
    this.items[this.top++] = element;
  }

  /** 出栈 */
  pop() {
    return this.items[--this.top];
  }

  /** 查看栈顶元素 */
  peek() {
    if (this.isEmpty) return "Empty";
    return this.dataStore[this.top - 1];
  }

  /** 返回栈内元素总数 */
  get length() {
    return this.items.length;
  }

  /** 判断是否空栈 */
  get isEmpty() {
    return !this.items.length;
  }

  /** 清除栈 */
  clear() {
    this.items = [];
  }
}

// 初始化一个栈
var stack = new Stack();
stack.push(1);
stack.push(2);
stack.pop();
stack.push(4);
console.log(stack);
console.log(stack.isEmpty);
console.log(stack.length);

```
