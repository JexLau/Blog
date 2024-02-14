---
title: ThreeJS 导入模型和纹理(2)
description: 概念模型 (Model)概念：模型是3D对象的表示，通常包含顶点、面、UV坐标等数据。模型可以是简单的几何形状，如立方体或球体，也可以是复杂的3D物体，如人物或建筑。用处：模型是3D场景中的主要元素，它们为场景提供结构和内容。纹理 (Texture)概念：纹理是贴在3D模型上的2D图像。它们为...
pubDate: 2023-08-14T07:28:31.000Z
---

## 概念

### 模型 (Model)
概念：模型是3D对象的表示，通常包含顶点、面、UV坐标等数据。模型可以是简单的几何形状，如立方体或球体，也可以是复杂的3D物体，如人物或建筑。<br />用处：模型是3D场景中的主要元素，它们为场景提供结构和内容。


### 纹理 (Texture)
概念：纹理是贴在3D模型上的2D图像。它们为模型提供颜色、光泽、粗糙度等详细信息。<br />用处：纹理增强了模型的视觉效果，使其看起来更加真实和详细。


### 渲染过程
<br />场景创建：首先，我们需要创建一个场景，这是所有物体和光源的容器。<br />模型导入：使用加载器（如GLTFLoader或OBJLoader）导入3D模型。模型通常包含几何体（定义形状）和材质（定义外观）。<br />纹理导入：使用TextureLoader导入纹理。纹理可以应用于模型的材质，为其提供颜色和详细信息。<br />光照设置：添加光源到场景中，如点光源、方向光或环境光。光源影响模型的明暗和颜色。<br />相机设置：定义观察场景的视角。相机捕捉场景中的内容并将其投影到2D屏幕上。<br />渲染：渲染器将场景、模型、纹理和光照结合起来，生成最终的2D图像。这个过程可能包括阴影、反射、抗锯齿等效果。<br />动画和交互：通过改变模型的位置、旋转或缩放，或者改变相机的位置和方向，可以创建动画效果。此外，可以使用事件监听器和射线投射来实现交互，如点击或拖动模型。<br />输出：最终的2D图像显示在浏览器的canvas元素上，用户可以观察和与其互动。

## Demo
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>加载外部模型和纹理</title>
</head>

<body>
  <script type="module">
    import * as THREE from 'three';
    // 扩展库OrbitControls.js
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
    // 扩展库GLTFLoader.js
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
    import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

    //引入性能监视器stats.js
    import Stats from 'three/addons/libs/stats.module.js';
    // 初始化场景、相机和渲染器
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 添加光源
    const light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // 创建DRACOLoader实例
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('./assets/draco/'); // 设置Draco解码器的路径
    // 加载GLB模型
    const loader = new GLTFLoader();
    // 将DRACOLoader实例设置为GLTFLoader的一个插件
    loader.setDRACOLoader(dracoLoader);
    loader.load('./assets/agv.glb', (gltf) => {
      const model = gltf.scene;
      scene.add(model);
    });

    // 加载纹理
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('./assets/blank.svg', () => {
      // 当纹理加载完成后，进行渲染
      renderer.render(scene, camera);
    })

    // 创建几何体
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // 使用纹理创建材质
    const material = new THREE.MeshBasicMaterial({ map: texture });
    // 创建网格并添加到场景
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);


    // 设置相机位置
    camera.position.z = 50;

    // 添加OrbitControls以便旋转、缩放和平移场景
    const controls = new OrbitControls(camera, renderer.domElement);

    // 使场景响应窗口大小调整
    window.addEventListener('resize', () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });

    // -------------性能---------------
    //创建stats对象
    const stats = new Stats();
    //stats.domElement:web页面上输出计算结果,一个div元素，
    document.body.appendChild(stats.domElement);

    // 渲染循环
    function animate() {
      stats.update();
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  </script>
</body>

</html>
```
