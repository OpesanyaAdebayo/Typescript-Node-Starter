import dotenv from 'dotenv';
dotenv.config();

declare var process : {
    env: {
      MLAB_URI: string,
      SESSION_SECRET: string
    }
  }
export const MLAB_URI = process.env.MLAB_URI;
export const SESSION_SECRET = process.env.SESSION_SECRET;