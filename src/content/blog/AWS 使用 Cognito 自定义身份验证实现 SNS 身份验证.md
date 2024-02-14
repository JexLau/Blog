---
title: 使用 Cognito 自定义身份验证实现 SNS 身份验证
description: 参考文章：https://bftnagoya.hateblo.jp/entry/2022/06/08/174506本文只是对使用aws使用cognito自定义身份验证实践SNS的简单记录，参考文章如上。 用户在登录页面输入电话号码。身份验证挑战定义 Lambda 被执行并确定身份验证流程。 身...
pubDate: 2022-09-19T15:29:54.000Z
heroImage: https://cdn.nlark.com/yuque/0/2022/png/1105483/1663602841917-441264ee-7769-481f-937d-d7e9ca76542c.png
---

> 参考文章：[https://bftnagoya.hateblo.jp/entry/2022/06/08/174506](https://bftnagoya.hateblo.jp/entry/2022/06/08/174506)

本文只是对使用aws使用cognito自定义身份验证实践SNS的简单记录，参考文章如上。

1.  用户在登录页面输入电话号码。
2. 身份验证挑战定义 Lambda 被执行并确定身份验证流程。
3.  身份验证质询创建 Lambda 被执行并发出[一次性密码](http://d.hatena.ne.jp/keyword/%A5%EF%A5%F3%A5%BF%A5%A4%A5%E0%A5%D1%A5%B9%A5%EF%A1%BC%A5%C9)(OTP)。 
4. [Amazon](http://d.hatena.ne.jp/keyword/Amazon)[SNS](http://d.hatena.ne.jp/keyword/SNS)被调用，SMS 被发送。
5. 在登录页面输入用户收到的OTP。
6. 身份验证质询验证 Lambda 被执行以确定输入的 OTP 是否正确
7. 认证质询定义Lambda被执行，如果判断结果正确，则认证成功并颁发[token](http://d.hatena.ne.jp/keyword/%A5%C8%A1%BC%A5%AF)
8.  认证成功后，执行认证后Lambda，更新用户属性（验证电话号码）。

### 部署资源
从 AWS Serverless Application Repository 部署 Cognito 用户池和 Lambda 函数。但是这里创建的 Cognito 用户池将不会被使用，稍后会创建，因此您可以在部署后根据需要将其删除。

1. 访问以下内容并单击 [部署]。<br />[应用程序搜索 - AWS 无服务器应用程序存储库](https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:520945424137:applications~amazon-cognito-passwordless-email-auth)<br />![](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663602841917-441264ee-7769-481f-937d-d7e9ca76542c.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&id=u533427d8&originHeight=320&originWidth=1200&originalType=url&ratio=1&rotation=0&showTitle=false&status=error&style=none&taskId=ue1137d95-c5a6-4aff-937f-51220dacc60&title=)
2. **输入发件人邮箱和用户池名称**（由于没有使用SES和用户池，**可以任意**），点击【部署】。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663603559808-d516bd4f-69e9-43ed-8dbd-c2ff6db9bcf0.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&height=856&id=u3b82f50e&originHeight=856&originWidth=1876&originalType=binary&ratio=1&rotation=0&showTitle=false&size=66388&status=error&style=none&taskId=u1bbf4386-89a6-4e62-b10d-c52f9107a38&title=&width=1876)
3. 确认从部署历史中显示[创建完成]。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663603487508-0d4d2cb2-e2c5-47d1-83c2-9857974aab08.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&height=723&id=u9761261b&originHeight=723&originWidth=1877&originalType=binary&ratio=1&rotation=0&showTitle=false&size=96806&status=error&style=none&taskId=u1aefe5cc-3052-4acf-a948-49f0fd792df&title=&width=1877)


### 创建 Cognito 用户池
由于之前创建的用户池用于电子邮件身份验证，并且在登录选项中指定了电子邮件地址，因此使用为 SMS 身份验证指定的电话号码创建一个新用户池。

1. 在AWS管理控制台中，转到 Cognito 下的用户池，然后**单击创建用户池**。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663604467443-c1a749a0-8991-4289-9350-336f432b2fe0.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&height=510&id=ubb9a91de&originHeight=510&originWidth=1891&originalType=binary&ratio=1&rotation=0&showTitle=false&size=37710&status=error&style=none&taskId=u78ed6797-444f-4146-9467-b49ef845aa8&title=&width=1891)
2. 按照屏幕上的说明设置每个项目。但是，请务必如下设置以下项目。<br />Cognito 用户池登录选项：仅检查电话号码<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663604508839-2c90411f-b3cc-4711-a979-8248b7310df8.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&height=790&id=u23322440&originHeight=790&originWidth=1318&originalType=binary&ratio=1&rotation=0&showTitle=false&size=98030&status=error&style=none&taskId=u75f3bc8b-8a65-4c27-9b8b-37940898aa6&title=&width=1318) 密码策略：至少 8 个字符，取消选中所有密码要求<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663604561106-6f307f83-4c92-44a1-ac18-14223c2df834.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&height=691&id=u46bc1902&originHeight=691&originWidth=1211&originalType=binary&ratio=1&rotation=0&showTitle=false&size=77798&status=error&style=none&taskId=u6767d32d-a551-4ca3-bc73-9fdb596b975&title=&width=1211) 多因素身份验证：无 MFA<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663604586919-9f8e2a88-3167-4e2c-8f13-809e3da6bafb.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&height=282&id=u9bd3a434&originHeight=282&originWidth=838&originalType=binary&ratio=1&rotation=0&showTitle=false&size=34215&status=error&style=none&taskId=uc8c9b6a6-95c4-4e1d-8783-57bef3f18ab&title=&width=838)忘记密码<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663604782151-f609f3da-90b3-4d08-81b9-b7bda4e6fa20.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&height=432&id=ud7eaf2c0&originHeight=432&originWidth=831&originalType=binary&ratio=1&rotation=0&showTitle=false&size=49306&status=error&style=none&taskId=u3af4ff09-78bc-429f-86f4-ffa0af7a2d4&title=&width=831)

注册配置：![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663604852165-d0d17ae2-888b-43ef-8b5d-0583cf4049c7.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&height=308&id=u94e805d0&originHeight=308&originWidth=819&originalType=binary&ratio=1&rotation=0&showTitle=false&size=28538&status=error&style=none&taskId=u5e9ef957-5c0b-4da7-b7b0-52f403da618&title=&width=819)<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663604890992-6b16ae22-c788-4fce-8cde-2cf31917dc4c.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&height=725&id=u9ba7be27&originHeight=725&originWidth=831&originalType=binary&ratio=1&rotation=0&showTitle=false&size=101173&status=error&style=none&taskId=ue71814aa-2cd0-4099-8475-118dcd86872&title=&width=831)<br />必需属性：电话号码 + 电子邮箱<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663605207756-b25044bc-889f-4ad4-ad81-a7e86636f89c.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&height=535&id=u8f9eacc0&originHeight=535&originWidth=669&originalType=binary&ratio=1&rotation=0&showTitle=false&size=34715&status=error&style=none&taskId=u964823a1-7779-4696-a5e1-2c60c87c554&title=&width=669) <br />配置消息发送<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663605293870-dbd11e4d-4ac2-43e7-8eb5-3de0c5cd20af.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&height=663&id=uaeb3b8ca&originHeight=663&originWidth=800&originalType=binary&ratio=1&rotation=0&showTitle=false&size=78409&status=error&style=none&taskId=ucf784b6d-a775-4e9c-bce9-815e809bf9a&title=&width=800)<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663605429356-78a55759-3288-4787-92ce-356d1d827969.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&height=767&id=ud6e6bc1d&originHeight=767&originWidth=835&originalType=binary&ratio=1&rotation=0&showTitle=false&size=75956&status=error&style=none&taskId=u0fbcb21b-e8a7-4260-a44c-762c8c071cc&title=&width=835)<br />身份验证流程：ALLOW_CUSTOM_AUTH<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663605515281-f88b2678-1ff1-4345-8061-015b6248eaa5.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&height=584&id=u863009df&originHeight=584&originWidth=835&originalType=binary&ratio=1&rotation=0&showTitle=false&size=53666&status=error&style=none&taskId=u29bbacef-b7de-43d5-9bf2-60e77e5ab96&title=&width=835)<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663605596166-a008d3e0-9b8f-4e93-b64c-4f6b043ad15e.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&height=801&id=uf8729372&originHeight=801&originWidth=812&originalType=binary&ratio=1&rotation=0&showTitle=false&size=85660&status=error&style=none&taskId=u2b55d9bf-bb55-41f3-9416-4bc67e28330&title=&width=812)

3. 完成设置后，单击[查看和创建]屏幕上的[创建用户池]。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663605714430-735031f2-0fb9-45ba-8111-999f8fa49e4c.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&height=820&id=u22e4276f&originHeight=820&originWidth=879&originalType=binary&ratio=1&rotation=0&showTitle=false&size=61458&status=error&style=none&taskId=ub1d1fe80-872e-40b2-8453-5cfcab27504&title=&width=879)
4. 选择创建的用户池，点击【用户池属性】中的【添加 Lambda 触发器】

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663605802015-34656de1-175b-4d6c-a4fe-22d256c1ce19.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&height=815&id=vzv0i&originHeight=815&originWidth=1859&originalType=binary&ratio=1&rotation=0&showTitle=false&size=77787&status=error&style=none&taskId=ud5900f58-8377-4ee3-892f-decb7df974d&title=&width=1859)设置 Lambda 触发器如下。<br /> 注册前 Lambda 触发器：PreSignUpVerify<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663605964765-a4a5746d-01fa-44b7-94f4-9f48f054d35f.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&height=859&id=uccae982e&originHeight=859&originWidth=856&originalType=binary&ratio=1&rotation=0&showTitle=false&size=91639&status=error&style=none&taskId=u1d40c56d-1b91-4c3f-8f67-7c0189ccf25&title=&width=856)<br /> 定义身份验证质询 Lambda 触发器：VerifyAuthChallengeResponseCreate <br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663606272602-8118bba8-81d4-4534-9114-959d85c94f94.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&height=755&id=u86cd75d4&originHeight=755&originWidth=811&originalType=binary&ratio=1&rotation=0&showTitle=false&size=65863&status=error&style=none&taskId=uad5b5784-7431-4d22-8ace-95c413c046b&title=&width=811)<br />创建身份验证质询Lambda 触发器：CreateAuthChallenge <br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663606328984-1794aa53-c98d-4926-8f27-5307decc633b.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&height=746&id=uae2ac251&originHeight=746&originWidth=821&originalType=binary&ratio=1&rotation=0&showTitle=false&size=69598&status=error&style=none&taskId=u1ca9ed28-ce36-4b11-8328-71487a6e32c&title=&width=821)<br />身份验证质询Lambda 触发器：DefineAuthChallengePost<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663606365390-83c3b782-7e6a-4971-b50d-681c752f736a.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&height=747&id=ud9148bb4&originHeight=747&originWidth=817&originalType=binary&ratio=1&rotation=0&showTitle=false&size=72846&status=error&style=none&taskId=u78bf7f9c-fea9-4a4a-a06d-a29439d3ce4&title=&width=817)<br />身份验证 Lambda 触发器：PostAuthentication<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663606499369-3b8fcb71-a59b-4fce-b4f1-cf81d9493048.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&height=766&id=u497f2335&originHeight=766&originWidth=841&originalType=binary&ratio=1&rotation=0&showTitle=false&size=67538&status=error&style=none&taskId=u6ef597d6-a141-4c3c-9eaf-84bc94994fb&title=&width=841)

5. 从下方检查您的用户池 ID 和用户池客户端 ID。保存这两个以备后用。<br />用户池 ID：用户池概览<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663606554517-6fd21c04-7834-4d08-adcd-60423eca0013.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&height=318&id=u6c5e5547&originHeight=318&originWidth=1840&originalType=binary&ratio=1&rotation=0&showTitle=false&size=27587&status=error&style=none&taskId=u69caedbb-9598-414d-b285-4848af39bd3&title=&width=1840)用户池客户端 ID：[用户池]-[应用程序集成]-[客户端 ID]<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663606652609-40166e8d-bc75-4735-b84a-a7ef33de2e48.png#clientId=uea58a47a-d82f-4&errorMessage=unknown%20error&from=paste&height=778&id=u1aadd3bb&originHeight=778&originWidth=1846&originalType=binary&ratio=1&rotation=0&showTitle=false&size=81308&status=error&style=none&taskId=uc86e6861-5b35-4359-88f4-70f7813cc84&title=&width=1846)


### 修改Lambda函数

##### 创建身份验证（创建身份验证 Lambda）
要授予对SNS的访问权限，请从 [Settings]-[Access Permissions] 添加以下 IAM 策略。允许sns发布<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663607596401-c0970cb2-d97c-41fa-a0de-35673821f5b0.png#clientId=ua3a5047d-aa69-4&errorMessage=unknown%20error&from=paste&height=866&id=ue9b47cea&originHeight=866&originWidth=1910&originalType=binary&ratio=1&rotation=0&showTitle=false&size=121850&status=error&style=none&taskId=ufe07ab4b-a4f0-42fd-b1f8-acfd71febf7&title=&width=1910)<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663607634813-507de08b-e8c4-4599-b0ea-feaca6cf5cef.png#clientId=ua3a5047d-aa69-4&errorMessage=unknown%20error&from=paste&height=792&id=uf70ce398&originHeight=792&originWidth=1919&originalType=binary&ratio=1&rotation=0&showTitle=false&size=67256&status=error&style=none&taskId=u8893d06e-b08f-4c55-83c2-250885cb5cc&title=&width=1919)<br />与原始代码的主要变化是将发送电子邮件的部分替换为发送 SNS。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1105483/1663607075653-6b960721-ee50-4b52-a3e3-7abc4532b182.png#clientId=ua3a5047d-aa69-4&errorMessage=unknown%20error&from=paste&height=760&id=u569fe62b&originHeight=760&originWidth=1656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=132178&status=error&style=none&taskId=ub2a9b2ce-0cab-44c9-8031-77b39455695&title=&width=1656)
```typescript
"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_secure_random_digit_1 = require("crypto-secure-random-digit");
const aws_sdk_1 = require("aws-sdk");
const sns = new aws_sdk_1.SNS();
exports.handler = async (event) => {
    let secretLoginCode;
    if (!event.request.session || !event.request.session.length) {
        // This is a new auth session
        // Generate a new secret login code and mail it to the user
        console.log(event.request.session);
        secretLoginCode = crypto_secure_random_digit_1.randomDigits(6).join('');
        await sendSMSviaSNS(event.request.userAttributes.phone_number, secretLoginCode);
    }
    else {
        // There's an existing session. Don't generate new digits but
        // re-use the code from the current session. This allows the user to
        // make a mistake when keying in the code and to then retry, rather
        // then needing to e-mail the user an all new code again.
        console.log(event.request.session);
        const previousChallenge = event.request.session.slice(-1)[0];
        secretLoginCode = previousChallenge.challengeMetadata.match(/CODE-(\d*)/)[1];
    }
    // This is sent back to the client app
    event.response.publicChallengeParameters = { phone: event.request.userAttributes.phone_number };
    // Add the secret login code to the private challenge parameters
    // so it can be verified by the "Verify Auth Challenge Response" trigger
    event.response.privateChallengeParameters = { secretLoginCode };
    // Add the secret login code to the session so it is available
    // in a next invocation of the "Create Auth Challenge" trigger
    event.response.challengeMetadata = `CODE-${secretLoginCode}`;
    return event;
};
async function sendSMSviaSNS(phoneNumber, secretLoginCode) {
    const params = { "Message": "Your secret code: " + secretLoginCode, "PhoneNumber": phoneNumber };
    await sns.publish(params).promise();
}
```


##### 身份验证后Lambda
post-authentication.js，原代码更新了邮箱地址的属性，但是这次我们用的是电话号码，所以我们改成更新电话号码。
```typescript
"use strict";
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const cup = new aws_sdk_1.CognitoIdentityServiceProvider();
exports.handler = async (event) => {
    if (event.request.userAttributes.phone_number_verified !== 'true') {
        const params = {
            UserPoolId: event.userPoolId,
            UserAttributes: [{
                    Name: 'phone_number_verified',
                    Value: 'true',
                }],
            Username: event.userName,
        };
        await cup.adminUpdateUserAttributes(params).promise();
    }
    return event;
};
```
