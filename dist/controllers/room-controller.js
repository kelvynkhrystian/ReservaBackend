import { RoomService } from '../services/room-service.js';
const roomService = new RoomService();
export class RoomController {
    async create(request, reply) {
        try {
            const body = request.body;
            const room = await roomService.create(body);
            return reply.status(201).send(room);
        }
        catch (error) {
            return reply.status(400).send({ error: error.message });
        }
    }
    async list(request, reply) {
        try {
            const rooms = await roomService.list();
            return reply.send(rooms);
        }
        catch (error) {
            return reply.status(500).send({ error: error.message });
        }
    }
    async show(request, reply) {
        try {
            const { id } = request.params;
            const room = await roomService.findById(id);
            return reply.send(room);
        }
        catch (error) {
            return reply.status(404).send({ error: error.message });
        }
    }
    async update(request, reply) {
        try {
            const { id } = request.params;
            const body = request.body;
            const updatedRoom = await roomService.update(id, body);
            return reply.send(updatedRoom);
        }
        catch (error) {
            return reply.status(400).send({ error: error.message });
        }
    }
    async delete(request, reply) {
        try {
            const { id } = request.params;
            await roomService.delete(id);
            return reply.status(204).send();
        }
        catch (error) {
            return reply.status(400).send({ error: error.message });
        }
    }
}
