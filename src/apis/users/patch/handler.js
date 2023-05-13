import userModel from '../model';

const patchHandler = async (request, response) => {
  const { dbClient, params, body } = request;

  // if (Object.keys(body).length === 0) {
  //   return response.status(400).json({
  //     error:
  //       'The payload is empty, perhaps some non-upgradeable properties have been filtered out',
  //   });
  // }

  const User = dbClient.model('User', userModel);

  const user = await User.findByIdAndUpdate(
    params.id,
    { ...body },
    {
      returnDocument: 'after',
    },
  );

  if (user === null) {
    return response
      .status(404)
      .json({ error: `User id ${params.id} not found` });
  }

  return response.status(200).json(user);
};

export default patchHandler;
