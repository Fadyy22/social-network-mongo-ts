import { check, checkExact } from 'express-validator';

import { globalValidatorMiddleware } from '../../common/middlewares/validator.middleware';

export const createPostValidator = [
  check('content')
    .isLength({ min: 1, max: 500 })
    .withMessage('Content must be between 1 and 500 characters'),
  checkExact([], { message: 'Unknown fields' }),
  globalValidatorMiddleware,
];

export const updatePostValidator = [
  check('id').isMongoId().withMessage('Invalid ID'),
  check('content')
    .isLength({ min: 1, max: 500 })
    .withMessage('Content must be between 1 and 500 characters'),
  checkExact([], { message: 'Unknown fields' }),
  globalValidatorMiddleware,
];

export const deletePostValidator = [
  check('id').isMongoId().withMessage('Invalid ID'),
  globalValidatorMiddleware,
];
