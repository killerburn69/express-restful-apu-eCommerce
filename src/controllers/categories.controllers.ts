import { Request, Response } from "express";
import { createCategoriesService, deleteCategoriesService, updateCategoriesService } from "../services/cart.service";
import { Category } from "../interfaces/category.interface";
import CategoriesModel from "../models/categories.model";

export const createCategories = async(req:Request, res:Response)=>{
    try {
        const name =req.body.name
        const description = req.body.description
        const parentCategory = req.body.parentCategory
        const slug = req.body.slug
        const isActive = req.body.isActive
        const body:Category={
            name,
            description,
            parentCategory,
            slug,
            isActive,
            createdAt:Date.now().toString(),
            updatedAt:Date.now().toString()
        }
        const result = await createCategoriesService(body)
        if(result){
            return res.status(200).json({
                code:0,
                data:result,
                message:"success"
            })
        }else{
            return res.status(400).json({
                code:-1,
                data:null,
                message:"fail"
            })
        }
    } catch (error) {
        return res.status(500).json({
            code: -1,
            message: "Error",
            data: null,
          });
    }
}   
export const updateCategories = async(req:Request,res:Response)=>{
    
    try {
        const id = req.params.id
        const category = await CategoriesModel.findById(id).lean()
        const name =req.body.name
        const description = req.body.description
        const parentCategory = req.body.parentCategory
        const slug = req.body.slug
        const isActive = req.body.isActive
        const body:Category={
            name: name ? name : category?.name,
            description: description ? description : category?.description,
            parentCategory:parentCategory ? parentCategory : category?.parentCategory,
            slug: slug ? slug : category?.slug,
            isActive: isActive ? isActive : category?.isActive,
            createdAt:category?.createdAt ?? "",
            updatedAt:Date.now().toString()
        }
        const result = await updateCategoriesService(id,body)
        if(result){
            return res.status(200).json({
                code:0,
                data:result,
                message:"success"
            })
        }else{
            return res.status(400).json({
                code:-1,
                data:null,
                message:"fail"
            })
        }
    } catch (error) {
        return res.status(500).json({
            code: -1,
            message: "Error",
            data: null,
          });
    }
}
export const deleteCategories = async(req:Request, res:Response)=>{
    try {
        const id = req.params.id
        const result = await deleteCategoriesService(id)
        if(result){
            return res.status(200).json({
                code:0,
                data:result,
                message:"success"
            })
        }
        else{
            return res.status(400).json({
                code:-1,
                data:null,
                message:"fail"
            })
        }
    } catch (error) {
        return res.status(500).json({
            code: -1,
            message: "Error",
            data: null,
          });
    }
}
export const getAllCategories = async (req: Request, res: Response) => {
    try {
      // Step 1: Get all categories from the database
      const categories = await CategoriesModel.find();
  
      // Step 2: Create a map where the keys are category IDs and values are the category objects
      const categoryMap: Record<string, any> = {};
      categories.forEach(category => {
        categoryMap[category.id] = {
          ...category.toObject(),
          children: []  // Initialize the `children` array to hold subcategories
        };
      });
  
      // Step 3: Create an array to hold the top-level categories (without parent categories)
      const topLevelCategories: any[] = [];
  
      // Step 4: Loop through the categories and assign each child to its respective parent
      categories.forEach(category => {
        if (category.parentCategory) {
          // If the category has a parent, add it to the parent's `children` array
          categoryMap[category.parentCategory].children.push(categoryMap[category.id]);
        } else {
          // If the category doesn't have a parent, it's a top-level category
          topLevelCategories.push(categoryMap[category.id]);
        }
      });
  
      // Step 5: Return the top-level categories with their respective children
      res.status(200).json({
        code:0,
        message:"success",
        data:topLevelCategories
      });
    } catch (err) {
        return res.status(500).json({
            code: -1,
            message: "Error",
            data: null,
          });
    }
  };
  