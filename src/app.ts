import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { userRoutes } from './routes/user-routes.js';
import { roomRoutes } from './routes/room-routes.js';
import { reservationRoutes } from './routes/reservation-routes.js';

// ADICIONAMOS O .withTypeProvider() PARA O FASTIFY RESPIRAR ZOD GLOBALMENTE
const app = fastify({
  logger: true,
}).withTypeProvider();

// Configurações de segurança globais
app.register(cors, {
  origin: '*',
});

app.register(helmet);

// ATIVAMOS OS COMPILADORES QUE FAZEM A VALIDAÇÃO DO ZOD FUNCIONAR
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Rota de teste para ver se o servidor está respondendo
app.get('/healthcheck', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Rotas
app.register(userRoutes, { prefix: '/users' });
app.register(roomRoutes, { prefix: '/rooms' });
app.register(reservationRoutes, { prefix: '/reservations' });

export { app };
