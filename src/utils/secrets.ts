import logger from './logger';
import fs from 'fs';

declare var process : {
    env: {
      MLAB_URI: string,
      SESSION_SECRET: string
    }
  }

export const MLAB_URI = process.env.MLAB_URI;
export const SESSION_SECRET = process.env.SESSION_SECRET;


if (!SESSION_SECRET) {
  logger.error("No client secret. Set SESSION_SECRET environment variable.");
}

if (!MLAB_URI) {
  logger.error("No mongo connection string. Set MLAB_URI environment variable.");
}