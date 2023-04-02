import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

import InvalidCredentialsError from '../exceptions/InvalidCredentialsError';
import AuthenticationError from '../exceptions/AuthenticationError';

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Check if the required fields are present
        if (!req.body.username || !req.body.password) {
            throw new InvalidCredentialsError('Username and password are required');
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            throw new InvalidCredentialsError('User already exists');
        }

        // Create the user
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });
        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        if (error instanceof InvalidCredentialsError) {
            next(error);
        } else {
            next(new AuthenticationError('Error authenticating user'));
        }
    }
};
