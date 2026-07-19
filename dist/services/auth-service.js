import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma.js';
export class AuthService {
    async login(email, password) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw new Error('Email ou senha inválidos.');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Email ou senha inválidos.');
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
    }
    async logout() {
        return true;
    }
}
