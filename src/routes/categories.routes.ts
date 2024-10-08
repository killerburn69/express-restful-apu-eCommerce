import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createCategories, deleteCategories, getAllCategories, getDetail, updateCategories } from "../controllers/categories.controllers";

const router = Router()

router.post("/create", authMiddleware(["admin"]), createCategories)
router.post("/update/:id", authMiddleware(["admin"]), updateCategories)
router.delete("/delete/:id", authMiddleware(["admin"]), deleteCategories)
router.get("/getAll",authMiddleware(["user","admin"]),getAllCategories)
router.get("/getDetailCategories/:id",authMiddleware(["user","admin"]),getDetail)
export default router