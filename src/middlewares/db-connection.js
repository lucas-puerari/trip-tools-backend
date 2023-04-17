import mongoose from 'mongoose';
import logger from '../utils/logger';

const dbConnectionMiddleware = (request, response, next) => {
  const dbConnectionUri = 'mongodb://mongodb:27017/test';
  const dbState = mongoose.connection.readyState;

  if (dbState === 0) {
    mongoose.connect(dbConnectionUri);
  }

  mongoose.connection.on('error', (err) => {
    logger.error(`Error ${JSON.stringify(err)}`);
  });

  mongoose.connection.on('connected', () => {
    logger.info(`Connected to mongodb throught: ${dbConnectionUri}`);
  });

  request.mongoose = mongoose;

  return next();
};

export default dbConnectionMiddleware;
