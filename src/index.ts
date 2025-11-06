#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { APIClient } from './client.js';
import { loadConfig } from './config.js';

async function main() {
  // 加载配置
  const config = loadConfig();

  // 创建 API 客户端
  const apiClient = new APIClient(
    config.apiBaseURL,
    config.appId,
    config.secret
  );

  // 创建 MCP 服务器
  const server = new Server(
    {
      name: 'ip-query-mcp',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // 定义工具列表
  const tools = [
    {
      name: 'query_ip',
      description: '查询IP地址的归属地信息，包括国家、省份、城市、ISP等信息',
      inputSchema: {
        type: 'object' as const,
        properties: {
          ip: {
            type: 'string' as const,
            description: '要查询的IP地址（可选，不传则查询请求方IP）',
          },
        },
      },
    },
    {
      name: 'get_balance',
      description: '获取当前账户的余额信息',
      inputSchema: {
        type: 'object' as const,
        properties: {},
      },
    },
    {
      name: 'get_usage_stats',
      description: '获取账户的使用统计信息，包括今日使用量、总使用量和余额',
      inputSchema: {
        type: 'object' as const,
        properties: {},
      },
    },
  ];

  // 处理工具列表请求
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools,
    };
  });

  // 处理工具调用请求
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
      let result: any;

      switch (name) {
        case 'query_ip': {
          const ip = (args as any)?.ip as string | undefined;
          result = await apiClient.queryIP(ip);
          break;
        }

        case 'get_balance': {
          result = await apiClient.getBalance();
          break;
        }

        case 'get_usage_stats': {
          result = await apiClient.getUsageStats();
          break;
        }

        default:
          throw new Error(`Unknown tool: ${name}`);
      }

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error: any) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Error: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  });

  // 启动服务器
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('IP Query MCP Server started');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

