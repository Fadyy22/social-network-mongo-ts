import { Router } from 'express';

import {
  createComment,
  updateComment,
  deleteComment,
} from './comments.service';

import {
  createCommentValidator,
  updateCommentValdiator,
  deleteCommentValidator,
} from './comments.validator';

import isAuth from '../../common/middlewares/auth.middleware';
import methodNotAllowed from '../../common/middlewares/methodNotAllowed.middleware';

const router = Router({ mergeParams: true });

router.route('/').post(isAuth, createCommentValidator, createComment);

router
  .route('/:id')
  .patch(isAuth, updateCommentValdiator, updateComment)
  .delete(isAuth, deleteCommentValidator, deleteComment);

router.all('*', methodNotAllowed);

export default router;
