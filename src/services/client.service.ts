import bcrypt from 'bcrypt';

import {
  IGetAllQuery,
  ICreateClientBody,
  IUpdateClientBody
} from '../interfaces/client.interface';
import validEmail from '../utils/valid-email.util';
import validPassword from '../utils/valid-passowrd.util';
import * as clientModel from '../models/client.model';
import * as productService from './product.service';


export async function getAllClients(query: IGetAllQuery) {
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
        message: 'Cliente não encontrado',
        code: 'client_not_found'
      };
    }

    return client;
  } catch (error: any) {
    throw error;
  }
};

export async function clientCredentials(email: string, password: string) {
  try {
    checkIfEmailIsValid(email);

    const client = await clientModel.clientCredentials(email);

    if (!client) {
      throw  {
        statusCode: 401,
        message: 'E-mail ou senha inválidos',
        code: 'invalid_email_or_password'
      };
    }

    const {
      id,
      name,
      birthDate,
      isActive,
      password: clientPassword
    } = client;

    checkIfClientIsActive(isActive);

    const isPassword = await bcrypt.compare(password, clientPassword);

    if (!isPassword) {
      throw  {
        statusCode: 401,
        message: 'E-mail ou senha inválidos',
        code: 'invalid_email_or_password'
      };
    }

    return {
      id,
      name,
      birthDate,
      isActive
    };
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

export async function getAllFavoriteProducts(clientId: number, query: IGetAllQuery) {
  try {
    const { favoriteProducts, totalCount } = await clientModel.getAllFavoriteProducts(clientId, query);

    return {
      favoriteProducts,
      totalCount
    };
  } catch (error: any) {
    throw error;
  }
};

export async function favoriteProduct(clientId: number, productId: number) {
  try {
    const { isActive } = await getClientById(clientId);

    checkIfClientIsActive(isActive);

    const productAlreadyFavorite = await clientModel.checkIfProductAlreadyFavorite(clientId, productId);

    if (productAlreadyFavorite) {
        throw {
        statusCode: 400,
        message: 'Esse produto já está na lista de produtos favoritos do cliente',
        code: 'product_already_favorite'
      };
    }

    const {
      id,
      title,
      price,
      description,
      category,
      image,
      rating
    } = await productService.getProductById(productId);

    await clientModel.favoriteProduct(
      clientId,
      {
        id,
        title,
        price,
        description,
        category,
        image,
        rating
      }
    );
  } catch (error: any) {
    throw error;
  }
};

export async function deleteFavoriteProduct(clientId: number, productId: number) {
  try {
    const { isActive } = await getClientById(clientId);

    checkIfClientIsActive(isActive);

    const productAlreadyFavorite = await clientModel.checkIfProductAlreadyFavorite(clientId, productId);

    if (!productAlreadyFavorite) {
        throw {
        statusCode: 404,
        message: 'Produto favorito não encontrado para o cliente',
        code: 'favorite_product_not_found'
      };
    }

    await clientModel.deleteFavoriteProduct(clientId, productId);
  } catch (error: any) {
    throw error;
  }
};

function checkIfEmailIsValid(email: string) {
  if (!validEmail(email)) {
    throw {
      statusCode: 400,
      message: 'formato de e-mail inválido',
      code: 'format_email_invalid'
    };
  }
};

async function checkIfEmailAlreadyExists(email: string) {
  checkIfEmailIsValid(email);

  const emailAlreadyExists = await clientModel.checkIfEmailAlreadyExists(email);

  if (emailAlreadyExists) {
    throw {
      statusCode: 400,
      message: `Já existe um cliente com e-mail: ${email}`,
      code: 'client_email_already_exists'
    };
  }
};

function checkIfClientIsActive(isActive: boolean) {
  if (!isActive) {
    throw  {
      statusCode: 401,
      message: 'Seu acesso foi desativado',
      code: 'client_is_inactive'
    };
  }
};
