import { FastifyInstance } from 'fastify';
import { axiosApi } from '../helpers/axios.helper';

import dotenv from 'dotenv';
dotenv.config();

export default async function routes(fastify: FastifyInstance) {
  fastify.get('/',
    {
      schema: {
        tags: ['Produtos'],
        summary: 'Retorna os produtos',
      },
      preHandler: fastify.authenticate,
      handler: async () => {
        const products = await axiosApi({
          method: 'GET',
          url: `${process.env.FAKE_STORE_HOST}/products`,
        });

        console.log('products -> ', products);
      }
    }
  );
};
