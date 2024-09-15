import { Category } from "../interfaces/category.interface";
import { createCategoriesRepo, deleteCategoriesRepo, updateCategoriesRepo } from "../repositories/categories.repository";

export const createCategoriesService  = async(data:Category):Promise<Category | null>=>{
    const result = await createCategoriesRepo(data)
    return result
}
export const updateCategoriesService  = async(id:string,data:Category):Promise<Category | null>=>{
    const result = await updateCategoriesRepo(id,data)
    return result
}
export const deleteCategoriesService = async(id:string):Promise<Category | null>=>{
    const result = await deleteCategoriesRepo(id)
    return result
}