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
import likeRouter from '../likes/likes.route';

import { uploadMultipleFiles } from '../../common/middlewares/fileUpload.middleware';
import isAuth from '../../common/middlewares/auth.middleware';
import methodNotAllowed from '../../common/middlewares/methodNotAllowed.middleware';

const router = Router();

router.use('/:postId/comments', commentRouter);

router
  .route('/')
  .post(
    isAuth,
    uploadMultipleFiles('images', 2, {
      destination: 'posts',
    }),
    createPostValidator,
    createPost
  )
  .get(isAuth, getAllPosts);

router
  .route('/:id')
  .get(isAuth, getPost)
  .patch(isAuth, updatePostValidator, updatePost)
  .delete(isAuth, deletePostValidator, deletePost);

router.post('/:id/like', isAuth, ...likeRouter.like);
router.delete('/:id/unlike', isAuth, ...likeRouter.unlike);

router.all('*', methodNotAllowed);

export default router;
