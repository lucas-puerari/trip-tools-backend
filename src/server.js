import app from './app';
import logger from './utils/logger';

const host = process.env.TT_BACKEND_HOST;
const port = process.env.TT_BACKEND_PORT;

app.listen(port, host, () => {
  logger.info(`Backend running on: http://${host}:${port}`);
});
