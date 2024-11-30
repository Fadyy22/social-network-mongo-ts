import multer from 'multer';
import { BadRequestException } from '../exceptions';
import { Request } from 'express';

const createMulterStorage = (
  destination: string | ((req: Request, file: Express.Multer.File) => string),
  generateFileName?: (req: Request, file: Express.Multer.File) => string
) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      const resolvedDestination =
        typeof destination === 'function'
          ? destination(req, file)
          : `src/uploads/${destination}`;
      cb(null, resolvedDestination);
    },
    filename: function (req, file, cb) {
      const defaultFileName = `${file.fieldname}-${Date.now()}.${
        file.mimetype.split('/')[1]
      }`;
      const resolvedFileName = generateFileName
        ? generateFileName(req, file)
        : defaultFileName;
      cb(null, resolvedFileName);
    },
  });
};

const createFileFilter = (allowedMimeTypes: string[]) => {
  return function (
    _req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new BadRequestException(`File type not allowed: ${file.mimetype}`));
    }
  };
};

export const uploadSingleFile = (
  fieldName: string,
  options: {
    destination: string | ((req: Request, file: Express.Multer.File) => string);
    generateFileName?: (req: Request, file: Express.Multer.File) => string;
    allowedMimeTypes?: string[];
  }
) => {
  const {
    destination,
    generateFileName,
    allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'],
  } = options;

  const storage = createMulterStorage(destination, generateFileName);
  const fileFilter = createFileFilter(allowedMimeTypes);

  return multer({ storage, fileFilter }).single(fieldName);
};

export const uploadMultipleFiles = (
  fieldName: string,
  maxCount: number,
  options: {
    destination: string | ((req: Request, file: Express.Multer.File) => string);
    generateFileName?: (req: Request, file: Express.Multer.File) => string;
    allowedMimeTypes?: string[];
  }
) => {
  const {
    destination,
    generateFileName,
    allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'],
  } = options;

  const storage = createMulterStorage(destination, generateFileName);
  const fileFilter = createFileFilter(allowedMimeTypes);

  return multer({ storage, fileFilter }).array(fieldName, maxCount);
};
