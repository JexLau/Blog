---
title: Vue3+Vite+TypeScript 中 TS 文件导出接口报错
description: 使用的环境为Vite+Vue3+TypeScript。
pubDate: 2022-07-05T09:13:33.000Z
---

caught SyntaxError: The requested module 'xx.d.ts' does not provide an export named 'CustomRoute'

定义的对应的ts文...
pubDate: 2021-09-29T00:47:56.000Z
---
使用的环境为Vite+Vue3+TypeScript。
<br />
<br />报错信息如下:
> Uncaught SyntaxError: The requested module 'xx.d.ts' does not provide an export named 'CustomRoute'


<br />定义的对应的ts文件如下:
```javascript
import { RouteRecordRaw } from "vue-router";

export type CustomRoute = RouteRecordRaw & {
  hidden?: boolean;
};

```

**解决：**<br />在import的时候将 import {xxx} from 'xxx' 改成 import type {xxx} from 'xxx'
<br />目前好像只有vite会出现这种问题，webpack就没事
<br />参考文章 [ts import type和export type 解决vite中导入类型报错的问题](https://my.oschina.net/ahaoboy/blog/4982618)
