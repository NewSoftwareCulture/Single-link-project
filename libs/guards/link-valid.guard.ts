import { Injectable, CanActivate, ExecutionContext, Inject, BadRequestException } from '@nestjs/common';
import { Redis } from 'ioredis';

import { LoggerService, LOGGER_SERVICE } from '@libs/logger';
import { REDIS_CLIENT } from '@libs/redis';

@Injectable()
export class LinkValidGuard implements CanActivate {
  constructor(
    @Inject(LOGGER_SERVICE) private readonly logger: LoggerService,
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.getArgByIndex(0);
    const { key } = ctx.params;

    const isExists = await this.redis.exists(key);

    if (!isExists) {
      this.logger.warn(`Link is not exists by "${key}"`);
      throw new BadRequestException(`Link has expired`);
    }

    return true;
  }
}
