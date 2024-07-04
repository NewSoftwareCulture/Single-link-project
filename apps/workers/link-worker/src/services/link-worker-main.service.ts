import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import * as bcrypt from 'bcrypt';

import { LOGGER_SERVICE, LoggerService } from '@libs/logger';
import { REDIS_CLIENT } from '@libs/redis';
import { ConfigService } from '@libs/config';

import { CreateLinkRequestDto, CreateLinkResponseDto, GetLinkRequestDto, GetLinkResponseDto } from '../dto/links.dto';

const HASH_ROUNDS = 10;

@Injectable()
export class LinkMainService {
  constructor(
    @Inject(LOGGER_SERVICE) private readonly logger: LoggerService,
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
    private readonly configService: ConfigService,
  ) {}

  private createLink(key: string): string {
    const prefix = this.configService.get('prefix');

    return `${prefix}/link/${key}`;
  }

  async create(createLinkDto: CreateLinkRequestDto): Promise<CreateLinkResponseDto> {
    const { value } = createLinkDto;

    const rawKey = await bcrypt.hash(value, HASH_ROUNDS)
    const key = rawKey.replace(/\//g, '');

    const needRegenerate = await this.redis.exists(key);
    if (needRegenerate) return this.create(createLinkDto);

    await this.redis.set(key, value);

    const link = this.createLink(key);

    return {
      status: 'ok',
      link,
      key,
    };
  }

  async get(getLinkDto: GetLinkRequestDto): Promise<GetLinkResponseDto> {
    const { key } = getLinkDto;

    const value = await this.redis.getdel(key);

    return {
      status: 'ok',
      value,
      key,
    };
  }
}
