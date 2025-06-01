import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import authPlugin from './plugins/auth';

import healthCheckRoute from './routes/health-check.route';
import authRoute from './routes/auth.route';
import clientRoute from './routes/client.route';

import swagger from './configurations/swagger.config'

const app = Fastify({ logger: true });

app.register(authPlugin);
app.register(fastifySwagger, { swagger });
app.register(fastifyCors);

// health-check route
app.register(healthCheckRoute, { prefix: '/health-check' });

// auth route
app.register(authRoute, { prefix: '/login' });

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
