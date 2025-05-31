export const createClientSchema = {
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
      type: 'null'
    },
    500: {
      type: 'object',
      properties: {
        error: { type: 'string' }
      }
    }
  }
};
