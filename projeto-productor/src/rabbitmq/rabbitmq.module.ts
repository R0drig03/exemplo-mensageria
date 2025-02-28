import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DOWNLOAD_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'download',
          queueOptions: {
            durable: true,
          },
        },
      },
    ])
  ],
  providers: [RabbitmqService],
  exports: [RabbitmqService]
})
export class RabbitMqModule {}
