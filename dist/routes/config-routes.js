import { Router } from 'express';
import { z } from 'zod';
import { ConfigController } from '../controllers/config-controller.js';
import { authenticate, verifyAdmin } from '../middlewares/auth-middleware.js';
import { validate } from '../middlewares/validate-middleware.js';
const configRoutes = Router();
const configController = new ConfigController();
// Público - usado pelo frontend para carregar nome/logo
configRoutes.get('/', configController.show);
// Apenas ADMIN altera
configRoutes.put('/', authenticate, verifyAdmin, validate(z.object({
    systemName: z.string().min(2).optional(),
    slogan: z.string().optional(),
    logo: z.string().optional(),
    reservationInterval: z.number().int().min(0).optional(),
})), configController.update);
export { configRoutes };
