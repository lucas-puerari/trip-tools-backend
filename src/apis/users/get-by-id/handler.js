import userModel from '../model';

const getByIdHandler = async (request, response) => {
  const { dbClient, params } = request;

  const User = dbClient.model('User', userModel);

  const user = await User.findById(params.id);

  if (user === null) {
    return response
      .status(404)
      .json({ error: `User id ${params.id} not found` });
  }

  return response.status(200).json(user);
};

export default getByIdHandler;
