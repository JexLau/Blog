---
title: Supabase + Nextjs + Paddle + Google Extension
description: 背景一款小sass产品，记录下开发过程，功能包含官网展示，谷歌授权登录，支付和浏览器插件。前置条件supabase 注册。paddle注册和申请，测试的时候可以用沙箱环境，也同样需要注册。google oauth 申请，要发布。开发流程简单打造一个官网，包含几个重要因素，用来申请google ...
pubDate: 2023-07-05T09:03:43.000Z
---

背景<br />一款小sass产品，记录下开发过程，功能包含官网展示，谷歌授权登录，支付和浏览器插件。

前置条件

- supabase 注册。
- paddle注册和申请，测试的时候可以用沙箱环境，也同样需要注册。
- google oauth 申请，要发布。

开发流程

- 简单打造一个官网，包含几个重要因素，用来申请google oauth。建议套模板。
   - logo 和 品牌名
   - terms of service(服务条款) 和 privacy(隐私协议) 页面
   - 产品内容描述(用来申请paddle)
- google oauth 部分
   - TODO...待cv
- paddle 部分
   - TODO... 待cv
- 产品开发过程
   - supabase 谷歌授权登录有两个


开发问题

1. 怎么理解supabase auth配置的 Site URL 和 Redirect URLs，当登录完成后，通过回调跳转该怎么配置？
```typescript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'https://your-redirect-url.com',
  }
})
```
**需要注意的是，重定向 URL 必须在 Supabase Auth 设置中的 "Redirect URLs" 列表里。这是为了保护你的应用程序不被重定向到恶意网站。**

这两个配置选项在Supabase Auth中起着非常重要的作用，特别是在安全性和用户体验方面

Site URL：这是你的网站的基础URL。这在几个方面很重要：<br />密码重置：当用户忘记密码并请求重置时，Supabase Auth会发送一封带有重置链接的邮件给用户。这个链接会导向你的网站的某个页面，让用户输入新的密码。这个URL就是通过将你的Site URL与特定的路径（通常是你的应用程序代码中设定的）拼接而成的。<br />允许列表和构造电子邮件中的URL：Site URL也作为一个允许列表存在，防止重定向到恶意网站。此外，任何需要在电子邮件中使用链接（比如验证电子邮件地址的邮件）都会基于这个Site URL构造。

Redirect URLs：这些是认证提供者在用户认证后允许重定向的URL。例如，如果你在你的应用程序中使用了像Google或Facebook这样的第三方登录服务，那么在用户使用这些服务登录后，这些服务需要知道将用户重定向回哪个页面。这就是Redirect URLs的作用。在安全性方面，只有在此列表中的URL才被允许用于重定向，这样可以防止被重定向到恶意网站。<br />你可以配置多个Redirect URLs，并且可以使用通配符来允许符合特定模式的多个URL。例如，你可以使用 https://*.yourdomain.com 来允许重定向到你域名下的任何子域。<br />总的来说，这两个配置选项是为了提高应用程序的安全性，并提供更好的用户体验。正确配置这两个选项，尤其是在处理敏感操作（如密码重置和用户认证）时，至关重要。
