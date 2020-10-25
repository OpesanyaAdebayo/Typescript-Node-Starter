import winston from 'winston';

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/debug.log', level: 'error', silent: true }),
    new winston.transports.File({ filename: 'logs/combined.log', silent: true }),
  ],
});

export default logger;
