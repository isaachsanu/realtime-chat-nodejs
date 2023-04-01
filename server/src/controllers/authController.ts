import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import jwt, { Secret } from 'jsonwebtoken';

const secretKey: Secret = process.env.JWT_SECRET || "defaultkey";

export class InvalidCredentialsError extends Error {
  statusCode = 401;

  constructor(message: string) {
    super(message);
    this.name = 'InvalidCredentialsError';
  }
}

export class AuthenticationError extends Error {
  statusCode = 500;

  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user) {
      throw new InvalidCredentialsError('Invalid username or password');
    }
    const token = jwt.sign({ id: user._id }, secretKey);
    res.send({ token });
  } catch (error) {
    console.error(error);
    if (error instanceof InvalidCredentialsError) {
      next(error);
    } else {
      next(new AuthenticationError('Error authenticating user'));
    }
  }
};
