import { FastifyRequest, FastifyReply } from 'fastify';

import { ICreateClientBody } from '../interfaces/client.interface';
import * as clientService from '../services/client.service';

export async function getAllClients(request: FastifyRequest, response: FastifyReply) {
  try {
    const clients = await clientService.getAllClients();

    return response.status(200).send({ clients });
  } catch (error: any) {
    return response.status(500).send({ error: error.message });
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
    return response.status(500).send({ error: error.message });
  }
};
