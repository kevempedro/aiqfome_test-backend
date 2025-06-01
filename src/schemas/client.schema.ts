import { commonResponseSchema } from './common-response.schema';

export const getAllClientsSchema = {
  headers: {
    type: 'object',
    required: ['authorization'],
    properties: {
      authorization: { type: 'string' }
    }
  },

  response: {
    200: {
      type: 'object',
      description: "OK",
      properties: {
        clients: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              email: { type: 'string' },
              birthDate: { type: ['string', 'null'] },
              isActive: { type: 'boolean' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
              deletedAt: { type: ['string', 'null'] },
            },
          }
        },
        totalCount: { type: 'number' },
      }
    },
    ...commonResponseSchema
  }
};

export const createClientSchema = {
  headers: {
    type: 'object',
    required: ['authorization'],
    properties: {
      authorization: { type: 'string' }
    }
  },

  body: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      name: {
        type: 'string',
        maxLength: 100
      },
      email: {
        type: 'string',
        maxLength: 150,
        format: 'email'
      },
      password: {
        type: 'string',
        minLength: 6,
        maxLength: 100
      },
      birthDate: {
        type: 'string',
        format: 'date'
      }
    }
  },

  response: {
    201: {
      type: 'null',
      description: "OK",
    },
    ...commonResponseSchema
  }
};
