import { UserService } from '../services/user-service.js';
const userService = new UserService();
export class UserController {
    async create(req, res) {
        try {
            const body = req.body;
            const user = await userService.create(body);
            return res.status(201).json(user);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async list(req, res) {
        try {
            const users = await userService.list();
            return res.status(200).json(users);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async show(req, res) {
        try {
            const { id } = req.params;
            const user = await userService.findById(id);
            return res.status(200).json(user);
        }
        catch (error) {
            // Corrigido de 444 para 404 (Not Found)
            return res.status(404).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const body = req.body;
            const updatedUser = await userService.update(id, body);
            return res.status(200).json(updatedUser);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            await userService.delete(id);
            return res.status(204).send();
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async updateMyEmail(req, res) {
        try {
            const userId = req.user.id;
            const { newEmail, password } = req.body;
            const user = await userService.updateMyEmail(userId, {
                newEmail,
                password,
            });
            return res.status(200).json(user);
        }
        catch (error) {
            return res.status(400).json({
                error: error.message,
            });
        }
    }
    async updateMyPassword(req, res) {
        try {
            const userId = req.user.id;
            const { currentPassword, newPassword } = req.body;
            await userService.updateMyPassword(userId, {
                currentPassword,
                newPassword,
            });
            return res.status(200).json({
                message: 'Senha atualizada com sucesso.',
            });
        }
        catch (error) {
            return res.status(400).json({
                error: error.message,
            });
        }
    }
}
