import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const port = Number(process.env.PORT) || 3333;

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'Servidor rodando com Express e TypeScript!',
  });
});

// Inicialização (host 0.0.0.0 é obrigatório para a Hostinger)
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});

// import 'dotenv/config';
// import { app } from './app.js';

// const PORT = Number(process.env.PORT) || 3333;

// const start = async () => {
//   try {
//     console.log('INICIANDO...');
//     console.log('PORT:', PORT);
//     console.log('JWT:', !!process.env.JWT_SECRET);
//     console.log('DATABASE:', !!process.env.DATABASE_URL);

//     await app.listen({
//       port: PORT,
//       host: '0.0.0.0',
//     });

//     console.log('SERVIDOR ONLINE');
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

// start();
