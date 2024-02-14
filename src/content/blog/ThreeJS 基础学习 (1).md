---
title: ThreeJS 基础学习 (1)
description: 基础学习目标：了解三维相关概念和练习ThreeJS APIThree.js是一个基于WebGL的3D图形库，它提供了许多高级功能和工具，使得创建3D内容变得更加简单。学习资料：http://www.webgl3d.cn/ https://github.com/mrdoob/three.js/ ...
pubDate: 2023-08-14T07:12:19.000Z
---

> 基础学习目标：了解三维相关概念和练习ThreeJS API

Three.js是一个基于WebGL的3D图形库，它提供了许多高级功能和工具，使得创建3D内容变得更加简单。<br />学习资料：<br />[Three.js中文网](http://www.webgl3d.cn/)<br /> [GitHub - mrdoob/three.js: JavaScript 3D Library.](https://github.com/mrdoob/three.js/) <br />[three.js docs](https://threejs.org/docs/index.html)


## 概念
> 需要练习3维空间的观测效果


### [✓] 1. Three.js基础概念

- **场景（Scene）**：标准的场景，用于放置所有的物体和光源。

想象一个舞台，所有的演员（物体）和灯光（光源）都在这个舞台上。场景就是这个舞台，它是一个容器，用来放置你想展示的所有3D物体和光源。

- **相机（Camera）**：定义了从哪个角度观察场景。
   - 透视相机（PerspectiveCamera）：模拟人眼的视角，远处的物体看起来比近处的小。
   - 正交相机（OrthographicCamera）：所有物体大小不变，不受距离的影响，常用于2D游戏或工程图。

相机就像是观众的眼睛，决定了我们从哪个位置和角度看这个舞台。在Three.js中，有多种相机，如透视相机和正交相机，它们决定了观看物体的方式。

- **渲染器（Renderer）**：决定如何在浏览器中绘制场景。
   - WebGLRenderer：使用WebGL进行渲染的主要渲染器。
   - WebGL1Renderer：专为WebGL 1设计的渲染器。
   - CSS2DRenderer、CSS3DRenderer：使用CSS进行2D和3D渲染。
   - SVGRenderer：使用SVG进行渲染。

渲染器就像是导演，它决定了如何在浏览器中展示这个舞台和演员。它处理了所有的绘图和光影效果，确保场景看起来真实和流畅。

- **几何体（Geometry）**：定义物体的形状。
   - BoxGeometry：立方体。
   - CircleGeometry：圆形。
   - ConeGeometry：圆锥体。
   - CylinderGeometry：圆柱体。
   - DodecahedronGeometry：十二面体。
   - IcosahedronGeometry：二十面体。
   - LatheGeometry：车削几何体。
   - PlaneGeometry：平面。
   - RingGeometry：环形。
   - SphereGeometry：球体。
   - TorusGeometry：圆环体。
   - TorusKnotGeometry：环形结。
   - TubeGeometry：管状体。
   - BufferGeometry：直接操作顶点数据的低级几何体，用于高性能场景。

几何体是物体的“骨架”。它定义了物体的形状，比如立方体、球体或复杂的3D模型。你可以把它想象成一个雕塑的模型。

- **材质（Material）**：定义物体的外观，如颜色、光滑度等。
   - MeshBasicMaterial：基础材质，不受光照影响。
   - MeshLambertMaterial：有漫反射效果的材质。
   - MeshPhongMaterial：有高光效果的材质。
   - MeshStandardMaterial：基于物理的渲染（PBR）材质。
   - MeshPhysicalMaterial：扩展了MeshStandardMaterial，增加了更多的物理属性。
   - MeshToonMaterial：卡通风格材质。
   - ShaderMaterial：自定义着色器材质。
   - RawShaderMaterial：自定义原始着色器材质。
   - LineBasicMaterial、LineDashedMaterial：线条材质。

如果说几何体是雕塑的模型，那么材质就是这个雕塑的“皮肤”。它定义了物体的颜色、光泽、透明度等外观特性。比如，你可以给一个球体一个金属的材质，使它看起来像一个金属球。

- **光源（Lights）**：场景中的光源，如点光源、方向光等。
   - AmbientLight：环境光，均匀照亮场景中的所有物体。
   - DirectionalLight：方向光，从一个方向发出的光，如太阳光。
   - HemisphereLight：半球光，上下两部分有不同的颜色。
   - PointLight：点光源，从一个点发出的光。
   - SpotLight：聚光灯，从一个点发出并沿着特定方向的光。
   - RectAreaLight：矩形区域光，发出的光形状为矩形。

光源就像是舞台上的灯光，它照亮了场景中的物体，使我们能够看到它们。不同的光源会产生不同的光照效果，如点光源是一个点发出的光，方向光则是从一个方向发出的光。


### [✓] 2. 设置基本场景
学习如何设置一个基本的Three.js场景，包括创建场景、相机、渲染器，以及添加基本的几何体和光源。

### [✓] 3. 加载外部模型和纹理

- 使用**GLTFLoader**加载GLTF格式的3D模型。
- 学习如何加载和应用纹理到物体上。

### 4. 动画和交互

- 使用**requestAnimationFrame**进行动画循环。
- 学习如何使用**OrbitControls**实现相机的旋转、缩放和平移。
- 学习如何使用**Raycaster**实现物体的点击和交互。

### 5. 高级材质和光照

- 学习使用**ShaderMaterial**创建自定义材质。
- 深入了解Three.js中的各种光源和阴影效果。

### 6. 性能优化

- 使用**Stats.js**监控渲染性能。
- 学习如何减少几何体的顶点和面数。
- 使用**InstancedMesh**进行实例化渲染。

### 7. 扩展和插件

- 了解Three.js的社区和插件生态，如**postprocessing**库等。

### 8. 实践项目
选择一个小项目进行实践，如制作一个3D产品展示、一个小游戏等。


## Demo

### First 3D demo
```html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>First 3D ThreeJS</title>
</head>

<body>
  <div id="webgl" style="margin-top: 200px;margin-left: 100px;"></div>
  <script type="module">
    // 现在浏览器支持ES6语法，自然包括import方式引入js文件
    import * as THREE from 'three';
    //随便输入一个API，测试下是否已经正常引入three.js
    // console.log(THREE.Scene);
    // 扩展库OrbitControls.js
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    // 扩展库GLTFLoader.js
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
    //引入性能监视器stats.js
    import Stats from 'three/addons/libs/stats.module.js';

    // ------------------ 场景 ---------------------------
    // 创建3D场景对象Scene
    const scene = new THREE.Scene();
    //创建一个长方体几何对象Geometry
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    //创建一个材质对象Material
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,//0xff0000设置材质颜色为红色
      transparent: true,//开启透明
      opacity: 0.5,//设置透明度
    });

    // ------------------ 相机📷 ---------------------------
    // 实例化一个透视投影相机对象
    // 定义相机输出画布的尺寸(单位:像素px)
    const width = 800; //宽度
    const height = 500; //高度
    // 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
    const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);

    //相机在Three.js三维坐标系中的位置
    // 根据需要设置相机位置具体值
    camera.position.set(200, 200, 200);

    //相机观察目标指向Threejs 3D空间中某个位置
    camera.lookAt(0, 0, 0); //坐标原点

    const mesh = new THREE.Mesh(geometry, material);
    console.log('---------', mesh);
    // 相机位置xyz坐标：0,10,0
    mesh.position.set(0, 10, 0);
    // 相机位置xyz坐标：200, 200, 200
    camera.position.set(200, 200, 200);
    scene.add(mesh);

    // -------------------渲染器-----------
    // 创建渲染器对象
    const renderer = new THREE.WebGLRenderer();
    // 定义threejs输出画布的尺寸(单位:像素px)
    renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
    renderer.render(scene, camera); //执行渲染操作
    document.body.appendChild(renderer.domElement);
    document.getElementById('webgl').appendChild(renderer.domElement);

    // -------------控制器---------------------
    // 设置相机控件轨道控制器OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
    controls.addEventListener('change', function () {
      renderer.render(scene, camera); //执行渲染操作
    });//监听鼠标、键盘事件

    // -------------性能---------------
    //创建stats对象
    const stats = new Stats();
    //stats.domElement:web页面上输出计算结果,一个div元素，
    document.body.appendChild(stats.domElement);
    // 渲染函数
    function render() {
      //requestAnimationFrame循环调用的函数中调用方法update(),来刷新时间
      stats.update();
      renderer.render(scene, camera); //执行渲染操作
      requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
    }
    render();
  </script>
</body>
</html>
```
