---
title: 06-JS 函数中的 this 指向
description: JS 中的 this 代表的是当前行为执行的主体。JS 中的 context 代表的是当前行为执行的环境(作用域)。this 指向和函数定义和执行环境都没有任何的关系，只与执行者(调用者)有关系。如何判断 this 指向函数执行，先看函数名前是否有"."，如果有，this 的指向就是"."前面...
pubDate: 2021-11-22T07:54:33.000Z
---

JS 中的 this 代表的是**当前行为执行的主体**。JS 中的 context 代表的是当前行为执行的环境(作用域)。

this 指向和函数定义和执行环境都没有任何的关系，只与执行者(调用者)有关系。


# 如何判断 this 指向

1. 函数执行，先看函数名前是否有"."，如果有，this 的指向就是"."前面的调用者，如果没有，this 的指向就是 window。
```javascript
function fn() {
  console.log(this)
}
var obj = {fn: fn}

fn() // this -> window
obj.fn() // this -> obj


function sum() {
  fn();
}
sum() // this -> window，fn()前面没有调用者，所以是window，跟在哪执行没有关系

var oo = {
  sum: function() {
    fn();
  }
}
oo.sum(); // this -> window，解释同上
```

2. 自执行函数中的 this 永远是 window
3. 给元素的某个事件绑定方法，当事件触发时，执行对应的方法，方法中的 this 指向当前的元素
```javascript
// html
<div id="div1">点我</div>

// js
function fn() {
  console.log(this)
}
// fn中的this指向的是#div1
document.getElementById("div1").onclick = fn;
```

# 练习题
```javascript
var num = 20;
var obj = {
  num: 30,
  fn: (function (num) {
    this.num *= 3;
    num += 15;
    var num = 45;
    return function () {
      this.num *= 4;
      num += 20;
      console.log(num);
    }
  })(num)
};

var fn = obj.fn;
fn();
obj.fn();
```
