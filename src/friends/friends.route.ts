import { Router } from 'express';

import {
  acceptFriendRequestValidator,
  addFriendValidator,
  deleteFriendValidator,
  rejectFriendRequestValidator,
} from './friends.validator';

import {
  acceptFriendRequest,
  addFriend,
  deleteFriend,
  rejectFriendRequest,
} from './friends.service';

const router = Router({ mergeParams: true });

router.post('/add', addFriendValidator, addFriend);
router.post('/accept', acceptFriendRequestValidator, acceptFriendRequest);
router.post('/reject', rejectFriendRequestValidator, rejectFriendRequest);
router.post('/delete', deleteFriendValidator, deleteFriend);

export default router;
