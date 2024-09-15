import { Router } from 'express';
import { uploadFile } from '../controllers/upload.controller';
import upload from '../middlewares/upload.middleware';

const routerUpload = Router();

// Route for uploading images using multer
routerUpload.post('/upload', upload.single('image'), uploadFile);

export default routerUpload;
