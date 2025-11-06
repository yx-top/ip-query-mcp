# ip-query-mcp

IP 查询服务的 Model Context Protocol (MCP) 服务器，可通过 npm 安装使用。

[中文](README.zh-CN.md) | [English](README.md)

## 安装

```bash
npm install -g ip-query-mcp
```

## 快速开始

### 0. 获取 API 凭证

在使用之前，您需要从 IP 查询服务网站获取 API 凭证（AppId 和 Secret）：

1. 访问 [http://ips.chataudit.net/](http://ips.chataudit.net/)
2. 注册/登录您的账户
3. 在用户中心或 API 文档页面获取您的 **AppId** 和 **Secret**

> **提示**: AppId 和 Secret 用于 API 认证，请妥善保管，不要泄露给他人。

### 1. 配置

#### 方式一：环境变量（推荐）

将上一步获取的 AppId 和 Secret 配置为环境变量：

```bash
# Windows (PowerShell)
$env:MCP_APP_ID="your_app_id"
$env:MCP_SECRET="your_secret"
$env:MCP_API_BASE_URL="http://ips.chataudit.net"

# Windows (CMD)
set MCP_APP_ID=your_app_id
set MCP_SECRET=your_secret
set MCP_API_BASE_URL=http://ips.chataudit.net

# Linux/macOS
export MCP_APP_ID=your_app_id
export MCP_SECRET=your_secret
export MCP_API_BASE_URL=http://ips.chataudit.net
```

#### 方式二：配置文件

创建配置文件 `~/.ip-mcp/config.json`，填入从网站获取的 AppId 和 Secret：

```json
{
  "app_id": "your_app_id",
  "secret": "your_secret",
  "api_base_url": "http://ips.chataudit.net"
}
```

**注意**: 
- Windows 路径: `C:\Users\YourName\.ip-mcp\config.json`
- Linux/macOS 路径: `~/.ip-mcp/config.json`

### 2. 在 MCP 客户端中配置

#### Claude Desktop

编辑配置文件（位置因系统而异）：

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`  
**Linux**: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "ip-query": {
      "command": "ip-query-mcp",
      "args": [],
      "env": {
        "MCP_APP_ID": "your_app_id",
        "MCP_SECRET": "your_secret",
        "MCP_API_BASE_URL": "http://ips.chataudit.net"
      }
    }
  }
}
```

如果使用配置文件方式，可以简化为：

```json
{
  "mcpServers": {
    "ip-query": {
      "command": "ip-query-mcp"
    }
  }
}
```

#### Cursor

在 Cursor 设置中添加 MCP 服务器配置，格式与 Claude Desktop 相同。

### 3. 使用

配置完成后，在 AI 助手中可以直接使用：

- "查询 IP 地址 8.8.8.8 的归属地"
- "我的账户余额是多少？"
- "今天使用了多少次查询？"

## 可用工具

### query_ip

查询 IP 地址的归属地信息。

**参数**:
- `ip` (可选): 要查询的 IP 地址，不传则查询请求方 IP

**返回**:
```json
{
  "code": 200,
  "ip": "8.8.8.8",
  "country": "美国",
  "province": "加利福尼亚州",
  "city": "山景城",
  "area": "",
  "isp": "Google"
}
```

### get_balance

获取当前账户的余额。

**参数**: 无

**返回**:
```json
{
  "code": 200,
  "msg": "获取余额成功",
  "balance": "850"
}
```

### get_usage_stats

获取账户的使用统计信息。

**参数**: 无

**返回**:
```json
{
  "code": 200,
  "msg": "获取使用数据成功",
  "day": 15,
  "total": 120,
  "balance": 850
}
```

## 开发

### 本地开发

```bash
# 克隆仓库
git clone <repository-url>
cd ip-query-mcp

# 安装依赖
npm install

# 开发模式运行
npm run dev

# 构建
npm run build

# 运行
npm start
```

## 故障排除

### 找不到命令

如果安装后无法找到 `ip-query-mcp` 命令：

1. 检查 npm 全局 bin 目录是否在 PATH 中：
   ```bash
   npm config get prefix
   ```

2. 将 npm 全局 bin 目录添加到 PATH（如果不在）

### 认证失败

- 检查 AppId 和 Secret 是否正确（从 [http://ips.chataudit.net/](http://ips.chataudit.net/) 获取）
- 确保 IP 查询服务正在运行
- 检查 API 基础 URL 是否正确（默认为 `http://ips.chataudit.net`）
- 确认账户余额充足

### 工具调用失败

- 检查账户余额是否充足
- 查看 IP 查询服务的日志
- 验证网络连接

## 许可证

MIT
