import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { RoomController } from '../controllers/room-controller.js';

const roomController = new RoomController();

export async function roomRoutes(app: FastifyInstance) {
  const appWithZod = app.withTypeProvider<ZodTypeProvider>();

  appWithZod.post(
    '/',
    {
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

  appWithZod.get('/', roomController.list);

  appWithZod.get(
    '/:id',
    {
      schema: { params: z.object({ id: z.string().uuid() }) },
    },
    roomController.show,
  );

  appWithZod.put(
    '/:id',
    {
      schema: {
        params: z.object({ id: z.string().uuid() }),
        body: z.object({
          name: z.string().min(1).optional(),
          capacity: z.number().int().min(1).optional(),
          description: z.string().optional(),
        }),
      },
    },
    roomController.update,
  );

  appWithZod.delete(
    '/:id',
    {
      schema: { params: z.object({ id: z.string().uuid() }) },
    },
    roomController.delete,
  );
}
