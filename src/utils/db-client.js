import mongoose from 'mongoose';

const setupDbClient = (config, logger) => {
  const { host, port, username, password, db } = config;

  const dbConnectionUri = `mongodb://${host}:${port}`;
  const dbOptions = {
    authSource: 'admin',
    user: username,
    pass: password,
    dbName: db,
  };

  mongoose.connect(dbConnectionUri, dbOptions);

  mongoose.connection.on('error', (err) => {
    logger.error(`Error ${JSON.stringify(err)}`);
  });

  mongoose.connection.on('connected', () => {
    logger.info(`Connected to mongodb through: ${dbConnectionUri}`);
  });

  return mongoose;
};

export default setupDbClient;
