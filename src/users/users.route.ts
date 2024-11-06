import { Router } from 'express';

import {
  createProfileImage,
  getMyProfile,
  getUserProfile,
  addFriend,
  acceptFriendRequest,
  rejectFriendRequest,
  deleteFriend,
} from './users.service';

import {
  getUserProfileValidator,
  addFriendValidator,
  acceptFriendRequestValidator,
  rejectFriendRequestValidator,
  deleteFriendValidator,
} from './users.validator';

import { uploadSingleImage } from '../middlewares/uploadImage.middleware';
import isAuth from '../middlewares/auth.middleware';
import methodNotAllowed from '../middlewares/methodNotAllowed.middleware';

const router = Router();

const friendRouter = Router({ mergeParams: true });

router.patch(
  '/profile-img',
  isAuth,
  uploadSingleImage('profileImg', 'profile_images'),
  createProfileImage
);

router.route('/me').get(isAuth, getMyProfile);

friendRouter.get('/', getUserProfileValidator, getUserProfile);
friendRouter.post('/add', addFriendValidator, addFriend);
friendRouter.post('/accept', acceptFriendRequestValidator, acceptFriendRequest);
friendRouter.post('/reject', rejectFriendRequestValidator, rejectFriendRequest);
friendRouter.post('/delete', deleteFriendValidator, deleteFriend);

router.use('/:id', isAuth, friendRouter);

router.all('*', methodNotAllowed);

export default router;
