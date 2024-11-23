import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express'; // Express 타입만 활용

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('RequestLogger');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, body, query, params } = req;
    const timestamp = new Date().toISOString();

    // 조건부 로그 생성
    const logParts = [
      `[${timestamp}] ${method} ${url}`,
      query && Object.keys(query).length ? `Query: ${JSON.stringify(query)}` : null,
      params && Object.keys(params).length ? `Params: ${JSON.stringify(params)}` : null,
      body && Object.keys(body).length ? `Body: ${JSON.stringify(body)}` : null,
    ].filter(Boolean); // null 제거

    // 간결한 로그 출력
    this.logger.log(logParts.join(' | '));
    next();
  }
}
