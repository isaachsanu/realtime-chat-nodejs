import { Request, Response, NextFunction, Router } from 'express';
import { createRoom, getRooms } from './controllers/roomController';
import { authenticateUser, InvalidCredentialsError, AuthenticationError } from './controllers/authController';
import verifyToken from './handlers/verifyToken';
import errorHandler from './handlers/errorHandler';

const router = Router();

router.post('/auth', authenticateUser);

router.post('/rooms', verifyToken, createRoom);
router.get('/rooms', verifyToken, getRooms);

router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof InvalidCredentialsError || error instanceof AuthenticationError) {
        errorHandler(error, req, res, next);
    } else {
        next(error);
    }
});

export default router;
