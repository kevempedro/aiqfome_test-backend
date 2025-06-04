import { FastifyInstance } from 'fastify';

import {
  getAllClientsSchema,
  getClientByIdSchema,
  createClientSchema,
  updateClientSchema,
  updateClientStatusSchema,
  deleteClientSchema,
  getAllFavoriteProductsSchema,
  favoriteProductSchema,
  deleteFavoriteProductSchema
} from '../schemas/client.schema';
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
      handler: clientController.createClient
    }
  );

  fastify.put('/:id',
    {
      schema: {
        tags: ['Clientes'],
        summary: 'Atualiza os dados de um cliente pelo seu id',
        ...updateClientSchema
      },
      preHandler: fastify.authenticate,
      handler: clientController.updateClient
    }
  );

  fastify.put('/change-status/:id',
    {
      schema: {
        tags: ['Clientes'],
        summary: 'Atualiza o status de um cliente pelo seu id',
        ...updateClientStatusSchema
      },
      preHandler: fastify.authenticate,
      handler: clientController.updateClientStatus
    }
  );

  fastify.delete('/:id',
    {
      schema: {
        tags: ['Clientes'],
        summary: 'Deleta um cliente pelo seu id',
        ...deleteClientSchema
      },
      preHandler: fastify.authenticate,
      handler: clientController.deleteClient
    }
  );

  fastify.get('/favorite-product',
    {
      schema: {
        tags: ['Clientes'],
        summary: 'Retorna a lista de produtos favoritos do cliente',
        ...getAllFavoriteProductsSchema
      },
      preHandler: fastify.authenticate,
      handler: clientController.getAllFavoriteProducts
    }
  );

  fastify.post('/favorite-product',
    {
      schema: {
        tags: ['Clientes'],
        summary: 'Adiciona um produto a lista de favoritos do cliente pelo id do produto',
        ...favoriteProductSchema
      },
      preHandler: fastify.authenticate,
      handler: clientController.favoriteProduct
    }
  );

  fastify.delete('/favorite-product/:productId',
    {
      schema: {
        tags: ['Clientes'],
        summary: 'Deleta um produto a lista de favoritos do cliente pelo id do produto',
        ...deleteFavoriteProductSchema
      },
      preHandler: fastify.authenticate,
      handler: clientController.deleteFavoriteProduct
    }
  );
};
