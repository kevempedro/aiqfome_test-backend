import { FastifyInstance } from 'fastify';

import { getAllClientsSchema, getClientByIdSchema, createClientSchema } from '../schemas/client.schema'
import * as clientController from '../controllers/client.controller';

export default async function routes(fastify: FastifyInstance) {
  fastify.get('/',
    {
      schema: {
        tags: ['Clientes'],
        summary: 'Retorna os clientes',
        ...getAllClientsSchema
      },
      preHandler: fastify.authenticate,
      handler: clientController.getAllClients
    }
  );

  fastify.get('/:id',
    {
      schema: {
        tags: ['Clientes'],
        summary: 'Retorna um cliente pelo seu id',
        ...getClientByIdSchema
      },
      preHandler: fastify.authenticate,
      handler: clientController.getClientById
    }
  );

  fastify.post('/',
    {
      schema: {
        tags: ['Clientes'],
        summary: 'Cria um novo cliente',
        ...createClientSchema
      },
      preHandler: fastify.authenticate,
      handler: clientController.createClient
    }
  );
};
