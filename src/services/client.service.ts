import { IGetAllClientsQuery, ICreateClientBody } from '../interfaces/client.interface';
import * as clientModel from '../models/client.model';

export async function getAllClients(query: IGetAllClientsQuery) {
  try {
    const { clients, totalCount } = await clientModel.getAllClients(query);

    return {
      clients,
      totalCount
    };
  } catch (error: any) {
    throw error;
  }
};

export async function createClient(body: ICreateClientBody) {
  try {
    const { email } = body;

    const emailAlreadyExists = await clientModel.getClientByEmail(email);

    if (emailAlreadyExists) {
      throw {
        statusCode: 400,
        message: `Já existe um cliente com e-mail: ${email}`,
        code: 'client_email_already_exists'
      };
    }

    await clientModel.createClient(body);

    return true;
  } catch (error: any) {
    throw error;
  }
};
