---
title: Git 使用小技巧
description: 1. 修改 .gitignore 规则后不生效的解决办法在项目过程中，我发现每个目录都会自动生成一个 .DS_Store 文件。这个不是我想要的文件，对于项目没有任何帮助。因此我们想要忽略掉这个文件，不让它提交到版本库中去。可是修改了 .gitignore 文件之后，发现并没有生效。+ .DS...
pubDate: 2021-07-14T22:50:51.000Z
---

# 1. 修改 .gitignore 规则后不生效的解决办法
在项目过程中，我发现每个目录都会自动生成一个 .DS_Store 文件。这个不是我想要的文件，对于项目没有任何帮助。因此我们想要忽略掉这个文件，不让它提交到版本库中去。

可是修改了 .gitignore 文件之后，发现并没有生效。
```bash
+ .DS_Store
```
这里面涉及到 .gitignore 的一个重要规则。.gitignore 会忽略掉那些还没有被 track 的文件。如果文件已经被提交到版本库中，那么 .gitignore 是无效的。

解决办法是先把那些提交过的文件，修改成为未 track 状态，然后再重新提交。其实就是先把提交过的要忽略的文件删除。
```bash
git rm -r --cached .
git add .
git commit -m '删除缓存'
```
来源：[https://www.jianshu.com/p/9891a249b87a](https://www.jianshu.com/p/9891a249b87a)
