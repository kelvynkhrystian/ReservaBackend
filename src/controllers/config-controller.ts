import { Request, Response } from 'express';
import { ConfigService } from '../services/config-service.js';

const configService = new ConfigService();

export class ConfigController {
  async show(req: Request, res: Response) {
    try {
      const config = await configService.get();

      return res.status(200).json(config);
    } catch (error: any) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      // O middleware de validação do Zod já garantiu que o body está correto
      const body = req.body;

      const config = await configService.update(body);

      return res.status(200).json(config);
    } catch (error: any) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}
