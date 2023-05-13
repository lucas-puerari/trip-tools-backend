import app from '../app';
import httpClient from '../utils/http-client';

const getRandomHttpPort = (_min, _max) => {
  const min = Math.ceil(_min);
  const max = Math.floor(_max);
  return Math.floor(Math.random() * (max - min) + min);
};

const testsSetup = () => {
  let server;

  const host = app.get('host');
  const port = getRandomHttpPort(3000, 5000);

  httpClient.defaults.baseURL = `http://${host}:${port}`;

  beforeAll(async () => {
    server = app.listen(port, host);
  });

  afterAll(async () => {
    await server.close();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  return { server, httpClient };
};

export default testsSetup;
