import { FastifyRequest, FastifyReply } from 'fastify';

import { ILoginBody } from '../interfaces/auth.interface';
import * as authService from '../services/auth.service';

export async function login(request: FastifyRequest<{ Body: ILoginBody }>, response: FastifyReply) {
  try {
    const { email, password } = request.body;

    const authData = await authService.login({ email, password });

    const {
      id,
      name,
      email: emailData,
      birthDate,
      isActive
    } = authData;

    const token = await response.jwtSign(
      { id, name, email: emailData, birthDate, isActive },
      { expiresIn: '2d' }
    );

    return response.status(200).send({ token });
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
