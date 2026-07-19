import { prisma } from '../lib/prisma.js';
export class RoomService {
    // Criar uma nova sala
    async create(data) {
        // Regra: Não permitir salas com o mesmo nome
        const roomExists = await prisma.room.findFirst({
            where: { name: data.name },
        });
        if (roomExists) {
            throw new Error('Já existe uma sala cadastrada com este nome.');
        }
        return await prisma.room.create({
            data,
        });
    }
    // Listar todas as salas
    async list() {
        return await prisma.room.findMany({
            orderBy: {
                name: 'asc',
            },
        });
    }
    // Buscar uma sala específica por ID
    async findById(id) {
        const room = await prisma.room.findUnique({
            where: { id },
        });
        if (!room) {
            throw new Error('Sala não encontrada.');
        }
        return room;
    }
    // Atualizar dados da sala
    async update(id, data) {
        await this.findById(id);
        return await prisma.room.update({
            where: { id },
            data,
        });
    }
    // Deletar uma sala
    async delete(id) {
        await this.findById(id);
        return await prisma.room.delete({
            where: { id },
        });
    }
}
