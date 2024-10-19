import { hash } from 'bcryptjs';
import { check, checkExact } from 'express-validator';

import { globalValidatorMiddleware } from '../middlewares/validator.middleware';

export const signupValidator = [
  check('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isString()
    .withMessage('First name must be only characters')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  check('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isString()
    .withMessage('Last name must be only characters')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  check('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is not valid'),
  check('password')
    .trim()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      'Password must have a minimum length of 8 characters, with at least one lowercase letter, one uppercase letter, one number, and one special character'
    )
    .customSanitizer(async (password: string) => await hash(password, 12)),
  checkExact([], { message: 'Unknown fileds' }),
  globalValidatorMiddleware,
];

export const loginValidator = [
  check('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is not valid'),
  check('password').trim().notEmpty().withMessage('Password is required'),
  globalValidatorMiddleware,
];
