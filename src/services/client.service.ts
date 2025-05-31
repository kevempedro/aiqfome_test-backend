import { ICreateClientBody } from '../interfaces/client.interface';

export async function getAllClients() {
  try {
    const clients = [
      {
        name: 'Kevem Lima',
        email: 'kevem@gmail.com'
      }
    ];

    return clients;
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
