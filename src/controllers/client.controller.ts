import { FastifyRequest, FastifyReply } from 'fastify';

import { IGetAllClientsQuery, ICreateClientBody } from '../interfaces/client.interface';
import * as clientService from '../services/client.service';

export async function getAllClients(request: FastifyRequest<{ Querystring: IGetAllClientsQuery }>, response: FastifyReply) {
  try {
    const {
      search,
      page,
      perPage
    } = request.query;

    const clients = await clientService.getAllClients({
      search,
      page,
      perPage
    });

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

export async function getClientById(request: FastifyRequest<{ Params: { id: number } }>, response: FastifyReply) {
  try {
    const { id } = request.params;

    const client = await clientService.getClientById(id);

    return response.status(200).send(client);
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

export async function updateClient(request: FastifyRequest<{ Params: { id: number }, Body: ICreateClientBody }>, response: FastifyReply) {
  try {
    const { id } = request.params;

    const {
      name,
      email,
      birthDate
    } = request.body;

    await clientService.updateClient(
      {
        name,
        email,
        birthDate
      },
      id
    );

    return response.status(200).send();
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

export async function deleteClient(request: FastifyRequest<{ Params: { id: number } }>, response: FastifyReply) {
  try {
    const { id } = request.params;

    await clientService.deleteClient(id);

    return response.status(200).send();
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
