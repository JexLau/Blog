---
title: Chrome 插件简单入门
description: Chrome 插件由不同的部件构造而成，包括：后台脚本、内容脚本、选项页、UI 元素以及各种逻辑文件。https://fasionchan.com/chrome-extensions/quick-start/getting-started/manifest插件由 manifest 定义，因此需...
pubDate: 2023-06-25T13:02:33.000Z
---

Chrome 插件由不同的部件构造而成，包括：后台脚本、内容脚本、选项页、UI 元素以及各种逻辑文件。<br />[Chrome插件开发入门教程 | Chrome插件开发](https://fasionchan.com/chrome-extensions/quick-start/getting-started/)

## manifest
插件由 manifest 定义，因此需要先在插件目录下创建 manifest.json 文件<br />注意事项：

- 大部分接口，包括 storage 接口，必须注册在 manifest 配置文件 permissions 字段下，获得授权之后才能使用。

## 注册后台脚本
跟其他重要部件一样，后台脚本也必须注册到 _manifest_ 配置文件。在 _manifest_ 注册后台脚本，相当于告诉插件去哪找后台脚本，以及脚本应该执行什么事情。


## 引入用户界面
Chrome 插件可能使用各种形式的用户界面，我们先试试 Popup 弹出窗口。在插件目录创建一个名为 popup.html 的文件，并添加一个按钮来改变背景色，跟后台脚本一样，用户界面文件也要在 manifest 中注册后，才能被 Chrome 识别。我们在 manifest 中添加一个 action 对象，并将 popup.html 文件作为 default_popup 属性注册进去
```bash
{
  "name": "Coloring",
  "description": "Demo Extension to change background color!",
  "version": "1.0",
  "manifest_version": 3,
  "background": {
    "service_worker": "background.js"
  },
  "permissions": ["storage"],
  "action": {
    "default_popup": "popup.html"
  }
}
```


