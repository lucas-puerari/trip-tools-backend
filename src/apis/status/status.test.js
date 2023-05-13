import testSetup from '../../tests/setup';
import dbClient from '../../utils/db-client';

jest.mock('../../utils/db-client', () => ({
  STATES: {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  },
  connection: {
    readyState: 0,
  },
}));

describe('Server status', () => {
  const { httpClient } = testSetup();

  const endpoint = '/status';

  describe(`GET ${endpoint}`, () => {
    test.each([
      { dbState: 0, testDescription: `but ${dbClient.STATES[0]} from db` },
      { dbState: 1, testDescription: `${dbClient.STATES[1]} to db` },
      { dbState: 2, testDescription: `${dbClient.STATES[2]} to db` },
      { dbState: 3, testDescription: `${dbClient.STATES[3]} from db` },
    ])('200 - Server running and $testDescription', async ({ dbState }) => {
      dbClient.connection.readyState = dbState;

      const response = await httpClient.get(endpoint);

      expect(response.status).toEqual(200);
      expect(response.data).toEqual({
        serverStatus: 'running',
        dbStatus: dbClient.STATES[dbState],
      });
    });
  });
});
