import { Router } from 'express';

import { signup, login } from './auth.service';

import { signupValidator, loginValidator } from './auth.validator';

const router = Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);

export default router;
