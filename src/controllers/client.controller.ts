import { FastifyRequest, FastifyReply } from 'fastify';

import * as clientService from '../services/client.service';

export async function getAllClients(request: FastifyRequest, response: FastifyReply) {
  try {
    const clients = await clientService.getAllClients();

    return response.status(200).send({ clients });
  } catch (error: any) {
    return response.status(500).send({ error: error.message });
  }
};
