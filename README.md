# ip-query-mcp

Model Context Protocol (MCP) server for IP query service, installable via npm.

[中文](README.zh-CN.md) | [English](README.md)

## Installation

### Global Installation

```bash
npm install -g ip-query-mcp
```

### Using npx (No Installation Required)

You can also use it directly with npx without installing:

```bash
npx --yes ip-query-mcp
```

## Package Information

- **npm Package**: [ip-query-mcp](https://www.npmjs.com/package/ip-query-mcp)
- **Version**: 1.0.0
- **License**: MIT

## Quick Start

### 0. Get API Credentials

Before using, you need to obtain API credentials (AppId and Secret) from the IP query service website:

1. Visit [http://ips.chataudit.net/](http://ips.chataudit.net/)
2. Register/Login to your account
3. Get your **AppId** and **Secret** from the user center or API documentation page

> **Tip**: AppId and Secret are used for API authentication. Please keep them secure and do not share with others.

### 1. Configuration

#### Method 1: Environment Variables (Recommended)

Configure the AppId and Secret obtained in the previous step as environment variables:

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

#### Method 2: Configuration File

Create a configuration file `~/.ip-mcp/config.json` and fill in the AppId and Secret obtained from the website:

```json
{
  "app_id": "your_app_id",
  "secret": "your_secret",
  "api_base_url": "http://ips.chataudit.net"
}
```

**Note**: 
- Windows path: `C:\Users\YourName\.ip-mcp\config.json`
- Linux/macOS path: `~/.ip-mcp/config.json`

### 2. Configure MCP Client

#### Claude Desktop

Edit the configuration file (location varies by system):

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`  
**Linux**: `~/.config/Claude/claude_desktop_config.json`

**Option 1: Using global installation**

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

**Option 2: Using npx (recommended)**

```json
{
  "mcpServers": {
    "ip-query": {
      "command": "npx",
      "args": ["--yes", "ip-query-mcp"],
      "env": {
        "MCP_APP_ID": "your_app_id",
        "MCP_SECRET": "your_secret",
        "MCP_API_BASE_URL": "http://ips.chataudit.net"
      }
    }
  }
}
```

If using the configuration file method, you can simplify to:

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

Edit the MCP configuration file (usually located at `~/.cursor/mcp.json` on Windows, or `~/.config/Cursor/mcp.json` on Linux/macOS):

**Windows**: `%USERPROFILE%\.cursor\mcp.json`  
**macOS/Linux**: `~/.config/Cursor/mcp.json`

```json
{
  "mcpServers": {
    "ip-query": {
      "command": "cmd",
      "args": ["/c", "npx", "--yes", "ip-query-mcp"],
      "env": {
        "MCP_APP_ID": "your_app_id",
        "MCP_SECRET": "your_secret",
        "MCP_API_BASE_URL": "http://ips.chataudit.net"
      }
    }
  }
}
```

**Note for Windows users**: Use `cmd` with `/c` and `npx` to run the package. For Linux/macOS, you can use:

```json
{
  "mcpServers": {
    "ip-query": {
      "command": "npx",
      "args": ["--yes", "ip-query-mcp"],
      "env": {
        "MCP_APP_ID": "your_app_id",
        "MCP_SECRET": "your_secret",
        "MCP_API_BASE_URL": "http://ips.chataudit.net"
      }
    }
  }
}
```

If using the configuration file method, you can simplify to:

```json
{
  "mcpServers": {
    "ip-query": {
      "command": "cmd",
      "args": ["/c", "npx", "--yes", "ip-query-mcp"]
    }
  }
}
```

### 3. Usage

After configuration, you can use it directly in AI assistants:

- "Query the location of IP address 8.8.8.8"
- "What is my account balance?"
- "How many queries have I used today?"

## Available Tools

### query_ip

Query IP address location information.

**Parameters**:
- `ip` (optional): The IP address to query. If not provided, queries the requester's IP

**Returns**:
```json
{
  "code": 200,
  "ip": "8.8.8.8",
  "country": "United States",
  "province": "California",
  "city": "Mountain View",
  "area": "",
  "isp": "Google"
}
```

### get_balance

Get the current account balance.

**Parameters**: None

**Returns**:
```json
{
  "code": 200,
  "msg": "Balance retrieved successfully",
  "balance": "850"
}
```

### get_usage_stats

Get account usage statistics.

**Parameters**: None

**Returns**:
```json
{
  "code": 200,
  "msg": "Usage data retrieved successfully",
  "day": 15,
  "total": 120,
  "balance": 850
}
```

## Development

### Local Development

```bash
# Clone repository
git clone <repository-url>
cd ip-query-mcp

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build
npm run build

# Run
npm start
```

## Troubleshooting

### Command Not Found

If you cannot find the `ip-query-mcp` command after installation:

1. Check if npm global bin directory is in PATH:
   ```bash
   npm config get prefix
   ```

2. Add npm global bin directory to PATH (if not already)

### Authentication Failed

- Check if AppId and Secret are correct (obtain from [http://ips.chataudit.net/](http://ips.chataudit.net/))
- Ensure IP query service is running
- Check if API base URL is correct (default: `http://ips.chataudit.net`)
- Verify account balance is sufficient

### Tool Call Failed

- Check if account balance is sufficient
- Check IP query service logs
- Verify network connection

## License

MIT
