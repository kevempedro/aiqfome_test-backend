import fastifyPlugin from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { FastifyPluginAsync } from 'fastify';
import { FastifyRequest, FastifyReply } from 'fastify';

import dotenv from 'dotenv';
dotenv.config();

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, response: FastifyReply) => Promise<void>;
  }
};

const authPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.register(
    fastifyJwt,
    {
      secret: process.env.JWT_TOKEN_SECRET_KEY || '',
    }
  );

  fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, response: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (error) {
        response.send(error);
      }
    }
  );
};

export default fastifyPlugin(authPlugin);
