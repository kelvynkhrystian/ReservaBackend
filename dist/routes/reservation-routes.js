import { z } from 'zod';
import { ReservationController } from '../controllers/reservation-controller.js';
const reservationController = new ReservationController();
export async function reservationRoutes(app) {
    const appWithZod = app.withTypeProvider();
    // Criar reserva - usuário autenticado
    appWithZod.post('/', {
        onRequest: [app.authenticate],
        schema: {
            body: z.object({
                roomId: z.string().uuid(),
                numberOfParticipants: z.number().int().min(1),
                startAt: z.string().datetime(),
                endAt: z.string().datetime(),
            }),
        },
    }, reservationController.create);
    // Listar reservas - usuário autenticado
    appWithZod.get('/', {
        onRequest: [app.authenticate],
    }, reservationController.list);
    // Buscar reserva por ID - usuário autenticado
    appWithZod.get('/:id', {
        onRequest: [app.authenticate],
        schema: {
            params: z.object({
                id: z.string().uuid(),
            }),
        },
    }, reservationController.show);
    // Atualizar reserva - usuário autenticado
    appWithZod.put('/:id', {
        onRequest: [app.authenticate],
        schema: {
            params: z.object({
                id: z.string().uuid(),
            }),
            body: z.object({
                roomId: z.string().uuid().optional(),
                numberOfParticipants: z.number().int().min(1).optional(),
                startAt: z.string().datetime().optional(),
                endAt: z.string().datetime().optional(),
            }),
        },
    }, reservationController.update);
    // Deletar reserva - usuário autenticado
    appWithZod.delete('/:id', {
        onRequest: [app.authenticate],
        schema: {
            params: z.object({
                id: z.string().uuid(),
            }),
        },
    }, reservationController.delete);
}
