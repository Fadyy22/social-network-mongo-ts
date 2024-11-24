import { Schema, model } from 'mongoose';
import { hash } from 'bcryptjs';

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    bio: { type: String },
    profileImg: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    // friendRequests are requests sent to me
    friendRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    sentRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await hash(this.password, 12);
  next();
});

userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author',
});

const User = model('User', userSchema);

export default User;
