import dotenv from 'dotenv';
import mongoose from 'mongoose';

import logger from '../utils/logger';

dotenv.config();

const dbConnectionMiddleware = (request, response, next) => {
  const host = process.env.TT_MONGODB_HOST;
  const port = process.env.TT_MONGODB_PORT;
  const db = process.env.TT_MONGODB_DB_NAME;

  const dbConnectionUri = `mongodb://${host}:${port}/${db}`;
  const dbState = mongoose.connection.readyState;

  if (dbState === 0) {
    mongoose.connect(dbConnectionUri);

    mongoose.connection.on('error', (err) => {
      logger.error(`Error ${JSON.stringify(err)}`);
    });

    mongoose.connection.on('connected', () => {
      logger.info(`Connected to mongodb throught: ${dbConnectionUri}`);
    });
  }

  request.mongoose = mongoose;

  return next();
};

export default dbConnectionMiddleware;
