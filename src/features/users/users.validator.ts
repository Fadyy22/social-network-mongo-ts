import { check, checkExact } from 'express-validator';

import { globalValidatorMiddleware } from '../../common/middlewares/validator.middleware';

export const getUserProfileValidator = [
  check('id').isMongoId().withMessage('Invalid ID'),
  globalValidatorMiddleware,
];

export const updateProfileValidator = [
  check('firstName')
    .optional()
    .trim()
    .isString()
    .withMessage('First name must be only characters')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  check('lastName')
    .optional()
    .trim()
    .isString()
    .withMessage('Last name must be only characters')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  check('bio')
    .optional()
    .trim()
    .isString()
    .withMessage('Bio must be a text')
    .isLength({ min: 1, max: 200 })
    .withMessage('First name must be between 1 and 200 characters'),
  checkExact([], { message: 'Unknown fileds' }),
  globalValidatorMiddleware,
];
