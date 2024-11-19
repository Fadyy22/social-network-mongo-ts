import e from 'express';
import { NotFoundException } from '../exceptions';

const routeNotFoundMiddleware = (
  req: e.Request,
  _res: e.Response,
  next: e.NextFunction
) => {
  next(new NotFoundException(`Can't find ${req.originalUrl} on this server`));
};

export default routeNotFoundMiddleware;
