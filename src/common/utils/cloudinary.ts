import fs from 'fs/promises';

import { v2 as cloudinary } from 'cloudinary';

export const configCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export const uploadFile = async (file: Express.Multer.File) => {
  const { secure_url } = await cloudinary.uploader.upload(file.path);
  fs.unlink(file.path).catch((err) => console.log(err));
  return secure_url;
};

export const uploadMultipleFiles = async (files: Express.Multer.File[]) => {
  const uploadPromises = files.map((file) => uploadFile(file));

  return Promise.all(uploadPromises);
};
