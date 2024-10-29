import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

export const globalValidatorMiddleware: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(400)
      .json({ errors: errors.array(), message: 'Validation Failed' });
    return;
  }
  next();
};
