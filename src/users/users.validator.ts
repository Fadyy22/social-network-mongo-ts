import { check } from 'express-validator';

import { globalValidatorMiddleware } from '../middlewares/validator.middleware';

export const getUserProfileValidator = [
  check('id').isMongoId().withMessage('Invalid ID'),
  globalValidatorMiddleware,
];

export const addFriendValidator = [
  check('id').isMongoId().withMessage('Invalid ID'),
  globalValidatorMiddleware,
];

export const acceptFriendRequestValidator = [
  check('id').isMongoId().withMessage('Invalid ID'),
  globalValidatorMiddleware,
];

export const rejectFriendRequestValidator = [
  check('id').isMongoId().withMessage('Invalid ID'),
  globalValidatorMiddleware,
];

export const deleteFriendValidator = [
  check('id').isMongoId().withMessage('Invalid ID'),
  globalValidatorMiddleware,
];
