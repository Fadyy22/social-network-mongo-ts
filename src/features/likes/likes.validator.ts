import { check } from 'express-validator';

import { globalValidatorMiddleware } from '../../common/middlewares/validator.middleware';

export const likePostValidator = [
  check('id').isMongoId().withMessage('Invalid id'),
  globalValidatorMiddleware,
];

export const unlikePostValidator = [
  check('id').isMongoId().withMessage('Invalid id'),
  globalValidatorMiddleware,
];
