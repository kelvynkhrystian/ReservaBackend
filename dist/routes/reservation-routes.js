import { Router } from 'express';
import { z } from 'zod';
import { ReservationController } from '../controllers/reservation-controller.js';
import { authenticate } from '../middlewares/auth-middleware.js';
import { validate } from '../middlewares/validate-middleware.js';
const reservationRoutes = Router();
const reservationController = new ReservationController();
// Criar reserva - usuário autenticado
reservationRoutes.post('/', authenticate, validate(z.object({
    roomId: z.string().uuid(),
    numberOfParticipants: z.number().int().min(1),
    startAt: z.string().datetime(),
    endAt: z.string().datetime(),
})), reservationController.create);
// Listar reservas - usuário autenticado
reservationRoutes.get('/', authenticate, reservationController.list);
// Buscar reserva por ID - usuário autenticado
reservationRoutes.get('/:id', authenticate, validate(z.object({ id: z.string().uuid() }), 'params'), // Veja a nota abaixo
reservationController.show);
// Atualizar reserva - usuário autenticado
reservationRoutes.put('/:id', authenticate, validate(z.object({ id: z.string().uuid() }), 'params'), validate(z.object({
    roomId: z.string().uuid().optional(),
    numberOfParticipants: z.number().int().min(1).optional(),
    startAt: z.string().datetime().optional(),
    endAt: z.string().datetime().optional(),
})), reservationController.update);
// Deletar reserva - usuário autenticado
reservationRoutes.delete('/:id', authenticate, validate(z.object({ id: z.string().uuid() }), 'params'), reservationController.delete);
export { reservationRoutes };
