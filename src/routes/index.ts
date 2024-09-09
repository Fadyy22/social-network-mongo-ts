import { Express } from 'express';

import authRouter from './authRoute';
import postRouter from './postRoute';
import userRouter from './userRoute';

const mountRoutes = (app: Express) => {
  app.use('/auth', authRouter);
  app.use('/posts', postRouter);
  app.use('/users', userRouter);
};

export default mountRoutes;
