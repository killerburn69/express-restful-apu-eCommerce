import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createBrand, deleteBrand, getAllBrands, getDetailBrand, updateBrand } from "../controllers/brand.controllers";

const router = Router()
router.post("/create",authMiddleware(["admin"]),createBrand)
router.post("/update/:id",authMiddleware(["admin"]),updateBrand)
router.delete("/delete/:id",authMiddleware(["admin"]),deleteBrand)
router.get("/getAllBrand",getAllBrands)
router.get("/getDetailBrand/:id",getDetailBrand)
export default router