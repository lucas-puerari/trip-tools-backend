import pino from 'pino';
import dotenv from 'dotenv';

dotenv.config();

export default pino({
  level: process.env.TT_LOG_LEVEL || 'info',
});
