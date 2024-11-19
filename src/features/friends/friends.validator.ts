import { check } from 'express-validator';

import { globalValidatorMiddleware } from '../../common/middlewares/validator.middleware';

export const friendIdValidator = [
  check('id').isMongoId().withMessage('Invalid ID'),
  globalValidatorMiddleware,
];
