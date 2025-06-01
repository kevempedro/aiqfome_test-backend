import { commonResponseSchema } from './common-response.schema';

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
   ...commonResponseSchema
  }
};
