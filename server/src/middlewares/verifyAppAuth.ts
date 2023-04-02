import { Request, Response, NextFunction } from 'express';
import AuthenticationError from '../exceptions/AuthenticationError';

const verifyAppAuth = (req: Request, res: Response, next: NextFunction): void => {
    console.log(req.headers)
    const authAppHeader = req.headers['app-token'];
    if (!authAppHeader) {
        throw new AuthenticationError('Authorization header is missing');
    }

    if (authAppHeader != process.env.APP_TOKEN) {
        throw new AuthenticationError('Access token is invalid');
    }

    next();
};

export default verifyAppAuth;
