import { Test, TestingModule } from '@nestjs/testing';

import { LOGGER_SERVICE, LoggerService } from '@libs/logger';
import { redisProviders } from '@libs/redis';
import { ConfigModule } from '@libs/config';

import { LinkMainController } from './controllers/link-worker-main.controller';
import { LinkHealthcheckController } from './controllers/link-worker-healthcheck.controller';
import { LinkMainService } from './services/link-worker-main.service';


describe('LinkMainController', () => {
  let linkMainController: LinkMainController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
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
    }).compile();

    linkMainController = app.get<LinkMainController>(LinkMainController);
  });

  describe('link', () => {

    it('Create link', async () => {
      const value = 'Test string for hash';

      const response = await linkMainController.create({ value });

      expect(response.status).toBe('ok');
      expect(typeof response.link).toBe('string');
      expect(typeof response.key).toBe('string');
      expect(typeof response.key).not.toBe(value);
    });

    it('Create 3 unique links', async () => {
      const value = 'Test string for hash2test';

      const response1 = await linkMainController.create({ value });
      const response2 = await linkMainController.create({ value });
      const response3 = await linkMainController.create({ value });

      expect(response1.status).toBe('ok');
      expect(typeof response1.link).toBe('string');
      expect(typeof response1.key).toBe('string');
      
      expect(response2.status).toBe('ok');
      expect(typeof response2.link).toBe('string');
      expect(typeof response2.key).toBe('string');
      
      expect(response3.status).toBe('ok');
      expect(typeof response3.link).toBe('string');
      expect(typeof response3.key).toBe('string');
      
      expect(response1.link).not.toBe(response2.link);
      expect(response1.link).not.toBe(response3.link);
      expect(response2.link).not.toBe(response3.link);
    });

    it('Get link. Not active link', async () => {
      const key = "jahsbfhfbsjdJHBDFJSHDB3242"

      const response = await linkMainController.get(key);

      expect(response).toStrictEqual({
        status: 'ok',
        value: null,
        key
      });
    });

    it('Create and get link. Active link', async () => {
      const value = 'Test string for hash2test';

      const response1 = await linkMainController.create({ value });

      expect(response1.status).toBe('ok');
      expect(typeof response1.link).toBe('string');
      expect(typeof response1.key).toBe('string');

      const response2 = await linkMainController.get(response1.key);

      expect(response2).toStrictEqual({
        status: 'ok',
        value,
        key: response1.key
      });
    });

    it('Create and get 2 unique links', async () => {
      const value = 'Test string for hash2test';

      const response1 = await linkMainController.create({ value });
      const response2 = await linkMainController.create({ value });

      expect(response1.status).toBe('ok');
      expect(typeof response1.link).toBe('string');
      expect(typeof response1.key).toBe('string');
      
      expect(response2.status).toBe('ok');
      expect(typeof response2.link).toBe('string');
      expect(typeof response2.key).toBe('string');
      
      expect(response1.link).not.toBe(response2.link);

      const response3 = await linkMainController.get(response1.key);
      const response4 = await linkMainController.get(response2.key);

      expect(response3.status).toBe('ok');
      expect(response3.value).toBe(value);
      expect(response3.key).toBe(response1.key);

      expect(response4.status).toBe('ok');
      expect(response4.value).toBe(value);
      expect(response4.key).toBe(response2.key);
    });

    it('Full flow', async () => {
      const value = 'Test string for hash2test';

      const response1 = await linkMainController.create({ value });

      expect(response1.status).toBe('ok');
      expect(typeof response1.link).toBe('string');
      expect(typeof response1.key).toBe('string');

      const response2 = await linkMainController.get(response1.key);

      expect(response2).toStrictEqual({
        status: 'ok',
        value,
        key: response1.key
      });

      const response3 = await linkMainController.get(response1.key);

      expect(response3).toStrictEqual({
        status: 'ok',
        value: null,
        key: response1.key
      });
    });
  });
});
