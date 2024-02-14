---
title: package.json 中的各种 depandency
description: 文章转载于：https://segmentfault.com/a/1190000008398819前端常见 dependency，devDependency，peerDependency，在开发组件库的时候分不清他们之间的关系，所以在查阅了一些资料后，简单记录一下。dependency 与 d...
pubDate: 2021-07-24T07:02:48.000Z
---

> 文章转载于：[https://segmentfault.com/a/1190000008398819](https://segmentfault.com/a/1190000008398819)

前端常见 dependency，devDependency，peerDependency，在开发组件库的时候分不清他们之间的关系，所以在查阅了一些资料后，简单记录一下。

# dependency 与 devDependency
**dependency 定义的是代码所需要的依赖包，而 devDependency 给定的是编译/测试等开发时所需依赖包。**<br />举个例子：
```javascript
{
    "name": "project",
    "dependency": {
        "react": "^16.6.3",
        ...
    },
    "devDependency": {
        "webpack": "4.19.1",
        "url-loader": "1.1.1",
        ...
    }
}
```
理想情况下，当运行 npm run build 后应该只包含 react 相关代码而不包括 devDependency 中的无用代码。当然，在这里 dependency 和 devDependency 只是一个规范，最终生成什么代码取决于引入了什么。比如 improt "url-loader" 会把 url-loader 囊括进你的生产代码，不论它是否定义在 dependency 中。

现在考虑另外一个场景，我们开发了一个npm（package-a）包，我们希望所有依赖 package-a 的应用都能有效的运行。这时 dependency 和 devDependency 并不仅仅是一个我们可以随意遵守的规范而已，因为项目依赖的devDependency 不会被安装。比如：
```bash
├── project
    ├── package-a (dependency)
    │   └── package-a-1 (devDependency)
    └── package-b (devDependency)
```
在 project 下执行 npm install 之后，package-a 和 package-b 都会被安装，但 package-a-1 不会被安装，所以你在 project 的 node_modules文件夹下找不到 package-a-1。

# peerDependency
我们以 babel-loader 为例子，运行 npm install babel-loader -D 时，控制台会有两条警告：
> npm WARN babel-loader@8.0.4 requires a peer of @babel/core@^7.0.0 but none is installed. You must install peer dependencies yourself. 
> npm WARN babel-loader@8.0.4 requires a peer of webpack@>=2 but none is installed. You must install peer dependencies yourself.

提示babel-loader需要依赖@babel/core@^7.0.0和webpack@>=2。这是因为peerDependencies指定了当前包需要安装的依赖：
```json
"peerDependencies": {
    "@babel/core": "^7.0.0",
    "webpack": ">=2"
 }
```
那 peerDependency 应该在什么情况下使用呢？

<br />一般的，如果我们需要开发针对于某个库的插件而又不需要在代码中引用这个库的时候。就比如 babel-loader 是 webpack 的一个插件，但代码中又无需引用 webpack，为了保证插件能够运行在 webpack 环境中，故而使用了peerDependencies。


