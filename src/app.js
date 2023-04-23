import express from 'express';

import validationErrorMiddleware from './middlewares/validation-error';
import dbConnectionMiddleware from './middlewares/db-connection';

import helloWorldRoute from './apis/hello-world';
import statusRoute from './apis/status';

const app = express();

// Pre-request Middlewares
app.use(dbConnectionMiddleware);

// Routes
app.use('/hello-world', helloWorldRoute);
app.use('/status', statusRoute);

// Post-request Middlewares
app.use(validationErrorMiddleware);

export default app;
