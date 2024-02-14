---
title: ESLint Prettier 配置冲突解决记录
description: 问题描述VSCode 使用了 ESLint 插件和 Prettier 插件，Prettier 格式化的效果与项目的 ESLint 配置效果冲突。目标用编辑器的 Prettier 插件来美化代码，ESLint 插件来检查代码质量。解决// .eslintrc {   "extends"
pubDate: 2021-08-06T07:10:26.000Z
---

# 问题描述
VSCode 使用了 ESLint 插件和 Prettier 插件，Prettier 格式化的效果与项目的 ESLint 配置效果冲突。

# 目标
用编辑器的 Prettier 插件来美化代码，ESLint 插件来检查代码质量。

# 解决
```json
// .eslintrc
{
  "extends": ["prettier", "eslint-config-egg/typescript"],
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```

