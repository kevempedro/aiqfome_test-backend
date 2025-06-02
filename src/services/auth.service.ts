import { ILoginBody } from '../interfaces/auth.interface';
import * as clientService from '../services/client.service';

export async function login(body: ILoginBody) {
  try {
    const {
      email,
      password
    } = body;

    const {
      id,
      name,
      birthDate,
      isActive
    } = await clientService.clientCredentials(email, password);

    return {
      id,
      name,
      email,
      birthDate,
      isActive
    };
  } catch (error: any) {
    throw error;
  }
};
