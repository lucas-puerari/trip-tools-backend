import express from 'express';

import loggerMiddleware from './middlewares/logger';
import dbConnectionMiddleware from './middlewares/db-connection';
import validationErrorMiddleware from './middlewares/validation-error';

import statusRoute from './apis/status';

const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use(dbConnectionMiddleware);

app.use('/status', statusRoute);

app.use(validationErrorMiddleware);

export default app;
