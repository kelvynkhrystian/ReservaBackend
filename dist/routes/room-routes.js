import { Router } from 'express';
import { z } from 'zod';
import { RoomController } from '../controllers/room-controller.js';
import { authenticate, verifyAdmin } from '../middlewares/auth-middleware.js';
import { validate } from '../middlewares/validate-middleware.js';
const roomRoutes = Router();
const roomController = new RoomController();
// Criar sala - somente ADMIN
roomRoutes.post('/', authenticate, verifyAdmin, validate(z.object({
    name: z.string().min(1),
    capacity: z.number().int().min(1),
    description: z.string().optional(),
})), roomController.create);
// Listar salas - usuário autenticado
roomRoutes.get('/', authenticate, roomController.list);
// Buscar sala - usuário autenticado
roomRoutes.get('/:id', authenticate, validate(z.object({ id: z.string().uuid() }), 'params'), roomController.show);
// Atualizar sala - somente ADMIN
roomRoutes.put('/:id', authenticate, verifyAdmin, validate(z.object({ id: z.string().uuid() }), 'params'), validate(z.object({
    name: z.string().min(1).optional(),
    capacity: z.number().int().min(1).optional(),
    description: z.string().optional(),
})), roomController.update);
// Deletar sala - somente ADMIN
roomRoutes.delete('/:id', authenticate, verifyAdmin, validate(z.object({ id: z.string().uuid() }), 'params'), roomController.delete);
export { roomRoutes };
