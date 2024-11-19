import { check, checkExact } from 'express-validator';

import { globalValidatorMiddleware } from '../../common/middlewares/validator.middleware';

export const createCommentValidator = [
  check('postId').isMongoId().withMessage('Invalid post ID'),
  check('content')
    .isLength({ min: 1, max: 500 })
    .withMessage('Content must be between 1 and 500 characters'),
  checkExact([], { message: 'Unknown fileds' }),
  globalValidatorMiddleware,
];

export const updateCommentValdiator = [
  check('postId').isMongoId().withMessage('Invalid post ID'),
  check('id').isMongoId().withMessage('Invalid comment ID'),
  check('content')
    .isLength({ min: 1, max: 500 })
    .withMessage('Content must be between 1 and 500 characters'),
  checkExact([], { message: 'Unknown fileds' }),
  globalValidatorMiddleware,
];

export const deleteCommentValidator = [
  check('postId').isMongoId().withMessage('Invalid post ID'),
  check('id').isMongoId().withMessage('Invalid comment ID'),
  globalValidatorMiddleware,
];
