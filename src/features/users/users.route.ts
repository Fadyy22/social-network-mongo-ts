import { Router } from 'express';

import {
  createProfileImage,
  getFriendRequests,
  getMyProfile,
  getUserProfile,
} from './users.service';

import { getUserProfileValidator } from './users.validator';

import friendRouter from '../friends/friends.route';

import { uploadSingleImage } from '../../common/middlewares/uploadImage.middleware';
import isAuth from '../../common/middlewares/auth.middleware';
import methodNotAllowed from '../../common/middlewares/methodNotAllowed.middleware';

const router = Router();

router.patch(
  '/profile-img',
  isAuth,
  uploadSingleImage('profileImg', 'profile_images'),
  createProfileImage
);

router.get('/me', isAuth, getMyProfile);
router.get('/me/friend-requests', isAuth, getFriendRequests);

router.get('/:id', isAuth, getUserProfileValidator, getUserProfile);

router.use('/:id', isAuth, friendRouter);

router.all('*', methodNotAllowed);

export default router;
