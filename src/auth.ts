import * as crypto from 'crypto';

/**
 * 生成API签名
 */
export function generateSignature(
  appId: string,
  secret: string,
  params: Record<string, string>
): { timestamp: string; signature: string } {
  // 生成时间戳
  const timestamp = Math.floor(Date.now() / 1000).toString();

  // 构建签名字符串
  const sortedKeys = Object.keys(params).sort();
  const signParts: string[] = [`appId=${appId}`, `timestamp=${timestamp}`];

  for (const key of sortedKeys) {
    signParts.push(`${key}=${params[key]}`);
  }

  const signStr = signParts.join('&') + secret;

  // 使用MD5生成签名
  const signature = crypto.createHash('md5').update(signStr).digest('hex');

  return { timestamp, signature };
}

