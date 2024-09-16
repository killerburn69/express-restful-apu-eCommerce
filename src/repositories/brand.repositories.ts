import { Brand } from "../interfaces/brand.interface";
import BrandModel from "../models/brand.model";

export const createBrandRepo = async(body:Brand):Promise<Brand | null> => {
    return await BrandModel.create(body)
}
export const getBrandRepo = async(id:string):Promise<Brand | null> => {
    return await BrandModel.findById(id).lean()
}
export const updateBrandRepo = async(id:string,body:Brand):Promise<Brand | null> => {
    return await BrandModel.findByIdAndUpdate(id,body)
}
export const deleteBrandRepo = async(id:string):Promise<Brand | null> => {
    return await BrandModel.findByIdAndDelete(id)
}