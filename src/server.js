import pino from 'pino';

import app from './app';

const host = process.env.TT_BACKEND_HOST;
const port = process.env.TT_BACKEND_PORT;

const logger = pino({
  level: process.env.TT_LOG_LEVEL,
});

app.listen(port, host, () => {
  logger.info(`Backend running on: http://${host}:${port}`);
});
