import { model, Schema } from 'mongoose';
import Post from '../posts/post.model';

const commentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// We use this in getPost, where we populate the user
// so that the user data are in "user" field insted of "userId"
// This could be easily made by changing the filed name in commentSchema
// from userId to user
commentSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
});

commentSchema.post('findOneAndDelete', async function (doc, next) {
  await Post.findByIdAndUpdate(doc.postId, { $inc: { commentsCount: -1 } });
});

const Comment = model('Comment', commentSchema);

export default Comment;
