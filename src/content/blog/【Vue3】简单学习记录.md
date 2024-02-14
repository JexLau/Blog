---
title: 【Vue3】简单学习记录
description: 有空再整理整理最近有个项目想从 vue2 转换成 vue3 + TS，虽然 vue3 也兼容 vue2 的语法，想尝试一下使用 Composition API 改一下。废话不多说，这里简单记录一下学习笔记。Vue 有两种语法，一种是 Options API，就是我们熟悉的 data + 生命周...
pubDate: 2021-09-19T10:49:33.000Z
---

> 有空再整理整理

最近有个项目想从 vue2 转换成 vue3 + TS，虽然 vue3 也兼容 vue2 的语法，想尝试一下使用 Composition API 改一下。

废话不多说，这里简单记录一下学习笔记。

Vue 有两种语法，一种是 Options API，就是我们熟悉的 data + 生命周期 + methods + computed + watch + components...这些语法，就不多说了。另外一种就是 Vue3 推出的 [Composition API](https://v3.cn.vuejs.org/guide/composition-api-introduction.html)，它产生的出发点和 React Hooks 类似，用于封装逻辑，将逻辑复用（写到这里的时候我恍然大悟，感觉这玩意没这么神秘）。

那它的语法是什么样的呢？使用<setup>函数作为入口，函数接收 props 和 context，返回的任何内容都可用于组件的使用。由此引申出响应式变量 ref。ref 是一个接收参数并将其包裹在一个带有 value property 的对象中返回，可以使该 property 访问或修改响应式变量的值。ref 为我们的值创建了一个响应式引用，在整个组合式 API 中会经常使用引用的概念，ref 的值发生变化，视图也会更新以反映变化。

- 在 setup 内注册生命周期钩子：

为了使组合式 API 的功能和选项式 API 一样完整，我们还需要一种在 setup 中注册生命周期钩子的方法。这要归功于 Vue 导出的几个新函数。组合式 API 上的生命周期钩子与选项式 API 的名称相同，但前缀为 on：即 mounted 看起来会像 onMounted。

- watch 响应式更改

就像我们在组件中使用 watch 选项并在 user property 上设置侦听器一样，我们也可以使用从 Vue 导入的 watch 函数执行相同的操作。它接受 3 个参数：一个想要侦听的响应式引用或 getter 函数，一个回调，可选的配置选项。
```javascript
import { ref, watch } from 'vue'

const counter = ref(0)
watch(counter, (newValue, oldValue) => {
  console.log('The new counter value is: ' + counter.value)
})
```
每当 counter 被修改时，例如 counter.value=5，侦听将触发并执行回调 (第二个参数)，在本例中，它将把 'The new counter value is:5' 记录到控制台中。

以下是等效的选项式 API：
```javascript
export default {
  data() {
    return {
      counter: 0
    }
  },
  watch: {
    counter(newValue, oldValue) {
      console.log('The new counter value is: ' + this.counter)
    }
  }
}
```

- watch 和 watchEffect 的区别
   - watch是惰性执行，也就是只有监听的值发生变化的时候才会执行。watchEffect每次代码加载watchEffect都会执行（忽略watch第三个参数的配置，如果修改配置项也可以实现立即执行）
   - watch需要传递监听的对象，watchEffect不需要
   - watch只能监听响应式数据：ref定义的属性和reactive定义的对象，如果直接监听reactive定义对象中的属性是不允许的，除非使用函数转换一下
   - watchEffect如果监听reactive定义的对象是不起作用的，只能监听对象中的属性。

- 独立的 computed 属性

与 ref 和 watch 类似，也可以使用从 Vue 导入的 computed 函数在 Vue 组件外部创建计算属性。

- ref、reactive、toRef、toRefs 的区别

ref 是对值类型创造响应式的方法，reactive 是使引用类型变成响应式的方法，toRef、toRefs 是延续引用类型响应式对象的方法： toRef 延续单个响应式对象的属性，而 toRefs 延续响应式对象的全部属性。<br />toRef 使用场景，当使用一个函数返回一个响应式对象，而此定义的“响应式对象”却失去了响应式，而这时候就可以使用的 toRef 或是 toRefs 保持他的响应式。
