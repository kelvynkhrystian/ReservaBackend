import { ConfigService } from '../services/config-service.js';
const configService = new ConfigService();
export class ConfigController {
    async show(request, reply) {
        try {
            const config = await configService.get();
            return reply.send(config);
        }
        catch (error) {
            return reply.status(500).send({
                error: error.message,
            });
        }
    }
    async update(request, reply) {
        try {
            const body = request.body;
            const config = await configService.update(body);
            return reply.send(config);
        }
        catch (error) {
            return reply.status(400).send({
                error: error.message,
            });
        }
    }
}
