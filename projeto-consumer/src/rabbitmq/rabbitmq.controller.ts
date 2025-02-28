import { Controller, Logger } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { RabbitMQService } from './rabbitmq.service';
import { PayloadInterface } from './interfaces/payload.interface';

@Controller()
export class rabbitMQController {
  constructor(
    private readonly mqService: RabbitMQService,
  ) {}

  
  @MessagePattern('email-envio')
  async consumerMensagem(@Payload() data: PayloadInterface, @Ctx() context: RmqContext) {
    await this.mqService.serviceMargem(data, context)
  }
}
