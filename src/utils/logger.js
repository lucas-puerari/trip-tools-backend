import pino from 'pino';

export default pino({
  level: process.env.TT_LOG_LEVEL || 'info',
});
