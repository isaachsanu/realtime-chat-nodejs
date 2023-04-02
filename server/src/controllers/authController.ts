import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import jwt, { Secret } from 'jsonwebtoken';

import InvalidCredentialsError from '../exceptions/InvalidCredentialsError';
import AuthenticationError from '../exceptions/AuthenticationError';

const secretKey: Secret = process.env.JWT_SECRET || "defaultkey";

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
