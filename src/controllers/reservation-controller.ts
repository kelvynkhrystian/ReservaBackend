import { FastifyReply, FastifyRequest } from 'fastify';
import { ReservationService } from '../services/reservation-service.js';

const reservationService = new ReservationService();

export class ReservationController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as any;
      const reservation = await reservationService.create(body);
      return reply.status(201).send(reservation);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }

  async list(request: FastifyRequest, reply: FastifyReply) {
    try {
      const reservations = await reservationService.list();
      return reply.send(reservations);
    } catch (error: any) {
      return reply.status(500).send({ error: error.message });
    }
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const reservation = await reservationService.findById(id);
      return reply.send(reservation);
    } catch (error: any) {
      return reply.status(404).send({ error: error.message });
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      await reservationService.delete(id);
      return reply.status(204).send();
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }
}
