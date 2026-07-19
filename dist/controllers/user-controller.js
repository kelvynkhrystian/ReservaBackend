import { UserService } from '../services/user-service.js';
const userService = new UserService();
export class UserController {
    async create(request, reply) {
        try {
            const body = request.body;
            const user = await userService.create(body);
            return reply.status(201).send(user);
        }
        catch (error) {
            return reply.status(400).send({ error: error.message });
        }
    }
    async list(request, reply) {
        try {
            const users = await userService.list();
            return reply.send(users);
        }
        catch (error) {
            return reply.status(500).send({ error: error.message });
        }
    }
    async show(request, reply) {
        try {
            const { id } = request.params;
            const user = await userService.findById(id);
            return reply.send(user);
        }
        catch (error) {
            return reply.status(444).send({ error: error.message }); // 404 Not Found
        }
    }
    async update(request, reply) {
        try {
            const { id } = request.params;
            const body = request.body;
            const updatedUser = await userService.update(id, body);
            return reply.send(updatedUser);
        }
        catch (error) {
            return reply.status(400).send({ error: error.message });
        }
    }
    async delete(request, reply) {
        try {
            const { id } = request.params;
            await userService.delete(id);
            return reply.status(204).send();
        }
        catch (error) {
            return reply.status(400).send({ error: error.message });
        }
    }
}
