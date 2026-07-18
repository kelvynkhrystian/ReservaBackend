import { FastifyReply, FastifyRequest } from 'fastify';
import { ReservationService } from '../services/reservation-service.js';

const reservationService = new ReservationService();

export class ReservationController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const body = request.body as any;

      const reservation = await reservationService.create({
        userId: request.user.id,
        roomId: body.roomId,
        numberOfParticipants: body.numberOfParticipants,
        startAt: body.startAt,
        endAt: body.endAt,
      });

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

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };

      const body = request.body as any;

      const reservation = await reservationService.update(id, {
        roomId: body.roomId,
        numberOfParticipants: body.numberOfParticipants,
        startAt: body.startAt,
        endAt: body.endAt,
      });

      return reply.send(reservation);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };

      const reservation = await reservationService.findById(id);

      // Usuário só pode apagar a própria reserva
      // Admin pode apagar qualquer uma
      if (
        reservation.user.id !== request.user.id &&
        request.user.role !== 'admin'
      ) {
        return reply.status(403).send({
          error: 'Você não tem permissão para cancelar esta reserva.',
        });
      }

      await reservationService.delete(id);

      return reply.status(204).send();
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  }
}
