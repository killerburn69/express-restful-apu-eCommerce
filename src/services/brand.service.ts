import { Brand } from "../interfaces/brand.interface";
import { createBrandRepo, deleteBrandRepo, getBrandRepo, updateBrandRepo } from "../repositories/brand.repositories";

export const createBrandService = async(body:Brand):Promise<Brand|null> => {
    return await createBrandRepo(body)
}
export const updateBrandService = async(id:string,body:Brand):Promise<Brand|null> => {
    return await updateBrandRepo(id,body)
}
export const getBrandService = async(id:string):Promise<Brand|null> => {
    return await getBrandRepo(id)
}
export const deleteBrandService = async(id:string):Promise<Brand|null> => {
    return await deleteBrandRepo(id)
}