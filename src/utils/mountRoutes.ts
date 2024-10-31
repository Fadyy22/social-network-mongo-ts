import { Express, Router } from 'express';

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
};

export default mountRoutes;
