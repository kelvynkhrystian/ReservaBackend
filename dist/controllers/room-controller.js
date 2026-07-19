import { RoomService } from '../services/room-service.js';
const roomService = new RoomService();
export class RoomController {
    async create(req, res) {
        try {
            const body = req.body;
            const room = await roomService.create(body);
            return res.status(201).json(room);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async list(req, res) {
        try {
            const rooms = await roomService.list();
            return res.status(200).json(rooms);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async show(req, res) {
        try {
            const { id } = req.params;
            const room = await roomService.findById(id);
            return res.status(200).json(room);
        }
        catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const body = req.body;
            const updatedRoom = await roomService.update(id, body);
            return res.status(200).json(updatedRoom);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            await roomService.delete(id);
            return res.status(204).send();
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
