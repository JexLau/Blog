---
title: 搭建一个简单的web性能实验室
description: 在开发地图组件的过程中，总是会遇到一些“奇怪”的问题导致渲染卡顿，对数据不敏感，或者特定的场景下才可能会才发现问题，需要花大量的时间去排查。因此简单搭建一个web性能监控，用于跟踪每次构建代码的渲染数据，便于及时发现问题。主要指标：首次渲染时长(FP)，首屏的渲染时长(自定义)，完整的渲染时长...
pubDate: 2022-08-24T14:12:12.000Z
---

在开发地图组件的过程中，总是会遇到一些“奇怪”的问题导致渲染卡顿，对数据不敏感，或者特定的场景下才可能会才发现问题，需要花大量的时间去排查。因此简单搭建一个web性能监控，用于跟踪每次构建代码的渲染数据，便于及时发现问题。

主要指标：首次渲染时长(FP)，首屏的渲染时长(自定义)，完整的渲染时长(自定义)，首次可交互时间(TTI)，<br />次要指标：元素渲染器的CPU闲置时间(CPU IDLE)，元素渲染器打点计算耗时，基本内存使用情况；

计算方式(暂定)：<br />首次渲染时长(FP): performance.getEntriesByType("paint")<br />首屏的渲染时长：loadEventEnd - fetchStart<br />完整的渲染时长：loadEventStart - fetchStart<br />首次可交互时间：domInteractive - navigationStart(/ fetchStart)<br />CPU闲置时间：IdleDeadline.timeRemaining()<br />基本内存使用情况：performance.memory<br />元素渲染器打点计算耗时：performance.mark+performance.measure











