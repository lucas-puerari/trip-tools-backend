import pino from 'pino';
import dotenv from 'dotenv';

import app from '../app';
import setupHttpClient from '../utils/http-client';

const getRandomHttpPort = (_min, _max) => {
  const min = Math.ceil(_min);
  const max = Math.floor(_max);
  return Math.floor(Math.random() * (max - min) + min);
};

const setupTests = () => {
  dotenv.config({
    path: './src/tests/.env.test',
  });

  const host = process.env.TT_BACKEND_HOST;
  const port = getRandomHttpPort(3000, 5000);

  let server;

  beforeAll(async () => {
    server = app.listen(port, host);
  });

  afterAll(async () => {
    await server.close();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  const logger = pino({ level: process.env.TT_LOG_LEVEL });
  const httpClient = setupHttpClient({ host, port }, logger);

  return { httpClient };
};

export default setupTests;
