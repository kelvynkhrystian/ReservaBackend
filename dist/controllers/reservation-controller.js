import { ReservationService } from '../services/reservation-service.js';
const reservationService = new ReservationService();
export class ReservationController {
    async create(request, reply) {
        try {
            const body = request.body;
            const reservation = await reservationService.create({
                userId: request.user.id,
                roomId: body.roomId,
                numberOfParticipants: body.numberOfParticipants,
                startAt: body.startAt,
                endAt: body.endAt,
            });
            return reply.status(201).send(reservation);
        }
        catch (error) {
            return reply.status(400).send({ error: error.message });
        }
    }
    async list(request, reply) {
        try {
            const reservations = await reservationService.list();
            return reply.send(reservations);
        }
        catch (error) {
            return reply.status(500).send({ error: error.message });
        }
    }
    async show(request, reply) {
        try {
            const { id } = request.params;
            const reservation = await reservationService.findById(id);
            return reply.send(reservation);
        }
        catch (error) {
            return reply.status(404).send({ error: error.message });
        }
    }
    async update(request, reply) {
        try {
            const { id } = request.params;
            const body = request.body;
            const reservation = await reservationService.update(id, {
                roomId: body.roomId,
                numberOfParticipants: body.numberOfParticipants,
                startAt: body.startAt,
                endAt: body.endAt,
            });
            return reply.send(reservation);
        }
        catch (error) {
            return reply.status(400).send({ error: error.message });
        }
    }
    async delete(request, reply) {
        try {
            const { id } = request.params;
            const reservation = await reservationService.findById(id);
            // Usuário só pode apagar a própria reserva
            // Admin pode apagar qualquer uma
            if (reservation.user.id !== request.user.id &&
                request.user.role !== 'admin') {
                return reply.status(403).send({
                    error: 'Você não tem permissão para cancelar esta reserva.',
                });
            }
            await reservationService.delete(id);
            return reply.status(204).send();
        }
        catch (error) {
            return reply.status(400).send({ error: error.message });
        }
    }
}
