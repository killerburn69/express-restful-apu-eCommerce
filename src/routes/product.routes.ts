import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createProduct, deleteProduct, getAllProducts, getProductDetail, topFive, updateProduct } from "../controllers/product.controllers";

const router = Router()
router.post("/create", authMiddleware(["admin"]), createProduct)
router.post("/update/:id", authMiddleware(["admin"]), updateProduct)
router.delete("/delete/:id", authMiddleware(["admin"]), deleteProduct)
router.get("/getAllProducts",getAllProducts)
router.get("/getProductDetail/:id",getProductDetail)
router.get("/top5",topFive)
export default router