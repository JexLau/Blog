---
title: mac fnm 使用
description: 安装方式macOS / Linux 环境：curl -fsSL https://fnm.vercel.app/install | bash  # 或者 brew install fnm  # 如果安装了cargo cargo install fnm常用命令fnm -h             ...
pubDate: 2023-01-16T03:39:09.000Z
---

### 安装方式
macOS / Linux 环境：
```bash
curl -fsSL https://fnm.vercel.app/install | bash

# 或者
brew install fnm

# 如果安装了cargo
cargo install fnm
```

### <br />常用命令
```bash
fnm -h              # 查看帮助
fnm install 17.0.0  # 安装指定 Node.js 版本
fnm use 17.0.0      # 使用指定 Node.js 版本
fnm default 17.0.0  # 设置默认 Node.js 版本（记得配置为最常用的版本）
fnm list            # 查看已安装的 Node.js
```
**PS: fnm default 记得配置为最常用的版本**

### 配置全局
在开始使用 fnm 之前需要设置环境变量。fnm use要在目录包含.node-versionor.nvmrc文件时自动运行，请将--use-on-cd选项添加到您的 shell 设置中。

1. Adding .node-version to your project is as simple as:
```bash
$ node --version
v14.18.3
$ node --version > .node-version
```

2. Check out the following guides for the shell you use:

#### Bash
```bash
Add the following to your .bashrc profile:
eval "$(fnm env --use-on-cd)"
```

#### Zsh
```bash
Add the following to your .zshrc profile:
eval "$(fnm env --use-on-cd)"
```
