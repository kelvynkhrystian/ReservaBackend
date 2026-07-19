import { Request, Response } from 'express';
import { ReservationService } from '../services/reservation-service.js';

const reservationService = new ReservationService();

export class ReservationController {
  async create(req: Request, res: Response) {
    try {
      const { roomId, numberOfParticipants, startAt, endAt } = req.body as any;

      const reservation = await reservationService.create({
        userId: req.user.id, // Acessa o ID do usuário autenticado
        roomId,
        numberOfParticipants,
        startAt,
        endAt,
      });

      return res.status(201).json(reservation);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const reservations = await reservationService.list();
      return res.status(200).json(reservations);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const reservation = await reservationService.findById(id);
      return res.status(200).json(reservation);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const body = req.body as any;

      const reservation = await reservationService.update(id, {
        roomId: body.roomId,
        numberOfParticipants: body.numberOfParticipants,
        startAt: body.startAt,
        endAt: body.endAt,
      });

      return res.status(200).json(reservation);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const reservation = await reservationService.findById(id);

      // Usuário só pode apagar a própria reserva ou Admin pode tudo
      if (reservation.user.id !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          error: 'Você não tem permissão para cancelar esta reserva.',
        });
      }

      await reservationService.delete(id);
      return res.status(204).send(); // 204 No Content
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
