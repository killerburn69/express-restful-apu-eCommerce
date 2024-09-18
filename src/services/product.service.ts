import { Product } from "../interfaces/product.interface";
import { createProductRepo, deleteProductRepo, getProductRepo, updateProductRepo } from "../repositories/product.repositories";

export const createProductService = async(body:Product):Promise<Product | null>=>{
    return await createProductRepo(body)
}
export const getProductService = async(id:string):Promise<Product | null>=>{
    return await getProductRepo(id)
}
export const updateProductService = async(id:string, body:Product):Promise<Product | null>=>{
    return await updateProductRepo(id,body)
}
export const deleteProductService = async(id:string):Promise<Product | null>=>{
    return await deleteProductRepo(id)
}