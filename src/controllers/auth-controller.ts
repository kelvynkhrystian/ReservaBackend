import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from '../services/auth-service.js';

const authService = new AuthService();

export class AuthController {
  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = request.body as {
        email: string;
        password: string;
      };

      const user = await authService.login(email, password);

      const token = await reply.jwtSign({
        id: user.id,
        role: user.role,
      });

      return reply.send({
        user,
        token,
      });
    } catch (error: any) {
      return reply.status(401).send({
        error: error.message,
      });
    }
  }

  async logout(request: FastifyRequest, reply: FastifyReply) {
    try {
      await authService.logout();

      return reply.send({
        message: 'Logout realizado com sucesso.',
      });
    } catch (error: any) {
      return reply.status(400).send({
        error: error.message,
      });
    }
  }
}
