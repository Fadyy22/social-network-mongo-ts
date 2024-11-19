import { Express, Router } from 'express';

import { swagger } from './swagger';
import authRouter from '../auth/auth.route';
import postRouter from '../posts/posts.route';
import userRouter from '../users/users.route';
import routeNotFoundMiddleware from '../middlewares/routeNotFound.middleware';

const restRouter = Router();

restRouter.use('/auth', authRouter);
restRouter.use('/posts', postRouter);
restRouter.use('/users', userRouter);

restRouter.use('*', routeNotFoundMiddleware);

const mountRoutes = (app: Express) => {
  app.use('/api/v1', restRouter);
  app.use('/api-docs', ...swagger);
};

export default mountRoutes;
