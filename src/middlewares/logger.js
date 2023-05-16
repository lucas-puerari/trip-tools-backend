import pino from 'pino';

const loggerMiddleware = (request, _, next) => {
  request.logger = pino({
    level: process.env.TT_LOG_LEVEL,
  });

  return next();
};

export default loggerMiddleware;
