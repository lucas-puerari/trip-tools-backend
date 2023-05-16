const getByIdParamsSchema = {
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

export default getByIdParamsSchema;
