import { Router } from 'express';

import { createComment, deleteComment } from '../controllers/commentController';

import {
  createCommentValidator,
  deleteCommentValidator,
} from '../utils/validators/commentValidator';

import isAuth from '../middlewares/authMiddleware';

const router = Router({ mergeParams: true });

router.route('/').post(isAuth, createCommentValidator, createComment);

router.route('/:id').delete(isAuth, deleteCommentValidator, deleteComment);

export default router;
