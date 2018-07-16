import logger from './logger';
import fs from 'fs';
import dotenv from 'dotenv';
import DotenvResult from 'dotenv';
const env = dotenv.config();
dotenv.load();

// if (env.error) {
//   logger.error("Cannot find a .env file.");
//   process.exit(1)
// }

const parsed = env.parsed! || process.env;
export const MLAB_URI = parsed["MLAB_URI"] || process.env.MLAB_URI!
export const SESSION_SECRET = parsed["SESSION_SECRET"] || process.env.SESSION_SECRET!;


if (!SESSION_SECRET) {
  logger.error("No client secret. Set SESSION_SECRET environment variable.");
  process.exit(1);
}

if (!MLAB_URI) {
  logger.error("No mongo connection string. Set MLAB_URI environment variable.");
  process.exit(1);
}