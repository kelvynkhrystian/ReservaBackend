import { FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from '../services/user-service.js';

const userService = new UserService();

export class UserController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as any;
      const user = await userService.create(body);
      return reply.status(201).send(user);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users = await userService.list();
      return reply.send(users);
    } catch (error: any) {
      return reply.status(500).send({ error: error.message });
    }
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as any;
      const user = await userService.findById(id);
      return reply.send(user);
    } catch (error: any) {
      return reply.status(444).send({ error: error.message }); // 404 Not Found
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as any;
      const body = request.body as any;
      const updatedUser = await userService.update(id, body);
      return reply.send(updatedUser);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as any;
      await userService.delete(id);
      return reply.status(204).send();
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }
}
