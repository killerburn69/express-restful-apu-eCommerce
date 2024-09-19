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
    const size = Array.isArray(req.body.size) ? req.body.size : [req.body.size];
    const color = Array.isArray(req.body.color)
      ? req.body.color
      : [req.body.color];
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
      sell: 0,
      images,
      size,
      color,
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
    const size = Array.isArray(req.body.size) ? req.body.size : [req.body.size];
    const color = Array.isArray(req.body.color)
      ? req.body.color
      : [req.body.color];
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
      sell: product.sell,
      images: images ? images : product.images,
      size: size ? size : product.size,
      color: color ? color : product.color,
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
    // Extract query parameters with default values
    const {
      page = 1,
      limit = 10,
      name,
      category,
      minPrice,
      maxPrice,
      brand,
      isActive,
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    // Build filters dynamically based on provided query params
    const filters: any = {};

    if (name) {
      filters.name = { $regex: name, $options: "i" }; // Case-insensitive search
    }

    if (category) {
      filters.category = category;
    }

    if (minPrice || maxPrice) {
      filters.price = {
        ...(minPrice && { $gte: Number(minPrice) }), // Only include if `minPrice` is set
        ...(maxPrice && { $lte: Number(maxPrice) }), // Only include if `maxPrice` is set
      };
    }

    if (brand) {
      filters.brand = brand;
    }

    if (isActive !== undefined) {
      filters.isActive = isActive === "true"; // Convert to boolean
    }

    // Query products with filters and pagination
    const [products, total] = await Promise.all([
      ProductModel.find(filters).skip(skip).limit(Number(limit)).exec(),
      ProductModel.countDocuments(filters), // Get total number of documents matching filters
    ]);

    // Return the paginated data
    return res.status(200).json({
      code: 0,
      data: {
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit)),
        totalProducts: total,
        products,
      },
      message: "success",
    });
  } catch (error) {
    return res.status(500).json({
      code: -1,
      message: "Error retrieving products",
      data: null,
    });
  }
};

export const getProductDetail = async (req: Request, res: Response) => {
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
    return res.status(200).json({
      code: 0,
      message: "success",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      code: -1,
      message: "Error",
      data: null,
    });
  }
};
export const topFive = async (req: Request, res: Response) => {
  try {
    const type = req.query.type;
    if (type === "cheap") {
      const products = await ProductModel.find({ isActive: true })
        .sort({ price: 1 })
        .limit(5);
      return res.status(200).json({
        code: 0,
        message: "Top five cheapest products",
        data: products,
      });
    }
    if (type === "expensive") {
      const products = await ProductModel.find({ isActive: true })
        .sort({ price: -1 })
        .limit(5);
      return res.status(200).json({
        code: 0,
        message: "Top five most expensive products",
        data: products,
      });
    }
    if (type === "buy") {
      const products = await ProductModel.find({ isActive: true })
        .sort({ sell: -1 })
        .limit(5);
      return res.status(200).json({
        code: 0,
        message: "Top five most sold products",
        data: products,
      });
    }
  } catch (error) {}
};
