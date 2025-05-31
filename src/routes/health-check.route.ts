import { FastifyInstance } from 'fastify';

export default function routes(fastify: FastifyInstance) {
  fastify.get('/', () => {
    return 'API IS RUNNING!!!';
  });
}
