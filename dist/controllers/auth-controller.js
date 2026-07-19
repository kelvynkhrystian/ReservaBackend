import jwt from 'jsonwebtoken';
import { AuthService } from '../services/auth-service.js';
const authService = new AuthService();
export class AuthController {
    async login(req, res) {
        try {
            // O Zod já validou o body no middleware, então o req.body está seguro
            const { email, password } = req.body;
            const user = await authService.login(email, password);
            // Usando jsonwebtoken para assinar o token
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1d' });
            return res.status(200).json({
                user,
                token,
            });
        }
        catch (error) {
            return res.status(401).json({
                error: error.message,
            });
        }
    }
    async logout(req, res) {
        try {
            await authService.logout();
            return res.status(200).json({
                message: 'Logout realizado com sucesso.',
            });
        }
        catch (error) {
            return res.status(400).json({
                error: error.message,
            });
        }
    }
}
