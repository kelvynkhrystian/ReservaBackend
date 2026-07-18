import { FastifyReply, FastifyRequest } from 'fastify';
import { RoomService } from '../services/room-service.js';

const roomService = new RoomService();

export class RoomController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as {
        name: string;
        capacity: number;
        description?: string;
      };
      const room = await roomService.create(body);
      return reply.status(201).send(room);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    try {
      const rooms = await roomService.list();
      return reply.send(rooms);
    } catch (error: any) {
      return reply.status(500).send({ error: error.message });
    }
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const room = await roomService.findById(id);
      return reply.send(room);
    } catch (error: any) {
      return reply.status(404).send({ error: error.message });
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const body = request.body as any;
      const updatedRoom = await roomService.update(id, body);
      return reply.send(updatedRoom);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      await roomService.delete(id);
      return reply.status(204).send();
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }
}
