import { Router } from 'express';

import { signup, login } from './auth.service';

import { signupValidator, loginValidator } from './auth.validator';
import methodNotAllowed from '../middlewares/methodNotAllowed.middleware';

const router = Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);

router.all('*', methodNotAllowed);

export default router;
