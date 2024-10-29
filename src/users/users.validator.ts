import { check } from 'express-validator';

import { globalValidatorMiddleware } from '../middlewares/validator.middleware';

export const addFriendValidator = [
  check('id').isMongoId().withMessage('Invalid ID'),
  globalValidatorMiddleware,
];

export const acceptFriendRequestValidator = [
  check('id').isMongoId().withMessage('Invalid ID'),
  globalValidatorMiddleware,
];
