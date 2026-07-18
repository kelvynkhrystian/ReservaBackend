import { prisma } from '../lib/prisma.js';

export class ReservationService {
  private async getReservationInterval() {
    const config = await prisma.systemConfig.findFirst();

    return config?.reservationInterval ?? 0;
  }

  private async validateCapacity(roomId: string, participants: number) {
    const room = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });

    if (!room) {
      throw new Error('Sala não encontrada.');
    }

    if (participants > room.capacity) {
      throw new Error(
        `A sala suporta no máximo ${room.capacity} participantes.`,
      );
    }
  }

  private async checkConflict(
    roomId: string,
    start: Date,
    end: Date,
    excludeReservationId?: string,
  ) {
    const conflict = await prisma.reservation.findFirst({
      where: {
        roomId,

        id: excludeReservationId ? { not: excludeReservationId } : undefined,

        AND: [
          {
            startAt: {
              lt: end,
            },
          },
          {
            endAt: {
              gt: start,
            },
          },
        ],
      },
    });

    if (conflict) {
      throw new Error(
        `A sala já possui uma reserva nesse período. Considere um intervalo de 10 minutos entre reservas.`,
      );
    }
  }

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

    await this.validateCapacity(data.roomId, data.numberOfParticipants);

    const interval = await this.getReservationInterval();

    const endWithInterval = new Date(end);

    endWithInterval.setMinutes(endWithInterval.getMinutes() + interval);

    await this.checkConflict(data.roomId, start, endWithInterval);

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

  async update(
    id: string,
    data: {
      roomId?: string;
      numberOfParticipants?: number;
      startAt?: string;
      endAt?: string;
    },
  ) {
    const reservation = await prisma.reservation.findUnique({
      where: {
        id,
      },
    });

    if (!reservation) {
      throw new Error('Reserva não encontrada.');
    }

    const start = data.startAt ? new Date(data.startAt) : reservation.startAt;

    const end = data.endAt ? new Date(data.endAt) : reservation.endAt;

    const roomId = data.roomId ?? reservation.roomId;

    const participants =
      data.numberOfParticipants ?? reservation.numberOfParticipants;

    if (start >= end) {
      throw new Error('A data de término deve ser maior que a data de início.');
    }

    await this.validateCapacity(roomId, participants);

    const interval = await this.getReservationInterval();

    const endWithInterval = new Date(end);

    endWithInterval.setMinutes(endWithInterval.getMinutes() + interval);

    await this.checkConflict(roomId, start, endWithInterval, id);

    return await prisma.reservation.update({
      where: {
        id,
      },

      data: {
        roomId,

        numberOfParticipants: participants,

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
