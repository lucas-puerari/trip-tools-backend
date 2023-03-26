const helloWorldSchema = {
  type: 'object',
  required: ['person'],
  properties: {
    person: {
      type: 'string',
    },
  },
};

export default helloWorldSchema;
