import { z } from 'zod';
import { ConfigController } from '../controllers/config-controller.js';
const configController = new ConfigController();
export async function configRoutes(app) {
    const appWithZod = app.withTypeProvider();
    // Público - usado pelo frontend para carregar nome/logo
    appWithZod.get('/', configController.show);
    // Apenas ADMIN altera
    appWithZod.put('/', {
        onRequest: [app.authenticate, app.verifyAdmin],
        schema: {
            body: z.object({
                systemName: z.string().min(2).optional(),
                slogan: z.string().optional(),
                logo: z.string().optional(),
                reservationInterval: z.number().int().min(0).optional(),
            }),
        },
    }, configController.update);
}
