import mongoose from 'mongoose';
import dotenv from 'dotenv';

import logger from './logger';

dotenv.config();

const username = process.env.TT_MONGODB_USERNAME;
const password = process.env.TT_MONGODB_PASSWORD;
const host = process.env.TT_MONGODB_HOST;
const port = process.env.TT_MONGODB_PORT;
const db = process.env.TT_MONGODB_DB_NAME;

const dbConnectionUri = `mongodb://${host}:${port}`;
const dbOptions = {
  authSource: 'admin',
  user: username,
  pass: password,
  dbName: db,
};

mongoose.connect(dbConnectionUri, dbOptions);

mongoose.connection.on('error', (err) => {
  logger.error(`Error ${JSON.stringify(err)}`);
});

mongoose.connection.on('connected', () => {
  logger.info(`Connected to mongodb through: ${dbConnectionUri}`);
});

export default mongoose;
