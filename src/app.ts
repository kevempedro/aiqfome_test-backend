import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

import healthCheckRoute from './routes/health-check.route';
import clientRoute from './routes/client.route';

import dotenv from 'dotenv';
dotenv.config();

const app = Fastify({ logger: true });

const PORT = Number(process.env.PORT) || 3333;
const HOST = `${process.env.HOST}:${PORT}`;

app.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'aiqfome API',
      description: 'API para gerenciar clientes e seus produtos favoritos',
      version: '1.0.0'
    },
    host: HOST,
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
})

app.register(fastifyCors);

// health-check route
app.register(healthCheckRoute, { prefix: '/health-check' });

// clients routes
app.register(clientRoute, { prefix: '/clients' });

// documentation route
app.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  staticCSP: true
});

export default app;
