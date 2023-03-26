import app from '../../app';

import httpClient from '../../utils/axios-client';

const endpoint = '/hello-world';

describe(`GET ${endpoint}`, () => {
  let server;

  const host = app.get('host');
  const port = app.get('port');
  const baseUrl = `http://${host}:${port}`;
  const url = `${baseUrl}${endpoint}`;

  beforeAll(() => {
    server = app.listen(port, host, () => {
      console.log(`Backend runinng on: ${baseUrl}`);
    });
  });

  afterAll(() => {
    server.close();
  });

  test.each([['Jhon'], ['Olivia']])(
    '200 - Say Hello World to %s',
    async (person) => {
      const response = await httpClient.get(`${url}?person=${person}`);
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(`Hello World ${person}!`);
    },
  );

  it('400 - Bad request', async () => {
    try {
      await httpClient.get(url);
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data.errors.query[0].message).toEqual(
        "must have required property 'person'",
      );
    }
  });
});
