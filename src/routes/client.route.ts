import { FastifyInstance } from 'fastify';

import { createClientSchema } from '../schemas/client.schema'
import * as clientController from '../controllers/client.controller';

export default async function routes(fastify: FastifyInstance) {
  fastify.get('/',
    {
      schema: {
        tags: ['Clientes'],
        summary: 'Retorna os clientes',
      }
    },
    clientController.getAllClients
  );

  fastify.post('/',
    {
      schema: {
        tags: ['Clientes'],
        summary: 'Cria um novo cliente',
        ...createClientSchema
      }
    },
    clientController.createClient
  );
};
