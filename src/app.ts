import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';

import ApiError from './utils/apiError';
import mountRoutes from './routes/index';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mountRoutes(app);

app.use('*', (req, res) => {
  return res.status(404).json({
    message: `Route ${req.originalUrl} not found`,
  });
});

app.use(
  (error: ApiError, _req: Request, res: Response, _next: NextFunction) => {
    error.statusCode = error.statusCode || 500;
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }
);

app.listen(Number(process.env.PORT), process.env.HOST as string, () => {
  console.log(
    `Server running at http://${process.env.HOST}:${process.env.PORT}/`
  );
});
