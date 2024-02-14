---
title: Vue3+Ts 项目中 定义 ref 实例 的类型
description: 文章来源：https://juejin.cn/post/6978035248487464974在 vue3 的项目当中，有时候需要使用ref 获取到组件的实例对象。 当结合 typescript 使用时就需要进行类型的定义才能访问到实例的成员。就我目前知道的就有三种方式自定义类型使用 Inst...
pubDate: 2021-10-01T19:14:30.000Z
---

> 文章来源：[https://juejin.cn/post/6978035248487464974](https://juejin.cn/post/6978035248487464974)


在 vue3 的项目当中，有时候需要使用ref 获取到组件的实例对象。 当结合 typescript 使用时就需要进行类型的定义才能访问到实例的成员。<br />就我目前知道的就有三种方式

- 自定义类型
- 使用 InstanceType
- 通过组件的setup函数自动推断
```vue
// 组件 child.vue
<script lang="ts">
  export default defineComponent({
  
  setup(){
     const num  = ref(0);
     
     return {
        num
     }
  }
})
</script>

// 使用的页面
<template>
   <child ref="childRef"/>
</template>

<script lang="ts">
  export default defineComponent({
   setup(){
     const childRef = ref(null);
     onMounted(() => {
         childRef.value.num // 如果没有定义类型，这里就无法访问到 num
     })
   }
})
</script>
```

## 自定义类型
当然 我们也可以直接定义 child.vue 组件实例的 类型<br />直接在 child.vue 中 定义类型 ChildCtx
```vue
// 组件 child.vue
<script lang="ts">
  
  // ++ 定义类型
  export interface  ChildCtx {
    num: number;
  }
  
  export default defineComponent({
  
  setup(){
     const num  = ref(0);
     
     return {
        num
     }
  }
})
</script>
```
在使用的时候
```vue
 <template>
   <child ref="childRef"/>
 </template>
<script lang="ts">
  import {defineComponent, onMouned } from 'vue'
  import {ChildCtx}, Child from './child.vue'
  export default   defineComponent({
    components: {Child},
    setup(){
      //++ 定义类型
      const childRef = ref<null | ChildCtx>(null);

      onMouned(() => {
        childRef.value?.num; // 这里可以访问到 num 属性
      })
     }
	})
</script>
```

## 使用 InstanceType
InstanceType<T> 是 ts 自带的类型， 能够直接获取组件完整的实例类型
```vue
<script lang="ts">
import Child from './child.vue'
import {ElImage} from 'element-plus'

type ElImageCtx = InstanceType(typeof ElImage);
type ChildCtx = InstanceType(typeof Child);

setup() {
    const child = ref<null | ChildCtx>(null);
    const elImgRef = ref<null | ElImageCtx>(null)

    onMounted(() => {
      child.value?.num ;// 可以直接访问到
      elImgRef.value?. // 对于 element组件，可以访问到很多的属性
    })
}
</script>
```
