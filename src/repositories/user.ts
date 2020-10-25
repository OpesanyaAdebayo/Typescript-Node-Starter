import User, { fields, userModel } from '../models/User';

export const findUser = async (queryOptions: Partial<fields>, lean = false): Promise<userModel | fields | null> => {
  if (lean) {
    return User.findOne({ ...queryOptions }).lean();
  }
  return User.findOne({ ...queryOptions });
};

export const createUser = async ({ email, password }: { email: string; password: string }): Promise<fields> => {
  return User.create({ email, password });
};
