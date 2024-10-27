import { Router } from 'express';

import {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} from './posts.service';

import {
  createPostValidator,
  updatePostValidator,
  deletePostValidator,
} from './posts.validator';

import commentRouter from '../comments/comments.route';
// import likeRouter from '../likes/likes.route';

import isAuth from '../middlewares/auth.middleware';
import methodNotAllowed from '../middlewares/methodNotAllowed.middleware';

const router = Router();

router.use('/:postId/comments', commentRouter);

router
  .route('/')
  .post(isAuth, createPostValidator, createPost)
  .get(isAuth, getAllPosts);

router
  .route('/:id')
  .get(isAuth, getPost)
  .patch(isAuth, updatePostValidator, updatePost)
  .delete(isAuth, deletePostValidator, deletePost);

// router.post('/:id/like', isAuth, ...likeRouter.like);
// router.delete('/:id/unlike', isAuth, ...likeRouter.unlike);

router.all('*', methodNotAllowed);

export default router;
