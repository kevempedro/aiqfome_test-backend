export const commonResponseSchema = {
  400: {
    type: 'object',
    description: "Bad Request",
    properties: {
      message: { type: 'string' },
      code: { type: 'string' }
    }
  },
  401: {
    type: 'object',
    description: "Unauthorized",
    properties: {
      message: { type: 'string' },
      code: { type: 'string' }
    }
  },
  500: {
    type: 'object',
    description: "Internal Server Error",
    properties: {
      message: { type: 'string' },
      code: { type: 'string' }
    }
  }
};
