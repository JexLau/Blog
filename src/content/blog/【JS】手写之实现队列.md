---
title: 【JS】手写之实现队列
description: /**  * 像栈一样，队列（queue）也是表  * 使用队列时插入在一端进行而删除在另一端进行，遵守先进先出的规则  * 队列的基本操作是入队（enqueue）:它是在表的末端(队尾(rear)插入一个元素。出队（dequeue）:出队他是删除在表的开头（队头(front)）的元素。  *...
pubDate: 2021-07-23T07:00:33.000Z
---

```javascript
/**
 * 像栈一样，队列（queue）也是表
 * 使用队列时插入在一端进行而删除在另一端进行，遵守先进先出的规则
 * 队列的基本操作是入队（enqueue）:它是在表的末端(队尾(rear)插入一个元素。出队（dequeue）:出队他是删除在表的开头（队头(front)）的元素。
 */

this.clear = clear; //清空当前队列

class Queue {
  constructor() {
    /** 队列数据 */
    this.items = [];
  }

  /** 入队 */
  enqueue(element) {
    this.items.push(element);
  }

  /** 出队 */
  dequeue() {
    if (this.isEmpty) return "The Queue is empty";
    this.items.shift();
  }

  /** 查看队首元素 */
  get front() {
    if (this.isEmpty) return "The Queue is empty";
    return this.items[0];
  }

  /** 查看队尾元素 */
  get back() {
    if (this.isEmpty) return "The Queue is empty";
    return this.items[this.items.length - 1];
  }

  /** 显示队列所有元素 */
  get toString() {
    return this.items.join(",")
  }

  /** 判断当前队列是否为空 */
  get isEmpty() {
    return !this.items.length;
  }

  /** 清空当前队列 */
  clear() {
    this.items = []
  }
}


// 初始化一个队列
var queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.dequeue();
console.log(queue);
console.log(queue.isEmpty);
console.log(queue.toString);

```
