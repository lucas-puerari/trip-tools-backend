import app from './app';
import logger from './utils/logger';

const host = app.get('host');
const port = app.get('port');

app.listen(port, host, () => {
  logger.info(`Backend running on: http://${host}:${port}`);
});
