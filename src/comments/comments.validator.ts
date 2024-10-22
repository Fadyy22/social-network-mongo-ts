import { check, checkExact } from 'express-validator';

import { globalValidatorMiddleware } from '../middlewares/validator.middleware';

export const createCommentValidator = [
  check('postId').isString().withMessage('postId must be a string'),
  check('content')
    .isLength({ min: 1, max: 500 })
    .withMessage('Content must be between 1 and 500 characters'),
  checkExact([], { message: 'Unknown fileds' }),
  globalValidatorMiddleware,
];

export const deleteCommentValidator = [
  check('postId').isString().withMessage('postId must be a string'),
  check('id').isString().withMessage('id must be a string'),
  globalValidatorMiddleware,
];
