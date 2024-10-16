import { Request, Response, NextFunction } from 'express';

import HttpException from '../exceptions/HttpException';

const globalError = (
  error: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Something went wrong';

  res.status(statusCode).json({
    message: message,
    status: error.status,
  });
};

export default globalError;
