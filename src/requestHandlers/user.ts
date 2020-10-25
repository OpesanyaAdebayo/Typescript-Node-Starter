import { RequestHandler } from 'express';
import { loginController, signupController } from '../controllers/user';

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { success, error, status, data, message } = await loginController(email, password);
    if (!success) {
      return res.status(status).json({ success, error });
    }
    return res.status(status).json({ success, data, message });
  } catch (error) {
    return res.json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const signup: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { success, error, status, data, message } = await signupController(email, password);
    if (!success) {
      return res.status(status).json({ success, error });
    }
    return res.status(status).json({ success, data, message });
  } catch (error) {
    return res.json({
      success: false,
      error: 'Internal server error',
    });
  }
};
