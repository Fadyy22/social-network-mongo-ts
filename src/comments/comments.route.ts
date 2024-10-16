import { Router } from 'express';

import { createComment, deleteComment } from './comments.service';

import {
  createCommentValidator,
  deleteCommentValidator,
} from './comments.validator';

import isAuth from '../middlewares/auth.middleware';

const router = Router({ mergeParams: true });

router.route('/').post(isAuth, createCommentValidator, createComment);

router.route('/:id').delete(isAuth, deleteCommentValidator, deleteComment);

export default router;
