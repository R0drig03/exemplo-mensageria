import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitmqService {
  constructor(@Inject('EMAIL_SERVICE') private client: ClientProxy) {}

  emitEmail(body: { email: string; mensagem: string }) {
    try {
      this.client.emit('email-envio', {
        id: `${Math.random() * 100}`,
        data: body,
      });

      return {
        status: 200,
        destino: body.email,
        mensagem: body.mensagem,
        status_mensagem: 'Mensagem enviada por email',
      };
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }


}
