import { Request, Response, request } from "express";
import { Product } from "../interfaces/product.interface";
import {
  createProductService,
  deleteProductService,
  getProductService,
  updateProductService,
} from "../services/product.service";
import ProductModel from "../models/product.model";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const price = Number(req.body.price);
    const category = req.body.category;
    const brand = req.body.brand;
    const stock = Number(req.body.stock);
    const images = Array.isArray(req.body.images)
      ? req.body.images
      : [req.body.images];
    const isActive = req.body.isActive;
    const ratings = req.body.ratings;
    const createdAt = new Date();
    const updatedAt = new Date();
    const body: Product = {
      name,
      description,
      price,
      category,
      brand,
      stock,
      images,
      isActive,
      ratings,
      createdAt,
      updatedAt,
    };
    const result = await createProductService(body);
    if (result) {
      return res.status(201).json({
        code: 0,
        message: "Product created successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        code: -1,
        message: "Failed to create product",
        data: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: -1,
      message: "Error",
      data: null,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await getProductService(id);
    if (!product) {
      return res.status(404).json({
        code: -1,
        message: "Product not found",
        data: null,
      });
    }
    const name = req.body.name;
    const description = req.body.description;
    const price = Number(req.body.price);
    const category = req.body.category;
    const brand = req.body.brand;
    const stock = Number(req.body.stock);
    const images = Array.isArray(req.body.images)
      ? req.body.images
      : [req.body.images];
    const isActive = req.body.isActive;
    const ratings = req.body.ratings;
    const updatedAt = new Date();
    const body: Product = {
      name: name ? name : product.name,
      description: description ? description : product.description,
      price: price ? price : product.price,
      category: category ? category : product.category,
      brand: brand ? brand : product.brand,
      stock: stock ? stock : product.stock,
      images: images ? images : product.images,
      isActive: isActive ? isActive : product.isActive,
      ratings: ratings ? ratings : product.ratings,
      updatedAt,
      createdAt: product.createdAt,
    };
    const result = await updateProductService(id, body);
    if (result) {
      return res.status(200).json({
        code: 0,
        message: "Product updated successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        code: -1,
        message: "Failed to update product",
        data: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: -1,
      message: "Error",
      data: null,
    });
  }
};
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await getProductService(id);
    if (!product) {
      return res.status(404).json({
        code: -1,
        message: "Product not found",
        data: null,
      });
    }
    const result = await deleteProductService(id);
    if (result) {
      return res.status(200).json({
        code: 0,
        message: "Product deleted successfully",
        data: result,
      });
    } else {
      return res.status(400).json({
        code: -1,
        message: "Failed to delete product",
        data: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      code: -1,
      message: "Error",
      data: null,
    });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const name = req.query.name;
    const skip = (page - 1) * limit;
    const filters = name ? { name: name } : {};
    const users = await ProductModel.find(filters)
      .skip(skip)
      .limit(limit)
      .exec(); // Executes the query
    const total = await ProductModel.countDocuments();
    return res.status(200).json({
      code: 0,
      data: {
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        users,
      },
      message: "success",
    });
  } catch (error) {
    return res.status(500).json({
      code: -1,
      message: "Error",
      data: null,
    });
  }
};
export const getProductDetail = async(req: Request,res:Response)=>{
    try{
        const id = req.params.id;
        const product = await getProductService(id);
        if(!product){
            return res.status(404).json({
                code: -1,
                message: "Product not found",
                data: null,
            });
        }
        return res.status(200).json({
            code: 0,
            message: "success",
            data: product,
        });
    }catch(error){
        return res.status(500).json({
            code: -1,
            message: "Error",
            data: null,
        });
    }
}