import { Body, Controller, Get, Param, Post, SetMetadata, UseGuards } from '@nestjs/common';

import { ConfigService } from '@libs/config';
import { LinkValidGuard } from '@libs/guards';

import { CreateLinkRequestDto, CreateLinkResponseDto, GetLinkResponseDto } from '../dto/links.dto';
import { LinkMainService } from '../services/link-worker-main.service';

@Controller('link')
export class LinkMainController {
  constructor(
    private readonly linkService: LinkMainService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  create(@Body() createLinkDto: CreateLinkRequestDto): Promise<CreateLinkResponseDto> {
    return this.linkService.create(createLinkDto);
  }

  @Get(':key')
  @UseGuards(LinkValidGuard)
  get(@Param('key') key: string): Promise<GetLinkResponseDto> {
    return this.linkService.get({ key });
  }
}
