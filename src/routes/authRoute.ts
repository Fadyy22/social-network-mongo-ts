import { Router } from 'express';

import { signup, login } from '../controllers/authController';

import {
  signupValidator,
  loginValidator,
} from '../utils/validators/authValidator';

const router = Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);

export default router;
