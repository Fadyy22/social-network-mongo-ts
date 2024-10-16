import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';

import ApiError from './exceptions/HttpException';
import mountRoutes from './utils/mountRoutes';
import { NotFoundException } from './exceptions';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mountRoutes(app);

app.use('*', (req, _res, next) => {
  next(new NotFoundException(`Can't find ${req.originalUrl} on this server`));
});

app.use(
  (error: ApiError, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
      error: error.message,
    });
  }
);

app.listen(Number(process.env.PORT), process.env.HOST as string, () => {
  console.log(
    `Server running at http://${process.env.HOST}:${process.env.PORT}/`
  );
});
