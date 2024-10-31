import { model, Schema } from 'mongoose';

import Comment from '../comments/comment.model';
import Like from '../likes/like.model';

const postSchema = new Schema(
  {
    content: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    media: [{ type: String }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'postId',
});

postSchema.post('findOneAndDelete', async function (doc, next) {
  await Comment.deleteMany({ postId: doc._id });
  await Like.deleteMany({ postId: doc._id });
  next();
});

const Post = model('Post', postSchema);

export default Post;
