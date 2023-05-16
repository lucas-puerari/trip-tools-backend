import express from 'express';
import dotenv from 'dotenv';
// import morgan from 'morgan';

import loggerMiddleware from './middlewares/logger';
import dbConnectionMiddleware from './middlewares/db-connection';
import validationErrorMiddleware from './middlewares/validation-error';

import statusRoute from './apis/status';

const app = express();

// Variables
dotenv.config();
app.set('host', process.env.TT_BACKEND_HOST);
app.set('port', process.env.TT_BACKEND_PORT);

// Pre-request Middlewares
app.use(express.json());
// app.use(morgan('dev'));
app.use(loggerMiddleware);
app.use(dbConnectionMiddleware);

// Routes
app.use('/status', statusRoute);

// Post-request Middlewares
app.use(validationErrorMiddleware);

export default app;
