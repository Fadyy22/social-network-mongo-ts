import multer from 'multer';
import { BadRequestException } from '../exceptions';
import { Request } from 'express';

export const uploadSingleImage = (fieldName: string, destination: string) => {
  const multerStorage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, `src/uploads/${destination}`);
    },
    filename: function (_req, file, cb) {
      const ext = file.mimetype.split('/')[1];
      const fileName = `${fieldName}-${Date.now()}.${ext}`;
      cb(null, fileName);
    },
  });
  const multerFilter = function (
    _req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new BadRequestException('Only images allowed'));
    }
  };
  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
  return upload.single(fieldName);
};
