import { Express, Router } from 'express';

// import { swagger } from './swagger';
import authRouter from '../../features/auth/auth.route';
import postRouter from '../../features/posts/posts.route';
import userRouter from '../../features/users/users.route';
import routeNotFoundMiddleware from '../middlewares/routeNotFound.middleware';

const restRouter = Router();

restRouter.use('/auth', authRouter);
restRouter.use('/posts', postRouter);
restRouter.use('/users', userRouter);

restRouter.use('*', routeNotFoundMiddleware);

const mountRoutes = (app: Express) => {
  app.use('/api/v1', restRouter);
  // app.use('/api-docs', ...swagger);
};

export default mountRoutes;
