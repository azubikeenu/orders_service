import logger from 'pino';
import dayjs from 'dayjs';

export const Logger = logger({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  level : 'debug',
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

