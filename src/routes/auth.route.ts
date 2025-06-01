import { FastifyInstance } from 'fastify';

import { loginSchema } from '../schemas/auth.schema';
import * as authController from '../controllers/auth.controller';

export default async function routes(fastify: FastifyInstance) {
  fastify.post('/',
    {
      schema: {
        tags: ['Autenticação'],
        summary: 'Login e geração de token JWT',
        ...loginSchema
      }
    },
    authController.login
  );
};
