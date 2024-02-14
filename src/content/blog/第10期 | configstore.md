---
title: 第10期 | configstore
description: 1. 源码简介官网简介：Easily load and persist config without having to think about where and how翻译：轻松加载和保持配置，而不必考虑在哪里以及如何加载和保持。其实就是方便加载和持久化用户配置。它会在用户配置目录下生成对...
pubDate: 2022-08-01T04:56:39.000Z
heroImage: https://cdn.nlark.com/yuque/0/2022/png/1105483/1658889144942-0b8a2dd1-498a-4eac-8c9d-08f23b1d5219.png
---

## 1. 源码简介
官网简介：Easily load and persist config without having to think about where and how<br />翻译：轻松加载和保持配置，而不必考虑在哪里以及如何加载和保持。<br />其实就是方便加载和持久化用户配置。它会在用户配置目录下生成对应的json文件。<br />[https://github.com/yeoman/configstore](https://github.com/antfu/install-pkg)

## 2. 使用
```javascript
import Configstore from 'configstore';

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

// 实例化配置存储实例
const config = new Configstore(packageJson.name, {foo: 'bar'});
// get方法获取配置
console.log(config.get('foo')); //=> 'bar'

// set方法设置配置
config.set('awesome', true);
console.log(config.get('awesome')); //=> true


// 设置嵌套属性
config.set('bar.baz', true);
console.log(config.get('bar')); //=> {baz: true}

// 删除属性
config.delete('awesome');
console.log(config.get('awesome')); //=> undefined
```

## 3. 读源码
源码大概100来行，源码链接：[GitHub1s](https://github1s.com/yeoman/configstore/blob/HEAD/index.js)

这里用到了一些没怎么见过的依赖包，奇奇怪怪可可爱爱：
```javascript
// 是fs模块的增强版，旨在规范跨不同平台和环境的行为，并使文件系统访问对错误更友好
import fs from 'graceful-fs';
// 获取 XDG 基本目录路径，xdgConfig 是用户特定配置文件的目录(这个包适用于Linux)
import { xdgConfig } from 'xdg-basedir';
// fs.writeFile这个API的扩展包，使得它的操作是原子性的，且允许设置所有权
import writeFileAtomic from 'write-file-atomic';
// 从嵌套对象中获取、设置或删除属性
import dotProp from 'dot-prop';
// 生成唯一的随机字符串
import uniqueString from 'unique-string';
```

引入包之后就是一些全局配置了：
```javascript
// 如果是linux，获取xdgConfig；
// 否则 os.tmpdir() 操作系统默认的临时文件的目录，uniqueString() 唯一字符串
// 总之就是获取目录
const configDirectory = xdgConfig || path.join(os.tmpdir(), uniqueString());
// error 提示信息
const permissionError = 'You don\'t have access to this file.';
// 这里两个配置都是关于读写文件权限，这里是用八进制表示，options可以参考node读写文件配置
const mkdirOptions = {mode: 0o0700, recursive: true};
const writeFileOptions = {mode: 0o0600};
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1659331572198-86506631-ae39-4cb3-86d9-6cd2df7580cf.png#clientId=u8e4aad5d-bf58-4&from=paste&height=656&id=u1d959bfb&originHeight=656&originWidth=1633&originalType=binary&ratio=1&rotation=0&showTitle=false&size=75955&status=done&style=none&taskId=uf443916a-7dc2-4d46-9151-b027ce32314&title=&width=1633)

Configstore 构造函数源码
```javascript
export default class Configstore {
  constructor(id, defaults, options = {}) {
    // 设置文件前缀路径
    const pathPrefix = options.globalConfigPath ? path.join(id, 'config.json') : path.join('configstore', `${id}.json`);
    // 最终存储在本地的文件路径
    this._path = options.configPath || path.join(configDirectory, pathPrefix);
    
    // defaults的意思是创建Store的时候就赋值
    if (defaults) {
      // 对all属性赋值，会触发下面all属性的set方法
      this.all = {
        ...defaults,
        ...this.all
      };
    }
  }
  
  // all属性的get方法
  get all() {
    try {
      // 直接读取本地文件
      return JSON.parse(fs.readFileSync(this._path, 'utf8'));
    } catch (error) {
      // / 如果不存在，返回空对象
      if (error.code === 'ENOENT') {
        return {};
      }
      
      // 如果没有读取权限，赋值错误信息
      if (error.code === 'EACCES') {
        error.message = `${error.message}
${permissionError}
`;
      }
      
      // 如果是无效的json文件，清空文件，返回空对象
      if (error.name === 'SyntaxError') {
        writeFileAtomic.sync(this._path, '', writeFileOptions);
        return {};
      }
      
      // 抛出错误
      throw error;
    }
  }
  
  // all属性的set方法
  set all(value) {
    try {
      /// 确保目录存在
      fs.mkdirSync(path.dirname(this._path), mkdirOptions);
      // 写入文件
      // 注意这里的JSON.stringify(value, undefined, '\t')
      // MDN链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
      writeFileAtomic.sync(this._path, JSON.stringify(value, undefined, '\t'), writeFileOptions);
    } catch (error) {
      if (error.code === 'EACCES') {
        error.message = `${error.message}
${permissionError}
`;
      }
      throw error;
    }
  }
  
  // all对象键的length
  get size() {
    return Object.keys(this.all || {}).length;
  }
  
  // configstore的get方法，其实就是传入key返回对应的值
  get(key) {
    return dotProp.get(this.all, key);
  }
  
  set(key, value) {
    const config = this.all;
    // 这里做了一个重载
    // 如果只传了一个参数(key)，例如这个情况 config.set({foo: 'bar'})
    if (arguments.length === 1) {
      // 表示这个key是一个对象，循环这个对象赋值到config对象(也就是this.all)上
      for (const k of Object.keys(key)) {
        dotProp.set(config, k, key[k]);
      }
    } else {
      dotProp.set(config, key, value);
    }
    
    this.all = config;
  }
  
  // 判断有没有这个属性值
  has(key) {
    return dotProp.has(this.all, key);
  }
  
  // 删除键值
  delete(key) {
    const config = this.all;
    // 删除对应的键值
    dotProp.delete(config, key);
    this.all = config;
  }
  
  // 清空
  clear() {
    this.all = {};
  }
  
  // 获取文件路径path
  get path() {
    return this._path;
  }
}

```


## 4. 总结和收获
读完源码之后，我们会发现这是一个方便持久化和获取值的包，这里持久化的位置是在用户目录，所以它的使用场景可能是在服务端或者客户端(浏览器端没有读取文件的权限)。<br />![configstore.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1659334228588-a3c3967e-1e27-4e22-b0ad-bb5c08898e3e.png#clientId=u8e4aad5d-bf58-4&from=drop&id=OSvJM&originHeight=622&originWidth=1017&originalType=binary&ratio=1&rotation=0&showTitle=false&size=92193&status=done&style=none&taskId=u6a101be8-7ba2-4a5d-b599-2a9a78aa245&title=)<br />**收获**：

- 通过触发对象 all 的 get( )和 set() ，来做一些额外的操作
- dot-prop 这个包能快速读取/设置/删除嵌套属性的值
- fs模块的替代包：graceful-fs
- fs.writeFile的扩展包：write-file-atomic 
- JSON.stringfy() 第二第三个参数


