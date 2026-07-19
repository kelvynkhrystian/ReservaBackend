import { Request, Response } from 'express';
import { UserService } from '../services/user-service.js';

const userService = new UserService();

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const body = req.body;
      const user = await userService.create(body);
      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const users = await userService.list();
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const user = await userService.findById(id);
      return res.status(200).json(user);
    } catch (error: any) {
      // Corrigido de 444 para 404 (Not Found)
      return res.status(404).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const body = req.body;
      const updatedUser = await userService.update(id, body);
      return res.status(200).json(updatedUser);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      await userService.delete(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async updateMyEmail(req: Request, res: Response) {
    try {
      const userId = req.user!.id;

      const { newEmail, password } = req.body;

      const user = await userService.updateMyEmail(userId, {
        newEmail,
        password,
      });

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  async updateMyPassword(req: Request, res: Response) {
    try {
      const userId = req.user!.id;

      const { currentPassword, newPassword } = req.body;

      await userService.updateMyPassword(userId, {
        currentPassword,
        newPassword,
      });

      return res.status(200).json({
        message: 'Senha atualizada com sucesso.',
      });
    } catch (error: any) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}
