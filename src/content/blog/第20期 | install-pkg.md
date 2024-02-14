---
title: 第20期 | install-pkg
description: 1. 源码简介官网简介：Install package programmatically. Detect package managers automatically (npm, yarn and pnpm)简单理解，就是用于检查包管理器，自动安装依赖。https://github.com/a...
pubDate: 2022-07-27T01:25:49.000Z
heroImage: https://cdn.nlark.com/yuque/0/2022/png/1105483/1658889144942-0b8a2dd1-498a-4eac-8c9d-08f23b1d5219.png
---

## 1. 源码简介
官网简介：Install package programmatically. Detect package managers automatically (npm, yarn and pnpm)<br />简单理解，就是用于检查包管理器，自动安装依赖。<br />[GitHub - antfu/install-pkg: Install package programmatically.](https://github.com/antfu/install-pkg)

## 2. 使用
```shell
npm i @antfu/install-pkg
import { installPackage } from '@antfu/install-pkg'
await installPackage('vite', { silent: true })
```

## 3. 读源码
从入口 src/index.ts进去看，只对外暴露了两个文件，detect.ts 和 install.ts，意为探测和安装，功能职责划分得很明显。

先看看detect.ts，非常简短的代码，其中 [find-up](https://github.com/sindresorhus/find-up) 这个包是用来查找文件路径。<br />这段代码意思很简单，根据当前目录lock文件，返回它是哪个类型的包管理器(npm | pnpm | yarn)。
```typescript
import path from 'path'
import findUp from 'find-up'

export type PackageManager = 'pnpm' | 'yarn' | 'npm'

const LOCKS: Record<string, PackageManager> = {
  'pnpm-lock.yaml': 'pnpm',
  'yarn.lock': 'yarn',
  'package-lock.json': 'npm',
}

/**
* @params cwd: current working directory
*/
export async function detectPackageManager(cwd = process.cwd()) {
  // /Users/install-pkg/pnpm-lock.yaml
  const result = await findUp(Object.keys(LOCKS), { cwd })
  // pnpm
  const agent = (result ? LOCKS[path.basename(result)] : null) 
  return agent
}

```

再看看install.ts，最终结果是用到了 [execa](https://github.com/sindresorhus/execa) 这个包用来执行脚本。
```typescript
import execa from 'execa'
import { detectPackageManager } from '.'

export interface InstallPackageOptions {
  // 目录路径
  cwd?: string
  // 安装包是开发还是生产
  dev?: boolean
  // stdio
  silent?: boolean
  // 指定包管理
  packageManager?: string
  // 离线安装模式， --prefer-offline 优先使用缓存数据
  preferOffline?: boolean
  // 额外参数
  additionalArgs?: string[]
}

export async function installPackage(names: string | string[], options: InstallPackageOptions = {}) {
  const agent = options.packageManager || await detectPackageManager(options.cwd) || 'npm'
  if (!Array.isArray(names))
    names = [names]

  const args = options.additionalArgs || []

  // npm 提供了离线安装模式，使用 --offline, --prefer-offline, --prefer-online 可以指定离线模式。
  if (options.preferOffline)
    args.unshift('--prefer-offline')
  
  // 最终执行命令类似于 pnpm install -D --prefer-offine release-it react antd
  return execa(
    agent,
    [
      agent === 'yarn'
        ? 'add'
        : 'install',
      options.dev ? '-D' : '',
      ...args,
      ...names,
    ].filter(Boolean),
    {
      // https://nodejs.org/api/child_process.html#optionsstdio
      stdio: options.silent ? 'ignore' : 'inherit',
      cwd: options.cwd,
    },
  )
}
```

## 4. 总结流程
简单说，这就是一个通过脚本命令去安装依赖的包。

## ![install-pkg.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1658889144942-0b8a2dd1-498a-4eac-8c9d-08f23b1d5219.png#clientId=u1fb380fd-b81a-4&from=drop&id=ub851e97f&originHeight=454&originWidth=834&originalType=binary&ratio=1&rotation=0&showTitle=false&size=49694&status=done&style=none&taskId=uc1753f91-3a2f-439b-b16d-6958dea641c&title=)
