---
title: 第7期 | validate-npm-package-name
description: 1. 源码简介validate-npm-package-name 作用：检测 npm 包的名称是否符合标准简单例子： var validate = require("validate-npm-package-name")  validate("some-package") validate("...
pubDate: 2022-03-15T06:58:43.000Z
---

## 1. 源码简介
validate-npm-package-name 作用：检测 npm 包的名称是否符合标准

**简单例子：**
```javascript

var validate = require("validate-npm-package-name")

validate("some-package")
validate("example.com")
validate("under_score")
validate("123numeric")
validate("@npm/thingy")
validate("@jane/foo.js")
```


**学习目标：**<br />1）学习 validate-npm-package-name 源码，了解它的使用场景，输出记录文档。

**源码地址：**<br />[https://github.com/npm/validate-npm-package-name](https://github.com/npm/validate-npm-package-name)

## 2. 源码
源码是一个 100 行左右的 js 文件，我们来解读一下它的逻辑：
```javascript
var scopedPackagePattern = new RegExp('^(?:@([^/]+?)[/])?([^/]+?)$')
var builtins = require('builtins')
var blacklist = [
  'node_modules',
  'favicon.ico'
]

var validate = module.exports = function (name) {
  var warnings = []
  var errors = []
  // 验证是否 null
  if (name === null) {
    errors.push('name cannot be null')
    return done(warnings, errors)
  }
  // 验证是否 undefined
  if (name === undefined) {
    errors.push('name cannot be undefined')
    return done(warnings, errors)
  }
  // 验证是否 string 类型
  if (typeof name !== 'string') {
    errors.push('name must be a string')
    return done(warnings, errors)
  }
  // 验证 name 长度
  if (!name.length) {
    errors.push('name length must be greater than zero')
  }
  // 验证 name 是否以.开头
  if (name.match(/^\./)) {
    errors.push('name cannot start with a period')
  }
  // 验证 name 是否以_开头
  if (name.match(/^_/)) {
    errors.push('name cannot start with an underscore')
  }
  // 验证 name 前导或尾随是否包含空格
  if (name.trim() !== name) {
    errors.push('name cannot contain leading or trailing spaces')
  }

  // 不能是黑名单里的包
  blacklist.forEach(function (blacklistedName) {
    if (name.toLowerCase() === blacklistedName) {
      errors.push(blacklistedName + ' is a blacklisted name')
    }
  })

  // 不能是node.js 内置模块列表
  builtins.forEach(function (builtin) {
    if (name.toLowerCase() === builtin) {
      warnings.push(builtin + ' is a core module name')
    }
  })

  // 限制包名长度
  if (name.length > 214) {
    warnings.push('name can no longer contain more than 214 characters')
  }

  // 包名不能包含大写字母
  if (name.toLowerCase() !== name) {
    warnings.push('name can no longer contain capital letters')
  }

  // 包名不能包含特殊符号：~\'!()*
  if (/[~'!()*]/.test(name.split('/').slice(-1)[0])) {
    warnings.push('name can no longer contain special characters ("~\'!()*")')
  }

  // 有些字符会引起歧义，使用 encodeURIComponent 编码
  if (encodeURIComponent(name) !== name) {
    // Maybe it's a scoped package name, like @user/package
    var nameMatch = name.match(scopedPackagePattern)
    if (nameMatch) {
      var user = nameMatch[1]
      var pkg = nameMatch[2]
      if (encodeURIComponent(user) === user && encodeURIComponent(pkg) === pkg) {
        return done(warnings, errors)
      }
    }

    errors.push('name can only contain URL-friendly characters')
  }

  return done(warnings, errors)
}

// scopedPackagePattern 暴露给外面使用，方便私域定制npm发布设置校验规则
validate.scopedPackagePattern = scopedPackagePattern

// 结果返回函数
var done = function (warnings, errors) {
  var result = {
    validForNewPackages: errors.length === 0 && warnings.length === 0,
    validForOldPackages: errors.length === 0,
    warnings: warnings,
    errors: errors
  }
  if (!result.warnings.length) delete result.warnings
  if (!result.errors.length) delete result.errors
  return result
}

```

## 3. 总结
validate-npm-package-name 其实就是一个校验包名的函数，很简单~<br />它的应用场景很广泛，可以用于验证组件库包名（就不用自己写验证了~），做 cli 脚手架时创建项目也可以用到，只要是规则一致。
