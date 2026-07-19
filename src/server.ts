// import 'dotenv/config';
// import { app } from './app.js';

// const port = Number(process.env.PORT) || 3333;

// app.listen(port, '0.0.0.0', () => {
//   console.log('INICIANDO...');
//   console.log(`Servidor Express rodando na porta ${port}`);
//   console.log('JWT:', !!process.env.JWT_SECRET);
//   console.log('DATABASE:', !!process.env.DATABASE_URL);
//   console.log('SERVIDOR ONLINE');
// });

import express from 'express';

const app = express();

app.get('/', (_, res) => {
  res.send('OK');
});

const port = Number(process.env.PORT) || 3000;

console.log('ANTES DO LISTEN');

app.listen(port, '0.0.0.0', () => {
  console.log('SERVIDOR SUBIU!');
});
