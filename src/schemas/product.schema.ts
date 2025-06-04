import commonHeaderAuthorizationSchema from './common-header-authorization.schema';
import commonResponseSchema from './common-response.schema';

export const getAllProductsSchema = {
  ...commonHeaderAuthorizationSchema,

  querystring: {
    type: 'object',
    properties: {
      search: { type: 'string' }
    }
  },

  response: {
    200: {
      type: 'object',
      description: "OK",
      properties: {
        products: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              title: { type: 'string' },
              price: { type: 'number' },
              description: { type: 'string' },
              category: { type: 'string' },
              image: { type: 'string' },
              rating: {
                type: 'object',
                properties: {
                  rate: { type: 'number' },
                  count: { type: 'number' }
                }
              }
            }
          }
        },
        totalCount: { type: 'number' },
      }
    },
    ...commonResponseSchema
  }
};

export const getProductByIdSchema = {
  ...commonHeaderAuthorizationSchema,

  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' }
    }
  },

  response: {
    200: {
      type: 'object',
      description: "OK",
      properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        price: { type: 'number' },
        description: { type: 'string' },
        category: { type: 'string' },
        image: { type: 'string' },
        rating: {
          type: 'object',
          properties: {
            rate: { type: 'number' },
            count: { type: 'number' }
          }
        }
      }
    },
    404: {
      type: 'object',
      description: "Not Found",
      properties: {
        message: { type: 'string' },
        code: { type: 'string' }
      }
    },
    ...commonResponseSchema
  }
};
