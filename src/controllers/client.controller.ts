import { FastifyRequest, FastifyReply } from 'fastify';

import { ICreateClientBody } from '../interfaces/client.interface';
import * as clientService from '../services/client.service';

export async function getAllClients(request: FastifyRequest, response: FastifyReply) {
  try {
    const clients = await clientService.getAllClients();

    return response.status(200).send(clients);
  } catch (error: any) {
    const {
      statusCode,
      message,
      code
    } = error;

    return response.status(statusCode || 500).send({
      message: message || 'Erro interno no servidor',
      code: code || 'internal_server_error',
    });
  }
};

export async function createClient(request: FastifyRequest<{ Body: ICreateClientBody }>, response: FastifyReply) {
  try {
    const {
      name,
      email,
      password,
      birthDate
    } = request.body;

    await clientService.createClient({
      name,
      email,
      password,
      birthDate
    });

    return response.status(201).send();
  } catch (error: any) {
    const {
      statusCode,
      message,
      code
    } = error;

    return response.status(statusCode || 500).send({
      message: message || 'Erro interno no servidor',
      code: code || 'internal_server_error',
    });
  }
};
