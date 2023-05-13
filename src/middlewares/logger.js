import logger from '../utils/logger';

const loggerMiddleware = (request, _, next) => {
  request.logger = logger;
  return next();
};

export default loggerMiddleware;
