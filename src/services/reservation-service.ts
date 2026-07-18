import { prisma } from '../lib/prisma.js';

export class ReservationService {
  // Criar uma nova reserva com validação de horário
  async create(data: {
    userId: string;
    roomId: string;
    numberOfParticipants: number;
    startAt: string;
    endAt: string;
  }) {
    const start = new Date(data.startAt);
    const end = new Date(data.endAt);

    if (start >= end) {
      throw new Error('A data de término deve ser maior que a data de início.');
    }

    // Regra de Ouro: Verificar se a sala já está ocupada nesse intervalo de tempo
    const conflict = await prisma.reservation.findFirst({
      where: {
        roomId: data.roomId,
        AND: [
          { startAt: { lt: end } }, // Começa antes do término pretendido
          { endAt: { gt: start } }, // Termina depois do início pretendido
        ],
      },
    });

    if (conflict) {
      throw new Error(
        'Esta sala já possui uma reserva ativa para o horário selecionado.',
      );
    }

    return await prisma.reservation.create({
      data: {
        userId: data.userId,
        roomId: data.roomId,
        numberOfParticipants: data.numberOfParticipants,
        startAt: start,
        endAt: end,
      },
    });
  }

  // Listar todas as reservas trazendo os dados do Usuário e da Sala (Join)
  async list() {
    return await prisma.reservation.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        room: {
          select: { id: true, name: true, capacity: true },
        },
      },
      orderBy: { startAt: 'desc' },
    });
  }

  // Buscar uma reserva específica
  async findById(id: string) {
    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: {
        user: { select: { name: true } },
        room: { select: { name: true } },
      },
    });

    if (!reservation) {
      throw new Error('Reserva não encontrada.');
    }

    return reservation;
  }

  // Cancelar/Deletar uma reserva
  async delete(id: string) {
    const reservation = await prisma.reservation.findUnique({ where: { id } });

    if (!reservation) {
      throw new Error('Reserva não encontrada.');
    }

    return await prisma.reservation.delete({
      where: { id },
    });
  }
}
