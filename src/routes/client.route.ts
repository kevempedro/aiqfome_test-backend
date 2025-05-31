import { FastifyInstance } from 'fastify';

import * as clientController from '../controllers/client.controller';

export default async function routes(fastify: FastifyInstance) {
  fastify.get('/', clientController.getAllClients);
};
