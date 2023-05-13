import userModel from '../model';

const getHandler = async (request, response) => {
  const { dbClient } = request;

  const User = dbClient.model('User', userModel);

  const users = await User.find();

  if (users === null) {
    return response.status(500).json({ error: 'Users collection not found' });
  }

  return response.status(200).json(users);
};

export default getHandler;
