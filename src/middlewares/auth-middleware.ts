import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js'; // Ajuste o caminho conforme o seu projeto

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).json({ message: 'Erro no formato do token' });
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: 'Token mal formatado' });
  }

  try {
    const secret = process.env.JWT_SECRET!;

    const decoded = jwt.verify(token, secret);

    console.log('TOKEN DECODIFICADO:');
    console.log(decoded);

    req.user = {
      id: (decoded as any).id,
    };

    console.log('REQ.USER:');
    console.log(req.user);

    next();
  } catch (err) {
    console.log(err);

    return res.status(401).json({
      message: 'Token inválido',
    });
  }
};

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (user?.role !== 'admin') {
      return res.status(403).json({
        message: 'Acesso negado: Requer privilégios de administrador',
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno na verificação' });
  }
};
