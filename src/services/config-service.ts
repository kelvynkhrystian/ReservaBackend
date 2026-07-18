import { prisma } from '../lib/prisma.js';

export class ConfigService {
  async get() {
    let config = await prisma.systemConfig.findFirst();

    if (!config) {
      config = await prisma.systemConfig.create({
        data: {
          systemName: 'Sistema de Reservas',
          slogan: 'Reserve sua sala com facilidade',
          logo: '',
          reservationInterval: 0,
        },
      });
    }

    return config;
  }

  async update(data: any) {
    const config = await this.get();

    return await prisma.systemConfig.update({
      where: {
        id: config.id,
      },
      data: {
        systemName: data.systemName,
        slogan: data.slogan,
        logo: data.logo,
        reservationInterval: data.reservationInterval,
      },
    });
  }
}
