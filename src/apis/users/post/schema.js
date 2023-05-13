const postBodySchema = {
  type: 'object',
  required: ['username', 'email'],
  properties: {
    username: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
  },
  additionalProperties: false,
};

export default postBodySchema;
