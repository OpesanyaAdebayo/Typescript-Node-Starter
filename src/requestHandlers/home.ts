import { RequestHandler } from 'express';

export const index: RequestHandler = (req, res) => {
  res.json({ success: true, message: 'Welcome home' });
};
