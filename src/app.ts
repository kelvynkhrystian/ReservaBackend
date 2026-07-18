import fastify from 'fastify';
import { authPlugin } from './plugins/auth.js';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import jwt from '@fastify/jwt';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { userRoutes } from './routes/user-routes.js';
import { roomRoutes } from './routes/room-routes.js';
import { reservationRoutes } from './routes/reservation-routes.js';
import { authRoutes } from './routes/auth-routes.js';
import { configRoutes } from './routes/config-routes.js';

import rateLimit from '@fastify/rate-limit';

// ADICIONAMOS O .withTypeProvider() PARA O FASTIFY RESPIRAR ZOD GLOBALMENTE
const app = fastify({
  logger: true,
}).withTypeProvider();

// Configurações de segurança globais
app.register(cors, {
  origin: '*',
});

await app.register(jwt, {
  secret: process.env.JWT_SECRET!,
});

await app.register(authPlugin);

app.register(rateLimit, {
  max: 100, // Máximo de 100 requisições
  timeWindow: '1 minute', // Por janela de 1 minuto
});

app.register(helmet);

// ATIVAMOS OS COMPILADORES QUE FAZEM A VALIDAÇÃO DO ZOD FUNCIONAR
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Rota de teste para ver se o servidor está respondendo
app.get('/', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Rotas
app.register(userRoutes, { prefix: '/users' });
app.register(roomRoutes, { prefix: '/rooms' });
app.register(reservationRoutes, { prefix: '/reservations' });
app.register(authRoutes, { prefix: '/auth' });
app.register(configRoutes, {
  prefix: '/config',
});

export { app };
