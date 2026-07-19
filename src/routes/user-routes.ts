import { Router } from 'express';
import { z } from 'zod';
import { UserController } from '../controllers/user-controller.js';
import { authenticate, verifyAdmin } from '../middlewares/auth-middleware.js';
import { validate } from '../middlewares/validate-middleware.js';

const userRoutes = Router();
const userController = new UserController();

// Criar usuário - somente ADMIN
userRoutes.post(
  '/',
  authenticate,
  verifyAdmin,
  validate(
    z.object({
      name: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(4),
    }),
  ),
  userController.create,
);

// Listar usuários - usuário autenticado
userRoutes.get('/', authenticate, userController.list);

// Buscar usuário - usuário autenticado
userRoutes.get(
  '/:id',
  authenticate,
  validate(z.object({ id: z.string().uuid() }), 'params'),
  userController.show,
);

// Atualizar usuário - usuário autenticado
userRoutes.put(
  '/:id',
  authenticate,
  validate(z.object({ id: z.string().uuid() }), 'params'),
  validate(
    z.object({
      name: z.string().min(3).optional(),
      email: z.string().email().optional(),
      password: z.string().min(4).optional(),
    }),
  ),
  userController.update,
);

// Deletar usuário - somente ADMIN
userRoutes.delete(
  '/:id',
  authenticate,
  verifyAdmin,
  validate(z.object({ id: z.string().uuid() }), 'params'),
  userController.delete,
);

export { userRoutes };
