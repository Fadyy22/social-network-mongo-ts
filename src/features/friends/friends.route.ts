import { Router } from 'express';

import { friendIdValidator } from './friends.validator';

import {
  addFriend,
  cancelFriendRequest,
  acceptFriendRequest,
  deleteFriend,
  rejectFriendRequest,
} from './friends.service';

const router = Router({ mergeParams: true });

router.post('/add', friendIdValidator, addFriend);
router.patch('/accept', friendIdValidator, acceptFriendRequest);
router.delete('/cancel', friendIdValidator, cancelFriendRequest);
router.delete('/reject', friendIdValidator, rejectFriendRequest);
router.delete('/delete', friendIdValidator, deleteFriend);

export default router;
