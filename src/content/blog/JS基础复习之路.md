---
title: JS基础复习之路
description: 1. let/const/var的区别给全局添加属性：var声明的变量会挂到window上，而let和const不会重复声明：同一作用域var可以重复声明，let和const不会块级作用域：let/const声明可以形成作用域，不能跨块访问暂时性死区：使用let、const命令声明变量之前，该...
pubDate: 2022-03-20T21:06:41.000Z
heroImage: https://cdn.nlark.com/yuque/0/2022/webp/1105483/1647842979348-b1732163-1d93-4475-a071-a4c3595ea4d3.webp
---

### 1. let/const/var的区别
- 给全局添加属性：var声明的变量会挂到window上，而let和const不会
- 重复声明：同一作用域var可以重复声明，let和const不会
- 块级作用域：let/const声明可以形成作用域，不能跨块访问
- 暂时性死区：使用let、const命令声明变量之前，该变量都是不可用的，这被称为暂时性死区
- 变量提升：JS 变量存在【创建create、初始化initialize 和赋值assign】三个过程，
   - var 的「创建」和「初始化」都被提升
   - let 的「创建」过程被提升了，但是初始化没有提升
   - const 只有「创建」和「初始化」，没有「赋值」过程
   - function 的「创建」「初始化」和「赋值」都被提升
- 初始值设置：在变量声明时，var 和 let 可以不用设置初始值。而const声明变量必须设置初始值。
- 指针指向：let创建的变量是可以更改指针指向（可以重新赋值），const声明的变量不允许改变指针指向。
| **区别** | **var** | **let** | **const** |
| --- | --- | --- | --- |
| 是否有块级作用域 | × | ✔️ | ✔️ |
| 是否存在变量提升 | ✔️ | × | × |
| 是否添加全局属性 | ✔️ | × | × |
| 能否重复声明变量 | ✔️ | × | × |
| 是否存在暂时性死区 | × | ✔️ | ✔️ |
| 是否必须设置初始值 | × | × | ✔️ |
| 能否改变指针指向 | ✔️ | ✔️ | × |



### 2. 作用域，执行上下文，作用域链


#### 2.1 作用域

- 全局作用域
   - 最外层函数和最外层函数外面定义的变量拥有全局作用域
   - 所有未定义直接赋值的变量自动声明为全局作用域
   - 所有window对象的属性拥有全局作用域
   - 全局作用域有很大的弊端，过多的全局作用域变量会污染全局命名空间，容易引起命名冲突
- 函数作用域
   - 函数作用域声明在函数内部
   - 作用域是分层的，内层作用域可以访问外层作用域，反之不行

块级作用域

- 使用let和const可以声明块级作用域，块级作用域可以在函数中创建也可以在一个代码块中的创建（由{ }包裹的代码片段）
- 在循环中比较适合绑定块级作用域，这样就可以把声明的计数器变量限制在循环内部

PS：块级作用域不会改变标识符查找的搜索过程，但可以给词法层级添加额外的层次。


#### 2.2 执行上下文
当 JS 引擎遇到可执行代码的时候，都会创建一段执行上下文压入执行栈。而每个执行上下文中，都会有这三个属性：

- this
- 变量对象(Variable Object, VO)
- 作用域链(Scope Chain)

**变量对象**<br />变量对象是与执行上下文相关的数据作用域，存储了在上下文中定义的变量和函数声明。<br />因为不同执行上下文下的变量对象稍有不同，所以我们来聊聊全局上下文的变量对象和函数上下文的变量对象。

**全局上下文的变量对象**<br />全局对象是预定义的对象，作为 JavaScript 的全局函数和全局属性的占位符。通过使用全局对象，可以访问所有其他所有预定义的对象、函数和属性。全局上下文中的变量对象就是全局对象。

**函数上下文的变量对象**<br />在函数上下文中，我们用活动对象(Activation Object, AO)来表示变量对象。<br />活动对象和变量对象其实是一个东西，只是变量对象是规范上的或者说是引擎实现上的，不可在 JavaScript 环境中访问，只有到当进入一个执行上下文中，这个执行上下文的变量对象才会被激活，所以才叫 Activation Object，而只有被激活的变量对象，也就是活动对象上的各种属性才能被访问。<br />活动对象是在进入函数上下文时刻被创建的，它通过函数的 arguments 属性初始化。


#### 2.3 执行过程
执行上下文的代码会分成两个阶段进行处理：**分析（进入执行上下文）和执行（代码执行）**

- 进入执行上下文

当进入执行上下文时，这时候还没有执行代码，只是在分析代码。

变量对象包括3种：<br />**函数的所有形参** (如果是函数上下文)<br />由名称和对应值组成的一个变量对象的属性被创建<br />没有实参，属性值设为 undefined

**函数声明**<br />由名称和对应值（函数对象(function-object)）组成一个变量对象的属性被创建<br />如果变量对象已经存在相同名称的属性，则完全替换这个属性（函数声明大于变量声明）

**变量声明**<br />由名称和对应值（undefined）组成一个变量对象的属性被创建；<br />如果变量名称跟已经声明的形式参数或函数相同，则变量声明不会干扰已经存在的这类属性<br />（函数声明大于变量声明）

- 代码执行

会顺序执行代码，根据代码，修改变量对象的值。

例子：<br />![](https://cdn.nlark.com/yuque/0/2022/webp/1105483/1647842979348-b1732163-1d93-4475-a071-a4c3595ea4d3.webp#clientId=u821bca7e-a877-4&from=paste&id=u30f2a070&originHeight=459&originWidth=382&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ud5612657-2806-40c1-8a9b-0677c080736&title=)<br />![](https://cdn.nlark.com/yuque/0/2022/webp/1105483/1647842988475-dabb67c5-3c68-4c6b-8f7b-9a7543b423ab.webp#clientId=u821bca7e-a877-4&from=paste&id=u28aa1a53&originHeight=197&originWidth=469&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u84a72bde-da35-4f43-b63a-004af5578ea&title=)

**变量对象分析和执行的总结**

- 全局上下文的变量对象初始化是全局对象
- 函数上下文的变量对象初始化只包括 Arguments 对象
- 在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值
- 在代码执行阶段，会再次修改变量对象的属性值


#### 2.4 作用域链
在《JavaScript深入之变量对象》中有提到，当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

我们以一个函数的创建和激活两个时期来讲解作用域链是如何创建和变化的：

**函数创建**<br />函数的作用域在函数定义的时候就决定了，函数有一个内部属性 [[scope]]，当函数创建的时候，就会保存所有父变量对象到其中，你可以理解 [[scope]] 就是所有父变量对象的层级链，但是注意：[[scope]] 并不代表完整的作用域链！<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1647843663066-0a94db62-1c54-46ad-9793-b065fa64d1f6.png#clientId=u821bca7e-a877-4&from=paste&height=388&id=u9047b466&originHeight=479&originWidth=611&originalType=binary&ratio=1&rotation=0&showTitle=false&size=38224&status=done&style=none&taskId=u7b131c19-f936-4176-bc0e-61ddc6f33e2&title=&width=495)

**函数激活**<br />当函数激活时，进入函数上下文，创建 VO/AO 后，就会将活动对象添加到作用链的前端。这时候执行上下文的作用域链，我们命名为 Scope：<br />Scope = [AO].concat([[Scope]]); 至此，作用域链创建完毕。

**例子**<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1647843799318-cde92315-5cd7-4706-9b85-4e5dbb4c4967.png#clientId=u821bca7e-a877-4&from=paste&height=1150&id=ua043f791&originHeight=1150&originWidth=1249&originalType=binary&ratio=1&rotation=0&showTitle=false&size=178813&status=done&style=none&taskId=u53ec49bd-2889-4675-8ef1-6d3b638cbe7&title=&width=1249)![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1647843822186-07f1f9c4-9b47-4377-b5df-79e554fa02e2.png#clientId=u821bca7e-a877-4&from=paste&height=831&id=u53003d88&originHeight=831&originWidth=1248&originalType=binary&ratio=1&rotation=0&showTitle=false&size=106952&status=done&style=none&taskId=u452f73a1-5886-4b10-b09f-94d9316707b&title=&width=1248)
