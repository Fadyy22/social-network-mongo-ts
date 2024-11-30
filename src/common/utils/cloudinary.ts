import fs from 'fs/promises';

import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFile = async (image: Express.Multer.File) => {
  const { secure_url } = await cloudinary.uploader.upload(image.path);
  fs.unlink(image.path).catch((err) => console.log(err));
  return secure_url;
};

export default cloudinary;
