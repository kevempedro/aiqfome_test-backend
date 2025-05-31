import { FastifyInstance } from 'fastify';

export default function routes(fastify: FastifyInstance) {
  fastify.get('/',
    {
      schema: {
        tags: ['Health Check']
      }
    },
    () => { return 'API IS RUNNING!!!'; }
  );
}
