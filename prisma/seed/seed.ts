import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('Iniciando seed...');

  // Limpeza na ordem correta devido às chaves estrangeiras
  await prisma.reservation.deleteMany();
  await prisma.room.deleteMany();
  await prisma.user.deleteMany();

  // 1. Criar Usuários
  const adminPassword = await bcrypt.hash('admin', 10);
  const userPassword = await bcrypt.hash('user', 10);

  const admin = await prisma.user.create({
    data: {
      name: 'admin',
      email: 'admin@teste.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  const user = await prisma.user.create({
    data: {
      name: 'user',
      email: 'user@teste.com',
      password: userPassword,
      role: 'USER',
    },
  });

  // 2. Criar 10 Salas
  const rooms = [];

  for (let i = 1; i <= 10; i++) {
    rooms.push({
      name: `Sala ${i}`,
      capacity: 10 + (i - 1) * 4,
      description: `Descrição da sala ${i}`,
    });
  }

  await prisma.room.createMany({
    data: rooms,
  });

  const createdRooms = await prisma.room.findMany();

  // 3. Criar 20 Reservas
  const reservations = [];

  for (let i = 0; i < 20; i++) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + i);

    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 2);

    reservations.push({
      userId: i % 2 === 0 ? admin.id : user.id,
      roomId: createdRooms[i % createdRooms.length].id,
      numberOfParticipants: 2,
      startAt: startDate,
      endAt: endDate,
    });
  }

  await prisma.reservation.createMany({
    data: reservations,
  });

  console.log('Seed completo: 2 usuários, 10 salas e 20 reservas criadas!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
