import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user-controller.js';
const userController = new UserController();

export async function userRoutes(app: FastifyInstance) {
  // Passamos apenas a referência da função do controller para cada rota

  app.post('/', userController.create);
  app.get('/', userController.list);
  app.get('/:id', userController.show);
  app.put('/:id', userController.update);
  app.delete('/:id', userController.delete);
}
