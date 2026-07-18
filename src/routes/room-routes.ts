import { FastifyInstance } from 'fastify';
import { RoomController } from '../controllers/room-controller.js';

const roomController = new RoomController();

export async function roomRoutes(app: FastifyInstance) {
  app.post('/', roomController.create);
  app.get('/', roomController.list);
  app.get('/:id', roomController.show);
  app.put('/:id', roomController.update);
  app.delete('/:id', roomController.delete);
}
