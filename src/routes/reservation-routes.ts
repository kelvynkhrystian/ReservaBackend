import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { ReservationController } from '../controllers/reservation-controller.js';

const reservationController = new ReservationController();

export async function reservationRoutes(app: FastifyInstance) {
  const appWithZod = app.withTypeProvider<ZodTypeProvider>();

  // Criar reserva - usuário autenticado
  appWithZod.post(
    '/',
    {
      onRequest: [app.authenticate],
      schema: {
        body: z.object({
          userId: z.string().uuid(),
          roomId: z.string().uuid(),
          numberOfParticipants: z.number().int().min(1),
          startAt: z.string().datetime(),
          endAt: z.string().datetime(),
        }),
      },
    },
    reservationController.create,
  );

  // Buscar reserva por ID - usuário autenticado
  appWithZod.get(
    '/:id',
    {
      onRequest: [app.authenticate],
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    reservationController.show,
  );

  // Deletar reserva - usuário autenticado
  appWithZod.delete(
    '/:id',
    {
      onRequest: [app.authenticate],
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    reservationController.delete,
  );

  // Listar reservas - usuário autenticado
  appWithZod.get(
    '/',
    {
      onRequest: [app.authenticate],
    },
    reservationController.list,
  );
}
