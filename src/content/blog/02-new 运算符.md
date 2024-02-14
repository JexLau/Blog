---
title: 02-new 运算符
description: 1. new 运算符描述new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。它在运行的过程中，会进行如下的操作：创建一个空的简单 JS 对象（即{}）链接该对象（设置该对象的 constructor）到另一个对象 将步骤1新创建的对象作为 this 的上下文如果该函数...
pubDate: 2021-07-14T07:22:51.000Z
heroImage: https://cdn.nlark.com/yuque/0/2021/jpeg/1105483/1636909203152-f4e8c3b3-4ab4-4d31-9b9b-842e29614498.jpeg
---

# 1. new 运算符描述
**new 运算符**创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

它在运行的过程中，会进行如下的操作：

1. 创建一个空的简单 JS 对象（即{}）
2. 链接该对象（设置该对象的 constructor）到另一个对象 
3. 将步骤1新创建的对象作为 this 的上下文
4. 如果该函数没有返回对象，则返回 this

单看上面的描述比较抽象，我们可以尝试以代码翻译一下以上的操作步骤。

# 2. new 运算符模拟实现
分析：因为 new 的结果是一个新对象，所以在模拟实现的时候，也要建立一个新对象 obj，同时 obj 需要具有构造函数的属性，因此把 obj 的 __proto__ 指向构造函数的原型。如果要访问构造函数的属性，需要改变 this 上下文，使用apply，最后，如果该函数没有返回对象，返回 obj，否则返回构造函数的结果。
```javascript
// 先一本正经的创建一个构造函数，其实该函数与普通函数并无区别
var Person = function(name, age) {
    this.name = name;
    this.age = age;
    this.getName = function() {
        return this.name;
    }
}

// 将构造函数以参数形式传入
function New(Func) {
  // 1. 创建一个空的简单 JS 对象（即{}）
  var obj = {};
  if (Func.prototype !== null) {
  	// 2. 将实例原型指向构造函数的原型，这样 obj 就可以访问到构造函数原型中的属性
    obj.__proto__ = Func.prototype;
  }
  
  // 3. 将步骤1新创建的对象作为 this 的上下文
  // 使用 apply，改变构造函数 this 的指向到 obj，这样 obj 就可以访问到构造函数中的属性
  var ret = Func.apply(obj, Array.prototype.slice.call(arguments, 1));
  
  // 4. 当在构造函数中明确指定了返回对象时，那么 new 的执行结果就是该返回对象
  if ((typeof ret === "object" || typeof ret === "function") && ret !== null) {
    return ret;
  }
  
  // 4. 如果该函数没有返回对象，则默认返回 this （这个 obj 就是实例对象）
  return obj;
}

// 通过 New 声明创建实例，这里的 p1，实际接收的正是 new 中返回的对象
var p1 = New(Person, 'tom', 20);
console.log(p1.getName());

// 当然，这里也可以判断出实例的类型了
console.log(p1 instanceof Person); // true
```
![](https://cdn.nlark.com/yuque/0/2021/jpeg/1105483/1636909203152-f4e8c3b3-4ab4-4d31-9b9b-842e29614498.jpeg)

_参考资料：_

1. [前端基础进阶（十一）：详解面向对象、构造函数、原型与原型链](https://www.jianshu.com/p/15ac7393bc1f)
2. [JavaScript深入之new的模拟实现](https://github.com/mqyqingfeng/Blog/issues/13)
3. [new 运算符 -- MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)
