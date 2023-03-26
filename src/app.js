import express from 'express';
import dotenv from 'dotenv';

import validationErrorHandler from './middlewares/validation-error-handler';
import helloWorld from './apis/hello-world';

dotenv.config();

const host = process.env.BACKEND_HOST;
const port = process.env.BACKEND_PORT;

const app = express();

// Variables
app.set('host', host);
app.set('port', port);

// Routes
app.use('/hello-world', helloWorld);

// Middlewares
app.use(validationErrorHandler);

export default app;
