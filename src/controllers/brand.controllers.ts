import { Request, Response } from "express";
import { Brand } from "../interfaces/brand.interface";
import { createBrandService, deleteBrandService, getBrandService, updateBrandService } from "../services/brand.service";
import BrandModel from "../models/brand.model";

export const createBrand = async(req:Request,res:Response)=>{
    try {
        const name = req.body.name
        const description = req.body.description
        const logo = req.body.logo
        const website = req.body.website
        const isActive = req.body.isActive
        const body:Brand = {
            name,
            description,
            logo,
            website,
            isActive,
            createdAt:new Date(),
            updatedAt:new Date(),
        }
        const result = await createBrandService(body)
        if(result){
            return res.status(201).json({
                code:0,
                message:"Brand created successfully",
                data:result
            })
        }else{
            return res.status(404).json({
                code:-1,
                message:"Failed to create brand",
                data:null
            })
        }
    } catch (error) {
        return res.status(500).json({
            code:-1,
            message:"Internal Server Error",
            data:null
        })
    }
}

export const updateBrand = async(req:Request,res:Response)=>{
    try {
        const id = req.params.id
        const brand = await getBrandService(id)
        if(!brand){
            return res.status(404).json({
                code:-1,
                message:"Brand not found",
                data:null
            })
        }
        const name = req.body.name
        const description = req.body.description
        const logo = req.body.logo
        const website = req.body.website
        const isActive = req.body.isActive
        const body:Brand = {
            name: name ? name : brand.name,
            description: description ? description : brand.description,
            logo: logo ? logo : brand.logo,
            website: website ? website : brand.website,
            isActive: isActive ? isActive : false ,
            createdAt:brand.createdAt,
            updatedAt:new Date(),
        }
        const result = await updateBrandService(id,body)
        if(result){
            return res.status(201).json({
                code:0,
                message:"Brand update successfully",
                data:result
            })
        }else{
            return res.status(404).json({
                code:-1,
                message:"Failed to update brand",
                data:null
            })
        }
    } catch (error) {
        return res.status(500).json({
            code:-1,
            message:"Internal Server Error",
            data:null
        })
    }
}
export const deleteBrand = async(req:Request,res:Response)=>{
    try {
        const id = req.params.id
        const brand = await getBrandService(id)
        if(!brand){
            return res.status(404).json({
                code:-1,
                message:"Brand not found",
                data:null
            })
        }
        const result = await deleteBrandService(id)
        if(result){
            return res.status(200).json({
                code:0,
                message:"Brand deleted successfully",
                data:result
            })
        }
        else{
            return res.status(404).json({
                code:-1,
                message:"Failed to delete brand",
                data:null
            })
        }
    } catch (error) {
        return res.status(500).json({
            code:-1,
            message:"Internal Server Error",
            data:null
        })
    }
}
export const getAllBrands = async(req:Request,res:Response)=>{
    try {
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);
        const name = req.query.name;
        const skip = (page - 1) * limit;
        const filters = name ? { name: name } : {};
        const users = await BrandModel.find(filters).skip(skip).limit(limit).exec(); // Executes the query
        const total = await BrandModel.countDocuments();
        return res.status(200).json({
          code:0,
          data:{
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            totalUsers: total,
            users,
          },
          message:"success"
        });
      } catch (error) {
        return res.status(500).json({
          code: -1,
          message: "Error",
          data: null,
        });
      }
}
export const getDetailBrand = async(req:Request, res:Response)=>{
    try {
        const id = req.params.id
        const brand = await getBrandService(id)
        if(!brand){
            return res.status(404).json({
                code:-1,
                message:"Brand not found",
                data:null
            })
        }
        return res.status(200).json({
            code:0,
            message:"Brand found successfully",
            data:brand
        })
    } catch (error) {
        return res.status(500).json({
            code:-1,
            message:"Internal Server Error",
            data:null
        })
    }
}