import * as https from 'https';
import * as http from 'http';
import { URL } from 'url';
import { generateSignature } from './auth.js';

export class APIClient {
  private baseURL: string;
  private appId: string;
  private secret: string;

  constructor(baseURL: string, appId: string, secret: string) {
    this.baseURL = baseURL;
    this.appId = appId;
    this.secret = secret;
  }

  /**
   * 发送HTTP请求
   */
  private async request(
    method: string,
    path: string,
    params: Record<string, string> = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      // 生成签名
      const { timestamp, signature } = generateSignature(
        this.appId,
        this.secret,
        params
      );

      // 构建URL
      const urlObj = new URL(path, this.baseURL);
      for (const [key, value] of Object.entries(params)) {
        urlObj.searchParams.set(key, value);
      }

      // 选择HTTP或HTTPS
      const isHttps = urlObj.protocol === 'https:';
      const httpModule = isHttps ? https : http;

      const options = {
        method,
        headers: {
          'X-App-Id': this.appId,
          'X-Timestamp': timestamp,
          'X-Signature': signature,
          'Content-Type': 'application/json',
        },
      };

      const req = httpModule.request(urlObj, options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            resolve(result);
          } catch (error) {
            reject(new Error(`Failed to parse response: ${data}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      req.end();
    });
  }

  /**
   * 查询IP地址
   */
  async queryIP(ip?: string): Promise<any> {
    const params: Record<string, string> = {};
    if (ip) {
      params.ip = ip;
    }

    return this.request('GET', '/api/v1/ip', params);
  }

  /**
   * 获取余额
   */
  async getBalance(): Promise<any> {
    return this.request('GET', '/api/v1/balance');
  }

  /**
   * 获取使用统计
   */
  async getUsageStats(): Promise<any> {
    return this.request('GET', '/api/v1/usage');
  }
}

