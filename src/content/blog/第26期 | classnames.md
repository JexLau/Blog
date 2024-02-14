---
title: 第26期 | classnames
description: 1. 源码简介官方简介：A simple JavaScript utility for conditionally joining classNames together.我理解为是一个动态将class name连接起来的库。（注意：它不是react官方的那个className属性）该clas...
pubDate: 2022-04-28T04:57:44.000Z
---

## 1. 源码简介
官方简介：A simple JavaScript utility for conditionally joining classNames together.<br />我理解为是一个动态将class name连接起来的库。（注意：它不是react官方的那个className属性）

该classNames函数接受任意数量的参数，可以是字符串或对象，基础用法如下：
```typescript
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'
```

## 2. 学习目标

- 学会 classnames 的用法
- 学会 classnames 的原理
- 关注测试用例

因为最近在学习写测试用例，所以主要关注这方面，所以测试用例的篇幅会长一点：[https://github.com/JedWatson/classnames/tree/master/tests](https://github.com/JedWatson/classnames/tree/master/tests)

## 3. 测试用例
测试用例主要有三个文件，index, dedupe, bind，下面这个篇幅可以跳过，就是把测试用例看一遍。看完了感受是，设计测试用例也不容易啊，用户行为防不胜防。也由此可见，写好一个库经常需要校验用户传参的类型。如果看文档比较迷惑，看源码比较困难，也可以选择简单看看测试用例，可以知道是如何使用的。

### index.js

- keeps object keys with truthy values：传入的是object，只返回"真值"的key
```javascript
assert.equal(classNames({
  a: true,
  b: false,
  c: 0,
  d: null,
  e: undefined,
  f: 1
}), 'a f');
```

- joins arrays of class names and ignore falsy values：传入一组数据，会忽略假值
```javascript
assert.equal(classNames('a', 0, null, undefined, true, 1, 'b'), 'a 1 b');
```

- supports heterogenous arguments：支持不同类型的参数一起传参
```javascript
assert.equal(classNames({a: true}, 'b', 0), 'a b');
```

- should be trimmed：去除空值
```javascript
assert.equal(classNames('', 'b', {}, ''), 'b');
```

- returns an empty string for an empty configuration：如果是个空配置，返回空字符串
```javascript
assert.equal(classNames({}), '');
```

- supports an array of class names：支持数组传参
```javascript
assert.equal(classNames(['a', 'b']), 'a b');
```

- joins array arguments with string arguments：支持数组+字符串传参
```javascript
assert.equal(classNames(['a', 'b'], 'c'), 'a b c');
assert.equal(classNames('c', ['a', 'b']), 'c a b');
```

- handles multiple array arguments：支持多个数组传参
- handles arrays that include falsy and true values：过滤数组内的真值和假值
- handles arrays that include arrays：支持多维数组传参
- handles arrays that include objects：支持数组对象传参
- handles deep array recursion：支持多维数组+数组对象传参
- handles arrays that are empty：过滤空数组
- handles nested arrays that have empty nested arrays：处理嵌套空数组
- handles all types of truthy and falsy property values as expected：按照预期处理所有类型的真值和假值
- handles toString() method defined on object：处理定义在属性上的toString方法
```javascript
assert.equal(classNames({
  toString: function () { return 'classFromMethod'; }
}), 'classFromMethod');
```

- handles toString() method defined inherited in object：处理对象中继承的toString方法。
```javascript
var Class1 = function() {};
var Class2 = function() {};
Class1.prototype.toString = function() { return 'classFromMethod'; }
Class2.prototype = Object.create(Class1.prototype);

assert.equal(classNames(new Class2()), 'classFromMethod');
```

### dedupe.js
这个脚本的测试用例是去重的，简单看一下

- should dedupe dedupe：应该进行重复数据处理
```javascript
assert.equal(dedupe('foo', 'bar', 'foo', 'bar', { foo: true }), 'foo bar');
```

- should make sure subsequent objects can remove/add classes：同一个类名，可以增加/删除
```javascript
assert.equal(dedupe('foo', { foo: false }, { foo: true, bar: true }), 'foo bar');
```
下面的就不展开了，和index.js套路差不多，下一个bind.js。

### bind.js
这个脚本的测试用例是给className绑定的值做映射的，还挺有意思，可惜我没有用过这个库，不知道classNameBound的适用场景在哪。<br />这是前提，意思就是classNames.bind(cssModulesMock)，绑定了cssModulesMock
```javascript
var cssModulesMock = {
	a: "#a",
	b: "#b",
	c: "#c",
	d: "#d",
	e: "#e",
	f: "#f"
};

var classNamesBound = classNames.bind(cssModulesMock);
```

- keeps object keys with truthy values，也是返回真值，和className不同的是，它返回的不是a 和 f，而是#a 和 #f，这可能是因为上面使用了bind，做了一层映射，一会可以看看源码怎么弄的。
```javascript
assert.equal(classNamesBound({
  a: true,
  b: false,
  c: 0,
  d: null,
  e: undefined,
  f: 1
}), '#a #f');
```

- keeps class names undefined in bound hash：有映射的映射，没有的就保留它的类名。
```javascript
assert.equal(classNamesBound({
  a: true,
  b: false,
  c: 0,
  d: null,
  e: undefined,
  f: 1,
  x: true,
  y: null,
  z: 1
}), '#a #f x z');
```
其他的就略过了，也是和index.js大同小异，就是多加了一层映射。

## 4. 源码
很短，50行代码。在看源码之前有一个大致流程，获取参数，对参数的各种类型解析，输出结果。<br />看了源码之后，脑子：我会了，手：你不会。<br />首先一个for循环遍历入参，如果 !arg 当前项为 false 假值，直接跳出当前循环，进入下一个循环；<br />如果arg是string | number，直接push；<br />如果arg是array，这里用到了递归 classNames.apply(null, arg)，如果递归回来的结果不是空的，就push；达到一个拍平的效果。<br />如果arg是object，先判断一下object上的toString有没有被修改，如果没有，迭代遍历object，判断只有当前属性是自身上的+对应的值的结果为真，就push(key)；如果被修改了，直接push这个属性的toString()返回的结果。<br />最后把结果数组classes转换成字符串 classes.join(' ')。

### index.js
```javascript
(function () {
	'use strict';
	var hasOwn = {}.hasOwnProperty;
	function classNames() {
		var classes = [];
		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;
			var argType = typeof arg;
			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString === Object.prototype.toString) {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				} else {
					classes.push(arg.toString());
				}
			}
		}
		return classes.join(' ');
	}
  
  // COMMON JS
	if (typeof module !== 'undefined' && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
    // AMD
		define('classnames', [], function () {
			return classNames;
		});
	} else {
    // 浏览器
		window.classNames = classNames;
	}
}());
```

### dedupe.js
看了一下大致是利用object key唯一性去做去重的。但源码内部实现，变量指向写得有点乱，就没细看了。

### bind.js
逻辑和上面的基本一直，只是push的时候是：classes.push(this && this[key] || key); 结合上面的测试用例一起看，var classNamesBound = classNames.bind(cssModulesMock);<br />意思就是，绑定this，且this[key]存在，则取this[key]，否则取key。可以结合【keeps class names undefined in bound hash】这个用例一起理解。

## 5. 感受
写好一个库真难。
