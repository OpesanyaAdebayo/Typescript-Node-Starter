import joi from 'joi';
import { signPayload } from '../helpers/jwt';
import { validateInput } from '../helpers/validator';
import { findUser, createUser } from '../repositories/user';

interface IHelperResponse {
  success: boolean;
  status: number;
  data?: { token: string };
  error?: string;
  message?: string;
}
export const loginController = async (email: string, password: string): Promise<IHelperResponse> => {
  const validationSchema = joi.object({
    email: joi.string().email(),
    password: joi.string().min(5),
  });
  const validationResult = validateInput(validationSchema, { email, password });
  if (validationResult.error) {
    return {
      success: false,
      status: 400,
      error: validationResult.error,
    };
  }
  const user = await findUser({ email });
  if (!user) {
    return { success: false, status: 401, error: 'Incorrect username and/or password.' };
  }
  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) {
    return { success: false, status: 401, error: 'Incorrect username and/or password.' };
  }

  return {
    success: true,
    status: 200,
    message: 'Login successful',
    data: { token: signPayload({ id: user.id }) },
  };
};

export const signupController = async (email: string, password: string): Promise<IHelperResponse> => {
  const validationSchema = joi.object({
    email: joi.string().email(),
    password: joi.string().min(5),
  });
  const validationResult = validateInput(validationSchema, { email, password });
  if (validationResult.error) {
    return {
      success: false,
      status: 400,
      error: validationResult.error,
    };
  }
  const existingUser = await findUser({ email });
  if (existingUser) {
    return {
      success: false,
      status: 400,
      error: 'Invalid username and/or password.',
    };
  }
  const user = await createUser({ email, password });
  return {
    success: true,
    status: 200,
    message: 'Account successfully created',
    data: { token: signPayload({ id: user.id }) },
  };
};
