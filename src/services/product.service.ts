import { axiosApi } from '../helpers/axios.helper';

import dotenv from 'dotenv';
dotenv.config();

const fakeStoreBaseUrl = `${process.env.FAKE_STORE_HOST}/products`;

export async function getAllProducts(search: string) {
  try {
    let products = await axiosApi({
      method: 'GET',
      url: fakeStoreBaseUrl,
    });

    if (search && products.length > 0) {
      products = products.filter(({ title }: { title: string }) =>
        typeof title === 'string' &&
        title.toLocaleLowerCase()
        .includes(
          search
          .toLocaleLowerCase()
        )
      );
    }

    return {
      products,
      totalCount: products.length
    };
  } catch (error: any) {
    throw error;
  }
};

export async function getProductById(id: number) {
  try {
    let product = await axiosApi({
      method: 'GET',
      url: `${fakeStoreBaseUrl}/${id}`,
    });

    if (!product) {
      throw {
        statusCode: 404,
        message: 'Produto não encontrado',
        code: 'product_not_found'
      };
    }

    return product;
  } catch (error: any) {
    throw error;
  }
};
