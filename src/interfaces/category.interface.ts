import { Document } from "mongoose";

export interface Category {
    name: string;  // Name of the category
    description?: string;  // Optional description of the category
    parentCategory?: string | null;  // Optional parent category (for nested categories)
    slug: string;  // URL-friendly name for the category
    createdAt: string;  // Date when the category was created
    updatedAt: string;  // Date when the category was last updated
    isActive: boolean;  // Whether the category is active or not
  }
  