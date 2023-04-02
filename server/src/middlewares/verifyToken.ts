import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import AuthenticationError from '../exceptions/AuthenticationError';

const secretKey: Secret = process.env.JWT_SECRET || "defaultkey";

interface DecodedToken {
    id: string;
    iat: number;
    exp: number;
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new AuthenticationError('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new AuthenticationError('Access token is missing');
    }

    try {
        const decodedToken = jwt.verify(token, secretKey) as DecodedToken;
        req.body.userId = decodedToken.id;
        next();
    } catch (error) {
        throw new AuthenticationError('Access token is invalid');
    }
};

export default verifyToken;
