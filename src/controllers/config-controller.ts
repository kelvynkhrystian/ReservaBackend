import { FastifyReply, FastifyRequest } from 'fastify';
import { ConfigService } from '../services/config-service.js';

const configService = new ConfigService();

export class ConfigController {
  async show(request: FastifyRequest, reply: FastifyReply) {
    try {
      const config = await configService.get();

      return reply.send(config);
    } catch (error: any) {
      return reply.status(500).send({
        error: error.message,
      });
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as any;

      const config = await configService.update(body);

      return reply.send(config);
    } catch (error: any) {
      return reply.status(400).send({
        error: error.message,
      });
    }
  }
}
