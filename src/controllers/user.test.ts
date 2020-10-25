import { mocked } from 'ts-jest/utils';
import mongoose from 'mongoose';
import { loginController, signupController } from './user';
import { findUser, createUser } from '../repositories/user';

jest.mock('../repositories/user');
const mockedFindUser = mocked(findUser, true);
const mockedCreateUser = mocked(createUser, true);

describe('tests for loginController', () => {
  test('it should return error if email is invalid', async () => {
    await expect(loginController('bayo', '12345678')).resolves.toHaveProperty('success', false);
  });
  test('it should return error if password is less than 5 character', async () => {
    await expect(loginController('bayo@test.com', '1234')).resolves.toHaveProperty('success', false);
  });
  test('it should return error if user is not found', async () => {
    mockedFindUser.mockImplementationOnce(() => Promise.resolve(null));
    await expect(loginController('bayo@test.com', '12345')).resolves.toHaveProperty('success', false);
  });
  test('it should return error if password does not match', async () => {
    mockedFindUser.mockImplementationOnce(() =>
      Promise.resolve({
        id: mongoose.Types.ObjectId(),
        email: 'bayo@xyz.com',
        password: '123456',
        comparePassword: () => Promise.resolve(false),
      })
    );
    await expect(loginController('bayo@test.com', '12345')).resolves.toHaveProperty('success', false);
  });
  test('it should return token if password matches', async () => {
    mockedFindUser.mockImplementationOnce(() =>
      Promise.resolve({
        id: mongoose.Types.ObjectId(),
        email: 'bayo@xyz.com',
        password: '123456',
        comparePassword: () => Promise.resolve(true),
      })
    );
    await expect(loginController('bayo@test.com', '12345')).resolves.toHaveProperty('data.token');
  });
});

describe('tests for signupController', () => {
  test('it should return error if email is invalid', async () => {
    await expect(signupController('bayo', '12345678')).resolves.toHaveProperty('success', false);
  });
  test('it should return error if password is less than 5 character', async () => {
    await expect(signupController('bayo@test.com', '1234')).resolves.toHaveProperty('success', false);
  });
  test('it should return error if user already exists', async () => {
    mockedFindUser.mockImplementationOnce(() =>
      Promise.resolve({
        id: mongoose.Types.ObjectId(),
        email: 'bayo@xyz.com',
        password: '123456',
        comparePassword: () => Promise.resolve(false),
      })
    );
    await expect(signupController('bayo@test.com', '12345')).resolves.toHaveProperty('success', false);
  });
  test('it should return token if all validations pass', async () => {
    mockedCreateUser.mockImplementationOnce(() =>
      Promise.resolve({
        id: mongoose.Types.ObjectId(),
        email: 'bayo@xyz.com',
        password: '123456',
        comparePassword: () => Promise.resolve(false),
      })
    );
    await expect(signupController('bayo@test.com', '12345')).resolves.toHaveProperty('success', true);
  });
});
