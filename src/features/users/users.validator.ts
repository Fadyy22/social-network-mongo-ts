import { check } from 'express-validator';

import { globalValidatorMiddleware } from '../../common/middlewares/validator.middleware';

export const getUserProfileValidator = [
  check('id').isMongoId().withMessage('Invalid ID'),
  globalValidatorMiddleware,
];
