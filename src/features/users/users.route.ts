import { Router } from 'express';

import {
  createProfileImage,
  getFriendRequests,
  getMyProfile,
  getUserProfile,
  updateProfile,
} from './users.service';

import {
  getUserProfileValidator,
  updateProfileValidator,
} from './users.validator';

import friendRouter from '../friends/friends.route';

import { uploadSingleFile } from '../../common/middlewares/fileUpload.middleware';
import isAuth from '../../common/middlewares/auth.middleware';
import methodNotAllowed from '../../common/middlewares/methodNotAllowed.middleware';

const router = Router();

router.patch(
  '/profile-img',
  isAuth,
  uploadSingleFile('profileImg', {
    destination: 'profile_images',
  }),
  createProfileImage
);

router.get('/me', isAuth, getMyProfile);
router.patch('/me', isAuth, updateProfileValidator, updateProfile);
router.get('/me/friend-requests', isAuth, getFriendRequests);

router.get('/:id', isAuth, getUserProfileValidator, getUserProfile);

router.use('/:id', isAuth, friendRouter);

router.all('*', methodNotAllowed);

export default router;
