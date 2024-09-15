import mongoose, { Schema } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { Category } from '../interfaces/category.interface';

const categoriesSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  slug:{type:String},
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

const CategoriesModel = mongoose.model<Category & Document>('Categories', categoriesSchema);
export default CategoriesModel;
