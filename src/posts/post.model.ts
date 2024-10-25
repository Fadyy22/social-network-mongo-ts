import { model, Schema } from 'mongoose';

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
  { timestamps: true }
);

const Post = model('Post', postSchema);

export default Post;
