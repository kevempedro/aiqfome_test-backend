import bcrypt from 'bcrypt';

import {
  IGetAllClientsQuery,
  ICreateClientBody,
  IUpdateClientBody
} from '../interfaces/client.interface';
import validEmail from '../utils/valid-email.util';
import validPassword from '../utils/valid-passowrd.util';
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

export async function getClientById(id: number) {
  try {
    const client = await clientModel.getClientById(id);

    if (!client) {
      throw {
        statusCode: 404,
        message: 'Usuário não encontrado',
        code: 'client_not_found'
      };
    }

    return client;
  } catch (error: any) {
    throw error;
  }
};

export async function createClient(body: ICreateClientBody) {
  try {
    const {
      name,
      email,
      password,
      birthDate
    } = body;

    checkIfEmailIsValid(email);

    if (!validPassword(password)) {
      throw {
        statusCode: 400,
        message: 'Sua senha deve conter pelo menos 6 caracteres e ter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial (!@#$%&*)',
        code: 'client_password_weak'
      };
    }

    await checkIfEmailAlreadyExists(email);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await clientModel.createClient({
      name,
      email,
      password: hashedPassword,
      birthDate
    });
  } catch (error: any) {
    throw error;
  }
};

export async function updateClient(id: number, body: IUpdateClientBody) {
  try {
    const {
      name,
      email,
      birthDate
    } = body;

    const { email: clientEmail } = await getClientById(id);

    checkIfEmailIsValid(email);

    if (clientEmail !== email) {
      await checkIfEmailAlreadyExists(email);
    }

    await clientModel.updateClient(
      id,
      {
        name,
        email,
        birthDate
      }
    );
  } catch (error: any) {
    throw error;
  }
};

export async function updateClientStatus(id: number, status: boolean) {
  try {
    const { isActive } = await getClientById(id);

    if (isActive === status) {
      throw {
        statusCode: 400,
        message: `Cliente já está ${isActive ? 'ativo(a)' : 'inativo(a)'}`,
        code: `client_status_is_already_${isActive}`
      };
    }

    await clientModel.updateClientStatus(id, status);
  } catch (error: any) {
    throw error;
  }
};

export async function deleteClient(id: number) {
  try {
    await getClientById(id);

    await clientModel.deleteClient(id);
  } catch (error: any) {
    throw error;
  }
};

function checkIfEmailIsValid(email: string) {
  if (!validEmail(email)) {
    throw {
      statusCode: 400,
      message: 'E-mail inválido',
      code: 'client_email_invalid'
    };
  }
}

async function checkIfEmailAlreadyExists(email: string) {
  const emailAlreadyExists = await clientModel.getClientByEmail(email);

  if (emailAlreadyExists) {
    throw {
      statusCode: 400,
      message: `Já existe um cliente com e-mail: ${email}`,
      code: 'client_email_already_exists'
    };
  }
}
