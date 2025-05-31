import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';

import healthCheckRoute from './routes/health-check.route';
import clientRoute from './routes/client.route';

const app = Fastify({ logger: true });

app.register(fastifyCors);

app.register(healthCheckRoute, { prefix: '/health-check' });
app.register(clientRoute, { prefix: '/clients' });

export default app;
