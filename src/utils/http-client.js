import axios from 'axios';

const setupHttpClient = (config, logger) => {
  const { host, port } = config;

  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    baseURL: `http://${host}:${port}`,
  };

  const httpClient = axios.create(options);

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
      const duration =
        new Date() - new Date(response.config.metadata.startTime);

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

  return httpClient;
};

export default setupHttpClient;
