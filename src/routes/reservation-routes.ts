import { FastifyInstance } from 'fastify';
import { z } from 'zod'; // 1. Importa o Zod
import { ZodTypeProvider } from 'fastify-type-provider-zod'; // 2. Importa o provider
import { ReservationController } from '../controllers/reservation-controller.js';

const reservationController = new ReservationController();

export async function reservationRoutes(app: FastifyInstance) {
  // 3. Define o provider para ter autocompletar e validação
  const appWithZod = app.withTypeProvider<ZodTypeProvider>();

  // Exemplo de POST com validação de Body
  appWithZod.post(
    '/',
    {
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

  // Exemplo de GET/DELETE com validação de Params
  appWithZod.get(
    '/:id',
    {
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    reservationController.show,
  );

  appWithZod.delete(
    '/:id',
    {
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    reservationController.delete,
  );

  appWithZod.get('/', reservationController.list);
}
