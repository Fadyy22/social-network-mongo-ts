import express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
      file?: Record<string, any>;
      customError?: {
        statusCode: number;
        message: string;
      };
    }
  }
}
