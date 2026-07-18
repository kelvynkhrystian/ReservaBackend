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

const app = fastify({
  logger: true,
}).withTypeProvider();

async function setupApp() {
  await app.register(cors, {
    origin: '*',
  });

  await app.register(jwt, {
    secret: process.env.JWT_SECRET!,
  });

  await app.register(authPlugin);

  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  await app.register(helmet);

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.get('/', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  });

  app.register(userRoutes, {
    prefix: '/users',
  });

  app.register(roomRoutes, {
    prefix: '/rooms',
  });

  app.register(reservationRoutes, {
    prefix: '/reservations',
  });

  app.register(authRoutes, {
    prefix: '/auth',
  });

  app.register(configRoutes, {
    prefix: '/config',
  });
}

await setupApp();

export { app };
