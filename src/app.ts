import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { userRoutes } from './routes/user-routes.js';
import { roomRoutes } from './routes/room-routes.js';
import { reservationRoutes } from './routes/reservation-routes.js';
import { authRoutes } from './routes/auth-routes.js';
import { configRoutes } from './routes/config-routes.js';

const app = express();

// Middlewares
app.use(cors({ origin: '*' }));
app.use(helmet());
app.use(express.json());

// Rate Limit
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 100,
});
app.use(limiter);

// Rotas
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.use('/users', userRoutes);
app.use('/rooms', roomRoutes);
app.use('/reservations', reservationRoutes);
app.use('/auth', authRoutes);
app.use('/config', configRoutes);

export { app };
