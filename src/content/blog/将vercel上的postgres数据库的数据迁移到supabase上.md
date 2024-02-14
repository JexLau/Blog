---
title: 将vercel上的postgres数据库的数据迁移到supabase上
description: 背景在我的一个项目中，我使用了Vercel托管的PostgreSQL数据库来支持一个监控服务。然而，Vercel对超过100小时的活跃数据库连接实施额外收费，这对于成本敏感的个人开发者或小团队来说可能是一个负担。考虑到经济效益，以及我已经是Supabase的会员，我决定将数据库迁移到Supab...
pubDate: 2024-01-06T20:44:16.000Z
heroImage: https://cdn.nlark.com/yuque/0/2024/png/1105483/1704574273042-eadc81f8-129d-4be9-87fd-87be53800c2f.png
---

### 背景

在我的一个项目中，我使用了Vercel托管的PostgreSQL数据库来支持一个监控服务。然而，Vercel对超过100小时的活跃数据库连接实施额外收费，这对于成本敏感的个人开发者或小团队来说可能是一个负担。考虑到经济效益，以及我已经是Supabase的会员，我决定将数据库迁移到Supabase，这不仅可以节省成本，还能利用Supabase提供的更多功能和灵活性。


### 安装步骤


#### 1. **备份Vercel数据库：**

-  **安装PostgreSQL工具：** 首先，如果还没有安装PostgreSQL，你需要在本地安装它。安装后，你可以使用`pg_dump`工具来备份数据库。 
-  **执行备份：** 使用以下命令格式来备份Vercel数据库：`pg_dump -h [hostname] -p [port] -U [username] -d [database] > backup.sql`。这将会创建一个名为`backup.sql`的文件，其中包含了数据库的所有数据。 

![image.png](https://cdn.nlark.com/yuque/0/2024/png/1105483/1704574273042-eadc81f8-129d-4be9-87fd-87be53800c2f.png#averageHue=%231f391f&clientId=u37928467-3c08-4&from=paste&height=140&id=u3de4ef7a&originHeight=280&originWidth=1204&originalType=binary&ratio=2&rotation=0&showTitle=false&size=127792&status=done&style=none&taskId=uc2795ce8-df68-4c03-9be6-95ab9a09f80&title=&width=602)

#### 2. **设置Supabase数据库：**

-  **创建数据库：** 登录到Supabase，创建一个新的数据库实例，或者准备一个现有的数据库实例来接收迁移的数据。 
-  **获取连接信息：** 确保你有Supabase数据库的连接信息，包括主机名、端口、用户名和密码。 


#### 3. **恢复数据到Supabase：**

- **导入数据：** 使用`psql`命令将备份的数据导入到Supabase数据库中：`psql -h [hostname] -p [port] -U [username] -d [database] < backup.sql`。这将会将你之前备份的数据导入到Supabase的数据库中。

![image.png](https://cdn.nlark.com/yuque/0/2024/png/1105483/1704574793512-872723dc-be25-4554-914e-beeb5368b605.png#averageHue=%231b3721&clientId=u37928467-3c08-4&from=paste&height=149&id=uc5c13458&originHeight=298&originWidth=1202&originalType=binary&ratio=2&rotation=0&showTitle=false&size=139810&status=done&style=none&taskId=ubcbb8dca-f97f-4411-80a0-dae5139dbe4&title=&width=601)

#### 4. **修改应用配置：**

-  **更新数据库连接串：** 将你的应用程序中的数据库连接串从指向Vercel的数据库更新为指向Supabase的数据库。 
-  **测试连接：** 在完成更新后，确保测试新的数据库连接，验证应用程序能够成功连接并操作Supabase中的数据。 


#### 5. **测试与验证：**

- **校验数据：** 确保所有表和数据都已成功迁移到Supabase，并且数据的完整性未受损害。。


### 问题

在迁移过程中，我遇到一些问题，包括：


#### 1. **版本不匹配问题：**

- **版本兼容性：** `pg_dump`工具的版本需要与Vercel数据库的PostgreSQL版本兼容。如果版本不匹配，可能需要升级你的PostgreSQL工具或者使用Docker来运行与Vercel数据库版本相匹配的`pg_dump`。


#### 2. **数据导入选择：**

- **Database vs Connection Pooling：** 在Supabase中，可以选择直接连接到数据库，或者使用连接池。对于大多数数据迁移场景，直接连接到数据库是首选，因为它提供了更直接的控制和权限管理。
