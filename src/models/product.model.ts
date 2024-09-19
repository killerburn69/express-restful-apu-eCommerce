import mongoose, { Schema } from 'mongoose';
import { Product } from '../interfaces/product.interface';


const productSchema = new Schema({
    name: { type: String, required: true },  // Name of the product
    description: { type: String, required: true },  // Detailed description of the product
    price: { type: Number, required: true },  // Price of the product
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },  // Reference to Category model
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },  // Optional reference to Brand model
    stock: { type: Number, required: true, default: 0 },  // Stock available
    sell:{type:Number,required: true, default:0},
    images: { type: [String], required: true },
    size:{type:[String]},
    color:{type:[String]},  // Array of image URLs or file paths
    isActive: { type: Boolean, required: true, default: true },  // Product is active or not
    ratings: { type: Number, default: 0 },  // Optional average rating
    createdAt: { type: Date, default: Date.now },  // Date when the product was created
    updatedAt: { type: Date, default: Date.now },  // Date when the product was last updated
});

const ProductModel = mongoose.model<Product & Document>('Product', productSchema);
export default ProductModel;
