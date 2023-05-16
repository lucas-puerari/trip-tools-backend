import setupDbClient from '../utils/db-client';

const dbConnectionMiddleware = (request, _, next) => {
  const { logger } = request;

  const config = {
    username: process.env.TT_MONGODB_USERNAME,
    password: process.env.TT_MONGODB_PASSWORD,
    host: process.env.TT_MONGODB_HOST,
    port: process.env.TT_MONGODB_PORT,
    db: process.env.TT_MONGODB_DB_NAME,
  };

  const dbClient = setupDbClient(config, logger);

  request.dbClient = dbClient;

  return next();
};

export default dbConnectionMiddleware;
