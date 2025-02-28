import { Injectable, Logger } from "@nestjs/common";
import { PayloadInterface } from "./interfaces/payload.interface";
import { RmqContext } from '@nestjs/microservices';


@Injectable()
export class RabbitMQService {
    private readonly logger = new Logger(RabbitMQService.name);
    constructor() {} 


    async serviceMargem(data: PayloadInterface, contextRMQ: RmqContext) {

      try {
          const body = data.data
          this.logger.warn(`${data.id} - Solicitação de envio de email recebida. email=${body.email}`)
          
          const channel = contextRMQ.getChannelRef();
          const originalMsg = contextRMQ.getMessage();
        
          await new Promise(resolve => setTimeout(resolve, 30000));
          this.logger.log(`${data.id} - Email enviado com sucesso para ${body.email}. mensagem=${body.mensagem}`);
          channel.ack(originalMsg);
          return data;

      } catch (error) {
          this.logger.error(
              `${data.id} - Mensagem não concluída, refazendo enfileiramento de margem. Error=${error}`,
          );
      
          const channel = contextRMQ.getChannelRef();
          const originalMsg = contextRMQ.getMessage();
      
          channel.nack(originalMsg, true, false);
      }
  }

}
