const getHandler = async (request, response) => {
  const { dbClient } = request;

  const dbStatus = dbClient.STATES[dbClient.connection.readyState];

  return response.status(200).json({
    serverStatus: 'running',
    dbStatus,
  });
};

export default getHandler;
