import commonHeaderAuthorizationSchema from './common-header-authorization.schema';
import commonResponseSchema from './common-response.schema';

export const getAllClientsSchema = {
  ...commonHeaderAuthorizationSchema,

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
      }
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
              id: { type: 'number' },
              name: { type: 'string' },
              email: { type: 'string' },
              birthDate: { type: ['string', 'null'] },
              isActive: { type: 'boolean' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' }
            }
          }
        },
        totalCount: { type: 'number' },
      }
    },
    ...commonResponseSchema
  }
};

export const getClientByIdSchema = {
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
        name: { type: 'string' },
        email: { type: 'string' },
        birthDate: { type: ['string', 'null'] },
        isActive: { type: 'boolean' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' }
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
    400: commonResponseSchema[400],
    500: commonResponseSchema[500]
  }
};

export const updateClientSchema = {
  ...commonHeaderAuthorizationSchema,

  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' }
    }
  },

  body: {
    type: 'object',
    required: ['name', 'email'],
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
      birthDate: {
        type: ['string', 'null'],
        format: 'date'
      }
    }
  },

  response: {
    200: {
      type: 'null',
      description: "OK",
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

export const updateClientStatusSchema = {
  ...commonHeaderAuthorizationSchema,

  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'number' }
    }
  },

  body: {
    type: 'object',
    required: ['status'],
    properties: {
      status: {
        type: 'boolean',
      }
    }
  },

  response: {
    200: {
      type: 'null',
      description: "OK",
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

export const deleteClientSchema = {
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
      type: 'null',
      description: "OK",
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

export const getAllFavoriteProductsSchema = {
  ...commonHeaderAuthorizationSchema,

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
      }
    }
  },

  response: {
    200: {
      type: 'object',
      description: "OK",
      properties: {
        favoriteProducts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              productId: { type: 'number' },
              title: { type: 'string' },
              price: { type: 'number' },
              description: { type: ['string', 'null'] },
              category: { type: ['string', 'null'] },
              image: { type: ['string', 'null'] },
              rating: {
                type: ['object', 'null'],
                properties: {
                  rate: { type: 'number' },
                  count: { type: 'number' }
                }
              },
              createdAt: { type: 'string' }
            }
          }
        },
        totalCount: { type: 'number' },
      }
    },
    ...commonResponseSchema
  }
};

export const favoriteProductSchema = {
  ...commonHeaderAuthorizationSchema,

  body: {
    type: 'object',
    required: ['productId'],
    properties: {
      productId: {
        type: 'number',
        minimum: 1
      }
    }
  },

  response: {
    201: {
      type: 'null',
      description: "Created",
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

export const deleteFavoriteProductSchema = {
  ...commonHeaderAuthorizationSchema,

  params: {
    type: 'object',
    required: ['productId'],
    properties: {
      productId: { type: 'number' }
    }
  },

  response: {
    200: {
      type: 'null',
      description: "OK",
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
