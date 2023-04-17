import express from 'express';

import getHandler from './get/handler';

const router = express.Router();

router.get('/', getHandler);

export default router;
