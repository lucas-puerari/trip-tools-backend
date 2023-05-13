import testSetup from '../../tests/setup';

const mockFind = jest.fn();
const mockFindById = jest.fn();
const mockFindOne = jest.fn();
const mockCreate = jest.fn();
const mockFindByIdAndDelete = jest.fn();
const mockFindByIdAndUpdate = jest.fn();

jest.mock('../../utils/db-client', () => ({
  model: () => ({
    find: mockFind,
    findById: mockFindById,
    findOne: mockFindOne,
    create: mockCreate,
    findByIdAndUpdate: mockFindByIdAndUpdate,
    findByIdAndDelete: mockFindByIdAndDelete,
  }),
}));

describe('Users', () => {
  const { httpClient } = testSetup();

  const endpoint = '/users';
  const user = {
    _id: '5349b4ddd2781d08c09890f3',
    username: 'test',
    email: 'test@test.it',
    createdAt: String(new Date()),
    updatedAt: String(new Date()),
  };

  describe(`GET ${endpoint}`, () => {
    it('200 - Get a empty list of users', async () => {
      mockFind.mockResolvedValueOnce([]);

      const response = await httpClient.get(endpoint);

      expect(response.status).toEqual(200);
      expect(response.data).toEqual([]);

      expect(mockFind).toHaveBeenCalled();
    });

    it('200 - Get users list', async () => {
      const users = [user, user, user];

      mockFind.mockResolvedValueOnce(users);

      const response = await httpClient.get(endpoint);

      expect(response.status).toEqual(200);
      expect(response.data).toEqual(users);

      expect(mockFind).toHaveBeenCalled();
    });

    it('500 - Throw an error if db return null', async () => {
      mockFind.mockResolvedValueOnce(null);

      await expect(httpClient.get(endpoint)).rejects.toMatchObject({
        response: {
          status: 500,
          data: {
            error: 'Users collection not found',
          },
        },
      });

      expect(mockFind).toHaveBeenCalled();
    });
  });

  describe(`POST ${endpoint}`, () => {
    it('201 - Create a new user', async () => {
      mockFindOne.mockResolvedValueOnce(null);
      mockCreate.mockResolvedValueOnce(user);

      const response = await httpClient.post(endpoint, {
        username: user.username,
        email: user.email,
      });

      expect(response.status).toEqual(201);
      expect(response.data).toEqual(user);

      expect(mockFindOne).toHaveBeenCalledWith({ email: user.email });
      expect(mockCreate).toHaveBeenCalledWith({
        username: user.username,
        email: user.email,
      });
    });

    test.each([
      { attribute: 'username', value: 'test1', missing: 'email' },
      { attribute: 'email', value: 'test@test.it', missing: 'username' },
    ])(
      '400 - Throw an error if a required attribute is missing ($missing)',
      async ({ attribute, value, missing }) => {
        await expect(
          httpClient.post(endpoint, {
            [attribute]: [value],
          }),
        ).rejects.toMatchObject({
          response: {
            status: 400,
            data: {
              errors: {
                body: [
                  {
                    message: `must have required property '${missing}'`,
                  },
                ],
              },
            },
          },
        });
      },
    );

    it('400 - Throw an error if additional property was given', async () => {
      await expect(
        httpClient.post(endpoint, {
          username: user.username,
          email: user.email,
          test: 'test',
        }),
      ).rejects.toMatchObject({
        response: {
          status: 400,
          data: {
            errors: {
              body: [
                {
                  message: 'must NOT have additional properties',
                },
              ],
            },
          },
        },
      });
    });

    it('409 - Throw an error if given email exist', async () => {
      mockFindOne.mockResolvedValueOnce(user);

      await expect(
        httpClient.post(endpoint, {
          username: user.username,
          email: user.email,
        }),
      ).rejects.toMatchObject({
        response: {
          status: 409,
          data: {
            error: 'Email already registered',
          },
        },
      });

      expect(mockFindOne).toHaveBeenCalledWith({ email: user.email });
    });

    it('500 - Throw an error if user could not be created', async () => {
      mockFindOne.mockResolvedValueOnce(null);
      mockCreate.mockResolvedValueOnce(null);

      await expect(
        httpClient.post(endpoint, {
          username: user.username,
          email: user.email,
        }),
      ).rejects.toMatchObject({
        response: {
          status: 500,
          data: {
            error: 'Unable to create the user',
          },
        },
      });

      expect(mockFindOne).toHaveBeenCalledWith({ email: user.email });
      expect(mockCreate).toHaveBeenCalledWith({
        username: user.username,
        email: user.email,
      });
    });
  });

  describe(`GET by ID ${endpoint}/${user._id}`, () => {
    it('200 - Get a user by id', async () => {
      mockFindById.mockResolvedValueOnce(user);

      const response = await httpClient.get(`${endpoint}/${user._id}`);

      expect(response.status).toEqual(200);
      expect(response.data).toEqual(user);

      expect(mockFindById).toHaveBeenCalledWith(user._id);
    });

    it('400 - Throw an error if given id has a wrong format', async () => {
      await expect(httpClient.get(`${endpoint}/123`)).rejects.toMatchObject({
        response: {
          status: 400,
          data: {
            errors: {
              params: [
                {
                  instancePath: '/id',
                  keyword: 'pattern',
                  message: 'must match pattern "^[0-9a-fA-F]{24}$"',
                },
              ],
            },
          },
        },
      });
    });

    it('404 - Throw an error if required user not exist', async () => {
      mockFindById.mockResolvedValueOnce(null);

      await expect(
        httpClient.get(`${endpoint}/${user._id}`),
      ).rejects.toMatchObject({
        response: {
          status: 404,
          data: {
            error: `User id ${user._id} not found`,
          },
        },
      });

      expect(mockFindById).toHaveBeenCalledWith(user._id);
    });
  });

  describe(`PATCH ${endpoint}/${user._id}`, () => {
    it('200 - Update user', async () => {
      mockFindByIdAndUpdate.mockResolvedValueOnce(user);

      const response = await httpClient.patch(`${endpoint}/${user._id}`, {
        email: user.email,
      });

      expect(response.status).toEqual(200);
      expect(response.data).toEqual(user);

      expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
        user._id,
        { email: 'test@test.it' },
        { returnDocument: 'after' },
      );
    });

    it('400 - Throw an error if given id has a wrong format', async () => {
      await expect(
        httpClient.patch(`${endpoint}/123`, {
          email: user.email,
        }),
      ).rejects.toMatchObject({
        response: {
          status: 400,
          data: {
            errors: {
              params: [
                {
                  instancePath: '/id',
                  keyword: 'pattern',
                  message: 'must match pattern "^[0-9a-fA-F]{24}$"',
                },
              ],
            },
          },
        },
      });
    });

    it('400 - Throw an error if additional property was given', async () => {
      await expect(
        httpClient.patch(`${endpoint}/${user._id}`, {
          username: user.username,
          email: user.email,
        }),
      ).rejects.toMatchObject({
        response: {
          status: 400,
          data: {
            errors: {
              body: [
                {
                  message: 'must NOT have additional properties',
                },
              ],
            },
          },
        },
      });
    });

    it('404 - Throw an error if given user not exist', async () => {
      mockFindByIdAndUpdate.mockResolvedValueOnce(null);

      await expect(
        httpClient.patch(`${endpoint}/${user._id}`, {
          email: user.email,
        }),
      ).rejects.toMatchObject({
        response: {
          status: 404,
          data: {
            error: `User id ${user._id} not found`,
          },
        },
      });

      expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
        user._id,
        { email: 'test@test.it' },
        { returnDocument: 'after' },
      );
    });
  });

  describe(`DELETE ${endpoint}/${user._id}`, () => {
    it('200 - Delete user', async () => {
      mockFindByIdAndDelete.mockResolvedValueOnce(user);

      const response = await httpClient.delete(`${endpoint}/${user._id}`);

      expect(response.status).toEqual(200);
      expect(response.data).toEqual(user);

      expect(mockFindByIdAndDelete).toHaveBeenCalledWith(user._id);
    });

    it('400 - Throw an error if given id has a wrong format', async () => {
      await expect(httpClient.delete(`${endpoint}/123`)).rejects.toMatchObject({
        response: {
          status: 400,
          data: {
            errors: {
              params: [
                {
                  instancePath: '/id',
                  keyword: 'pattern',
                  message: 'must match pattern "^[0-9a-fA-F]{24}$"',
                },
              ],
            },
          },
        },
      });
    });

    it('404 - Throw an error if given user not exist', async () => {
      mockFindByIdAndDelete.mockResolvedValueOnce(null);

      await expect(
        httpClient.delete(`${endpoint}/${user._id}`),
      ).rejects.toMatchObject({
        response: {
          status: 404,
          data: {
            error: `User id ${user._id} not found`,
          },
        },
      });

      expect(mockFindByIdAndDelete).toHaveBeenCalledWith(user._id);
    });
  });
});
