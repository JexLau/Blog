---
title: Polyfill 解释
description: 来源：【戴嘉华】https://segmentfault.com/a/1190000002593432Polyfill 或者 Polyfiller，是英国 Web 开发者 Remy Sharp 在咖啡店蹲坑的时候拍脑袋造出来的。当时他想用一个词来形容"用 JavaScript（或者Flash之...
pubDate: 2021-08-23T07:16:59.000Z
---

> 来源：【戴嘉华】[https://segmentfault.com/a/1190000002593432](https://segmentfault.com/a/1190000002593432)

Polyfill 或者 Polyfiller，是英国 Web 开发者 Remy Sharp 在咖啡店蹲坑的时候拍脑袋造出来的。当时他想用一个词来形容"用 JavaScript（或者Flash之类的什么鬼）来实现一些浏览器不支持的原生 API"。Shim这个已经有的词汇第一时间出现在他的脑海里。但是他回头想了一下 Shim 一般有自己的API，而不是单纯实现原生不支持的API。苦思冥想一直想不到合适的单词，于是他一怒之下造了一个单词 Polyfill。除了他自己用这个词以外，他还给其他开发者用。随着他在各种Web会议演讲和他写的书《Introducing HTML5》中频繁提到这个词，大家用了都觉得很好，就一起来用。
<br />
<br />**Polyfill 的准确意思为：用于实现浏览器并不支持的原生 API 的代码。**
<br />
<br />例如，querySelectorAll 是很多现代浏览器都支持的原生 Web API，但是有些古老的浏览器并不支持，那么假设有人写了库，只要用了这个库， 你就可以在古老的浏览器里面使用 document.querySelectorAll，使用方法跟现代浏览器原生API无异。那么这个库就可以称为 Polyfill 或者 Polyfiller。
<br />
<br />好，那么问题就来了。jQuery 是不是一个 Polyfill？答案是 No。因为它并不是实现一些标准的原生 API，而是封装了自己 API。一个 Polyfill 是抹平新老浏览器标准原生 API 之间的差距的一种封装，而不是实现自己的 API。
<br />
<br />已有的一些 Polyfill，如 Polymer 是让旧的浏览器也能用上 HTML5 Web Component 的一个 Polyfill。FlashCanvas是用 Flash 实现的可以让不支持 Canvas API 的浏览器也能用上 Canvas的Polyfill。
<br />
<br />这里有一堆Polyfills，有兴趣可以把玩一下：[HTML5 Cross Browser Polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills)
