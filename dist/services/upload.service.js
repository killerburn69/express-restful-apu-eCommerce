"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary_config_1.default.uploader.upload(filePath, {
            folder: 'uploads', // Optional: specify folder in Cloudinary
        });
        return result; // Result contains URL and other info about the uploaded image
    }
    catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};
exports.uploadImage = uploadImage;
