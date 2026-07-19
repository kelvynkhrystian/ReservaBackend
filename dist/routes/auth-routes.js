import { Router } from 'express';
import { AuthController } from '../controllers/auth-controller.js';
import { authenticate } from '../middlewares/auth-middleware.js';
import { validate } from '../middlewares/validate-middleware.js';
import { z } from 'zod';
const authRoutes = Router();
const authController = new AuthController();
// Login com validação Zod (via um middleware genérico de validação)
authRoutes.post('/login', validate(z.object({
    email: z.string().email(),
    password: z.string().min(6),
})), authController.login);
// Logout com middleware de autenticação
authRoutes.post('/logout', authenticate, authController.logout);
export { authRoutes };
