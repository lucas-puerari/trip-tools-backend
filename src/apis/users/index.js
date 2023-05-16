import express from 'express';

import validate from '../../utils/json-validator';

import getHandler from './get/handler';
import postHandler from './post/handler';
import getByIdHandler from './get-by-id/handler';
import patchHandler from './patch/handler';
import deleteByIdHandler from './delete/handler';

import getByIdParamsSchema from './get-by-id/schema';
import postBodySchema from './post/schema';
import { patchParamsSchema, patchBodySchema } from './patch/schema';
import deleteByIdParamsSchema from './delete/schema';

const router = express.Router();

router.get('/', getHandler);
router.post('/', validate({ body: postBodySchema }), postHandler);
router.get('/:id', validate({ params: getByIdParamsSchema }), getByIdHandler);
router.patch(
  '/:id',
  validate({ params: patchParamsSchema, body: patchBodySchema }),
  patchHandler,
);
router.delete(
  '/:id',
  validate({ params: deleteByIdParamsSchema }),
  deleteByIdHandler,
);

export default router;
