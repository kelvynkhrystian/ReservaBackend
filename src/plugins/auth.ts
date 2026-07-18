import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export async function authPlugin(app: FastifyInstance) {
  app.decorate(
    'authenticate',
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch {
        return reply.status(401).send({
          error: 'Não autorizado.',
        });
      }
    },
  );

  app.decorate(
    'verifyAdmin',
    async function (request: FastifyRequest, reply: FastifyReply) {
      if (request.user.role !== 'admin') {
        return reply.status(403).send({
          error: 'Acesso permitido somente para administradores.',
        });
      }
    },
  );
}
