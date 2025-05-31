import { FastifyInstance } from 'fastify';

import { createClientSchema } from '../schemas/client.schema'
import * as clientController from '../controllers/client.controller';

export default async function routes(fastify: FastifyInstance) {
  fastify.get('/', clientController.getAllClients);
  fastify.post('/', { schema: createClientSchema }, clientController.createClient);
};
