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
    500: {
      type: 'object',
      description: "Internal Server Error",
      properties: {
        error: { type: 'string' }
      }
    }
  }
};
