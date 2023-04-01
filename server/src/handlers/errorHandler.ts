import { Request, Response, NextFunction } from 'express';

interface HttpError extends Error {
  statusCode?: number;
}

const errorHandler = (error: HttpError, req: Request, res: Response, next: NextFunction): void => {
  console.error(error);
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';
  res.status(statusCode).send(message);
};

export default errorHandler;
