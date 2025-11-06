# 发布指南

## 发布前检查清单

- [x] 代码已构建（`npm run build`）
- [x] 包名可用（`ip-query-mcp`）
- [ ] npm 账户已登录
- [ ] package.json 信息完整

## 发布步骤

### 1. 登录 npm

如果您还没有 npm 账户，请先注册：
- 访问 https://www.npmjs.com/signup
- 注册账户

然后登录：

```bash
npm login
```

输入您的：
- Username（用户名）
- Password（密码）
- Email（邮箱）
- OTP（如果启用了双因素认证）

### 2. 验证登录状态

```bash
npm whoami
```

应该显示您的 npm 用户名。

### 3. 检查包信息

```bash
# 查看将要发布的内容
npm pack --dry-run

# 检查包名是否可用（404 表示可用）
npm view ip-query-mcp
```

### 4. 发布到 npm

```bash
npm publish --access public
```

> **注意**: 使用 `--access public` 确保包是公开的（即使您的账户是免费的）

### 5. 验证发布

发布成功后，可以通过以下方式验证：

```bash
# 查看已发布的包
npm view ip-query-mcp

# 尝试安装
npm install -g ip-query-mcp
```

## 更新版本

如果需要发布新版本：

```bash
# 更新版本号（会自动更新 package.json）
npm version patch   # 1.0.0 -> 1.0.1 (补丁版本)
npm version minor   # 1.0.0 -> 1.1.0 (次要版本)
npm version major   # 1.0.0 -> 2.0.0 (主要版本)

# 发布新版本
npm publish --access public
```

## 常见问题

### 问题：发布失败 - 包名已存在

**解决方案**: 包名 `ip-query-mcp` 当前可用，如果将来被占用，需要修改 `package.json` 中的 `name` 字段。

### 问题：发布失败 - 需要认证

**解决方案**: 运行 `npm login` 登录您的账户。

### 问题：发布失败 - 权限不足

**解决方案**: 确保您登录的账户有权限发布该包名。

## 发布后的操作

1. 在 GitHub 上创建仓库（如果还没有）
2. 更新 `package.json` 中的 `repository.url`
3. 添加 GitHub 链接到 README
4. 创建 release tag

