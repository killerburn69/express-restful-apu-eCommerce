import { Request, Response } from 'express';
import { uploadImage } from '../services/upload.service';

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Assuming you're using middleware like multer to handle file uploads
    const filePath = req.file.path;

    const result = await uploadImage(filePath);

    res.status(200).json({
      message: 'File uploaded successfully',
      url: result.secure_url,  // Cloudinary's secure URL for the uploaded image
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading file', error });
  }
};
