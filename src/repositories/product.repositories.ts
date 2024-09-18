import { Product } from "../interfaces/product.interface";
import ProductModel from "../models/product.model";

export const createProductRepo = async(body:Product):Promise<Product | null> => {
    return await ProductModel.create(body);
}
export const getProductRepo = async(id:string):Promise<Product | null> => {
    return await ProductModel.findById(id).lean();
}
export const updateProductRepo = async(id:string,body:Product):Promise<Product | null> => {
    return await ProductModel.findByIdAndUpdate(id,body);
}
export const deleteProductRepo = async(id:string):Promise<Product | null> => {
    return await ProductModel.findByIdAndDelete(id);
}