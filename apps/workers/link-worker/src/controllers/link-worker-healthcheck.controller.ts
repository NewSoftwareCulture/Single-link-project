import { Controller, Get, Inject, Query, Req } from '@nestjs/common';
import { Request } from 'express';

import { healthcheck, Response } from '@libs/healthcheck';

@Controller('healthcheck')
export class LinkHealthcheckController {
  @Get()
  healthcheck(@Req() req: Request): Response {
    const { method, url } = req;
    const host = req.headers['host'];

    return healthcheck({ name: 'link-worker', host, req: { method, url } });
  }
}
