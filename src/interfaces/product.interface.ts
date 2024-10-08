import { Review } from "./review.interface";

export interface Product {
    // _id: string;  // MongoDB ObjectId as a string
    name: string;  // Name of the product
    description: string;  // Detailed description of the product
    price: number;  // Price of the product
    category: string;  // Category ID the product belongs to
    brand?: string;  // Optional brand of the product
    stock: number;  // Number of units in stock
    sell:number;
    images: string[];  // Array of URLs or file paths to product images
    size?: string[];  // Optional array of product sizes
    color?: string[];  // Optional array of product colors
    isActive: boolean;  // Whether the product is active or not
    ratings?: number;  // Optional average rating of the product
    createdAt: Date;  // Date when the product was created
    updatedAt: Date;  // Date when the product was last updated
  }