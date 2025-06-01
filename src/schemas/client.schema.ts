import { commonResponseSchema } from './common-response.schema';

export const getAllClientsSchema = {
  headers: {
    type: 'object',
    required: ['authorization'],
    properties: {
      authorization: { type: 'string' }
    }
  },

  querystring: {
    type: 'object',
    required: ['page', 'perPage'],
    properties: {
      search: { type: 'string' },
      page: {
        type: 'number',
        minimum: 1
      },
      perPage: {
        type: 'number',
        enum: [10, 20, 30, 40, 50]
      },
    },
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
              id: { type: 'number' },
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
        type: ['string', 'null'],
        format: 'date'
      }
    }
  },

  response: {
    201: {
      type: 'null',
      description: "Created",
    },
    ...commonResponseSchema
  }
};
