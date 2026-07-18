import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { RoomController } from '../controllers/room-controller.js';

const roomController = new RoomController();

export async function roomRoutes(app: FastifyInstance) {
  const appWithZod = app.withTypeProvider<ZodTypeProvider>();

  // Criar sala - somente ADMIN
  appWithZod.post(
    '/',
    {
      onRequest: [app.authenticate, app.verifyAdmin],
      schema: {
        body: z.object({
          name: z.string().min(1),
          capacity: z.number().int().min(1),
          description: z.string().optional(),
        }),
      },
    },
    roomController.create,
  );

  // Listar salas - usuário autenticado
  appWithZod.get(
    '/',
    {
      onRequest: [app.authenticate],
    },
    roomController.list,
  );

  // Buscar sala - usuário autenticado
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
    roomController.show,
  );

  // Atualizar sala - somente ADMIN
  appWithZod.put(
    '/:id',
    {
      onRequest: [app.authenticate, app.verifyAdmin],
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          name: z.string().min(1).optional(),
          capacity: z.number().int().min(1).optional(),
          description: z.string().optional(),
        }),
      },
    },
    roomController.update,
  );

  // Deletar sala - somente ADMIN
  appWithZod.delete(
    '/:id',
    {
      onRequest: [app.authenticate, app.verifyAdmin],
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    roomController.delete,
  );
}
