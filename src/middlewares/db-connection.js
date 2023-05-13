import dbClient from '../utils/db-client';

const dbConnectionMiddleware = (request, _, next) => {
  request.dbClient = dbClient;
  return next();
};

export default dbConnectionMiddleware;
