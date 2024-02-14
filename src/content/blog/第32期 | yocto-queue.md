---
title: 第32期 | yocto-queue
description: 1. 源码简介yocto-queue在上一期 p-limit 里用被引用到，粗略理解是封装的一个队列数据结构的包，队列是种数据结构，遵循先进先出原则。官方简介：Tiny queue data structure。官方提示了一句，You should use this package inste...
pubDate: 2022-05-05T06:28:42.000Z
---

## 1. 源码简介
yocto-queue在上一期 p-limit 里用被引用到，粗略理解是封装的一个队列数据结构的包，队列是种数据结构，遵循先进先出原则。<br />官方简介：Tiny queue data structure。<br />官方提示了一句，You should use this package instead of an array if you do a lot of Array#push() and Array#shift() on large arrays, since Array#shift() has linear time complexity O(n) while Queue#dequeue() has constant time complexity O(1). That makes a huge difference for large arrays.<br />意思是，如果你在一个大型数组上操作数据，请考虑使用这个包，而不是Array函数，因为Array操作时间复杂度为O(n)，但队列的时间复杂度为O(1)， That makes a huge difference for large arrays。😀

## 2. 测试用例
先介绍一下队列queue的几个API：

- enqueue(value)   入队
- dequeue()             出队
- clear()                     清除队列
- size                          队列大小

测试用例也不多，来看看。

- .enqueue()，测试进队。（非常通俗易懂）
```javascript
test('.enqueue()', t => {
	const queue = new Queue();
	queue.enqueue('🦄');
	t.is(queue.dequeue(), '🦄');
	queue.enqueue('🌈');
	queue.enqueue('❤️');
	t.is(queue.dequeue(), '🌈');
	t.is(queue.dequeue(), '❤️');
});
```

- .dequeue()，测试出队，这里还测试了队列没有值的情况。
```javascript
test('.dequeue()', t => {
	const queue = new Queue();
	t.is(queue.dequeue(), undefined);
	t.is(queue.dequeue(), undefined);
	queue.enqueue('🦄');
	t.is(queue.dequeue(), '🦄');
	t.is(queue.dequeue(), undefined);
});
```

- clear()，清除队列。测试了队列没有值，队列存在一个值，队列存在多个值的清除情况。
```javascript
test('.clear()', t => {
	const queue = new Queue();
	queue.clear();
	queue.enqueue(1);
	queue.clear();
	t.is(queue.size, 0);
	queue.enqueue(1);
	queue.enqueue(2);
	queue.enqueue(3);
	queue.clear();
	t.is(queue.size, 0);
});
```

- size，测试队列长度，测试了队列空值，清除队列后，执行入队操作，执行出队操作等边界情况。
- iterable，
```javascript
test('iterable', t => {
	const queue = new Queue();
	queue.enqueue('🦄');
	queue.enqueue('🌈');
	t.deepEqual([...queue], ['🦄', '🌈']);
});
```

## 3. 源码简解
```javascript
// 创建Node节点
class Node {
  // 值
	value;
  // next指针
	next;
	constructor(value) {
		this.value = value;
	}
}
export default class Queue {
  // 头指针指向的Node
	#head;
  // 尾指针指向的Node
	#tail;
  // 队列长度
	#size;

	constructor() {
    // 先初始化一个空的队列
		this.clear();
	}
  // 入队操作
	enqueue(value) {
    // 把value转换成Node节点
		const node = new Node(value);
    // 如果头指针节点存在的话
		if (this.#head) {
      // 把尾指针节点的next指向当前的node, #tail.next -> node, #tail -> node
			this.#tail.next = node;
			this.#tail = node;
		} else {
      // 第一个值，#head -> node, #tail -> node
			this.#head = node;
			this.#tail = node;
		}
    // 长度+1
		this.#size++;
	}
  // 出队操作
	dequeue() {
    // 把头出掉
		const current = this.#head;
    // 简单判空处理
		if (!current) {
			return;
		}
    // #head -> #head.next, 移动一下指针
		this.#head = this.#head.next;
    // 长度-1
		this.#size--;
    // 返回这个出队的值
		return current.value;
	}
  // 清除队列，也就是初始化
	clear() {
		this.#head = undefined;
		this.#tail = undefined;
		this.#size = 0;
	}
  // 获取size
	get size() {
		return this.#size;
	}
  // 这里什么时候会被调用呢？是当进入for...of，就会进入Symbol.iterator这个方法。
  // 如果没找到，就会报错，像数组，对象都是有内置该方法。
  // 该方法必须返回一个迭代器，一个有next方法的对象。
  // *号代表生成器，调用生成器函数会产生一个Generator的迭代器对象。
  // 通过调用生成器函数的next()，generator函数将执行，直到遇到yield关键字。
	* [Symbol.iterator]() {
    // 从头开始迭代
		let current = this.#head;
    // 循环取值
		while (current) {
      // 遇到yield，return值
			yield current.value;
      // next给当前current，往下迭代
			current = current.next;
		}
	}
}

```

## 4. 总结
重新学习生成器和迭代器的概念，这个源码可以多写一写，常温习。
