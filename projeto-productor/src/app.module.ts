import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitMqModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
