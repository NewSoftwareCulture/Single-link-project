import { NestFactory } from '@nestjs/core';
import { LoggerService } from '@libs/logger';
import { ConfigService } from '@libs/config';

import { LinkModule } from './link-worker.module';

async function bootstrap() {
  const app = await NestFactory.create(LinkModule);

  const configService = app.get(ConfigService);
  const port = configService.get('port');
  const prefix = configService.get('prefix');

  const logger = new LoggerService(configService);

  // Add Winston logger
  app.useLogger(logger);

  // Add route prefix
  app.setGlobalPrefix(prefix);

  await app.listen(port);

  logger.info(`🔥 Server run on port: ${port}`);
}
bootstrap();
