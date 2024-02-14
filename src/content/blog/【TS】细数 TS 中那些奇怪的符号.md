---
title: 【TS】细数 TS 中那些奇怪的符号
description: 文章：https://segmentfault.com/a/1190000023943952文章仅为记录学习所用1. ! 非空断言操作符在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 ! 可以用于断言操作对象是非 null 和非 undefined 类型。具体而言，x! 将从 ...
pubDate: 2021-08-14T14:44:51.000Z
---

> 文章：[https://segmentfault.com/a/1190000023943952](https://segmentfault.com/a/1190000023943952)
> 文章仅为记录学习所用


# 1. ! 非空断言操作符

在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 ! 可以用于断言操作对象是非 null 和非 undefined 类型。具体而言，**x! 将从 x 值域中排除 null 和 undefined** 。

下面我们先来看一下非空断言操作符的一些使用场景：

#### 1.1 忽略 undefined 和 null 类型
```javascript
function myFunc(maybeString: string | undefined | null) {
  // Type 'string | null | undefined' is not assignable to type 'string'.
  // Type 'undefined' is not assignable to type 'string'. 
  const onlyString: string = maybeString; // Error
  const ignoreUndefinedAndNull: string = maybeString!; // Ok
}
```

#### 1.2 调用函数时忽略 undefined 类型
```javascript
type NumGenerator = () => number;

function myFunc(numGenerator: NumGenerator | undefined) {
  // Object is possibly 'undefined'.(2532)
  // Cannot invoke an object which is possibly 'undefined'.(2722)
  const num1 = numGenerator(); // Error
  const num2 = numGenerator!(); //OK
}
```
因为 ! 非空断言操作符会从编译生成的 JavaScript 代码中移除，所以在实际使用的过程中，要特别注意。比如下面这个例子：
```javascript
const a: number | undefined = undefined;
const b: number = a!;
console.log(b); 
```
以上 TS 代码会编译生成以下 ES5 代码：
```javascript
"use strict";
const a = undefined;
const b = a;
console.log(b);
```
虽然在 TS 代码中，我们使用了非空断言，使得 const b: number = a!; 语句可以通过 TypeScript 类型检查器的检查。但在生成的 ES5 代码中，! 非空断言操作符被移除了，所以在浏览器中执行以上代码，在控制台会输出 undefined。

# 2. ?? 空值合并运算符
在 TypeScript 3.7 版本中除了引入了可选链 ?. 之外，也引入了一个新的逻辑运算符 —— 空值合并运算符 ??。**当左侧操作数为 null 或 undefined 时，其返回右侧的操作数，否则返回左侧的操作数**。<br />与逻辑或||运算符不同，逻辑或会在左操作数为 falsy 值时返回右侧操作数。也就是说，如果你使用 || 来为某些变量设置默认的值时，你可能会遇到意料之外的行为。比如为 falsy 值（''、NaN 或 0）时。

这里来看一个具体的例子：
```javascript
const foo = null ?? 'default string';
console.log(foo); // 输出："default string"

const baz = 0 ?? 42;
console.log(baz); // 输出：0
```
以上 TS 代码经过编译后，会生成以下 ES5 代码：
```javascript
"use strict";
var _a, _b;
var foo = (_a = null) !== null && _a !== void 0 ? _a : 'default string';
console.log(foo); // 输出："default string"

var baz = (_b = 0) !== null && _b !== void 0 ? _b : 42;
console.log(baz); // 输出：0
```
通过观察以上代码，我们更加直观的了解到，空值合并运算符是如何解决前面 || 运算符存在的潜在问题。

# 3. _ 数字分隔符
ypeScript 2.7 带来了对数字分隔符的支持，正如数值分隔符 ECMAScript 提案中所概述的那样。对于一个数字字面量，你现在可以通过把一个下划线作为它们之间的分隔符来分组数字：
```javascript
const inhabitantsOfMunich = 1_464_301;
const distanceEarthSunInKm = 149_600_000;
const fileSystemPermission = 0b111_111_000;
const bytes = 0b1111_10101011_11110000_00001101;
```
分隔符不会改变数值字面量的值，但逻辑分组使人们更容易一眼就能读懂数字。以上 TS 代码经过编译后，会生成以下 ES5 代码：
```javascript
"use strict";
var inhabitantsOfMunich = 1464301;
var distanceEarthSunInKm = 149600000;
var fileSystemPermission = 504;
var bytes = 262926349;
```

#### 使用限制：
只能在两个数字之间添加 _ 分隔符。<br />需要注意的是以下用于解析数字的函数是不支持分隔符：

- Number()
- parseInt()
- parseFloat()
