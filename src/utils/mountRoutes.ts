import { Express } from 'express';

import authRouter from '../auth/auth.route';
import postRouter from '../posts/posts.route';
import userRouter from '../users/users.route';

const mountRoutes = (app: Express) => {
  app.use('/auth', authRouter);
  app.use('/posts', postRouter);
  app.use('/users', userRouter);
};

export default mountRoutes;
