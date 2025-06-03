import { FastifyInstance } from 'fastify';

import { getAllProductsSchema, getProductByIdSchema } from '../schemas/product.schema';
import * as productController from '../controllers/product.controller';

export default async function routes(fastify: FastifyInstance) {
  fastify.get('/',
    {
      schema: {
        tags: ['Produtos'],
        summary: 'Retorna os produtos',
        ...getAllProductsSchema
      },
      preHandler: fastify.authenticate,
      handler: productController.getAllProducts
    }
  );

    fastify.get('/:id',
    {
      schema: {
        tags: ['Produtos'],
        summary: 'Retorna um produto pelo seu id',
        ...getProductByIdSchema
      },
      preHandler: fastify.authenticate,
      handler: productController.getProductById
    }
  );
};
