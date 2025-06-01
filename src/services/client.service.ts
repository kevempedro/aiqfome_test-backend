import { ICreateClientBody } from '../interfaces/client.interface';
import * as clientModel from '../models/client.model';

export async function getAllClients() {
  try {
    const { clients, totalCount } = await clientModel.getAllClients();

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
    // Criar cliente

    return true;
  } catch (error: any) {
    throw error;
  }
};
