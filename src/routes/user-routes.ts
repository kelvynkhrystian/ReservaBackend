import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { UserController } from '../controllers/user-controller.js';

const userController = new UserController();

export async function userRoutes(app: FastifyInstance) {
  const appWithZod = app.withTypeProvider<ZodTypeProvider>();

  appWithZod.post(
    '/',
    {
      schema: {
        body: z.object({
          name: z.string().min(3),
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
    },
    userController.create,
  );

  appWithZod.get('/', userController.list);

  appWithZod.get(
    '/:id',
    {
      schema: { params: z.object({ id: z.string().uuid() }) },
    },
    userController.show,
  );

  appWithZod.put(
    '/:id',
    {
      schema: {
        params: z.object({ id: z.string().uuid() }),
        body: z.object({
          name: z.string().min(3).optional(),
          email: z.string().email().optional(),
          password: z.string().min(6).optional(),
        }),
      },
    },
    userController.update,
  );

  appWithZod.delete(
    '/:id',
    {
      schema: { params: z.object({ id: z.string().uuid() }) },
    },
    userController.delete,
  );
}
