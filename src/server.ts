import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import express from 'express';

import connectDB from './config/db';
import mountRoutes from './utils/mountRoutes';
import globalError from './middlewares/error.middleware';

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(compression());
app.use(express.json());

mountRoutes(app);

app.use(globalError);

app.listen(Number(process.env.PORT), process.env.HOST as string, () => {
  console.log(
    `Server running at http://${process.env.HOST}:${process.env.PORT}/`
  );
});
