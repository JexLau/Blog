---
title: 【JS】文件模块化规范类型辨析
description: 大部分转载于【浪里行舟】https://juejin.cn/post/6844903744518389768问题背景在开发中导入模块经常使用 require 和 import，导出模块使用 module.exports/exports 或 export/export default，有时候引用...
pubDate: 2021-07-27T02:45:44.000Z
---

> 大部分转载于【浪里行舟】[https://juejin.cn/post/6844903744518389768](https://juejin.cn/post/6844903744518389768)


## 问题背景
在开发中导入模块经常使用 require 和 import，导出模块使用 module.exports/exports 或 export/export default，有时候引用一个模块可以使用 require 也可以使用 import，它们是如何使用的，有什么区别呢？

## JS 模块化规范
> 模块化规范：即为 JavaScript 文件提供一种模块编写、模块依赖和模块运行的方案，目的是降低代码复杂度，降低各模块之间的依赖。


### 1. CommonJS

#### 概述
Node 应用由模块组成，采用 CommonJS 模块规范。每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。**在服务端，模块的加载是运行时同步加载的；在浏览器端，模块需要提前编译打包处理。**


#### 基本语法

- 定义暴露模块：module.exports = value 或 exports.xxx = value
- 引入模块：require("xxx")


#### 特点

- 所有代码都运行在模块作用域，不会污染全局作用域。
- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被**缓存**了。要想让模块再次运行，必须清除缓存。
- 模块加载的顺序，按照其在代码中出现的顺序。

require命令用于加载模块文件。require命令的基本功能是，读入并执行一个JavaScript文件，然后返回该模块的exports对象。如果没有发现指定模块，会报错。


#### 模块的加载机制
CommonJS 模块的加载机制是，**输入的是被输出的值的拷贝**。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。这点与ES6模块化有重大差异。


#### 服务端和浏览器端的使用
服务端使用：直接使用 require 命令即可。<br />浏览器端使用：需要借助一些打包工具（例如 Browserify）编译处理 js，再引入到浏览器环境中。

### 2. AMD

#### 概述
CommonJS 规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。AMD 规范则是非同步加载模块，允许指定回调函数。由于 Node.js 主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以 CommonJS 规范比较适用。但是，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用 AMD 规范。此外 AMD 规范比CommonJS 规范在浏览器端实现要来着早。


#### 基本语法

- 定义暴露模块
```json
// 定义没有依赖的模块
define(function(){
   return 模块
})

// 定义有依赖的模块
define(['module1', 'module2'], function(m1, m2){
   return 模块
})
```

- 引入模块
```json
require(['module1', 'module2'], function(m1, m2){
   // 使用 module1/module2
})
```

#### 特点
AMD 模块定义的方法非常清晰，不会污染全局环境，能够清楚地显示依赖关系。AMD 模式可以用于浏览器环境，并且允许非同步加载模块，也可以根据需要动态加载模块。<br />实现的形式是RequireJS，它是一个工具库，主要用于客户端的模块管理。它的模块管理遵守 AMD 规范，RequireJS 的基本思想是，通过 define 方法，将代码定义为模块；通过 require 方法，实现代码的模块加载。

### 3. CMD

#### 概述
CMD 规范专门用于**浏览器端**，模块的加载是异步的，模块使用时才会加载执行。CMD 规范整合了 CommonJS 和AMD 规范的特点。在 Sea.js 中，所有 JavaScript 模块都遵循 CMD模块定义规范。


#### 基本语法

- 定义暴露模块
```json
// 定义没有依赖的模块
define(function(require, exports, module){
  exports.xxx = value
  module.exports = value
})
// 定义有依赖的模块
define(function(require, exports, module){
  //引入依赖模块(同步)
  var module2 = require('./module2')
  //引入依赖模块(异步)
    require.async('./module3', function (m3) {
    })
  //暴露模块
  exports.xxx = value
})
```

- 引入模块
```json
define(function (require) {
  var m1 = require('./module1')
  var m4 = require('./module4')
  m1.show()
  m4.show()
})
```

### 4. ES6模块化

#### 概述
ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。


#### 基本语法

- 定义暴露模块：export 命令用于规定模块的对外接口
- 引入模块：import命令用于输入其他模块提供的功能


#### ES6 模块与 CommonJS 模块的差异

1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口

第二个差异是因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。


#### 模块的加载机制
ES6 模块的运行机制与 CommonJS 不一样。**ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块**。


#### 服务端和浏览器端的使用
ES6-Babel-Browserify 使用教程：简单来说就一句话：使用 Babel 将 ES6 编译为 ES5 代码，使用 Browserify编译打包 js。

1. 安装 babel-cli，babel-preset-es2015browserify
2. 定义 .babelrc 
```json
  {
    "presets": ["es2015"]
  }
```

## 总结

1. CommonJS 规范主要用于服务端编程，加载模块是同步的，这并不适合在浏览器环境，因为同步意味着阻塞加载，浏览器资源是异步加载的，因此有了AMD CMD解决方案。
2. AMD规范在浏览器环境中异步加载模块，而且可以并行加载多个模块。不过，AMD规范开发成本高，代码的阅读和书写比较困难，模块定义方式的语义不顺畅。
3. CMD规范与AMD规范很相似，都用于浏览器编程，依赖就近，延迟执行，可以很容易在Node.js中运行。不过，依赖 SPM 打包，模块的加载逻辑偏重。
4. ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。
| <br /> | **Node** | **浏览器** |
| --- | --- | --- |
| 模块规范 | CommonJS | ES6 |
| 导出 | modules.exports; exports | export; export default |
| 引入 | require | import; require |

[

](https://juejin.cn/post/6844903744518389768)
