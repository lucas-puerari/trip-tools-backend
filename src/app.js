import express from 'express';
import dotenv from 'dotenv';

import validationErrorMiddleware from './middlewares/validation-error';
import dbConnectionMiddleware from './middlewares/db-connection';

import helloWorldRoute from './apis/hello-world';
import statusRoute from './apis/status';

dotenv.config();

const host = process.env.BACKEND_HOST;
const port = process.env.BACKEND_PORT;

const app = express();

// Variables
app.set('host', host);
app.set('port', port);

// Pre-request Middlewares
app.use(dbConnectionMiddleware);

// Routes
app.use('/hello-world', helloWorldRoute);
app.use('/status', statusRoute);

// Post-request Middlewares
app.use(validationErrorMiddleware);

export default app;
