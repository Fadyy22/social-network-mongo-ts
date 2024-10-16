import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import mountRoutes from './utils/mountRoutes';
import globalError from './middlewares/error.middleware';
import { NotFoundException } from './exceptions';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mountRoutes(app);

app.use('*', (req, _res, next) => {
  next(new NotFoundException(`Can't find ${req.originalUrl} on this server`));
});

app.use(globalError);

app.listen(Number(process.env.PORT), process.env.HOST as string, () => {
  console.log(
    `Server running at http://${process.env.HOST}:${process.env.PORT}/`
  );
});
