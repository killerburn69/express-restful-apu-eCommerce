import { File } from 'multer';

declare global {
  namespace Express {
    interface Request {
      file?: File;  // Add file property for single file upload
      files?: File[]; // Optional: for multiple file uploads
    }
  }
}
