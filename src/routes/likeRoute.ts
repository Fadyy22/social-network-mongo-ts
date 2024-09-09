import { likePost, unlikePost } from '../controllers/likeController';

import {
  likePostValidator,
  unlikePostValidator,
} from '../utils/validators/likeValidator';

const likeRouter = {
  like: [likePostValidator, likePost],
  unlike: [unlikePostValidator, unlikePost],
};

export default likeRouter;
