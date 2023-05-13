import express from 'express';

// handlers
import getHandler from './get/handler';

const router = express.Router();

router.get('/', getHandler);

export default router;
