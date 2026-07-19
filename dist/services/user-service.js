import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcrypt';
export class UserService {
    // Criar Usuário no Banco
    async create(data) {
        // Regra de negócio simples: não permitir emails duplicados
        const emailExists = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (emailExists) {
            throw new Error('E-mail já cadastrado no sistema.');
        }
        return await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role || 'USER',
            },
        });
    }
    // Listar todos os Usuários
    async list() {
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
    }
    // Buscar Usuário por ID
    async findById(id) {
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });
        if (!user) {
            throw new Error('Usuário não encontrado.');
        }
        return user;
    }
    // Atualizar Usuário
    async update(id, data) {
        // Verifica se o usuário existe antes de atualizar
        await this.findById(id);
        return await prisma.user.update({
            where: { id },
            data,
        });
    }
    // Deletar Usuário
    async delete(id) {
        await this.findById(id);
        return await prisma.user.delete({
            where: { id },
        });
    }
    async updateMyEmail(userId, data) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new Error('Usuário não encontrado.');
        }
        const passwordMatch = await bcrypt.compare(data.password, user.password);
        if (!passwordMatch) {
            throw new Error('Senha incorreta.');
        }
        const emailExists = await prisma.user.findUnique({
            where: {
                email: data.newEmail,
            },
        });
        if (emailExists && emailExists.id !== user.id) {
            throw new Error('Este email já está em uso.');
        }
        return await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                email: data.newEmail,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            },
        });
    }
    async updateMyPassword(userId, data) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw new Error('Usuário não encontrado.');
        }
        const passwordMatch = await bcrypt.compare(data.currentPassword, user.password);
        if (!passwordMatch) {
            throw new Error('Senha atual incorreta.');
        }
        const hash = await bcrypt.hash(data.newPassword, 10);
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                password: hash,
            },
        });
    }
}
