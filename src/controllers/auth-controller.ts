import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthService } from '../services/auth-service.js';

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      // O Zod já validou o body no middleware, então o req.body está seguro
      const { email, password } = req.body as {
        email: string;
        password: string;
      };

      const user = await authService.login(email, password);

      // Usando jsonwebtoken para assinar o token
      const secret = process.env.JWT_SECRET!;
      const token = jwt.sign(
        { id: user.id, role: user.role },
        secret,
        { expiresIn: '1d' }, // Defina o tempo de expiração conforme sua necessidade
      );

      return res.status(200).json({
        user,
        token,
      });
    } catch (error: any) {
      return res.status(401).json({
        error: error.message,
      });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      await authService.logout();

      return res.status(200).json({
        message: 'Logout realizado com sucesso.',
      });
    } catch (error: any) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}
