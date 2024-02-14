---
title: React 常见问题
description: 问：老版本的 React 中，为什么写 jsx 的文件要默认引入 React ? 如下：import React from 'react' function Index(){     return <div>hello,world</div> }答：因为 jsx 在被 babel 编译后，写的...
pubDate: 2021-07-13T00:41:43.000Z
---

**问：老版本的 React 中，为什么写 jsx 的文件要默认引入 React ? 如下：**
```javascript
import React from 'react'
function Index(){
    return <div>hello,world</div>
}
```
答：因为 jsx 在被 babel 编译后，写的 JSX 会变成上述 React.createElement 形式，所以需要引入 React，防止找不到 React 引起报错。<br />**知识点：**<br />[认识 JSX](https://www.yuque.com/jexlau/se69ir/ngk6h1?view=doc_embed)
