import { Request, Response, NextFunction, Router } from 'express';
import { createRoom, getRooms } from './controllers/roomController';
import { authenticateUser } from './controllers/authController';
import { registerUser } from './controllers/publicController';
import errorHandler from './handlers/errorHandler';

import verifyToken from './middlewares/verifyToken';
import verifyAppAuth from './middlewares/verifyAppAuth';

import InvalidCredentialsError from './exceptions/InvalidCredentialsError';
import AuthenticationError from './exceptions/AuthenticationError';

const router = Router();

router.post('/login', authenticateUser);
router.post('/register', [verifyAppAuth], registerUser);

router.post('/rooms', [verifyToken], createRoom);
router.get('/rooms', [verifyToken], getRooms);

router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (
        error instanceof InvalidCredentialsError ||
        error instanceof AuthenticationError
    ) {
        errorHandler(error, req, res, next);
    } else {
        next(error);
    }
});

export default router;
