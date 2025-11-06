import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

export interface Config {
  appId: string;
  secret: string;
  apiBaseURL: string;
}

/**
 * 加载配置
 * 优先级: 环境变量 > 配置文件 > 默认值
 */
export function loadConfig(): Config {
  const config: Partial<Config> = {
    apiBaseURL: 'http://ips.chataudit.net',
  };

  // 1. 从环境变量读取
  if (process.env.MCP_APP_ID) {
    config.appId = process.env.MCP_APP_ID;
  }
  if (process.env.MCP_SECRET) {
    config.secret = process.env.MCP_SECRET;
  }
  if (process.env.MCP_API_BASE_URL) {
    config.apiBaseURL = process.env.MCP_API_BASE_URL;
  }

  // 2. 如果环境变量未设置，尝试从配置文件读取
  if (!config.appId || !config.secret) {
    const homeDir = os.homedir();
    const configPath = path.join(homeDir, '.ip-mcp', 'config.json');

    if (fs.existsSync(configPath)) {
      try {
        const fileConfig = JSON.parse(
          fs.readFileSync(configPath, 'utf-8')
        ) as any;

        if (!config.appId && (fileConfig.app_id || fileConfig.appId)) {
          config.appId = fileConfig.app_id || fileConfig.appId;
        }
        if (!config.secret && fileConfig.secret) {
          config.secret = fileConfig.secret;
        }
        if (!config.apiBaseURL && (fileConfig.api_base_url || fileConfig.apiBaseURL)) {
          config.apiBaseURL = fileConfig.api_base_url || fileConfig.apiBaseURL;
        }
      } catch (error) {
        // 配置文件解析失败，忽略
      }
    }
  }

  // 3. 验证必需配置
  if (!config.appId) {
    throw new Error(
      'MCP_APP_ID 环境变量或配置文件中的 app_id 未设置'
    );
  }
  if (!config.secret) {
    throw new Error(
      'MCP_SECRET 环境变量或配置文件中的 secret 未设置'
    );
  }

  return config as Config;
}

