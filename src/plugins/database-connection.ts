import fastifyPlugin from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { Client } from 'pg';

import dotenv from 'dotenv';
dotenv.config();

declare module 'fastify' {
  interface FastifyInstance {
    connection: Client
  }
};

const databaseConnection: FastifyPluginAsync = async (fastify) => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  await client.connect();

  fastify.decorate('connection', client);

  fastify.addHook('onClose', async () => {
    await client.end();
  });
};

export default fastifyPlugin(databaseConnection);
