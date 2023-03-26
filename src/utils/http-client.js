import axios from 'axios';

import logger from './logger';

const args = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const httpClient = axios.create(args);

// Add startTime to the request
httpClient.interceptors.request.use(
  (request) => ({ ...request, metadata: { startTime: new Date() } }),
  (error) => Promise.reject(error),
);

// Compute the duration of the request
httpClient.interceptors.response.use(
  (response) => ({
    ...response,
    metadata: {
      duration: new Date() - new Date(response.config.metadata.startTime),
    },
  }),
  (error) => ({
    ...error,
    metadata: {
      duration: new Date() - new Date(error.config.metadata.startTime),
    },
  }),
);

// Log the request
httpClient.interceptors.request.use(
  (request) => {
    logger.debug(`httpClient ${request.method.toUpperCase()} ${request.url}`);
    return request;
  },
  (error) => Promise.reject(error),
);

// Log the response
httpClient.interceptors.response.use(
  (response) => {
    logger.debug(
      `httpClient \
${response.config.method.toUpperCase()} \
${response.config.url} \
${response.status || response.response.status} \
(${response.metadata.duration} ms)`,
    );
    return response;
  },
  (error) => {
    logger.debug(
      `httpClient \
${error.config.method.toUpperCase()} \
${error.config.url} \
${error.status} \
(${error.metadata.duration} ms)`,
    );
    return error;
  },
);

export default httpClient;
