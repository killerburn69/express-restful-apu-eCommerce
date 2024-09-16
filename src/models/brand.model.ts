import mongoose, { Schema } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { Category } from '../interfaces/category.interface';
import { Brand } from '../interfaces/brand.interface';

const brandSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  logo:{
    type:String
  },
  website:{type:String},
  createdAt: {
    type: Date,
  },
  updatedAt:{
    type: Date,
  },
  isActive:{
    type:Boolean
  },
});

const BrandModel = mongoose.model<Brand & Document>('Brand', brandSchema);
export default BrandModel;
