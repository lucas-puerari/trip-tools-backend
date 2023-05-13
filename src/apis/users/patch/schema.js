const patchParamsSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: {
      type: 'string',
      pattern: '^[0-9a-fA-F]{24}$',
    },
  },
  additionalProperties: false,
};

const patchBodySchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
  },
  additionalProperties: false,
};

export { patchParamsSchema, patchBodySchema };
