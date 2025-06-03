import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import authPlugin from './plugins/auth';
import databaseConnectionPlugin from './plugins/database-connection';

import healthCheckRoute from './routes/health-check.route';
import authRoute from './routes/auth.route';
import clientRoute from './routes/client.route';
import productRoute from './routes/product.route';

import swagger from './configurations/swagger.config'

const app = Fastify({ logger: true });

app.register(authPlugin);
app.register(databaseConnectionPlugin);
app.register(fastifySwagger, { swagger });
app.register(fastifyCors);

// health-check route
app.register(healthCheckRoute, { prefix: '/health-check' });

// auth route
app.register(authRoute, { prefix: '/login' });

// clients routes
app.register(clientRoute, { prefix: '/clients' });

// products routes
app.register(productRoute, { prefix: '/products' });

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
