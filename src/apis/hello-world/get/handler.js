import express from 'express';
import validate from '../../../utils/json-validator';

import schema from './schema';

const router = express.Router();

router.get('/', validate({ query: schema }), (request, response) => {
  const {
    query: { person },
  } = request;

  response.send(`Hello World ${person}!`);
});

export default router;
