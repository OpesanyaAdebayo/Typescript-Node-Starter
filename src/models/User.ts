import mongoose, { HookNextFunction } from 'mongoose';
import bcrypt from 'bcrypt';

export interface fields {
  id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  comparePassword: comparePasswordFunction;
}

export type userModel = mongoose.Document & fields;

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
});

userSchema.pre<userModel>('save', function (next: HookNextFunction) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
});

type comparePasswordFunction = (userPassword: string) => Promise<boolean>;

const comparePassword: comparePasswordFunction = function (this: userModel, userPassword: string) {
  return bcrypt.compare(userPassword, this.password);
};

userSchema.methods.comparePassword = comparePassword;

const User = mongoose.model<userModel>('User', userSchema);

export default User;
