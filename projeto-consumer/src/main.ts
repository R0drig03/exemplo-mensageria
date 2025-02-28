import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: false});

  const config = new DocumentBuilder()
    .setTitle('APLICAÇÃO 2')
    .setDescription('TESTE')
    .setVersion('1.0')
    .build();
  

  const queues = ['email'];
  for (const queue of queues) {
    await app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin@localhost:5672'],
        queue: queue,
        noAck: false,
        queueOptions: {
          durable: true,
        },
      },
    });
  }
   
  await app.startAllMicroservices();
    
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 5001);
}
bootstrap();