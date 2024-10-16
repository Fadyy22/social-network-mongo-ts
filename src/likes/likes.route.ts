import { likePost, unlikePost } from './likes.service';

import { likePostValidator, unlikePostValidator } from './likes.validator';

const likeRouter = {
  like: [likePostValidator, likePost],
  unlike: [unlikePostValidator, unlikePost],
};

export default likeRouter;
