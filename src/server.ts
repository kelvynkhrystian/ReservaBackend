import 'dotenv/config';
import http from 'node:http';

const PORT = Number(process.env.PORT) || 3333;

console.log('INICIANDO...');
console.log('PORT:', PORT);
console.log('JWT:', !!process.env.JWT_SECRET);
console.log('DATABASE:', !!process.env.DATABASE_URL);

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.end(
    JSON.stringify({
      status: 'ok',
      message: 'Servidor funcionando!',
      timestamp: new Date().toISOString(),
    }),
  );
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`SERVIDOR ONLINE na porta ${PORT}`);
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
