import { FastifyInstance } from 'fastify';
import { ReservationController } from '../controllers/reservation-controller.js';

const reservationController = new ReservationController();

export async function reservationRoutes(app: FastifyInstance) {
  app.post('/', reservationController.create);
  app.get('/', reservationController.list);
  app.get('/:id', reservationController.show);
  app.delete('/:id', reservationController.delete);
}
