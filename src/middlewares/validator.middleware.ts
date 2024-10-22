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

export const customValidatorMiddleware: RequestHandler = (req, res, next) => {
  if (req.customError) {
    return res
      .status(req.customError.statusCode)
      .json({ message: req.customError.message });
  }
  next();
};
