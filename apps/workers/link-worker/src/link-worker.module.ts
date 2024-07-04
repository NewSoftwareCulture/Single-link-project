import { MiddlewareConsumer, Module } from '@nestjs/common';

import { LOGGER_SERVICE, LoggerService } from '@libs/logger';
import { LoggerMiddleware } from '@libs/middleware';
import { ConfigModule } from '@libs/config';
import { redisProviders } from '@libs/redis';

// Controllers
import { LinkHealthcheckController } from './controllers/link-worker-healthcheck.controller';
import { LinkMainController } from './controllers/link-worker-main.controller';

// Services
import { LinkMainService } from './services/link-worker-main.service';

@Module({
  imports: [
    ConfigModule,
  ],
  controllers: [
    LinkHealthcheckController,
    LinkMainController,
  ],
  providers: [
    LinkMainService,
    {
      provide: LOGGER_SERVICE,
      useClass: LoggerService,
    },
    ...redisProviders,
  ],
})
export class LinkModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(LinkHealthcheckController);
    consumer.apply(LoggerMiddleware).forRoutes(LinkMainController);
  }
}
