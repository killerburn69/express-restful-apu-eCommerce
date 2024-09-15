import cloudinary from '../config/cloudinary.config';

export const uploadImage = async (filePath: string): Promise<any> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'uploads',  // Optional: specify folder in Cloudinary
    });
    return result;  // Result contains URL and other info about the uploaded image
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
