import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RabbitmqService } from './rabbitmq/rabbitmq.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { EmailDto } from './rabbitmq/dto/margem.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly rabbitMq: RabbitmqService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Envia um email através do RabbitMQ' })
  @ApiBody({ type: EmailDto })
  envioEmail(@Body() body: EmailDto) {
    return this.rabbitMq.emitEmail(body);
  }
}
