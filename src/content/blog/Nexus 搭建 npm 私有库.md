---
title: Nexus 搭建 npm 私有库
description: 需求背景做私有库的工具有很多，如上一篇介绍的轻量级的npm包管理工具verdaccio。但刚好maven私服用的是nexus，所以最后选择了nexus来做npm的私服，和maven一套便于维护。-------------------------------------------------n...
pubDate: 2021-06-30T08:53:09.000Z
heroImage: https://cdn.nlark.com/yuque/0/2021/png/1105483/1625038571267-f371e172-c2f8-4230-9250-f6e538120953.png
---

# 需求背景

做私有库的工具有很多，如上一篇介绍的轻量级的npm包管理工具verdaccio。但刚好maven私服用的是nexus，所以最后选择了nexus来做npm的私服，和maven一套便于维护。-------------------------------------------------nexus安装过程省略-------------------------------------------------


# 创建 repository

Nexus Repository Manager 3 可以用于多种类型的包管理。此处我们要搭建的是npm包管理私服。<br />登录在界面点击设置按钮，如下图所示。<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/1105483/1625038571267-f371e172-c2f8-4230-9250-f6e538120953.png#clientId=u6dc571ef-f065-4&from=paste&height=67&id=u0117b3d7&originHeight=67&originWidth=1929&originalType=binary&ratio=1&size=15059&status=done&style=none&taskId=ub3f964ac-9667-4293-90d5-27884f7f4b1&width=1929)<br />进入设置界面，点击 Repository -> Repositories -> Create repository，接下来会进入到 Repositorty 的选择<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/1105483/1625040021012-3f385f51-e5d5-47bf-9a18-6f08d29931f2.png#clientId=u6dc571ef-f065-4&from=paste&height=321&id=ub0eccb9f&originHeight=321&originWidth=1022&originalType=binary&ratio=1&size=42983&status=done&style=none&taskId=uc236da07-8714-4a42-9ce3-8f7db35b158&width=1022)<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/1105483/1625040083596-a13240b5-5eff-4c37-a71e-d116a7a6ba3f.png#clientId=u6dc571ef-f065-4&from=paste&height=403&id=ue765c3db&originHeight=431&originWidth=801&originalType=binary&ratio=1&size=52280&status=done&style=none&taskId=u3506dd3e-c98d-4e73-a6a1-07d13ec3017&width=749)<br />**npm 有三种选择：**

- **第一种：**代理 npm 仓库，将公共 npm 服务器的资源代理缓存，减少重复下载，加快开发人员和CI服务器的下载速度。创建时选择 npm(proxy) ，只需填写 Name 和 Remote storage （公有库域名）即可。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/1105483/1625040269918-7cea3d29-7574-442c-8130-e412ae197c70.png#clientId=u6dc571ef-f065-4&from=paste&height=712&id=ub50d7bd8&originHeight=712&originWidth=1047&originalType=binary&ratio=1&size=55354&status=done&style=none&taskId=ub0a09156-54bb-4eb4-a8e3-cbc800442da&width=1047)

- **第二种：**私有 npm 仓库，用于上传自己的npm包以及第三方npm包。同样的创建步骤，只不过选择的仓库类型为 npm(hosted)。 只填写 Name 即可

![image.png](https://cdn.nlark.com/yuque/0/2021/png/1105483/1625040365476-219d6ccc-0818-4d38-9e3f-ce994b90e671.png#clientId=u6dc571ef-f065-4&from=paste&height=554&id=u12cced18&originHeight=554&originWidth=1039&originalType=binary&ratio=1&size=41654&status=done&style=none&taskId=udf36ea73-2d1e-4f48-926f-da112011d0f&width=1039)

- **第三种：**npm 仓库组，用于将多个内部或外部 npm 仓库统一为一个 npm 仓库。被添加到 npm 仓库组中的其他仓库内的包都能够通过该 npm 仓库组访问到。<br />新建一个 npm仓库组将上面两个刚刚创建的 npm 仓库都添加进去。这样可以通过这个 npm 仓库组，既可以访问公有 npm 仓库又可以访问自己的私有 npm 仓库。<br />与上面同样的创建步骤，只不过选择的仓库类型为 npm(group)，起一个名字 Name，然后选择需要添加到组里的其他 npm 仓库。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/1105483/1625040635084-72d43cae-d8ea-4eca-bc25-3cc2a4a35c81.png#clientId=u6dc571ef-f065-4&from=paste&height=812&id=ufa8ccab1&originHeight=812&originWidth=1038&originalType=binary&ratio=1&size=53004&status=done&style=none&taskId=uae9e79e7-e1fe-42d0-9377-d6e4a22aac7&width=1038)


# 验证是否可用

在 Repositories 中点击创建的 仓库。可以查看该仓库的 URL。<br />![image.png](https://cdn.nlark.com/yuque/0/2021/png/1105483/1625040809068-e09dbfd6-d85c-4e8d-9365-8c39667de5cd.png#clientId=u6dc571ef-f065-4&from=paste&height=576&id=ud64388bb&originHeight=576&originWidth=1628&originalType=binary&ratio=1&size=98247&status=done&style=none&taskId=uc643b161-674f-4199-b946-31677618089&width=1628)<br />在项目目录下创建 .npmrc 文件。文件内容为：<br />`registry=私有库包地址`<br />然后随便安装一个包试试（--loglevel info：日志级别设置为 info），从打印的日志中可以发现确实是从设置的 npm 私服下载的包：<br />`$ npm --loglevel info install react`


# 发布到 npm 私服
除了从 npm 私有库安装依赖，我们还需要将公司内部的代码打包发布到私有库中，这里需要设置 Nexus Repository Manager 的权限，这样才能使用 npm login 认证登录到我们的私服。

1. **添加权限认证**：设置权限，左侧菜单 Security -> Realms 菜单，将 npm Bearer Token Realm 添加到右边

![image.png](https://cdn.nlark.com/yuque/0/2021/png/1105483/1625041719369-6a6dbb38-743f-4634-94f1-b0b41800a03c.png#clientId=u6dc571ef-f065-4&from=paste&height=637&id=u13b7fabc&originHeight=637&originWidth=1390&originalType=binary&ratio=1&size=63115&status=done&style=none&taskId=u65cad42d-a014-45ab-8336-c52fc12dd3e&width=1390)

2. **创建角色**：创建 nx-deploy 角色，并赋于他 nx-repository-view-*-*-* 权限

![image.png](https://cdn.nlark.com/yuque/0/2021/png/1105483/1625041891440-0f0d4a21-4160-4555-9d91-448712eab4aa.png#clientId=u6dc571ef-f065-4&from=paste&height=886&id=u303ff0be&originHeight=886&originWidth=1331&originalType=binary&ratio=1&size=91702&status=done&style=none&taskId=ud2640ef3-4626-44d7-a20c-71171d81395&width=1331)

3. **创建用户**：创建用户deployer，同时设定角色为 nx-deploy
4. **全局登录**：执行命令，提示填写账号密码和邮箱，验证通过后将会在用户主目录下的 .npmrc 文件中插入一条 此仓库 url 和对应的 token。
```bash
npm login --registry=私有库包地址
```

5. **项目局部登录，在项目中的 .npmrc 文件配置**<br />_auth是 username:password 的 base64 值，这样设置的好处是 publish 时就不用 login 了
```bash
registry=私有库包地址
email=deployer@qq.com 
always-auth=true
_auth="ZGVwbG95ZXI6ZGVwbG95ZXI="
```

6. **发布控件到 npm 私有库中：**在 package.json 配置，然后在包根目录执行 npm publish 即可。
```bash
"publishConfig" : {
	"registry" : "私有库 npm-hosted 包地址"
}
```
若不想在 package.json 配置，也可以在命令行指定，如下：
```bash
npm publish --registry=私有库 npm-hosted 包地址
```


# 错误解决

1. 401无权限：
```bash
npm install
npm ERR! code E401
npm ERR! Unable to authenticate, need: BASIC realm="Sonatype Nexus Repository Manager"
```
解决办法：需要登录nexus，勾上 Administration – Secturity – Anonymous 中的 Allow anonymous users to access the server。
