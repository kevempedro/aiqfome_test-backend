export const loginSchema = {
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 6 }
    }
  },

  response: {
    200: {
      type: 'object',
      description: "OK",
      properties: {
        token: { type: 'string' }
      }
    },
    401: {
      type: 'object',
      description: "Unauthorized",
      properties: {
        error: { type: 'string' }
      }
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
