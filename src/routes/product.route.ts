import { FastifyInstance } from 'fastify';

import { getAllProductsSchema } from '../schemas/product.schema';
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
};
