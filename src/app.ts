import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { userRoutes } from './routes/user-routes.js';
import { roomRoutes } from './routes/room-routes.js';

const app = fastify({
  logger: true, // Usa o sistema de logs nativo e excelente do Fastify!
});

// Configurações de segurança globais
app.register(cors, {
  origin: '*',
});

app.register(helmet);

// Rota de teste para ver se o servidor está respondendo
app.get('/healthcheck', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Rotas
app.register(userRoutes, { prefix: '/users' });
app.register(roomRoutes, { prefix: '/rooms' });

export { app };
