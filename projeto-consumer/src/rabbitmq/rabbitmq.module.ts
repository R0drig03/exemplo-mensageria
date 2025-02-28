import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { rabbitMQController } from './rabbitmq.controller';

@Module({
  controllers: [rabbitMQController],
  providers: [RabbitMQService],
})
export class RabbitmqModule {}
