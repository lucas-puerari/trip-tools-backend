import setupTests from '../../tests/setup';

const mockDbClient = {
  STATES: {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  },
  connection: {
    readyState: 0,
  },
};

jest.mock('../../utils/db-client', () => () => mockDbClient);

describe('Server status', () => {
  const { httpClient } = setupTests();

  const endpoint = '/status';

  describe(`GET ${endpoint}`, () => {
    test.each([
      { dbState: 0, testDescription: `but ${mockDbClient.STATES[0]} from db` },
      { dbState: 1, testDescription: `and ${mockDbClient.STATES[1]} to db` },
      { dbState: 2, testDescription: `and ${mockDbClient.STATES[2]} to db` },
      { dbState: 3, testDescription: `but ${mockDbClient.STATES[3]} from db` },
    ])('200 - Server running $testDescription', async ({ dbState }) => {
      mockDbClient.connection.readyState = dbState;

      const response = await httpClient.get(endpoint);

      expect(response.status).toEqual(200);
      expect(response.data).toEqual({
        serverStatus: 'running',
        dbStatus: mockDbClient.STATES[dbState],
      });
    });
  });
});
