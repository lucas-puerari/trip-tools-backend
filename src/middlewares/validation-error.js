import { ValidationError } from 'express-json-validator-middleware';

import logger from '../utils/logger';

const validationErrorMiddleware = (error, request, response, next) => {
  if (response.headersSent) {
    return next(error);
  }

  const isValidationError = error instanceof ValidationError;
  if (!isValidationError) {
    return next(error);
  }

  logger.debug(error.validationErrors);
  response.status(400).json({
    errors: error.validationErrors,
  });

  return next();
};

export default validationErrorMiddleware;
