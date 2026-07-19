import { z } from 'zod';
import { AuthController } from '../controllers/auth-controller.js';
const authController = new AuthController();
export async function authRoutes(app) {
    const appWithZod = app.withTypeProvider();
    appWithZod.post('/login', {
        schema: {
            body: z.object({
                email: z.string().email(),
                password: z.string().min(6),
            }),
        },
    }, authController.login);
    appWithZod.post('/logout', {
        onRequest: [app.authenticate],
    }, authController.logout);
}
