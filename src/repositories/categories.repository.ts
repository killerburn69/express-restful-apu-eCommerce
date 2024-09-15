import { Category } from "../interfaces/category.interface";
import CategoriesModel from "../models/categories.model";

export const createCategoriesRepo = async(data:Category):Promise<Category | null>=>{
    return await CategoriesModel.create(data)
}
export const updateCategoriesRepo = async(id:string,data:Category):Promise<Category | null>=>{
    return await CategoriesModel.findByIdAndUpdate(id,data)
} 
export const deleteCategoriesRepo = async(id:string):Promise<Category | null>=>{
    return await CategoriesModel.findByIdAndDelete(id)
}