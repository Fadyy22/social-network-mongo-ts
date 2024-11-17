import express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
      file?: Express.Multer.File;
      customError?: {
        statusCode: number;
        message: string;
      };
    }
  }
}
