import dotenv from 'dotenv';
dotenv.config();

const PORT = Number(process.env.PORT) || 3333;
const HOST = `${process.env.HOST}:${PORT}`;

const swagger = {
  info: {
    title: 'aiqfome API',
    description: 'API para gerenciar clientes e seus produtos favoritos',
    version: '1.0.0'
  },
  host: HOST,
  schemes: ['http'],
  consumes: ['application/json'],
  roduces: ['application/json']
};

export default swagger;
