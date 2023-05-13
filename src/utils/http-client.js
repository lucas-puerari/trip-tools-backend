import axios from 'axios';

import logger from './logger';

const args = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const httpClient = axios.create(args);

httpClient.interceptors.request.use((request) => {
  logger.debug(`httpClient ${request.method.toUpperCase()} ${request.url}`);

  return Promise.resolve({
    ...request,
    metadata: {
      startTime: new Date(),
    },
  });
});

httpClient.interceptors.response.use(
  (response) => {
    const duration = new Date() - new Date(response.config.metadata.startTime);

    logger.debug(
      `httpClient \
${response.config.method.toUpperCase()} \
${response.config.url} \
${response.status} \
(${duration} ms)`,
    );

    return Promise.resolve({
      ...response,
      metadata: {
        duration,
      },
    });
  },
  (error) => {
    const duration = new Date() - new Date(error.config.metadata.startTime);

    logger.debug(
      `httpClient \
${error.config.method.toUpperCase()} \
${error.config.url} \
${error.response.status} \
(${duration} ms)`,
    );

    return Promise.reject(error);
  },
);

export default httpClient;
