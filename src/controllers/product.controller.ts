import { FastifyRequest, FastifyReply } from 'fastify';

import * as productService from '../services/product.service';

export async function getAllProducts(request: FastifyRequest<{ Querystring: { search: string } }>, response: FastifyReply) {
  try {
    const {
      search
    } = request.query;

    const products = await productService.getAllProducts(search);

    return response.status(200).send(products);
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
