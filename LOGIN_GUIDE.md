# npm 登录指南

## 问题说明

如果您的 npm registry 设置为淘宝镜像（`https://registry.npmmirror.com`），需要切换到官方源才能登录和发布包。

## 解决步骤

### 1. 切换到官方 npm 源

```bash
npm config set registry https://registry.npmjs.org
```

### 2. 验证源已切换

```bash
npm config get registry
```

应该显示：`https://registry.npmjs.org`

### 3. 登录 npm

#### 方式一：使用 npm login（推荐）

```bash
npm login
```

然后输入：
- Username（您在 npmjs.com 注册的用户名）
- Password（密码）
- Email（注册邮箱）
- OTP（如果启用了双因素认证）

#### 方式二：使用 npm adduser

```bash
npm adduser
```

这会打开浏览器进行登录。

### 4. 验证登录状态

```bash
npm whoami
```

应该显示您的 npm 用户名。

## 常见问题

### 问题：显示"不能公开注册"

**可能原因**：
1. 邮箱未验证 - 请检查注册邮箱并点击验证链接
2. 账户被限制 - 联系 npm 支持
3. 网络问题 - 检查网络连接

**解决方案**：
1. 访问 https://www.npmjs.com/ 登录您的账户
2. 检查邮箱验证状态
3. 如果邮箱未验证，请验证邮箱
4. 重新尝试登录

### 问题：登录后仍然无法发布

**检查**：
1. 确认 registry 是官方源：`npm config get registry`
2. 确认已登录：`npm whoami`
3. 检查包名是否可用：`npm view ip-query-mcp`

## 临时切换回淘宝镜像（仅用于安装）

如果需要临时使用淘宝镜像安装包，可以使用：

```bash
# 临时使用淘宝镜像安装
npm install --registry=https://registry.npmmirror.com <package-name>

# 或者全局切换（不推荐，会影响发布）
npm config set registry https://registry.npmmirror.com
```

**注意**：发布包时必须使用官方源 `https://registry.npmjs.org`

