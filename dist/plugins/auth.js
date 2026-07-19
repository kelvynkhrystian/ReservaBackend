import fp from 'fastify-plugin';
export const authPlugin = fp(async (app) => {
    app.decorate('authenticate', async function (request, reply) {
        try {
            await request.jwtVerify();
        }
        catch {
            return reply.status(401).send({
                error: 'Não autorizado.',
            });
        }
    });
    app.decorate('verifyAdmin', async function (request, reply) {
        if (request.user.role !== 'admin') {
            return reply.status(403).send({
                error: 'Acesso permitido somente para administradores.',
            });
        }
    });
});
