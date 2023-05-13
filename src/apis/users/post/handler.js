import userModel from '../model';

const postHandler = async (request, response) => {
  const { dbClient, body } = request;

  const User = dbClient.model('User', userModel);

  const emailExist = (await User.findOne({ email: body.email })) !== null;

  if (emailExist) {
    return response.status(409).json({ error: 'Email already registered' });
  }

  const user = await User.create(body);

  if (user === null) {
    return response.status(500).json({ error: 'Unable to create the user' });
  }

  return response.status(201).json(user);
};

export default postHandler;
