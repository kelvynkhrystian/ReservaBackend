import { Request, Response } from 'express';
import { RoomService } from '../services/room-service.js';

const roomService = new RoomService();

export class RoomController {
  async create(req: Request, res: Response) {
    try {
      const body = req.body as {
        name: string;
        capacity: number;
        description?: string;
      };

      const room = await roomService.create(body);
      return res.status(201).json(room);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const rooms = await roomService.list();
      return res.status(200).json(rooms);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const room = await roomService.findById(id);
      return res.status(200).json(room);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      const body = req.body as any;

      const updatedRoom = await roomService.update(id, body);
      return res.status(200).json(updatedRoom);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params as { id: string };
      await roomService.delete(id);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
