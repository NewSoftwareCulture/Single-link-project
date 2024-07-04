import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { LoggerDto } from './logger.dto';
import { RedisDto } from './redis.dto';

export class ConfigDto {
  @Expose()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  port: number;

  @Expose()
  @IsOptional()
  @IsString()
  prefix: string;

  @Expose()
  @IsOptional()
  redis: RedisDto;

  @Expose()
  @IsOptional()
  logger: LoggerDto;
}
