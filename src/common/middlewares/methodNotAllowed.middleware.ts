import { NextFunction, Request, Response } from 'express';
import { MethodNotAllowedException } from '../exceptions';

const methodNotAllowed = (req: Request, res: Response, next: NextFunction) => {
  next(new MethodNotAllowedException());
};

export default methodNotAllowed;
