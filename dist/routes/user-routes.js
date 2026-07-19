import { z } from 'zod';
import { UserController } from '../controllers/user-controller.js';
const userController = new UserController();
export async function userRoutes(app) {
    const appWithZod = app.withTypeProvider();
    // Criar usuário - somente ADMIN
    appWithZod.post('/', {
        onRequest: [app.authenticate, app.verifyAdmin],
        schema: {
            body: z.object({
                name: z.string().min(3),
                email: z.string().email(),
                password: z.string().min(4),
            }),
        },
    }, userController.create);
    // Listar usuários - usuário autenticado
    appWithZod.get('/', {
        onRequest: [app.authenticate],
    }, userController.list);
    // Buscar usuário - usuário autenticado
    appWithZod.get('/:id', {
        onRequest: [app.authenticate],
        schema: {
            params: z.object({
                id: z.string().uuid(),
            }),
        },
    }, userController.show);
    // Atualizar usuário - usuário autenticado
    appWithZod.put('/:id', {
        onRequest: [app.authenticate],
        schema: {
            params: z.object({
                id: z.string().uuid(),
            }),
            body: z.object({
                name: z.string().min(3).optional(),
                email: z.string().email().optional(),
                password: z.string().min(4).optional(),
            }),
        },
    }, userController.update);
    // Deletar usuário - somente ADMIN
    appWithZod.delete('/:id', {
        onRequest: [app.authenticate, app.verifyAdmin],
        schema: {
            params: z.object({
                id: z.string().uuid(),
            }),
        },
    }, userController.delete);
}
