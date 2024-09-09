import { Router } from 'express';

import {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} from '../controllers/postController';

import {
  createPostValidator,
  updatePostValidator,
  deletePostValidator,
} from '../utils/validators/postValidator';

import commentRouter from './commentRoute';
import likeRouter from './likeRoute';

import isAuth from '../middlewares/authMiddleware';

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

router.post('/:id/like', isAuth, ...likeRouter.like);
router.delete('/:id/unlike', isAuth, ...likeRouter.unlike);

export default router;
