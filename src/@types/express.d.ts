import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        // Se você quiser manter a role aqui para facilitar a checagem no middleware:
        role?: 'user' | 'admin';
      };
    }
  }
}
