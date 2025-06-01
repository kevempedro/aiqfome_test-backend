import { ILoginBody } from '../interfaces/auth.interface';

export async function login(body: ILoginBody) {
  try {
    const {
      email,
      password
    } = body;

    const mockClient = {
      id: '123',
      name: 'Kevem Lima',
      email: 'kevem@gmail.com',
      password: '123456'
    };

    if (email !== mockClient.email || password !== mockClient.password) {
      throw { statusCode: 401, message: 'E-mail ou senha inválidos' };
    }

    const token = {
      id: mockClient.id,
      name: mockClient.name,
      email: mockClient.email
    };

    return token;
  } catch (error: any) {
    throw error;
  }
};
