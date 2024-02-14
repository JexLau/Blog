---
title: bind call apply 详解+手写
description: 参考链接：http://www.ruanyifeng.com/blog/2018/06/javascript-this.htmlhttps://segmentfault.com/a/1190000020013532https://juejin.cn/post/69687132838849740...
pubDate: 2022-07-28T05:04:44.000Z
---

> 参考链接：
> [JavaScript 的 this 原理 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2018/06/javascript-this.html)
> [js函数this理解？手写apply、call、bind就够了](https://segmentfault.com/a/1190000020013532)
> [最全的手写JS面试题 - 掘金](https://juejin.cn/post/6968713283884974088#heading-9)

在手写之前，最好先了解为什么会出现这个需要改变this指向的场景，以及 bind, call, apply 的作用和它们的区别。

## this 是什么
它是函数内部的属性，是函数执行的环境对象，也就是是函数的 this 会指向函数的执行环境。

## this 指向哪里
函数的 this 关键字在 JavaScript 中的表现略有不同，此外，在严格模式和非严格模式之间也会有一些差别。

大致指向总结可以分为以下几种情况（非严格模式）：

1. 函数作为全局环境调用时
```javascript
// 非严格模式 var 声明才会挂在window上，let, const声明不会
var name = "global"; // 相当于 window.name = "global"

function a() {
  return this.name
}

// 此处是在window全局环境中调用a函数，所以内部的this指向window
a() === "global";
```

2. 函数作为对象方法调用时
```javascript
var obj = {
  name: "obj",
  sayName: function(){
    return this.name
  }
}
// 此处调用者是obj，this指向obj内部
obj.sayName() === "obj" // true

// 稍微改动一下，添加下面代码：
var sayName = obj.sayName;
// 此时调用者是window，所以false
sayName() === "obj" // false
```

3. 函数作为dom节点事件调用时
```javascript
var container3 = document.getElementById('container3')

container3.onclick = function(){
  // 指向节点本身
  console.log(this) // <div id="container3">container3</div>
}
```

4. 作为构造函数实力化方法时
```javascript
function A(name){
  this.name = name;
  this.sayName = function(){
    // 指向实例对象
    console.log(this.name)
  }
}
var a = new A('aa');
a.sayName(); // aa
```

5. 箭头函数里的this
```javascript
var name = 'window'
var obj = {
  name:'obj',
  fn: function(){    
    (function (){
      console.log(this.name)
    })()
  }    
}
// 普通函数，由于闭包函数是window执行的，所以this指向window
obj.fn() // window

// 箭头函数的this指向函数创建时的作用域
var obj2 = {
  name:'obj',
  fn: function(){    
    (()=>{ //改成箭头函数
      console.log(this.name)
    })()
  }    
}
obj2.fn()
```

## this指向怎么改
众所周知，引用类型在内存中储存的是对象的内存地址，那么作为函数，它有可能在不同的环境(上下文)被执行。当在函数体内部，引用当前环境的其他变量时，函数需要获取当前的运行环境(context)，所以，this 出现了，它设计的目的就是在函数体内部，代指函数当前的运行环境。

那为什么需要改变 this 指向？也好理解，比如上面例子2的场景，如果调用对象被赋值后调用没有绑定 this，那么它原本的指向将会变成window(或者其他调用环境)，这时候就需要绑定this的指向了，用到call，bind，apply。

以上面的例子2为例：
```javascript
var obj = {
  name: "obj",
  sayName: function(){
    return this.name
  }
}

// bind
var sayNameBind = obj.sayName;
var sayNameCall = obj.sayName;
var sayNameApply = obj.sayName;

console.log(sayNameBind.bind(obj)() === "obj") // true
console.log(sayNameCall.call(obj) === "obj") // true
console.log(sayNameApply.apply(obj) === "obj") // true
```

## bind, call, apply 语法和区别
> mdn: [Function.prototype.apply() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

**apply：fn.apply(thisObj, 数组参数）**<br />定义：应用某一个对象的一个方法，用另一个对象替换当前对象<br />说明：如果参数不是数组类型的，则会报一个TypeError错误。

**call：fn.call(thisObj, arg1, arg2, argN)**<br />apply与call的唯一区别就是接收参数的格式不同。

**bind：fn.bind(thisObj, arg1, arg2, argN)**<br />bind()方法创建一个新的函数，在bind()被调用时，这个新函数的this被bind的第一个参数指定，其余的参数将作为新函数的参数供调用时使用。

**区别**<br />call、bind 和 apply 的第一个参数都是要改变上下文的对象<br />call、bind 从第二个参数开始以参数列表的形式展现，apply 第二个参数是数组参数；<br />call、apply改变了函数的this上下文后便**立刻执行**该函数，bind 则是返回改变了上下文后的一个函数；

## 手写
apply
```javascript
Function.prototype.myApply= function(context, args = []){
  // 1. 限制参数类型为数组
  if(!Array.isArray(args)) throw new Error('apply的第二个参数必须是数组') 
  if (!context || context === null) context = window;
  
  // 创造唯一的key值  作为我们构造的context内部方法名
  const fn = Symbol();
  // 2.将函数挂载到传入的对象
  context[fn] = this;
  
  // 3.执行对象的方法
  return context[fn](...args);
}

// Test:
var obj = {
  name: "obj",
  sayName: function(params){
    return this.name + params
  }
}

var sayNameApply = obj.sayName;

console.log(sayNameApply.myApply(obj, ["test"]) === "objtest") // true
```

call，与apply的唯一区别就是参数格式不同
```javascript
Function.prototype.myCall= function(context, ...args){
  if (!context || context === null) context = window;
  
  // 创造唯一的key值  作为我们构造的context内部方法名
  const fn = Symbol();
  // 2.将函数挂载到传入的对象
  context[fn] = this;
  
  // 3.执行对象的方法
  return context[fn](args);
}

// Test:
var obj = {
  name: "obj",
  sayName: function(params){
    return this.name + params
  }
}

var sayNameCall = obj.sayName;

console.log(sayNameCall.myCall(obj, "test") === "objtest") // true
```

bind
```javascript
Function.prototype.myBind = function (context, ...args) {
  if (!context || context === null) {
    context = window;
  }
  const fn = Symbol();
  context[fn] = this;
  
  let _this = this;
  const result = function (...innerArgs) {
    if (this instanceof _this === true) {
      // 此时this指向指向result的实例  这时候不需要改变this指向
      this[fn] = _this;
      return this[fn](...[...args, ...innerArgs]);
    } else {
      // 如果只是作为普通函数调用  那就很简单了 直接改变this指向为传入的context
      return context[fn](...[...args, ...innerArgs]);
    }
  };
  // 如果绑定的是构造函数 那么需要继承构造函数原型属性和方法
  // 实现继承的方式: 使用Object.create
  result.prototype = Object.create(this.prototype);
  return result;
};

// Test:
var obj = {
  name: "obj",
  sayName: function(params){
    return this.name + params
  }
}
var sayNameBind = obj.sayName;
console.log(sayNameBind.myBind(obj, "test")()) // true

```
