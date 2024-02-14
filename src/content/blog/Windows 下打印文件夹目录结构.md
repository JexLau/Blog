---
title: Windows 下打印文件夹目录结构
description: 参考文档：https://www.anspoon.com/tree-command-generate-directory-structure-1701.html语法：TREE [drive:][path] [/F] [/A]参数描述drive:指定包含要为其显示目录结构的磁盘的驱动器path指...
pubDate: 2021-10-04T12:55:43.000Z
heroImage: https://cdn.nlark.com/yuque/0/2021/png/1105483/1633352519990-aa01a0d9-a807-413f-b32a-a7e1d7df68bd.png
---

> 参考文档：[https://www.anspoon.com/tree-command-generate-directory-structure-1701.html](https://www.anspoon.com/tree-command-generate-directory-structure-1701.html)


语法：
```bash
TREE [drive:][path] [/F] [/A]
```
| **参数** | **描述** |
| --- | --- |
| drive: | 指定包含要为其显示目录结构的磁盘的驱动器 |
| path | 指定要为其显示目录结构的目录 |
| /F | 显示每个目录中文件的名称 |
| /A | 指定树将使用文本字符而不是图形字符来显示链接子目录的行 |
| /? | 在命令提示符下显示帮助 |


## git 使用 tree命令
> [https://blog.csdn.net/Jioho_chen/article/details/104546843](https://blog.csdn.net/Jioho_chen/article/details/104546843)

Git 使用 tree 命令可以忽略一些目录，扩展系统 tree 命令<br />[

](http://gnuwin32.sourceforge.net/packages/tree.htm)

1. 先下载一个压缩包 [http://gnuwin32.sourceforge.net/packages/tree.htm](http://gnuwin32.sourceforge.net/packages/tree.htm)，下载 binaries 对应的 zip<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/1105483/1633352519990-aa01a0d9-a807-413f-b32a-a7e1d7df68bd.png#clientId=ua22ccfa2-854f-4&from=paste&height=823&id=u10040eef&originHeight=823&originWidth=1091&originalType=binary&ratio=1&size=77818&status=done&style=none&taskId=u25c2de7c-cbe4-47fb-a577-9f22944f2f5&width=1091)
2. 下载完成，解压后打开 bin 目录<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/1105483/1633352595918-1eb28fb5-b9c2-4550-ad2e-96abf926c9a5.png#clientId=ua22ccfa2-854f-4&from=paste&height=129&id=uaecbcd62&originHeight=129&originWidth=422&originalType=binary&ratio=1&size=6044&status=done&style=none&taskId=u09974e11-70c9-45b9-a60f-1c014c2eba9&width=422)<br />把 tree.exe 复制到 git 安装目录下的 usr/bin 目录下<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/1105483/1633352646186-ee73414f-9752-48b2-9226-2cea943324a3.png#clientId=ua22ccfa2-854f-4&from=paste&height=145&id=uabf9f787&originHeight=145&originWidth=661&originalType=binary&ratio=1&size=11710&status=done&style=none&taskId=u55c4fd43-8a5f-4f58-a86b-bf1304cf8e8&width=661)

然后就可以用tree命令了

## Git 下 tree 命令的使用
> 文档：[https://wangchujiang.com/linux-command/c/tree.html](https://wangchujiang.com/linux-command/c/tree.html)


### 语法
tree(选项)(参数) <br />常用命令:<br />打印两层目录，不排序，忽略 node_modules文件夹，结果输出到 fileDirectory.txt 文件
```bash
tree -L 2 -I node_modules -U  >>fileDirectory.txt
```

### 选项
```bash------- 列表选项 -------
-a            # 显示所有文件和目录。
-d            # 显示目录名称而非文件。
-l            # 如遇到性质为符号连接的目录，直接列出该连接所指向的原始目录。
-f            # 在每个文件或目录之前，显示完整的相对路径名称。
-x            # 将范围局限在现行的文件系统中，若指定目录下的某些子目录，其存放于另一个文件系统上，则将该目录予以排除在寻找范围外。
-L level      # 限制目录显示层级。
-R            # Rerun tree when max dir level reached.
-P pattern    # <范本样式> 只显示符合范本样式的文件和目录名称。
-I pattern    # Do not list files that match the given pattern.
--ignore-case # Ignore case when pattern matching.
--matchdirs   # Include directory names in -P pattern matching.
--noreport    # Turn off file/directory count at end of tree listing.
--charset X   # Use charset X for terminal/HTML and indentation line output.
--filelimit # # Do not descend dirs with more than # files in them.
--timefmt <f> # Print and format time according to the format <f>.
-o filename   # Output to file instead of stdout.-------- 文件选项 ---------
-q            # 用“？”号取代控制字符，列出文件和目录名称。
-N            # 直接列出文件和目录名称，包括控制字符。
-Q            # Quote filenames with double quotes.
-p            # 列出权限标示。
-u            # 列出文件或目录的拥有者名称，没有对应的名称时，则显示用户识别码。
-g            # 列出文件或目录的所属群组名称，没有对应的名称时，则显示群组识别码。
-s            # 列出文件和目录大小。
-h            # Print the size in a more human readable way.
--si          # Like -h, but use in SI units (powers of 1000).
-D            # 列出文件或目录的更改时间。
-F            # 在执行文件，目录，Socket，符号连接，管道名称名称，各自加上"*"，"/"，"@"，"|"号。
--inodes      # Print inode number of each file.
--device      # Print device ID number to which each file belongs.------- 排序选项 -------
-v            # Sort files alphanumerically by version.
-t            # 用文件和目录的更改时间排序。
-c            # Sort files by last status change time.
-U            # Leave files unsorted.
-r            # Reverse the order of the sort.
--dirsfirst   # List directories before files (-U disables).
--sort X      # Select sort: name,version,size,mtime,ctime.------- 图形选项 ------
-i            # 不以阶梯状列出文件和目录名称。
-A            # 使用ASNI绘图字符显示树状图而非以ASCII字符组合。
-S            # Print with CP437 (console) graphics indentation lines.
-n            # Turn colorization off always (-C overrides).
-C            # 在文件和目录清单加上色彩，便于区分各种类型。------- XML / HTML / JSON选项 -------
-X            # Prints out an XML representation of the tree.
-J            # Prints out an JSON representation of the tree.
-H baseHREF   # Prints out HTML format with baseHREF as top directory.
-T string     # Replace the default HTML title and H1 header with string.
--nolinks     # Turn off hyperlinks in HTML output.---- 杂项选项 ----
--version     # 输入版本信息。
--help        # 打印使用帮助信息。
--            # Options processing terminator.
```

### 参数
目录：执行tree指令，它会列出指定目录下的所有文件，包括子目录里的文件。

### 实例
列出目录/private/ 第一级文件名
```bash
tree  /private/ -L 1
/private/
├── etc
├── tftpboot
├── tmp
└── var
```
忽略文件夹
```bash
tree -I node_modules # 忽略当前目录文件夹node_modules
tree -P node_modules # 列出当前目录文件夹node_modules的目录结构
tree -P node_modules -L 2 # 显示目录node_modules两层的目录树结构
tree -L 2 > /home/www/tree.txt # 当前目录结果存到 tree.txt 文件中
```
忽略多个文件夹
```bash
tree -I 'node_modules|icon|font' -L 2
```
非树状结构列出目录/private/下的所有文件
```bash
tree -if /private/

/private
/private/a1
/private/a2
/private/etc
/private/etc/b1
/private/etc/b2
/private/tftpboot
```
<br /> 
