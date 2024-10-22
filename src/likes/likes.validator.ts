import { check } from 'express-validator';

import { globalValidatorMiddleware } from '../middlewares/validator.middleware';

export const likePostValidator = [
  check('id').isString().withMessage('Id must be a string'),
  globalValidatorMiddleware,
];

export const unlikePostValidator = [
  check('id').isString().withMessage('Id must be a string'),
  globalValidatorMiddleware,
];
